/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards variant.
 * Base block: cards
 * Source: https://kaufmanrossin.com/services/family-office-services/
 * Generated: 2026-05-01
 *
 * Handles two source patterns:
 * 1. Related Professionals (sbc-kaufman-related-professionals)
 *    - Pictures carousel + details carousel with name, role, bio, View Profile link
 *    - Uses the desktop details carousel (d-none d-lg-block) to avoid responsive duplicates
 *    - Pairs each picture slide with its corresponding details slide by index
 * 2. Related Content/Articles (sbc-related-content-for-industries-block)
 *    - Article cards in left/right columns with category, title, link, image
 *
 * Target output per library-example.md:
 *   | Cards |
 *   | --- |
 *   | ![image](url) |
 *   | **Title** Description [Link](url) |
 */
export default function parse(element, { document }) {
  const cells = [];

  // Detect which pattern we're dealing with
  const isProfessionals = !!element.querySelector(
    '.sbc-kaufman-related-professionals__pictures-carousel, .sbc-kaufman-related-professionals__gray-section'
  );
  const isRelatedContent = !!element.querySelector(
    '.sbc-related-content-for-industries-block__rest, .sbc-related-content-for-industries-block__resources'
  );

  if (isProfessionals) {
    // Pattern 1: Related Professionals carousel
    // Use the desktop breakpoint container to avoid duplicate responsive copies
    const desktopContainer = element.querySelector('.d-none.d-lg-block')
      || element.querySelector('.sbc-kaufman-related-professionals__gray-section');

    // Get non-cloned picture slides for images
    const picSlides = Array.from(
      (desktopContainer || element).querySelectorAll(
        '.sbc-kaufman-related-professionals__pictures-carousel__item.slick-slide:not(.slick-cloned)'
      )
    );

    // Get non-cloned detail slides for name, role, bio, profile link
    const detailSlides = Array.from(
      (desktopContainer || element).querySelectorAll(
        '.sbc-kaufman-related-professionals__details-carousel .slick-slide:not(.slick-cloned)'
      )
    );

    // Deduplicate picture slides by image src
    const seenSrc = new Set();
    const uniquePicIndices = [];
    picSlides.forEach((slide, i) => {
      const img = slide.querySelector('img');
      if (!img) return;
      const src = img.getAttribute('src');
      if (seenSrc.has(src)) return;
      seenSrc.add(src);
      uniquePicIndices.push(i);
    });

    uniquePicIndices.forEach((picIdx, cardIdx) => {
      const picSlide = picSlides[picIdx];
      const img = picSlide.querySelector('img');
      if (!img) return;

      // Row 1: Image
      cells.push([img]);

      // Row 2: Name + role + profile link from matching detail slide
      const contentCell = [];
      const detailSlide = detailSlides[cardIdx];

      if (detailSlide) {
        // Name
        const nameEl = detailSlide.querySelector(
          '.sbc-kaufman-related-professionals__details-carousel__item__title, p:first-of-type'
        );
        if (nameEl) {
          const strong = document.createElement('strong');
          strong.textContent = nameEl.textContent.trim();
          contentCell.push(strong);
        }

        // Role/title
        const roleEl = detailSlide.querySelector(
          '.sbc-kaufman-related-professionals__details-carousel__item__type'
        );
        if (roleEl) {
          const roleText = document.createTextNode(' ' + roleEl.textContent.trim());
          contentCell.push(roleText);
        }

        // View Profile link
        const profileLink = detailSlide.querySelector('a[href*="/professionals/"]');
        if (profileLink) {
          const link = document.createElement('a');
          link.href = profileLink.href;
          link.textContent = profileLink.textContent.trim() || 'View Profile';
          contentCell.push(link);
        }
      } else {
        // Fallback: extract name from image alt text
        const alt = img.getAttribute('alt') || '';
        const nameMatch = alt.match(/^Picture of\s+(.+)$/i);
        const personName = nameMatch ? nameMatch[1].trim() : alt;
        if (personName) {
          const strong = document.createElement('strong');
          strong.textContent = personName;
          contentCell.push(strong);
        }
      }

      if (contentCell.length > 0) {
        cells.push(contentCell);
      }
    });
  } else if (isRelatedContent) {
    // Pattern 2: Related Content / Latest Insights articles
    // Articles are in .sbc-related-content-for-industries-block__rest__single items
    // spread across left and right columns
    const articleItems = Array.from(element.querySelectorAll(
      '.sbc-related-content-for-industries-block__rest__single'
    ));

    articleItems.forEach((article) => {
      const img = article.querySelector(
        '.sbc-related-content-for-industries-block__rest__single__image, img'
      );
      const heading = article.querySelector('h3, h4, h2');
      const link = heading ? heading.querySelector('a[href]') : article.querySelector('a[href]');
      const categoryEl = article.querySelector('p');

      // Row 1: Image (if present)
      if (img) {
        cells.push([img]);
      }

      // Row 2: Title + category/date + link
      const contentCell = [];
      if (heading) {
        const strong = document.createElement('strong');
        strong.textContent = heading.textContent.trim();
        contentCell.push(strong);
      }
      if (categoryEl && categoryEl !== heading) {
        const catText = categoryEl.textContent.trim();
        if (catText) {
          const desc = document.createTextNode(' ' + catText);
          contentCell.push(desc);
        }
      }
      if (link) {
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = heading ? heading.textContent.trim() : link.textContent.trim();
        contentCell.push(a);
      }

      if (contentCell.length > 0) {
        cells.push(contentCell);
      }
    });
  } else {
    // Fallback: generic card extraction for unknown patterns
    const images = Array.from(element.querySelectorAll('img'));
    const seenSrc = new Set();

    images.forEach((img) => {
      const src = img.getAttribute('src');
      if (seenSrc.has(src)) return;
      seenSrc.add(src);

      cells.push([img]);

      const alt = img.getAttribute('alt') || '';
      if (alt) {
        const strong = document.createElement('strong');
        strong.textContent = alt;
        cells.push([strong]);
      }
    });
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards', cells });
  element.replaceWith(block);
}
