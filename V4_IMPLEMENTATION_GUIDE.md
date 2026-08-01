# V4 Implementation Guide

## Design objective

Create the immersive quality of a modern interactive portfolio while keeping
the experience original and grounded in Guru Charan's identity.

The design does not use the reference portfolio's avatar, page arrangement,
assets, text, colours or exact animation patterns. Its central metaphor is a
Security Intelligence Core that connects SOC evidence, AI reasoning and human
review.

## Homepage sequence

1. Portfolio-system introduction
2. Security Intelligence hero
3. Four operating principles
4. Personal career journey log
5. Interactive professional focus system
6. Flagship project sequence
7. CyberGPT architecture explorer
8. Current study, work and research state
9. Live Google Drive journal
10. Contact portal

## Performance decisions

- No new 3D or animation dependency was added.
- The hero visual uses a lightweight Canvas 2D network.
- Rendering pauses when the hero leaves the viewport.
- Device pixel ratio is capped.
- Pointer animation is disabled when reduced motion is requested.
- Horizontal projects use native scroll snapping.
- All critical content remains visible without the canvas.

## Future demo integration

Every project Markdown file already accepts:

```yaml
repositoryUrl: https://github.com/...
demoUrl: https://...
reportUrl: https://...
```

Add these URLs when each demo is ready. No homepage redesign is required.

## Deployment test

```bash
npm ci
npm run verify
npm run build
```

Then push the upgrade branch and confirm both GitHub Actions jobs are green.
