/**
 * Chalet Hub — Contentful content model + seed script for the Journal (blog).
 *
 * Aligned to the Chalet Hub Business & Architecture Vision (v2): the four
 * content pillars are Software Architecture, Cloud Architecture,
 * DevOps & Observability, and AI & Emerging Technology. The earlier
 * "Gaming" category has been retired — this script removes those old
 * entries and replaces them with on-pillar posts.
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
 * (or reuse and sync it if it already exists), create-or-update entries by
 * slug, publish everything, and retire any posts no longer in the pillar
 * lineup. Safe to re-run.
 */

import { createClient } from 'contentful-management';

const SPACE_ID = 'r66pueq4mhod';
const MANAGEMENT_TOKEN = 'CFPAT-cfSWsAksCgeUbAmklRW2Fh-NOzYHBdmEIkGu8r6pq9o';
const ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT || 'master';
const CONTENT_TYPE_ID = 'blogPost';

const CATEGORIES = [
  'Software Architecture',
  'Cloud Architecture',
  'DevOps & Observability',
  'AI & Emerging Technology',
];

// Slugs that used to exist under the retired "Gaming" category. Unpublished
// and deleted by this script if still present in the space.
const RETIRED_SLUGS = [
  'game-asset-pipelines-teach-software-architecture',
  'shipping-mvp-vs-shipping-a-game',
  'systems-design-behind-game-economies',
];

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  console.error(
    '\nMissing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN.\n' +
      'Set them as environment variables before running this script — see the header comment.\n'
  );
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Content — 6 posts across the 4 pillars
// ---------------------------------------------------------------------------

