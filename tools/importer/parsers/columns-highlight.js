/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-highlight variant.
 * Base block: columns-highlight
 * Source: sbc-hero-split-width-image-text with __cont-grey class
 * Full-width highlight section with background image + text content.
 *
 * Source structure:
 *   section.sbc-hero-split-width-image-text
 *     .row.sbc-hero-split-width-image-text__cont-grey
 *       .col-lg-6.sbc-hero-split-width-image-text__wrapper (may contain bg image)
 *       .col-lg-6.sbc-hero-split-width-image-text__wrapper
 *         .__wrapper__content
 *           h1.title
 *           p.subtitle (optional)
 *           .body-cont > ul/p
 *
 * Target table:
 *   | Columns Highlight | |
 *   | image | heading + text + list |
 */
export default function parse(element, { document }) {
  // Extract image - look for img or background-image
  let image = element.querySelector('.sbc-hero-split-width-image-text__wrapper img');

  if (!image) {
    const wrappers = element.querySelectorAll('.sbc-hero-split-width-image-text__wrapper');
    for (const wrapper of wrappers) {
      const computedBg = window.getComputedStyle(wrapper).backgroundImage;
      if (computedBg && computedBg !== 'none') {
        const bgMatch = computedBg.match(/url\(["']?([^"')]+)["']?\)/);
        if (bgMatch) {
          image = document.createElement('img');
          image.setAttribute('src', bgMatch[1]);
          break;
        }
      }
      const inlineStyle = wrapper.getAttribute('style') || '';
      const inlineMatch = inlineStyle.match(/background-image\s*:\s*url\(['"]?([^'")\s]+)['"]?\)/);
      if (inlineMatch) {
        image = document.createElement('img');
        image.setAttribute('src', inlineMatch[1]);
        break;
      }
    }
  }

  // Extract heading
  const heading = element.querySelector('h1.title')
    || element.querySelector('.sbc-hero-split-width-image-text__wrapper__content h1')
    || element.querySelector('h1, h2');

  // Extract subtitle
  const subtitle = element.querySelector('p.subtitle');

  // Extract body content (paragraphs and lists)
  const bodyContent = element.querySelector('.body-cont')
    || element.querySelector('.sbc-hero-split-width-image-text__wrapper__content');

  const bodyElements = [];
  if (bodyContent) {
    const children = bodyContent.querySelectorAll(':scope > p, :scope > ul, :scope > ol');
    children.forEach((child) => {
      if (child !== subtitle && child.textContent.trim()) {
        bodyElements.push(child);
      }
    });
  }

  // Build image cell
  const imageCell = [];
  if (image) {
    const pictureEl = image.closest('picture');
    imageCell.push(pictureEl || image);
  }

  // Build text cell
  const textContainer = document.createElement('div');
  if (heading) textContainer.append(heading);
  if (subtitle) textContainer.append(subtitle);
  bodyElements.forEach((el) => textContainer.append(el));

  const textCell = textContainer.childNodes.length > 0 ? [textContainer] : [];

  const cells = [];
  cells.push([imageCell, textCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'Columns Highlight', cells });
  element.replaceWith(block);
}
