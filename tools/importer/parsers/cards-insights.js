/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-insights variant.
 * Source: sbc-related-content-for-industries-block / sbc-related-content-for-services-block
 * Article grid with image, title (linked), and category/date.
 *
 * Target table (vanilla cards):
 *   | Cards Insights |
 *   | image | title + date |   <- card 1
 *   | image | title + date |   <- card 2
 *
 * Each row = one card. Column 0 = image, Column 1 = text content.
 * The section heading ("Latest Insights") is output as default content before the block.
 */
export default function parse(element, { document }) {
  const cells = [];
  const seenUrls = new Set();

  // Articles in the grid (__rest__single items)
  const leftColumn = element.querySelector('[class*="__rest__left-column"]');
  const rightColumn = element.querySelector('[class*="__rest__right-column"]');
  const columns = [leftColumn, rightColumn].filter(Boolean);

  columns.forEach((col) => {
    const articles = col.querySelectorAll('[class*="__rest__single"]');
    articles.forEach((article) => {
      const titleLink = article.querySelector('a[href*="/blog/"], a[href*="/news/"]');
      if (!titleLink) return;
      const href = titleLink.href || titleLink.getAttribute('href');
      if (seenUrls.has(href)) return;
      seenUrls.add(href);

      const img = article.querySelector('img');
      const headline = article.querySelector('[class*="__headline"]');

      const imageCell = [];
      if (img) {
        const picture = img.closest('picture');
        imageCell.push(picture || img);
      }

      const contentCell = [];
      const container = document.createElement('div');

      const p = document.createElement('p');
      const strong = document.createElement('strong');
      const a = document.createElement('a');
      a.href = href;
      a.textContent = titleLink.textContent.trim();
      strong.append(a);
      p.append(strong);
      container.append(p);

      if (headline) {
        const datePara = document.createElement('p');
        datePara.textContent = headline.textContent.trim();
        container.append(datePara);
      }

      contentCell.push(container);
      cells.push([imageCell, contentCell]);
    });
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'Cards Insights', cells });
  element.replaceWith(block);
}