const posts = [
  {
    slug: 'adrs-habit-that-actually-sticks',
    title: 'Why Architecture Decision Records Are the Habit That Actually Sticks',
    category: 'Software Architecture',
    publishDate: '2026-07-15',
    readTime: '4 min read',
    author: 'Chalet Hub',
    excerpt:
      'Most teams don\u2019t lack architectural judgment \u2014 they lack a record of it. Six months later, nobody remembers why the decision was made, only that it was.',
    paragraphs: [
      'Most teams don\u2019t lack architectural judgment, they lack a record of it. Six months later, nobody remembers why Redis was chosen over an in-memory cache, or why a batch job runs nightly instead of streaming. The decision was fine \u2014 it\u2019s the memory of the decision that decayed.',
      'An ADR fixes this with almost embarrassingly little effort: what was decided, why, what was ruled out, and what it costs later if circumstances change. It\u2019s not a design document, it\u2019s a lab notebook. It\u2019s what lets a future developer object to your decision correctly, with the same context you had.',
      'The habit doesn\u2019t stick because ADRs are hard to write \u2014 it\u2019s because they get treated as optional documentation, done after the fact if time allows, which means never. The teams that actually keep them make it part of the pull request that introduces the change, not a separate ticket that quietly rots in a wiki nobody opens.',
      'The real value shows up the second time the question gets asked. Instead of relitigating the same decision from scratch, or worse, reversing it because nobody remembers the reasoning, the ADR just answers it. That\u2019s the whole return on investment: a two-minute read that saves a half-day argument.',
      'Start smaller than you think you need to. A title, a status, a decision, a short \u201cwhy,\u201d and what you considered and rejected. That\u2019s enough to be useful from the very first one you write.',
    ],
  },
  {
    slug: 'picking-aws-service-is-a-tradeoff-exercise',
    title: 'Picking an AWS Service Is a Trade-off Exercise, Not a Feature Checklist',
    category: 'Cloud Architecture',
    publishDate: '2026-07-29',
    readTime: '5 min read',
    author: 'Chalet Hub',
    excerpt:
      'Every AWS service is a bet on a specific set of trade-offs. The skill isn\u2019t knowing what each one does \u2014 it\u2019s knowing which trade-off your system can actually afford.',
    paragraphs: [
      'Ask "which AWS service should I use" and you\u2019ll get a feature comparison: Lambda vs. Fargate vs. EC2, DynamoDB vs. RDS vs. Aurora. What that comparison skips is the part that actually matters \u2014 every one of those services is a bet on a specific set of trade-offs, and the "right" one depends entirely on what you\u2019re willing to give up.',
      'Lambda buys you zero infrastructure management and pay-per-invocation pricing, at the cost of cold starts, execution time limits, and a debugging experience that\u2019s genuinely harder than SSH-ing into a box. That\u2019s not a downside to work around \u2014 it\u2019s the actual price of the service, worth paying only when the trade genuinely favors you.',
      'The same logic runs through data stores. DynamoDB gives you near-limitless horizontal scale and predictable latency, provided your access patterns are known upfront and your data model bends to fit them. RDS gives you the flexibility of SQL and ad-hoc queries, provided you\u2019re willing to own the scaling ceiling that comes with a single primary instance.',
      'Cost follows the same pattern and gets ignored the most. A service that\u2019s cheap at your current traffic can become the most expensive line on the bill at ten times the scale, and the direction of that curve is rarely obvious from the pricing page alone.',
      'The actual skill isn\u2019t knowing what each service does \u2014 the documentation covers that. It\u2019s knowing which trade-off your system can actually afford right now, and being honest that the answer might change in a year.',
    ],
  },
  {
    slug: 'metrics-logs-traces-one-question-three-ways',
    title: 'Metrics, Logs, and Traces Are One Question, Asked Three Ways',
    category: 'DevOps & Observability',
    publishDate: '2026-08-05',
    readTime: '5 min read',
    author: 'Chalet Hub',
    excerpt:
      'Teams treat metrics, logs, and traces as three separate tools. In practice they\u2019re answering the same question \u2014 "what is this system doing right now" \u2014 at three different resolutions.',
    paragraphs: [
      'Teams often treat metrics, logs, and traces as three separate tools to set up, with three separate dashboards and three separate mental models. In practice they\u2019re answering the same underlying question \u2014 "what is this system doing right now" \u2014 at three different resolutions.',
      'Metrics answer "is something wrong." A latency graph or an error-rate counter tells you the shape of a problem before you know its cause \u2014 that\u2019s their entire job, and asking them to do more than that is asking the wrong tool for detail it was never built to hold.',
      'Logs answer "what happened, in this specific case." They\u2019re the ground truth, timestamped and specific, but they don\u2019t scale as a first response \u2014 nobody should be grepping logs to discover that something is wrong; logs are for once you already suspect where to look.',
      'Traces answer "where, across every service this request touched." That\u2019s the layer most teams skip until a request crosses five services and the latency shows up on none of them individually, only in the sum \u2014 which is exactly the failure mode traces exist to catch.',
      'Federating metrics, logs, and traces into one dashboard is what turns "the site feels slow today" into a five-minute root cause instead of a half-day fishing expedition. That\u2019s the whole point of a unified observability platform \u2014 not three tools bolted together, but one question, answered at whatever resolution the moment calls for.',
    ],
  },
  {
    slug: 'ai-in-your-architecture-stack',
    title: 'Where AI Actually Belongs in Your Architecture Stack',
    category: 'AI & Emerging Technology',
    publishDate: '2026-06-24',
    readTime: '6 min read',
    author: 'Chalet Hub',
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
    slug: 'prompt-engineering-is-api-design',
    title: 'Prompt Engineering Is Just API Design With Extra Steps',
    category: 'AI & Emerging Technology',
    publishDate: '2026-05-28',
    readTime: '5 min read',
    author: 'Chalet Hub',
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
    slug: 'building-with-ai-agents-lessons',
    title: 'Building With AI Agents: What Shipping Real Tools Taught Us',
    category: 'AI & Emerging Technology',
    publishDate: '2026-04-30',
    readTime: '6 min read',
    author: 'Chalet Hub',
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
      categoryField.validations = [{ in: CATEGORIES }];
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
          validations: [{ in: CATEGORIES }],
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

async function retirePost(environment, slug) {
  const existing = await findEntryBySlug(environment, slug);
  if (!existing) return;

  try {
    if (existing.isPublished()) {
      await (await existing.unpublish()).delete();
    } else {
      await existing.delete();
    }
    console.log(`Retired entry: ${slug}`);
  } catch (err) {
    console.warn(`Could not retire "${slug}":`, err.message || err);
  }
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

  for (const slug of RETIRED_SLUGS) {
    await retirePost(environment, slug);
  }

  console.log(`\nDone. ${posts.length} posts are live across the 4 content pillars.`);
  console.log(
    'Add VITE_CONTENTFUL_SPACE_ID and VITE_CONTENTFUL_ACCESS_TOKEN (a Content Delivery API key,\n' +
      'not this management token) to your .env / Vercel project to have the live site read them.'
  );
}

main().catch((err) => {
  console.error('\nSeed script failed:', err.message || err);
  process.exit(1);
});
