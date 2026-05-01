see @AGENTS.md

## Project-Specific Guidance

### Migration Source
- Source site: https://kaufmanrossin.com/services/family-office-services/
- Fonts: museo-slab (headings) and museo-sans (body) — Adobe Fonts, not redistributable. Using Roboto Slab + Roboto as Google Fonts substitutes.

### Block Variant Decisions
When creating block variants, always ask: "Does this content render differently enough from the vanilla block to need its own CSS?" If the answer is yes, create a variant. Don't use generic block names (hero, columns, cards) when the visual treatment is distinct — the whole point of variants is targeted styling.

Specific patterns on this site:
- Split-width hero with image/text 50-50 → `hero-split` (not default `hero`)
- Two-column image+text with green divider → `columns-featured` (not generic `columns`)
- Full-width highlight with bg image + text → `columns-highlight`
- Professional headshots carousel → `carousel`
- Featured article hero cards with bg images → `cards-featured`
- Article list grid → `cards-insights`

### Design Details Easily Missed
When styling blocks, ALWAYS screenshot the original first and compare pixel-by-pixel. Details commonly missed:
- Background colors on sections/panels (e.g., #F4F4F4 grey on hero-split text side)
- Subtle accent borders/dividers (e.g., 4px green #AED136 border between hero image and text)
- Green vertical divider lines between columns
- Split-color layouts (stats block: green bg left, navy bg right)
- Quote block needs its own navy background (not relying on section metadata)
- The `buildHeroBlock` auto-blocking in scripts.js must check for `.hero-split` to avoid duplicate hero creation

### Brand Colors
- Navy dark: #003b6a (headings h3+, quote bg, stats bg)
- Navy medium: #1d4c7e (h1/h2 color)
- Accent green: #aed136 (borders, quote marks, stats number)
- Light grey: #f4f4f4 (section backgrounds)
- Body text: #3c3c3c

### Local Preview
- Content at `content/services/family-office-services.plain.html`
- Dev server: `npx @adobe/aem-cli up --no-open --port 3000`
- Page renders at: http://localhost:3000/services/family-office-services
- Header/footer 404 errors are expected (no nav.html/footer.html yet)
- Use viewport 1440x900 for desktop comparison