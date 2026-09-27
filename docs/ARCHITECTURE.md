# GURUVERSE Architecture

## Design contract

GURUVERSE is a personal engineering portfolio with an optional spatial exploration layer. The portfolio must remain understandable without JavaScript, animation, GURU-BOT, Mission Control, or visual effects.

### Experience hierarchy
1. Person — identity, direction and contact.
2. Evidence — projects, research, experience and writing.
3. Understanding — architecture, workflow, technologies and limitations.
4. Exploration — GURU-BOT, Mission Control and project worlds.
5. Atmosphere — optional motion and spatial effects.

No lower layer may block a higher layer.

## System layers

### Identity
Structured profile data drives the home, about, experience, resume and contact surfaces.

### Content
Astro content collections and typed data are the source of truth for projects and writing.

### Knowledge
src/data/guruKnowledge.ts provides grounded project intelligence. GURU-BOT must not imply live AI, live telemetry, production status or capabilities that are not represented in this data.

### Experience
Interactive components are progressive enhancements:
- Mission Control is an optional command palette.
- ProjectWorld explains a project's architecture.
- GURU-BOT is collapsed by default.
- Spatial/ambient effects are optional and must respect reduced-motion preferences.

### Delivery
Astro builds a static site and GitHub Actions publishes the generated dist/ directory to GitHub Pages.

## Security model

The site is intentionally static.
- No secrets are shipped to the browser.
- No API keys are embedded in client code.
- No authentication/session system is required for the public portfolio.
- User input is not treated as trusted HTML.
- External origins should be explicit and minimized.
- target=_blank links must use rel=noopener noreferrer.
- Client-side storage is limited to non-sensitive preferences such as theme.
- Security-sensitive features belong in a future backend, not in the static portfolio.
- Build verification checks for forbidden package registries and unsafe runtime patterns.

OWASP recommends CSP and security response headers as defense-in-depth controls. GitHub Pages does not provide application-controlled response headers from Astro, so the repository treats browser-side CSP metadata, dependency hygiene, static delivery, and build-time checks as complementary controls rather than claiming server-side headers that are not actually enforceable here.

## Accessibility contract

Target WCAG 2.2 AA as the baseline:
- visible keyboard focus
- sufficient target sizes
- semantic headings and landmarks
- reduced motion
- usable mobile navigation
- no interaction required to access primary content

## UX contract

The visitor should understand within seconds:
- who this is
- what he works on
- what he has built
- how to inspect evidence
- how to contact him

The universe is the second layer, not the homepage obstacle.
