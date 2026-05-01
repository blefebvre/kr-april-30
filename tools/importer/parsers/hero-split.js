/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-split variant.
 * Base block: hero-split
 * Source: https://kaufmanrossin.com/services/family-office-services/
 * Generated: 2026-05-01
 *
 * Source structure:
 *   section.sbc-hero-split-width-image-text
 *     .col-lg-6 > .sbc-hero-split-width-image-text__wrapper > img
 *     .col-lg-6 > .sbc-hero-split-width-image-text__wrapper__content
 *       h1.title
 *       p.subtitle
 *       .body-cont > p (multiple)
 *
 * Target table (from block library):
 *   Row 1: image
 *   Row 2: heading + text content
 */
export default function parse(element, { document }) {
  // Extract image - try multiple strategies:
  // 1. img inside the specific hero wrapper
  // 2. picture > img
  // 3. any img element
  // 4. img with data-src (lazy-loaded)
  // 5. background-image on the wrapper div
  let image = element.querySelector('.sbc-hero-split-width-image-text__wrapper img')
    || element.querySelector('picture img')
    || element.querySelector('img');

  // Handle lazy-loaded images that may only have data-src
  if (!image) {
    const lazyImg = element.querySelector('img[data-src], img[data-lazy-src]');
    if (lazyImg) {
      const src = lazyImg.getAttribute('data-src') || lazyImg.getAttribute('data-lazy-src');
      if (src) {
        lazyImg.setAttribute('src', src);
        image = lazyImg;
      }
    }
  }

  // Handle background-image on wrapper divs (may be applied via CSS, not inline style)
  if (!image) {
    // Check the specific hero image wrapper first, then any div with a background-image
    const candidates = [
      element.querySelector('.sbc-hero-split-width-image-text__wrapper'),
      element.querySelector('[class*="hero"][class*="image"]'),
      element.querySelector('[style*="background-image"]'),
    ].filter(Boolean);

    for (const candidate of candidates) {
      // Check computed style (covers CSS-applied background images)
      const computedBg = window.getComputedStyle(candidate).backgroundImage;
      if (computedBg && computedBg !== 'none') {
        const bgMatch = computedBg.match(/url\(["']?([^"')]+)["']?\)/);
        if (bgMatch) {
          image = document.createElement('img');
          image.setAttribute('src', bgMatch[1]);
          break;
        }
      }
      // Also check inline style as fallback
      const inlineStyle = candidate.getAttribute('style') || '';
      const inlineMatch = inlineStyle.match(/background-image\s*:\s*url\(['"]?([^'")\s]+)['"]?\)/);
      if (inlineMatch) {
        image = document.createElement('img');
        image.setAttribute('src', inlineMatch[1]);
        break;
      }
    }
  }

  // Extract heading (h1.title verified in source; fallback to any h1/h2)
  const heading = element.querySelector('h1.title')
    || element.querySelector('h1, h2');

  // Extract subtitle (p.subtitle verified in source)
  const subtitle = element.querySelector('p.subtitle');

  // Extract body paragraphs from .body-cont
  const bodyParagraphs = Array.from(
    element.querySelectorAll('.body-cont p')
  );

  // Fallback: if no .body-cont paragraphs found, get paragraphs from the content wrapper
  // excluding the subtitle
  if (bodyParagraphs.length === 0) {
    const contentWrapper = element.querySelector('.sbc-hero-split-width-image-text__wrapper__content');
    if (contentWrapper) {
      const allParagraphs = Array.from(contentWrapper.querySelectorAll('p'));
      allParagraphs.forEach((p) => {
        if (p !== subtitle) {
          bodyParagraphs.push(p);
        }
      });
    }
  }

  // Also capture any CTA links that may appear in some hero variations
  const ctaLinks = Array.from(
    element.querySelectorAll('.sbc-hero-split-width-image-text__wrapper__content a.btn, .sbc-hero-split-width-image-text__wrapper__content a.button, .sbc-hero-split-width-image-text__wrapper__content a.cta')
  );

  // Build cells matching block library table structure:
  // Row 1: image (single cell)
  // Row 2: text content in ONE cell (heading + subtitle + body paragraphs)
  const cells = [];

  // Row 1: Image - wrap in a container div for a single cell
  if (image) {
    // If image is inside a picture element, use the picture element instead
    const pictureEl = image.closest('picture');
    cells.push([pictureEl || image]);
  }

  // Row 2: All text content wrapped in a single container div (one cell)
  const contentContainer = document.createElement('div');
  if (heading) contentContainer.append(heading);
  if (subtitle) {
    const p = document.createElement('p');
    const strong = document.createElement('strong');
    strong.textContent = subtitle.textContent;
    p.append(strong);
    contentContainer.append(p);
  }
  bodyParagraphs.forEach((p) => contentContainer.append(p));
  ctaLinks.forEach((a) => contentContainer.append(a));

  if (contentContainer.childNodes.length > 0) {
    cells.push([contentContainer]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'Hero Split', cells });
  element.replaceWith(block);
}
