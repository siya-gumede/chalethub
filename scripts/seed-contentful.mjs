/**
 * Chalet Hub — Contentful content model + seed script for the Journal (blog).
 *
 * This creates a "Blog Post" content type and publishes the 6 starter posts
 * (3 Gaming, 3 AI) that used to live in src/data/blogPosts.ts.
 *
 * Run locally — never in CI, never with secrets committed:
 *
 *   CONTENTFUL_SPACE_ID=xxxx \
 *   CONTENTFUL_MANAGEMENT_TOKEN=xxxx \
 *   CONTENTFUL_ENVIRONMENT=master \
 *   node scripts/seed-contentful.mjs
 *
 * Where to get these:
 *  - Space ID + a Content Management token: Contentful web app →
 *    Settings → API keys → Content management tokens → "Generate personal token"
 *  - CONTENTFUL_ENVIRONMENT defaults to "master" if you don't set it.
 *
 * This script is idempotent-ish: it will create the content type if missing
 * (or reuse it if it already exists), and it will create-or-update entries by
 * slug, then publish everything. Safe to re-run.
 */

import { createClient } from 'contentful-management';

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT || 'master';
const CONTENT_TYPE_ID = 'blogPost';

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  console.error(
    '\nMissing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN.\n' +
      'Set them as environment variables before running this script — see the header comment.\n'
  );
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Starter content — same 6 posts the site launched with
// ---------------------------------------------------------------------------

