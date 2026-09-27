# GURUVERSE Architecture

## Design contract

GURUVERSE is a personal engineering portfolio with an optional exploration layer. The portfolio must remain understandable without JavaScript, animation, assistants, or visual effects.

### Experience hierarchy

1. **Person** — identity, direction and contact.
2. **Evidence** — projects, research, experience and writing.
3. **Understanding** — architecture, workflow, technologies and limitations.
4. **Exploration** — optional interactive tools added when they improve discovery.
5. **Atmosphere** — optional motion and spatial effects.

No lower layer may block a higher layer.

## System layers

### Identity

Structured profile data drives the home, about, experience, resume and contact surfaces.

### Content

Astro content collections and typed data are the source of truth for projects and writing.

### Knowledge

Project architecture, workflow, evidence and limitations are stored as structured data. Future assistants can consume this layer, but the public release does not depend on an assistant being online.

### Experience

Interactive behavior is progressive enhancement:
- theme switching
- mobile navigation
- reveal-on-scroll
- restrained pointer interactions
- project architecture visualization

Richer spatial exploration can be introduced later without changing the content model.

### Delivery

Astro builds a static site and GitHub Actions publishes the generated `dist/` directory to GitHub Pages.

## Security model

The site is intentionally static.

- No secrets are shipped to the browser.
- No API keys are embedded in client code.
- No authentication/session system is required for the public portfolio.
- User input is not treated as trusted HTML.
- External origins should be explicit and minimized.
- `target="_blank"` links must use `rel="noopener noreferrer"`.
- Client-side storage is limited to non-sensitive preferences such as theme.
- Security-sensitive features belong in a future backend, not in the static portfolio.
- Build verification checks repository structure and forbidden package-registry references.

OWASP recommends CSP and security response headers as defense-in-depth controls. GitHub Pages does not provide application-controlled response headers from Astro, so the repository treats static delivery, dependency hygiene, browser-side controls and build-time checks as complementary controls rather than claiming server-side headers that are not actually enforceable here.

## Accessibility contract

Target WCAG 2.2 AA as the baseline:

- visible keyboard focus
- semantic headings and landmarks
- sufficient target sizes
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

The portfolio is the product. Experimental interaction is an extension.
