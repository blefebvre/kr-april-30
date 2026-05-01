/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroSplitParser from './parsers/hero-split.js';
import columnsFeaturedParser from './parsers/columns-featured.js';
import columnsHighlightParser from './parsers/columns-highlight.js';
import quoteParser from './parsers/quote.js';
import statsParser from './parsers/stats.js';
import carouselParser from './parsers/carousel.js';
import cardsFeaturedParser from './parsers/cards-featured.js';
import cardsInsightsParser from './parsers/cards-insights.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/kaufmanrossin-cleanup.js';
import sectionsTransformer from './transformers/kaufmanrossin-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-split': heroSplitParser,
  'columns-featured': columnsFeaturedParser,
  'columns-highlight': columnsHighlightParser,
  'quote': quoteParser,
  'stats': statsParser,
  'carousel': carouselParser,
  'cards-featured': cardsFeaturedParser,
  'cards-insights': cardsInsightsParser,
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
  sectionsTransformer,
];

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'services-page',
  description: 'Services detail page with overview of service offerings',
  urls: ['https://kaufmanrossin.com/services/family-office-services/'],
  blocks: [
    {
      name: 'hero-split',
      instances: ['#sbc-hero-split-width-image-text-block_538d4b9b64675f64c35740adabaa8ab1']
    },
    {
      name: 'columns-featured',
      instances: ['#sbc-body-copy-with-featured-image-video-block_475b7413bd328d3473a06750c1e9ede7', '#sbc-body-copy-with-featured-image-video-block_33bfa22fcc6816821f2f07b7824dec4c']
    },
    {
      name: 'columns-highlight',
      instances: ['#sbc-hero-split-width-image-text-block_722e66724c051fc1c8e105e5b4e3efc0']
    },
    {
      name: 'quote',
      instances: ['#sbc-content-callout-quote-block_147cc7afdd1ea7a47666a761eaeef80c']
    },
    {
      name: 'stats',
      instances: ['#sbc-stats-callout-block_544f9a1a22bcbca243d5394c6475f91c']
    },
    {
      name: 'carousel',
      instances: ['#sbc-kaufman-related-professionals-block_cda90b0925e62d874c5cbb355eedf365']
    },
    {
      name: 'cards-featured',
      instances: ['#sbc-kaufman-related-content-for-services-block_be31bb6131fb24bbcd3e46475f3b2bb4 .sbc-related-content-for-industries-block__resources']
    },
    {
      name: 'cards-insights',
      instances: ['#sbc-kaufman-related-content-for-services-block_be31bb6131fb24bbcd3e46475f3b2bb4 .sbc-related-content-for-industries-block__rest']
    },
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero',
      selector: '#sbc-hero-split-width-image-text-block_538d4b9b64675f64c35740adabaa8ab1',
      style: null,
      blocks: ['hero-split'],
      defaultContent: []
    },
    {
      id: 'section-2',
      name: 'Why Us Introduction',
      selector: '#sbc-kaufman-body-copy-articles-block_146f3ec5c4bf4291d3a11546eb8da1a0',
      style: null,
      blocks: [],
      defaultContent: ['#sbc-kaufman-body-copy-articles-block_146f3ec5c4bf4291d3a11546eb8da1a0']
    },
    {
      id: 'section-3',
      name: 'Tailored Solutions',
      selector: '#sbc-body-copy-with-featured-image-video-block_33bfa22fcc6816821f2f07b7824dec4c',
      style: null,
      blocks: ['columns-featured'],
      defaultContent: []
    },
    {
      id: 'section-4',
      name: 'Ensuring Alignment',
      selector: '#sbc-kaufman-body-copy-articles-block_f757db2ffe11bb0078c4310d5faf0cd5',
      style: null,
      blocks: [],
      defaultContent: ['#sbc-kaufman-body-copy-articles-block_f757db2ffe11bb0078c4310d5faf0cd5']
    },
    {
      id: 'section-5',
      name: 'Quote Callout',
      selector: '#sbc-content-callout-quote-block_147cc7afdd1ea7a47666a761eaeef80c',
      style: 'dark-blue',
      blocks: ['quote'],
      defaultContent: []
    },
    {
      id: 'section-6',
      name: 'Lifestyle Services',
      selector: '#sbc-kaufman-body-copy-articles-block_97475a04eea00bb7f02200431f7b4f1c',
      style: null,
      blocks: [],
      defaultContent: ['#sbc-kaufman-body-copy-articles-block_97475a04eea00bb7f02200431f7b4f1c']
    },
    {
      id: 'section-7',
      name: 'Role of Wealth Managers',
      selector: '#sbc-hero-split-width-image-text-block_722e66724c051fc1c8e105e5b4e3efc0',
      style: null,
      blocks: ['columns-highlight'],
      defaultContent: []
    },
    {
      id: 'section-8',
      name: 'Tailored Services for HNW',
      selector: '#sbc-kaufman-body-copy-articles-block_bc003a3acc16e7f2c04efdb371a8498f',
      style: null,
      blocks: [],
      defaultContent: ['#sbc-kaufman-body-copy-articles-block_bc003a3acc16e7f2c04efdb371a8498f']
    },
    {
      id: 'section-9',
      name: 'Stats Callout',
      selector: '#sbc-stats-callout-block_544f9a1a22bcbca243d5394c6475f91c',
      style: 'green',
      blocks: ['stats'],
      defaultContent: []
    },
    {
      id: 'section-10',
      name: 'Fraud Prevention',
      selector: '#sbc-kaufman-body-copy-articles-block_236af04f8b48d0febb10cf35fb213642',
      style: null,
      blocks: [],
      defaultContent: ['#sbc-kaufman-body-copy-articles-block_236af04f8b48d0febb10cf35fb213642']
    },
    {
      id: 'section-11',
      name: 'Key Contacts',
      selector: '#sbc-kaufman-related-professionals-block_cda90b0925e62d874c5cbb355eedf365',
      style: null,
      blocks: ['carousel'],
      defaultContent: []
    },
    {
      id: 'section-12',
      name: 'Latest Insights',
      selector: '#sbc-kaufman-related-content-for-services-block_be31bb6131fb24bbcd3e46475f3b2bb4',
      style: null,
      blocks: ['cards-featured', 'cards-insights'],
      defaultContent: []
    }
  ]
};

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (final cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '')
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
