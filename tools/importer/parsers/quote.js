/* eslint-disable */
/* global WebImporter */

/**
 * Parser for quote variant.
 * Base block: quote
 * Source: https://kaufmanrossin.com/services/family-office-services/
 * Selector: #sbc-content-callout-quote-block_147cc7afdd1ea7a47666a761eaeef80c
 * Generated: 2026-05-01
 *
 * Target table structure (from library example):
 *   | Quote |
 *   | --- |
 *   | <quote text> |
 *   | <attribution (optional, italic)> |
 *
 * Source structure:
 *   section.sbc-content-callout-quote > .container > .row > .col-lg-8 > .title-cont
 *     - i.fa-quote-left (decorative icon, skip)
 *     - h2.title (quote text)
 *   No attribution in this source instance; handle optionally.
 */
export default function parse(element, { document }) {
  // Extract quote text from heading inside .title-cont
  const quoteText = element.querySelector('.title-cont h2, .title-cont h3, .title-cont h1, .title-cont p, h2.title, h3.title, [class*="title"]:not(i):not(.title-cont)');

  // Extract optional attribution (look for common attribution patterns)
  const attribution = element.querySelector('.attribution, .author, .cite, cite, .quote-author, .quote-attribution, blockquote + p, .title-cont + p, .title-cont ~ .attribution');

  // Build cells array matching library example structure
  const cells = [];

  // Row 1: Quote text
  if (quoteText) {
    cells.push([quoteText]);
  }

  // Row 2 (optional): Attribution in italic
  if (attribution) {
    const em = document.createElement('em');
    em.textContent = attribution.textContent.trim();
    cells.push([em]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'quote', cells });
  element.replaceWith(block);
}
