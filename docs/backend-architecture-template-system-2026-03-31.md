# Backend Architecture: Template System

## 1. Scope

Add a real template architecture so the current generated page becomes `template-1`, future templates can swap only the front-end shell, and older generated pages remain stable as the shared data contract grows.

The architecture must also keep template design effectively unconstrained: contributors can bring their own website design, visual system, and section flow, while the backend preserves only semantic context compatibility and required attribution rules.

## 2. Current System Fit

- Repo generation already has shared stages:
  - fetch repo
  - understand repo
  - write story
  - craft design prompt
  - render page
  - publish preview
- The missing abstraction was between page generation and HTML rendering.
- The system previously assumed one implicit template.

## 3. Proposed Components and Responsibilities

- `server/lib/templates/registry.mjs`
  - source of truth for templates
  - ids, versions, context versions, contribution links, prompt suggestions, attribution rules, featured sample metadata
- `server/lib/templates/constants.mjs`
  - shared constants for contribution URLs, GitMe acknowledgement, and maintainer attribution
- `server/lib/templates/definitions/<template-id>/template.mjs`
  - one metadata file per template
  - declares design freedom, attribution requirements, and contributor prompt guidance
- `server/lib/templates/definitions/index.mjs`
  - explicit registry input for all shipped template definitions
- `server/lib/templates/context.mjs`
  - stable template context builder
  - maps generated page data into future-safe sections and slots
- `server/lib/templates/platform-shell.mjs`
  - platform-owned universal layer around contributor templates
  - carries global repo additions, attribution, and compatibility messaging
- `server/lib/design-engine.mjs`
  - template selector plus provider adapter
  - renders the chosen template from the stable context
- generated page payload
  - now stores `template` metadata
- generation jobs
  - now store `templateId`
- `/api/templates`
  - backend-driven template catalog for the homepage
- page read path
  - enriches generated pages with `platformShell` so universal additions can ship without mutating template bodies

## 4. API Contract

### `GET /api/templates`

Returns:

```json
{
  "templates": [
    {
      "id": "template-1",
      "label": "Template 1",
      "version": 1,
      "contextVersion": 1,
      "description": "string",
      "status": "live",
      "default": true,
      "repositoryUrl": "string",
      "contributionsUrl": "string",
      "designFreedom": "unbounded",
      "designGuidance": "string",
      "promptSuggestion": "string",
      "requiredAttribution": {
        "linkedIn": {
          "label": "string",
          "url": "string",
          "required": true
        },
        "gitme": {
          "label": "string",
          "url": "string",
          "required": true
        }
      },
      "featuredSample": {
        "slug": "string",
        "previewUrl": "string",
        "repoUrl": "string",
        "repoName": "string",
        "title": "string"
      }
    }
  ]
}
```

### `POST /api/pages/generate`

New optional field:

```json
{
  "repoUrl": "https://github.com/owner/repo",
  "templateId": "template-1"
}
```

### `POST /api/pages/preview`

Same optional `templateId`.

## 5. Data Model and Migration Plan

Generated page additions:

- `template.id`
- `template.label`
- `template.version`
- `template.contextVersion`
- `template.description`
- `template.status`
- `template.supportedContextRange`
- `template.updatePolicy`
- response-only `platformShell`

Generation job additions:

- `templateId`

Migration strategy:

- old pages remain readable
- pages without template metadata are treated as legacy
- new generations default to `template-1`

## 6. Background Jobs and Integrations

- No new job type required
- the existing generation job now carries template choice
- the renderer stays pluggable for future Stitch-compatible providers

## 7. Security and Permission Model

- public read-only template metadata only
- no auth change required
- contribution links are static outbound links only
- required attribution rules are metadata-driven and can be validated at template registration time

## 8. Observability and Alerting

Track in generated page payload and job state:

- `template.id`
- `template.version`
- `template.contextVersion`
- renderer provider and status
- `platformShell.compatibility.status`

This makes template-specific rendering failures attributable later.

## 9. Failure Modes and Recovery

- unknown template id:
  - fallback to default template
- missing featured sample page:
  - homepage still shows template metadata without preview link
- future backend field additions:
  - templates read from stable context and ignore unknown raw fields
- universal additions across all templates:
  - deliver them in the platform shell first so the product can evolve without silently rewriting contributor-authored template bodies
- overly prescriptive template rules:
  - avoid them by keeping layout guidance advisory and limiting hard product rules to attribution only

## 10. Rollout and Rollback Plan

Rollout:

1. register `template-1`
2. store template metadata on new pages
3. expose `/api/templates`
4. update homepage to showcase template catalog
5. add contribution doc

Rollback:

- the default template remains `template-1`
- if template routing breaks, renderer can hard-fallback to the default definition without changing generated data

## 11. Open Risks and Decisions

- future templates will need their own visual QA pass, not just schema compatibility
- homepage preview quality will be better once template thumbnails or preview snapshots are added
- the current sample catalog is still file-backed; a real database can replace that later without changing the template contract
- Supratik's exact LinkedIn URL should be confirmed and set in `server/lib/templates/constants.mjs` before relying on automatic attribution metadata in production
- when a true breaking template-context change happens, keep it versioned and ask maintainers to migrate rather than back-editing their templates automatically
