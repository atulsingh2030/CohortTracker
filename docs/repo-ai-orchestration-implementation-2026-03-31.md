# Repo AI Orchestration Implementation

## Structural Thought Process

- The product should not behave like a README formatter. It should behave like an orchestrated repo interpretation engine.
- The first layer should stay grounded in repository facts: metadata, languages, README, quickstart, and proof signals.
- The second layer should add meaning: what the repo is, whose lives or work improve, how it matters, and what future implications it carries.
- The third layer should turn that meaning into launch-page copy: hero title, tagline, body copy, problem, solution, and audience framing.
- The fourth layer should turn the copy and audience understanding into a design brief that can drive a visual system or an external design generator.
- The fifth layer should render and publish a final preview while exposing progress to the end user.

## Improvements Over GitMe

- GitMe's optional OpenAI path focused on README enhancement and static structured marketing fields.
- The new flow separates repo understanding, storytelling, and design prompting into distinct phases.
- The new intelligence packet explicitly models beneficiaries, real-world impact, and future implications.
- The new renderer can accept a Stitch-compatible provider contract while preserving a built-in HTML fallback.
- The entire generation process is asynchronous and phase-based so the user can see progress instead of waiting on a single blocking request.

## Implementation Plan

1. Preserve the current deterministic parser so the product still works without AI.
2. Add an AI interpretation layer that enriches the repo with meaning, audience profiles, copy, and a design prompt.
3. Add a design-engine abstraction so external rendering providers can be swapped in safely.
4. Add a background job model with persistent phase tracking.
5. Update the homepage to show a visible generation timeline.
6. Render the final output as a rich HTML page when available, with the structured React fallback still available.
7. Validate with tests, build checks, and an API smoke test against a real public repository.

## Implemented Architecture

- `server/lib/intelligence.mjs`
  - Generates a repository intelligence packet.
  - Uses OpenAI when `OPENAI_API_KEY` is present.
  - Falls back to deterministic reasoning when AI is unavailable or fails.
- `server/lib/design-engine.mjs`
  - Accepts the repo intelligence and page payload.
  - Supports a Stitch-compatible HTTP provider seam.
  - Falls back to a built-in HTML renderer with curated visual themes.
- `server/lib/orchestrator.mjs`
  - Runs the generation job through explicit phases.
  - Persists job state and preview metadata.
- `server/lib/storage.mjs`
  - Stores generated pages and generation jobs in file-backed JSON.
- `src/pages/Frontend.tsx`
  - Starts jobs and displays a live generation timeline.
- `src/pages/LaunchPage.tsx`
  - Renders the generated standalone HTML output when present.

## Generation Phases

1. Fetch repo
2. Understand repo
3. Write story
4. Craft design prompt
5. Render page
6. Publish preview

## Current Provider Reality

- There is no official public Google Stitch API wired directly in this codebase today.
- The implementation therefore ships a provider seam named `stitch-http` so an external Stitch-compatible endpoint can be connected later.
- Until then, the built-in local HTML renderer serves as the production-safe fallback.

## Environment Controls

- `OPENAI_API_KEY`
  - Enables the repo-intelligence AI layer.
- `OPENAI_MODEL`
  - Optional model override for the intelligence pass.
- `REPO_PAGE_DESIGN_PROVIDER`
  - `local-html` by default.
  - Set to `stitch-http` to call a Stitch-compatible renderer endpoint.
- `GOOGLE_STITCH_API_URL`
  - Required when `REPO_PAGE_DESIGN_PROVIDER=stitch-http`.
- `GOOGLE_STITCH_API_KEY`
  - Optional bearer token for the external renderer endpoint.

## Validation

- `npm test`
- `npm run build`
- `npm audit --omit=dev`
- Async API smoke test against `https://github.com/vercel/swr`
