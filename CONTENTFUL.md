# Connecting the Journal to Contentful

The Journal (`/blog`) now reads posts from Contentful instead of static code.
Follow these steps once to wire it up.

## 1. Get your Contentful keys

In the Contentful web app, on the space you want to use:

- **Space ID** — Settings → General settings.
- **Content Management token** — Settings → API keys → Content management
  tokens → "Generate personal token". Full read/write access — used only by
  the local seed script, never shipped to the browser.
- **Content Delivery API token** — Settings → API keys → Add API key (or use
  the default one Contentful creates for new spaces). Read-only — this is
  the one the live site uses, safe to expose in the client bundle.

## 2. Seed the content model + starter posts

Run this **locally**, never in CI, never committed:

```bash
CONTENTFUL_SPACE_ID=xxxx \
CONTENTFUL_MANAGEMENT_TOKEN=xxxx \
CONTENTFUL_ENVIRONMENT=master \
node scripts/seed-contentful.mjs
```

This creates a `Blog Post` content type (`blogPost`) with these fields:

| Field         | Type              | Notes                              |
|---------------|-------------------|-------------------------------------|
| `title`       | Symbol            | required                            |
| `slug`        | Symbol            | required, unique                    |
| `category`    | Symbol            | required, `Gaming` or `AI`          |
| `publishDate` | Date              | required                            |
| `readTime`    | Symbol            | required, e.g. `"5 min read"`       |
| `excerpt`     | Text              | required, shown on the card         |
| `author`      | Symbol            | optional, defaults to Chalet Hub Studio |
| `coverImage`  | Asset link        | optional                            |
| `body`        | Rich text         | required, the full post             |

...then publishes the 6 starter posts (3 Gaming, 3 AI) into it. Safe to
re-run — it updates existing entries by slug rather than duplicating them.

## 3. Point the site at Contentful

Add these to a local `.env` (already gitignored) for development, and to
your Vercel project's environment variables for production:

```
VITE_CONTENTFUL_SPACE_ID=xxxx
VITE_CONTENTFUL_ACCESS_TOKEN=xxxx   # the Content Delivery token, not the management one
VITE_CONTENTFUL_ENVIRONMENT=master
```

Without these set, the Journal shows a friendly "Contentful isn't connected
yet" message instead of erroring.

## 4. Adding new posts going forward

In Contentful: Content → Add entry → Blog Post. Fill in the fields, publish.
It'll appear on `/blog` on next page load — no deploy needed. `slug` becomes
the URL (`/blog/your-slug`), so keep it short and URL-friendly.
