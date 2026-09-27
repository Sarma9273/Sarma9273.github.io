# GURUVERSE Architecture

## System boundary

GURUVERSE is a static Astro site deployed to GitHub Pages. The public site must remain useful without a backend, authentication, client-side application state, or external API.

```
Content + Data
      |
      v
Astro pages/layouts
      |
      +--> Feature modules
      |      - navigation
      |      - projects
      |      - architecture
      |
      +--> Shared UI
      |      - typography / icons / footer / actions
      |
      +--> Progressive enhancement
             - filtering
             - theme
             - motion
             - optional integrations
      |
      v
Static dist/
      |
      v
GitHub Pages
```

## Five layers

1. **Identity** — person, direction, experience, education, contact.
2. **Content** — projects, articles and profile data with one canonical source per concern.
3. **Knowledge** — structured engineering knowledge that explains problem, solution, architecture, workflow, evidence and limitations.
4. **Experience** — progressive project exploration, architecture views and optional universe modules.
5. **Delivery** — static generation, verification, accessibility, SEO and GitHub Pages deployment.

A lower layer must never be required for the higher layer to communicate its core information.

## Source-of-truth rules

- Project case studies live in `src/content/projects/`.
- Articles live in `src/content/blogs/`.
- Cross-project knowledge used by future GURU-BOT and exploration features lives in `src/data/guruKnowledge.ts`.
- Identity and navigation live in `src/data/profile.ts` and `src/data/site.ts`.
- Architecture metadata lives in `src/data/architecture.ts`.
- External integration configuration is isolated in `src/data/integrations.ts`.

## Feature boundary

```
src/features/
  navigation/     Site navigation
  projects/       Project discovery and project worlds
  architecture/   Architecture presentation

src/components/   Reusable presentation primitives and optional experience modules
src/layouts/      Page contracts and global delivery shell
src/pages/        Route composition only
src/data/         Canonical structured data
src/content/      Markdown content collections
```

Pages compose features; they should not duplicate feature implementation.

## Progressive enhancement

Core content is server-rendered by Astro. JavaScript is used only where it improves interaction:

- mobile navigation
- theme preference
- scroll/reveal behaviour
- project filtering
- table-of-contents generation
- optional live Drive content

If optional JavaScript or an external integration fails, the underlying page remains readable.

## Exploration modules

`AmbientSpace`, `GalaxyEngine`, `MissionControl`, `UniverseCore` and `GuruBot` are optional experience modules. They are not global dependencies of the portfolio shell.

GURU-BOT is a future knowledge navigator. It must consume canonical project knowledge rather than inventing project claims.

## Security model

- No secrets are stored in the Astro source.
- User-controlled values rendered by client integrations are inserted with DOM text APIs rather than trusted HTML.
- External links use explicit destinations and safe opener behaviour.
- GitHub Pages does not provide application-controlled response headers; the project therefore does not claim server-enforced CSP/HSTS/etc.
- Contact and live-content integrations are optional external services and must fail closed to the static experience.

## Accessibility contract

- Semantic landmarks and heading hierarchy.
- Skip navigation.
- Visible keyboard focus.
- Keyboard-accessible controls.
- Reduced-motion support.
- Mobile navigation that works without hover.
- Primary content does not depend on animation.

## Performance contract

- Astro static generation is the default.
- Heavy spatial modules are opt-in.
- Images use Astro asset processing where appropriate.
- Client scripts are small, local and feature-scoped.
- No global client framework is required for ordinary content pages.

## Deployment

GitHub Actions runs repository verification, dependency installation, Astro validation/build, and deploys `dist/` through GitHub Pages.

The release is considered complete only when the current `main` commit passes the deployment workflow.
