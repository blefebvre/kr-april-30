/* eslint-disable */
/* global WebImporter */

/**
 * Parser for carousel-contacts variant.
 * Source: Related Professionals (slick carousel with photo + details)
 *
 * Target table structure:
 *   | Carousel Contacts |  |
 *   | image | name + title + location + bio + link |   <- slide 1
 *   | image | name + title + location + bio + link |   <- slide 2
 *
 * Each row = one slide. Column 0 = image, Column 1 = full details.
 * The section heading ("Key Contacts") is output as default content before the block.
 */
export default function parse(element, { document }) {
  const cells = [];

  const sectionHeading = element.querySelector('h2.sbc-block-title, h2[class*="title"]')
    || element.querySelector('h2');
  let headingElement = null;
  if (sectionHeading) {
    headingElement = document.createElement('h2');
    headingElement.textContent = sectionHeading.textContent.trim();
  }

  const firstPicCarousel = element.querySelector('.sbc-kaufman-related-professionals__pictures-carousel');
  const firstDetailCarousel = element.querySelector('.sbc-kaufman-related-professionals__details-carousel');

  if (firstPicCarousel && firstDetailCarousel) {
    const pictureSlides = firstPicCarousel.querySelectorAll(
      ':scope > .slick-list .slick-slide:not(.slick-cloned)'
    );
    const detailSlides = firstDetailCarousel.querySelectorAll(
      ':scope > .slick-list .slick-slide:not(.slick-cloned)'
    );

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
        const metaEl = detail.querySelector('.professional_meta');
        const locationEl = metaEl ? metaEl.querySelector('p') : null;
        const bioEl = detail.querySelectorAll(':scope > p');
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
        if (locationEl) {
          const p = document.createElement('p');
          p.textContent = locationEl.textContent.trim();
          container.append(p);
        }
        // Bio - find the paragraph that starts with "showing:"
        bioEl.forEach((para) => {
          const text = para.textContent.trim();
          if (text.startsWith('showing:')) {
            const p = document.createElement('p');
            p.textContent = text.replace(/^showing:\s*/, '');
            container.append(p);
          }
        });
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

  const block = WebImporter.Blocks.createBlock(document, { name: 'Carousel Contacts', cells });

  const wrapper = document.createElement('div');
  if (headingElement) {
    wrapper.append(headingElement);
  }
  wrapper.append(block);

  element.replaceWith(wrapper);
}
