/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: kaufmanrossin sections.
 * Inserts section breaks (<hr>) and Section Metadata blocks based on template sections.
 * All selectors from page-templates.json, verified against migration-work/cleaned.html.
 *
 * Template sections (12 total):
 *   1. Hero - #sbc-hero-split-width-image-text-block_538d4b9b64675f64c35740adabaa8ab1
 *   2. Why Us Introduction - #sbc-kaufman-body-copy-articles-block_146f3ec5c4bf4291d3a11546eb8da1a0
 *   3. Tailored Solutions - #sbc-body-copy-with-featured-image-video-block_33bfa22fcc6816821f2f07b7824dec4c
 *   4. Ensuring Alignment - #sbc-kaufman-body-copy-articles-block_f757db2ffe11bb0078c4310d5faf0cd5
 *   5. Quote Callout - #sbc-content-callout-quote-block_147cc7afdd1ea7a47666a761eaeef80c (style: dark-blue)
 *   6. Lifestyle Services - #sbc-kaufman-body-copy-articles-block_97475a04eea00bb7f02200431f7b4f1c
 *   7. Role of Wealth Managers - #sbc-hero-split-width-image-text-block_722e66724c051fc1c8e105e5b4e3efc0
 *   8. Tailored Services for HNW - #sbc-kaufman-body-copy-articles-block_bc003a3acc16e7f2c04efdb371a8498f
 *   9. Stats Callout - #sbc-stats-callout-block_544f9a1a22bcbca243d5394c6475f91c (style: green)
 *  10. Fraud Prevention - #sbc-kaufman-body-copy-articles-block_236af04f8b48d0febb10cf35fb213642
 *  11. Key Contacts - #sbc-kaufman-related-professionals-block_cda90b0925e62d874c5cbb355eedf365
 *  12. Latest Insights - #sbc-kaufman-related-content-for-services-block_be31bb6131fb24bbcd3e46475f3b2bb4
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document };
    const sections = payload && payload.template && payload.template.sections;
    if (!sections || sections.length < 2) return;

    // Process sections in reverse order to avoid position shifts
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const sectionEl = element.querySelector(section.selector);
      if (!sectionEl) continue;

      // Add Section Metadata block after the section element if it has a style
      if (section.style) {
        const sectionMetadata = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.after(sectionMetadata);
      }

      // Insert <hr> before the section element (except the first section)
      if (i > 0) {
        const hr = document.createElement('hr');
        sectionEl.before(hr);
      }
    }
  }
}
