/* eslint-disable */
/* global WebImporter */

/**
 * Parser for carousel block.
 * Handles two source patterns:
 *   1. Related Professionals (slick carousel with photo + name/role/link)
 *   2. Related Content/Insights (article grid with image + title/date/link)
 *
 * Target table structure (vanilla carousel):
 *   | Carousel |  |
 *   | image | content |   <- slide 1
 *   | image | content |   <- slide 2
 *   ...
 *
 * Each row = one slide. Column 0 = image, Column 1 = text content.
 * The section heading ("Key Contacts", "Latest Insights") is output
 * as default content BEFORE the block table.
 */
export default function parse(element, { document }) {
  // This parser handles Related Professionals only (carousel of team members)
  const isRelatedProfessionals = element.querySelector('[class*="related-professionals"]') !== null;

  const cells = [];

  // Extract section heading and output before the block
  const sectionHeading = element.querySelector('h2.sbc-block-title, h2[class*="title"]')
    || element.querySelector('h2');
  let headingElement = null;
  if (sectionHeading) {
    headingElement = document.createElement('h2');
    headingElement.textContent = sectionHeading.textContent.trim();
  }

  if (isRelatedProfessionals) {
    // Pattern 1: Related Professionals
    // Multiple responsive carousel containers exist (lg, md, sm, xs) - use only the first one
    const firstPicCarousel = element.querySelector('.sbc-kaufman-related-professionals__pictures-carousel');
    const firstDetailCarousel = element.querySelector('.sbc-kaufman-related-professionals__details-carousel');

    if (firstPicCarousel && firstDetailCarousel) {
      const pictureSlides = firstPicCarousel.querySelectorAll(
        ':scope > .slick-list .slick-slide:not(.slick-cloned)'
      );
      const detailSlides = firstDetailCarousel.querySelectorAll(
        ':scope > .slick-list .slick-slide:not(.slick-cloned)'
      );

      // Deduplicate by alt text
      const seen = new Set();
      pictureSlides.forEach((picSlide, idx) => {
        const img = picSlide.querySelector('img');
        if (!img) return;
        const alt = img.getAttribute('alt') || '';
        if (seen.has(alt)) return;
        seen.add(alt);

        const detail = detailSlides[idx];

        const imageCell = [];
        const picture = img.closest('picture');
        imageCell.push(picture || img);

        const contentCell = [];
        if (detail) {
          const container = document.createElement('div');

          const nameEl = detail.querySelector('[class*="__item__title"]');
          const roleEl = detail.querySelector('[class*="__item__type"]');
          const linkEl = detail.querySelector('a[href*="/professionals/"]');

          if (nameEl) {
            const p = document.createElement('p');
            const strong = document.createElement('strong');
            strong.textContent = nameEl.textContent.trim();
            p.append(strong);
            container.append(p);
          }
          if (roleEl) {
            const p = document.createElement('p');
            p.textContent = roleEl.textContent.trim();
            container.append(p);
          }
          if (linkEl) {
            const p = document.createElement('p');
            const a = document.createElement('a');
            a.href = linkEl.href;
            a.textContent = 'View Profile';
            p.append(a);
            container.append(p);
          }
          contentCell.push(container);
        }

        cells.push([imageCell, contentCell]);
      });
    }
  }

  // Build the block
  const block = WebImporter.Blocks.createBlock(document, { name: 'Carousel', cells });

  // Insert heading before the block as default content
  const wrapper = document.createElement('div');
  if (headingElement) {
    wrapper.append(headingElement);
  }
  wrapper.append(block);

  element.replaceWith(wrapper);
}
