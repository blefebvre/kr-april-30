/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-featured variant.
 * Base block: columns-featured
 * Source selectors:
 *   - #sbc-body-copy-with-featured-image-video-block_* (image + text layout)
 *   - #sbc-hero-split-width-image-text-block_* (text-only or text + image layout)
 * Generated: 2026-05-01T00:00:00Z
 *
 * Target structure (from library example):
 *   | Columns |  |
 *   | --- | --- |
 *   | ![Image](...) | **Heading** paragraph text |
 *
 * Single row with N cells = N columns.
 * Each column can contain images, text, headings, and links.
 *
 * Handles two source block types:
 * 1. sbc-body-copy-with-featured-image-video: has .sbc-block-title, .sbc-block-copy-text, image column
 * 2. sbc-hero-split-width-image-text: has h1.title, p.subtitle, .body-cont, optional image wrapper
 */
export default function parse(element, { document }) {
  // --- Extract image ---
  // Instance 1: image in __image-column > __image-wrapper > img
  // Instance 2: image in __wrapper > img (may be empty)
  // Use first img found in an image-related container; avoid duplicate mobile images
  const imageContainer = element.querySelector(
    '[class*="__image-column"] [class*="__image-wrapper"],'
    + ' [class*="__image-column"],'
    + ' .sbc-hero-split-width-image-text__wrapper'
  );
  const image = imageContainer
    ? imageContainer.querySelector('img')
    : null;

  // --- Extract heading ---
  // Instance 1: h2.sbc-block-title
  // Instance 2: h1.title
  const heading = element.querySelector(
    '.sbc-block-title,'
    + ' h1.title,'
    + ' [class*="__wrapper__content"] h1,'
    + ' [class*="__text-column"] h2,'
    + ' [class*="__text-column"] h1,'
    + ' h1, h2, h3'
  );

  // --- Extract subtitle (instance 2 has p.subtitle) ---
  const subtitle = element.querySelector(
    'p.subtitle,'
    + ' [class*="__wrapper__content"] > p.subtitle'
  );

  // --- Extract body copy ---
  // Instance 1: .sbc-block-copy-text (contains ul)
  // Instance 2: .body-cont (contains ul)
  const copyText = element.querySelector(
    '.sbc-block-copy-text,'
    + ' .body-cont,'
    + ' [class*="__text-wrapper"] .sbc-block-copy-text,'
    + ' [class*="__wrapper__content"] .body-cont'
  );

  // --- Extract CTA links if present ---
  const ctaLinks = Array.from(
    element.querySelectorAll(
      '[class*="__text-column"] a.sbc-btn,'
      + ' [class*="__text-column"] a.btn,'
      + ' [class*="__wrapper__content"] a.sbc-btn,'
      + ' [class*="__wrapper__content"] a.btn,'
      + ' [class*="text-column"] a[class*="btn"],'
      + ' [class*="__wrapper__content"] a[class*="btn"]'
    )
  );

  // --- Build image column cell ---
  const imageCell = [];
  if (image) {
    imageCell.push(image);
  }

  // --- Build text column cell ---
  const textCell = [];
  if (heading) {
    textCell.push(heading);
  }
  if (subtitle) {
    textCell.push(subtitle);
  }
  if (copyText) {
    textCell.push(copyText);
  }
  if (ctaLinks.length > 0) {
    textCell.push(...ctaLinks);
  }

  // --- Arrange columns ---
  // Library example: Column 1 = image, Column 2 = text
  // If no image exists, still produce two columns (empty image cell)
  const cells = [];
  cells.push([imageCell, textCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'Columns Featured', cells });
  element.replaceWith(block);
}
