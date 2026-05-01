/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-featured variant.
 * Source: __featured__box items with background-image and onclick links.
 * Two large hero-style cards at the top of the Latest Insights section.
 *
 * Target table:
 *   | Cards Featured |
 *   | image | title + category |   <- card 1
 *   | image | title + category |   <- card 2
 */
export default function parse(element, { document }) {
  // Extract section heading and output before the block
  const sectionHeading = element.querySelector('h2');
  let headingElement = null;
  if (sectionHeading) {
    headingElement = document.createElement('h2');
    headingElement.textContent = sectionHeading.textContent.trim();
  }

  const cells = [];

  const featuredBoxes = element.querySelectorAll('[class*="__featured__box"]');
  featuredBoxes.forEach((box) => {
    const onclick = box.getAttribute('onclick') || '';
    const hrefMatch = onclick.match(/location\.href='([^']+)'/);
    if (!hrefMatch) return;
    const href = hrefMatch[1];

    const imageDiv = box.querySelector('[class*="__featured__box__image"]');
    const title = box.querySelector('[class*="__featured__box__title"]');
    const type = box.querySelector('[class*="__featured__box__type"]');

    const imageCell = [];
    if (imageDiv) {
      const style = imageDiv.getAttribute('style') || '';
      const bgMatch = style.match(/background-image\s*:\s*url\(['"]?([^'")\s]+)['"]?\)/);
      if (bgMatch) {
        const img = document.createElement('img');
        img.setAttribute('src', bgMatch[1]);
        imageCell.push(img);
      }
    }

    const contentCell = [];
    const container = document.createElement('div');

    if (title) {
      const p = document.createElement('p');
      const strong = document.createElement('strong');
      const a = document.createElement('a');
      a.href = href;
      a.textContent = title.textContent.trim();
      strong.append(a);
      p.append(strong);
      container.append(p);
    }
    if (type) {
      const p = document.createElement('p');
      p.textContent = type.textContent.trim();
      container.append(p);
    }

    contentCell.push(container);
    cells.push([imageCell, contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'Cards Featured', cells });

  const wrapper = document.createElement('div');
  if (headingElement) {
    wrapper.append(headingElement);
  }
  wrapper.append(block);

  element.replaceWith(wrapper);
}
