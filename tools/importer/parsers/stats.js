/* eslint-disable */
/* global WebImporter */

/**
 * Parser for stats variant.
 * Base block: stats
 * Source: https://kaufmanrossin.com/services/family-office-services/
 * Selector: #sbc-stats-callout-block_544f9a1a22bcbca243d5394c6475f91c
 * Generated: 2026-05-01
 *
 * Source structure:
 *   section.sbc-stats-callout > .container > .row
 *     .col-lg-6 > h2.title (full statement including stat value)
 *     .col-lg-6 > .stat-cont > .row > .col > p.stat (stat value e.g. "26%")
 *
 * Target table (from library example):
 *   | Stats |  |
 *   | --- | --- |
 *   | 26% | of single family offices have been a victim of cybercrime |
 *
 * Each row: Column 1 = stat value, Column 2 = description text.
 */
export default function parse(element, { document }) {
  // Extract stat value from p.stat element
  const statEl = element.querySelector('p.stat, .stat');
  const statValue = statEl ? statEl.textContent.trim() : '';

  // Extract description from h2.title element
  // The h2 contains the full statement (e.g. "26% of single family offices...")
  // The description is the part after the stat value
  const titleEl = element.querySelector('h2.title, h2, .title');
  let description = '';
  if (titleEl) {
    const fullText = titleEl.textContent.trim();
    // Remove the stat value from the beginning of the title to get the description
    if (statValue && fullText.startsWith(statValue)) {
      description = fullText.substring(statValue.length).trim();
    } else if (statValue) {
      // Fallback: try to remove the stat value wherever it appears
      description = fullText.replace(statValue, '').trim();
    } else {
      // No stat element found; use the full title as description
      description = fullText;
    }
  }

  // Build cells array matching the library example:
  // One row with two columns: [statValue, description]
  const cells = [];

  if (statValue || description) {
    cells.push([statValue, description]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'stats', cells });
  element.replaceWith(block);
}