const posts = [
  {
    slug: 'game-asset-pipelines-teach-software-architecture',
    title: 'What Game Asset Pipelines Teach You About Software Architecture',
    category: 'Gaming',
    publishDate: '2026-07-02',
    readTime: '5 min read',
    author: 'Chalet Hub Studio',
    excerpt:
      'Every asset pipeline is a distributed system wearing a folder structure as a disguise — and the discipline that keeps a production sane will keep your codebase sane too.',
    paragraphs: [
      'Walk through any healthy game production and you\u2019ll find the same shape underneath the mess of raw meshes, textures, and rigs: a pipeline. Raw model in, validated asset out, with clear stages in between — export, optimize, tag, import. Strip away the game-specific vocabulary and you\u2019re looking at a build pipeline. The stages, the gates, the versioning — it\u2019s all the same discipline we apply to shipping software, just wearing a different costume.',
      'The best studios treat their asset store the way a good platform team treats build artifacts: one source of truth, content-addressed, cached aggressively, and never hand-edited downstream of the source file. The moment someone starts patching an exported asset directly instead of the source, you\u2019ve got drift — the exact same failure mode as editing a generated file in a codebase and losing the change the next time it regenerates.',
      'Dependency graphs matter just as much here as they do in a service architecture. An asset references a material, the material references a shader, the shader references a texture set. Break one link and the failure cascades in ways that are hard to trace from the symptom alone. It\u2019s the same reasoning we use when we map service dependencies before touching a shared library — know the graph before you change a node in it.',
      'Validation gates are the other piece people underestimate. Naming conventions, polycount budgets, texture size limits — these aren\u2019t bureaucracy, they\u2019re schema validation. A pipeline that rejects a non-conforming asset at import time is doing exactly what a contract test does at a service boundary: failing fast, close to the source, before the bad data has a chance to propagate.',
      'None of this is really about games. It\u2019s about what happens when a team stops treating its production pipeline as a folder structure someone maintains by memory, and starts treating it as infrastructure — versioned, validated, and owned. That shift is what separates studios that ship reliably from studios that spend every milestone untangling what broke and why.',
    ],
  },
  {
    slug: 'ai-in-your-architecture-stack',
    title: 'Where AI Actually Belongs in Your Architecture Stack',
    category: 'AI',
    publishDate: '2026-06-24',
    readTime: '6 min read',
    author: 'Chalet Hub Studio',
    excerpt:
      'Cutting through the hype: AI capability deserves a boundary, a contract, and a fallback — not a raw call bolted into a UI handler.',
    paragraphs: [
      'A pattern we keep seeing: a team wires an LLM call directly into a button handler. It works in the demo. Three weeks later, a latency spike or a malformed response takes down a feature that has nothing architecturally to do with AI, because the AI call was never treated as a dependency — it was treated as a function that always succeeds.',
      'Model calls are external dependencies, full stop. They deserve the same treatment as a third-party payment gateway or a flaky upstream service: a defined interface, a timeout, a retry policy, and a circuit breaker that degrades gracefully instead of taking the whole feature down with it. If you wouldn\u2019t call a payment provider straight from a component with no error boundary, don\u2019t do it with a model provider either.',
      'The harder shift is architectural, not defensive: non-determinism becomes a first-class design concern. Two identical requests can return two different — both "correct" — answers. That breaks the assumptions a lot of testing infrastructure quietly relies on. You need an evaluation harness, not just a unit test suite: a way to score a distribution of outputs against acceptable ranges, not a single expected value.',
      'Cost and latency need budgets the same way a database query needs an index review. Token usage is a real, metered resource, and it belongs on the same dashboard as your p99 latency and your query cost — not buried in a billing email you check once a month.',
      'The pattern that tends to work: put a gateway in front of every model call. Version your prompts the way you version an API contract. Log the request, the response, and the cost on every call, the same way you\u2019d instrument any other service boundary. Treat the model as a component in the system, not a shortcut around the system — and most of the "AI is unpredictable" complaints turn out to be architecture problems wearing an AI costume.',
    ],
  },
  {
    slug: 'shipping-mvp-vs-shipping-a-game',
    title: 'Shipping an MVP vs. Shipping a Game: More Alike Than You\u2019d Think',
    category: 'Gaming',
    publishDate: '2026-06-10',
    readTime: '4 min read',
    author: 'Chalet Hub Studio',
    excerpt:
      'A vertical slice and an MVP are trying to prove the same thing: that the smallest version of the idea is worth building the rest of.',
    paragraphs: [
      'In game development, a vertical slice is the smallest complete loop that proves the fun is real — one level, one mechanic, polished enough to know whether the core idea holds up. Everything outside that loop is deliberately left undone. In product and software work, we call that an MVP, and it\u2019s trying to answer the exact same question with a different vocabulary: is this worth building the rest of?',
      'The temptation is identical in both worlds, too. "Just one more mechanic" and "just one more feature" are the same sentence in disguise, and both are usually a sign the team is avoiding the harder question of whether the core loop actually works yet. Scope discipline isn\u2019t about building less — it\u2019s about learning faster.',
      'Playtesting and user testing are the same feedback mechanism wearing different names. Neither one is about validating a finished product; both are about catching the moment where the loop doesn\u2019t land, early enough that the fix is still cheap. The teams that skip this step in either discipline end up polishing something nobody asked for.',
      'The rule of thumb we keep coming back to: ship the loop, not the world. Ship the workflow, not the platform. Prove the smallest thing can hold weight before you build the structure around it — that\u2019s true whether you\u2019re shipping a level or a login flow.',
    ],
  },
  {
    slug: 'prompt-engineering-is-api-design',
    title: 'Prompt Engineering Is Just API Design With Extra Steps',
    category: 'AI',
    publishDate: '2026-05-28',
    readTime: '5 min read',
    author: 'Chalet Hub Studio',
    excerpt:
      'A prompt is a contract — inputs, expected outputs, error modes — and the engineers who already think that way pick this up fastest.',
    paragraphs: [
      'Strip the mystique away and a prompt is a specification: given this input, produce output in this shape, with these constraints, and here\u2019s what to do when the request doesn\u2019t fit the happy path. That\u2019s not a new discipline. That\u2019s an API contract, written in natural language instead of an OpenAPI schema.',
      'Structured output requirements — asking for JSON in a specific shape, or wrapping sections in defined tags — are doing the same job as request and response validation at a service boundary. The goal isn\u2019t to make the model sound clever, it\u2019s to make its output parseable and predictable enough that the rest of your system can trust it without a human reading every response.',
      'Prompts need versioning discipline for the same reason endpoints do. A "small tweak" to a prompt can silently change behavior for every caller depending on it, exactly like an undocumented breaking change to a response schema. If you wouldn\u2019t ship an API change without a migration path, don\u2019t ship a prompt change without one either.',
      'Testing follows the same logic too — golden test cases and regression suites, not a vibe check in a playground. Save the inputs that matter, save the acceptable output ranges, and run them on every change. It\u2019s slower than trusting your gut, and it\u2019s the only thing that scales past a team of one.',
      'None of this requires learning a new mental model if you\u2019ve ever designed an interface for someone else to call. It requires applying the one you already have, more rigorously, to a component that happens to be a little less deterministic than the ones you\u2019re used to.',
    ],
  },
  {
    slug: 'systems-design-behind-game-economies',
    title: 'The Quiet Systems Design Behind Great Game Economies',
    category: 'Gaming',
    publishDate: '2026-05-14',
    readTime: '5 min read',
    author: 'Chalet Hub Studio',
    excerpt:
      'Sources and sinks, feedback loops, and telemetry dashboards — game economy design is capacity planning with better art direction.',
    paragraphs: [
      'Every in-game economy is built from two primitives: sources, where currency or resources enter the system, and sinks, where they leave. Get that balance wrong and you get the two failure modes every live-service team fears — runaway inflation that makes rewards meaningless, or a scarcity spiral that drives players out. It\u2019s the same balancing act as capacity planning on a backend system, just denominated in gold instead of requests per second.',
      'Unregulated growth breaks both kinds of systems the same way. A backend with no backpressure eventually falls over under its own load; an economy with no sinks eventually devalues everything in it. The fix in both cases is the same instinct: build in the regulating mechanism before you need it, not after the metrics start climbing in the wrong direction.',
      'Feedback loops are the deeper layer. A balancing loop pulls a system back toward equilibrium — a sink that scales with how much currency is in circulation. A reinforcing loop accelerates whatever direction it\u2019s already moving in, which is exactly what runs away if left unchecked. That\u2019s control theory, and it\u2019s the same thinking behind an autoscaler deciding when to add capacity versus when to let things settle.',
      'None of this works without instrumentation. A live economy needs a dashboard the same way a production service does — currency in, currency out, per-source and per-sink, watched continuously rather than reconstructed after the fact from a support ticket queue. The studios that stay ahead of economy problems are the ones who can see the trend a week before the players feel it, not the ones firefighting after a patch note.',
      'It\u2019s easy to think of economy design as a spreadsheet problem. It\u2019s really a systems problem, and the teams who treat it that way build economies that stay healthy for years instead of needing an emergency rebalance every season.',
    ],
  },
  {
    slug: 'building-with-ai-agents-lessons',
    title: 'Building With AI Agents: What Shipping Real Tools Taught Us',
    category: 'AI',
    publishDate: '2026-04-30',
    readTime: '6 min read',
    author: 'Chalet Hub Studio',
    excerpt:
      'Agents fail differently than deterministic code. Bound the blast radius, scope the tools tightly, and keep a human in the loop for anything irreversible.',
    paragraphs: [
      'The first thing that surprises teams moving from single model calls to agentic workflows is how differently agents fail. A deterministic function either works or throws. An agent can be subtly wrong at step three of an eight-step chain, and that small error compounds silently until the final output looks confident and is completely off track. You have to design for that compounding, not just for the failure at the end.',
      'The fix that actually helped: narrow tools, not broad access. Give an agent a small, well-defined set of actions with clear permissions rather than a general-purpose API key and a prayer. Principle of least privilege isn\u2019t just a security best practice for humans — it\u2019s the single biggest lever for limiting how much damage a confused agent can do before anyone notices.',
      'Irreversible actions get a human checkpoint, no exceptions. Sending a message, deleting a record, spending money — anything you can\u2019t easily undo goes through a confirmation step, the same way a production deploy goes through a gate before it hits real users. Speed is not a good enough reason to skip this; it\u2019s exactly the situations where speed feels most tempting that the checkpoint matters most.',
      'Logging and tracing every tool call stopped being optional the moment we started debugging real agent behavior. When something goes wrong three steps deep in a chain, "what did the agent actually call, with what arguments, and what came back" is the only question that matters — and it\u2019s unanswerable without full traces on every step, not just the final response.',
      'The honest takeaway after shipping a few of these: agents are a powerful automation layer, not a replacement for architecture discipline. Every lesson we\u2019d already learned about boundaries, permissions, and observability in distributed systems turned out to apply here too — we just had to relearn it the hard way before we believed it.',
    ],
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function toRichText(paragraphs) {
  return {
    nodeType: 'document',
    data: {},
    content: paragraphs.map((text) => ({
      nodeType: 'paragraph',
      data: {},
      content: [{ nodeType: 'text', value: text, marks: [], data: {} }],
    })),
  };
}

async function ensureContentType(environment) {
  let contentType;
  try {
    contentType = await environment.getContentType(CONTENT_TYPE_ID);
    console.log(`Content type "${CONTENT_TYPE_ID}" already exists — reusing it.`);
    const categoryField = contentType.fields.find((field) => field.id === 'category');
    if (categoryField) {
      categoryField.validations = [
        { in: ['Gaming', 'AI', 'System Design', 'Cloud Architecture', 'Observability'] },
      ];
    }
  } catch {
    console.log(`Creating content type "${CONTENT_TYPE_ID}"...`);
    contentType = await environment.createContentTypeWithId(CONTENT_TYPE_ID, {
      name: 'Blog Post',
      description: 'A Chalet Hub Journal post.',
      displayField: 'title',
      fields: [
        { id: 'title', name: 'Title', type: 'Symbol', required: true },
        {
          id: 'slug',
          name: 'Slug',
          type: 'Symbol',
          required: true,
          validations: [{ unique: true }],
        },
        {
          id: 'category',
          name: 'Category',
          type: 'Symbol',
          required: true,
          validations: [
            { in: ['Gaming', 'AI', 'System Design', 'Cloud Architecture', 'Observability'] },
          ],
        },
        { id: 'publishDate', name: 'Publish Date', type: 'Date', required: true },
        { id: 'readTime', name: 'Read Time', type: 'Symbol', required: true },
        { id: 'excerpt', name: 'Excerpt', type: 'Text', required: true },
        { id: 'author', name: 'Author', type: 'Symbol', required: false },
        {
          id: 'coverImage',
          name: 'Cover Image',
          type: 'Link',
          linkType: 'Asset',
          required: false,
        },
        { id: 'body', name: 'Body', type: 'RichText', required: true },
      ],
    });
  }

  contentType = await contentType.update();
  await contentType.publish();
  console.log(`Content type "${CONTENT_TYPE_ID}" published.`);
  return contentType;
}

async function findEntryBySlug(environment, slug) {
  const result = await environment.getEntries({
    content_type: CONTENT_TYPE_ID,
    'fields.slug': slug,
    limit: 1,
  });
  return result.items[0];
}

async function upsertPost(environment, post) {
  const fields = {
    title: { 'en-US': post.title },
    slug: { 'en-US': post.slug },
    category: { 'en-US': post.category },
    publishDate: { 'en-US': post.publishDate },
    readTime: { 'en-US': post.readTime },
    excerpt: { 'en-US': post.excerpt },
    author: { 'en-US': post.author },
    body: { 'en-US': toRichText(post.paragraphs) },
  };

  const existing = await findEntryBySlug(environment, post.slug);

  let entry;
  if (existing) {
    existing.fields = fields;
    entry = await existing.update();
    console.log(`Updated entry: ${post.title}`);
  } else {
    entry = await environment.createEntry(CONTENT_TYPE_ID, { fields });
    console.log(`Created entry: ${post.title}`);
  }

  await entry.publish();
  console.log(`Published: ${post.title}`);
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

async function main() {
  // contentful-management v12 defaults to the newer "plain" client API.
  // This script is written against the classic (nested) client — still
  // supported, just requires opting in explicitly.
  const client = createClient({ accessToken: MANAGEMENT_TOKEN }, { type: 'legacy' });
  const space = await client.getSpace(SPACE_ID);
  const environment = await space.getEnvironment(ENVIRONMENT_ID);

  await ensureContentType(environment);

  for (const post of posts) {
    await upsertPost(environment, post);
  }

  console.log(`\nDone. ${posts.length} posts are live in Contentful.`);
  console.log(
    'Add VITE_CONTENTFUL_SPACE_ID and VITE_CONTENTFUL_ACCESS_TOKEN (a Content Delivery API key,\n' +
      'not this management token) to your .env / Vercel project to have the live site read them.'
  );
}

main().catch((err) => {
  console.error('\nSeed script failed:', err.message || err);
  process.exit(1);
});
