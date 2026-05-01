/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-services-page.js
  var import_services_page_exports = {};
  __export(import_services_page_exports, {
    default: () => import_services_page_default
  });

  // tools/importer/parsers/hero-split.js
  function parse(element, { document }) {
    let image = element.querySelector(".sbc-hero-split-width-image-text__wrapper img") || element.querySelector("picture img") || element.querySelector("img");
    if (!image) {
      const lazyImg = element.querySelector("img[data-src], img[data-lazy-src]");
      if (lazyImg) {
        const src = lazyImg.getAttribute("data-src") || lazyImg.getAttribute("data-lazy-src");
        if (src) {
          lazyImg.setAttribute("src", src);
          image = lazyImg;
        }
      }
    }
    if (!image) {
      const candidates = [
        element.querySelector(".sbc-hero-split-width-image-text__wrapper"),
        element.querySelector('[class*="hero"][class*="image"]'),
        element.querySelector('[style*="background-image"]')
      ].filter(Boolean);
      for (const candidate of candidates) {
        const computedBg = window.getComputedStyle(candidate).backgroundImage;
        if (computedBg && computedBg !== "none") {
          const bgMatch = computedBg.match(/url\(["']?([^"')]+)["']?\)/);
          if (bgMatch) {
            image = document.createElement("img");
            image.setAttribute("src", bgMatch[1]);
            break;
          }
        }
        const inlineStyle = candidate.getAttribute("style") || "";
        const inlineMatch = inlineStyle.match(/background-image\s*:\s*url\(['"]?([^'")\s]+)['"]?\)/);
        if (inlineMatch) {
          image = document.createElement("img");
          image.setAttribute("src", inlineMatch[1]);
          break;
        }
      }
    }
    const heading = element.querySelector("h1.title") || element.querySelector("h1, h2");
    const subtitle = element.querySelector("p.subtitle");
    const bodyParagraphs = Array.from(
      element.querySelectorAll(".body-cont p")
    );
    if (bodyParagraphs.length === 0) {
      const contentWrapper = element.querySelector(".sbc-hero-split-width-image-text__wrapper__content");
      if (contentWrapper) {
        const allParagraphs = Array.from(contentWrapper.querySelectorAll("p"));
        allParagraphs.forEach((p) => {
          if (p !== subtitle) {
            bodyParagraphs.push(p);
          }
        });
      }
    }
    const ctaLinks = Array.from(
      element.querySelectorAll(".sbc-hero-split-width-image-text__wrapper__content a.btn, .sbc-hero-split-width-image-text__wrapper__content a.button, .sbc-hero-split-width-image-text__wrapper__content a.cta")
    );
    const cells = [];
    if (image) {
      const pictureEl = image.closest("picture");
      cells.push([pictureEl || image]);
    }
    const contentContainer = document.createElement("div");
    if (heading) contentContainer.append(heading);
    if (subtitle) {
      const p = document.createElement("p");
      const strong = document.createElement("strong");
      strong.textContent = subtitle.textContent;
      p.append(strong);
      contentContainer.append(p);
    }
    bodyParagraphs.forEach((p) => contentContainer.append(p));
    ctaLinks.forEach((a) => contentContainer.append(a));
    if (contentContainer.childNodes.length > 0) {
      cells.push([contentContainer]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "Hero Split", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-featured.js
  function parse2(element, { document }) {
    const imageContainer = element.querySelector(
      '[class*="__image-column"] [class*="__image-wrapper"], [class*="__image-column"], .sbc-hero-split-width-image-text__wrapper'
    );
    const image = imageContainer ? imageContainer.querySelector("img") : null;
    const heading = element.querySelector(
      '.sbc-block-title, h1.title, [class*="__wrapper__content"] h1, [class*="__text-column"] h2, [class*="__text-column"] h1, h1, h2, h3'
    );
    const subtitle = element.querySelector(
      'p.subtitle, [class*="__wrapper__content"] > p.subtitle'
    );
    const copyText = element.querySelector(
      '.sbc-block-copy-text, .body-cont, [class*="__text-wrapper"] .sbc-block-copy-text, [class*="__wrapper__content"] .body-cont'
    );
    const ctaLinks = Array.from(
      element.querySelectorAll(
        '[class*="__text-column"] a.sbc-btn, [class*="__text-column"] a.btn, [class*="__wrapper__content"] a.sbc-btn, [class*="__wrapper__content"] a.btn, [class*="text-column"] a[class*="btn"], [class*="__wrapper__content"] a[class*="btn"]'
      )
    );
    const imageCell = [];
    if (image) {
      imageCell.push(image);
    }
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
    const isImageRight = element.querySelector('[class*="layout__image_right"]') !== null;
    const cells = [];
    if (isImageRight) {
      cells.push([textCell, imageCell]);
    } else {
      cells.push([imageCell, textCell]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "Columns Featured", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-highlight.js
  function parse3(element, { document }) {
    let image = element.querySelector(".sbc-hero-split-width-image-text__wrapper img");
    if (!image) {
      const wrappers = element.querySelectorAll(".sbc-hero-split-width-image-text__wrapper");
      for (const wrapper of wrappers) {
        const computedBg = window.getComputedStyle(wrapper).backgroundImage;
        if (computedBg && computedBg !== "none") {
          const bgMatch = computedBg.match(/url\(["']?([^"')]+)["']?\)/);
          if (bgMatch) {
            image = document.createElement("img");
            image.setAttribute("src", bgMatch[1]);
            break;
          }
        }
        const inlineStyle = wrapper.getAttribute("style") || "";
        const inlineMatch = inlineStyle.match(/background-image\s*:\s*url\(['"]?([^'")\s]+)['"]?\)/);
        if (inlineMatch) {
          image = document.createElement("img");
          image.setAttribute("src", inlineMatch[1]);
          break;
        }
      }
    }
    const heading = element.querySelector("h1.title") || element.querySelector(".sbc-hero-split-width-image-text__wrapper__content h1") || element.querySelector("h1, h2");
    const subtitle = element.querySelector("p.subtitle");
    const bodyContent = element.querySelector(".body-cont") || element.querySelector(".sbc-hero-split-width-image-text__wrapper__content");
    const bodyElements = [];
    if (bodyContent) {
      const children = bodyContent.querySelectorAll(":scope > p, :scope > ul, :scope > ol");
      children.forEach((child) => {
        if (child !== subtitle && child.textContent.trim()) {
          bodyElements.push(child);
        }
      });
    }
    const imageCell = [];
    if (image) {
      const pictureEl = image.closest("picture");
      imageCell.push(pictureEl || image);
    }
    const textContainer = document.createElement("div");
    if (heading) textContainer.append(heading);
    if (subtitle) textContainer.append(subtitle);
    bodyElements.forEach((el) => textContainer.append(el));
    const textCell = textContainer.childNodes.length > 0 ? [textContainer] : [];
    const cells = [];
    cells.push([imageCell, textCell]);
    const block = WebImporter.Blocks.createBlock(document, { name: "Columns Highlight", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/quote.js
  function parse4(element, { document }) {
    const quoteText = element.querySelector('.title-cont h2, .title-cont h3, .title-cont h1, .title-cont p, h2.title, h3.title, [class*="title"]:not(i):not(.title-cont)');
    const attribution = element.querySelector(".attribution, .author, .cite, cite, .quote-author, .quote-attribution, blockquote + p, .title-cont + p, .title-cont ~ .attribution");
    const cells = [];
    if (quoteText) {
      cells.push([quoteText]);
    }
    if (attribution) {
      const em = document.createElement("em");
      em.textContent = attribution.textContent.trim();
      cells.push([em]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "quote", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/stats.js
  function parse5(element, { document }) {
    const statEl = element.querySelector("p.stat, .stat");
    const statValue = statEl ? statEl.textContent.trim() : "";
    const titleEl = element.querySelector("h2.title, h2, .title");
    let description = "";
    if (titleEl) {
      const fullText = titleEl.textContent.trim();
      if (statValue && fullText.startsWith(statValue)) {
        description = fullText.substring(statValue.length).trim();
      } else if (statValue) {
        description = fullText.replace(statValue, "").trim();
      } else {
        description = fullText;
      }
    }
    const cells = [];
    if (statValue || description) {
      cells.push([statValue, description]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "stats", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel.js
  function parse6(element, { document }) {
    const isRelatedProfessionals = element.querySelector('[class*="related-professionals"]') !== null;
    const cells = [];
    const sectionHeading = element.querySelector('h2.sbc-block-title, h2[class*="title"]') || element.querySelector("h2");
    let headingElement = null;
    if (sectionHeading) {
      headingElement = document.createElement("h2");
      headingElement.textContent = sectionHeading.textContent.trim();
    }
    if (isRelatedProfessionals) {
      const firstPicCarousel = element.querySelector(".sbc-kaufman-related-professionals__pictures-carousel");
      const firstDetailCarousel = element.querySelector(".sbc-kaufman-related-professionals__details-carousel");
      if (firstPicCarousel && firstDetailCarousel) {
        const pictureSlides = firstPicCarousel.querySelectorAll(
          ":scope > .slick-list .slick-slide:not(.slick-cloned)"
        );
        const detailSlides = firstDetailCarousel.querySelectorAll(
          ":scope > .slick-list .slick-slide:not(.slick-cloned)"
        );
        const seen = /* @__PURE__ */ new Set();
        pictureSlides.forEach((picSlide, idx) => {
          const img = picSlide.querySelector("img");
          if (!img) return;
          const alt = img.getAttribute("alt") || "";
          if (seen.has(alt)) return;
          seen.add(alt);
          const detail = detailSlides[idx];
          const imageCell = [];
          const picture = img.closest("picture");
          imageCell.push(picture || img);
          const contentCell = [];
          if (detail) {
            const container = document.createElement("div");
            const nameEl = detail.querySelector('[class*="__item__title"]');
            const roleEl = detail.querySelector('[class*="__item__type"]');
            const linkEl = detail.querySelector('a[href*="/professionals/"]');
            if (nameEl) {
              const p = document.createElement("p");
              const strong = document.createElement("strong");
              strong.textContent = nameEl.textContent.trim();
              p.append(strong);
              container.append(p);
            }
            if (roleEl) {
              const p = document.createElement("p");
              p.textContent = roleEl.textContent.trim();
              container.append(p);
            }
            if (linkEl) {
              const p = document.createElement("p");
              const a = document.createElement("a");
              a.href = linkEl.href;
              a.textContent = "View Profile";
              p.append(a);
              container.append(p);
            }
            contentCell.push(container);
          }
          cells.push([imageCell, contentCell]);
        });
      }
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "Carousel", cells });
    const wrapper = document.createElement("div");
    if (headingElement) {
      wrapper.append(headingElement);
    }
    wrapper.append(block);
    element.replaceWith(wrapper);
  }

  // tools/importer/parsers/cards-featured.js
  function parse7(element, { document }) {
    const sectionHeading = element.querySelector("h2");
    let headingElement = null;
    if (sectionHeading) {
      headingElement = document.createElement("h2");
      headingElement.textContent = sectionHeading.textContent.trim();
    }
    const cells = [];
    const featuredBoxes = element.querySelectorAll('[class*="__featured__box"]');
    featuredBoxes.forEach((box) => {
      const onclick = box.getAttribute("onclick") || "";
      const hrefMatch = onclick.match(/location\.href='([^']+)'/);
      if (!hrefMatch) return;
      const href = hrefMatch[1];
      const imageDiv = box.querySelector('[class*="__featured__box__image"]');
      const title = box.querySelector('[class*="__featured__box__title"]');
      const type = box.querySelector('[class*="__featured__box__type"]');
      const imageCell = [];
      if (imageDiv) {
        const style = imageDiv.getAttribute("style") || "";
        const bgMatch = style.match(/background-image\s*:\s*url\(['"]?([^'")\s]+)['"]?\)/);
        if (bgMatch) {
          const img = document.createElement("img");
          img.setAttribute("src", bgMatch[1]);
          imageCell.push(img);
        }
      }
      const contentCell = [];
      const container = document.createElement("div");
      if (title) {
        const p = document.createElement("p");
        const strong = document.createElement("strong");
        const a = document.createElement("a");
        a.href = href;
        a.textContent = title.textContent.trim();
        strong.append(a);
        p.append(strong);
        container.append(p);
      }
      if (type) {
        const p = document.createElement("p");
        p.textContent = type.textContent.trim();
        container.append(p);
      }
      contentCell.push(container);
      cells.push([imageCell, contentCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "Cards Featured", cells });
    const wrapper = document.createElement("div");
    if (headingElement) {
      wrapper.append(headingElement);
    }
    wrapper.append(block);
    element.replaceWith(wrapper);
  }

  // tools/importer/parsers/cards-insights.js
  function parse8(element, { document }) {
    const cells = [];
    const seenUrls = /* @__PURE__ */ new Set();
    const leftColumn = element.querySelector('[class*="__rest__left-column"]');
    const rightColumn = element.querySelector('[class*="__rest__right-column"]');
    const columns = [leftColumn, rightColumn].filter(Boolean);
    columns.forEach((col) => {
      const articles = col.querySelectorAll('[class*="__rest__single"]');
      articles.forEach((article) => {
        const titleLink = article.querySelector('a[href*="/blog/"], a[href*="/news/"]');
        if (!titleLink) return;
        const href = titleLink.href || titleLink.getAttribute("href");
        if (seenUrls.has(href)) return;
        seenUrls.add(href);
        const img = article.querySelector("img");
        const headline = article.querySelector('[class*="__headline"]');
        const imageCell = [];
        if (img) {
          const picture = img.closest("picture");
          imageCell.push(picture || img);
        }
        const contentCell = [];
        const container = document.createElement("div");
        const p = document.createElement("p");
        const strong = document.createElement("strong");
        const a = document.createElement("a");
        a.href = href;
        a.textContent = titleLink.textContent.trim();
        strong.append(a);
        p.append(strong);
        container.append(p);
        if (headline) {
          const datePara = document.createElement("p");
          datePara.textContent = headline.textContent.trim();
          container.append(datePara);
        }
        contentCell.push(container);
        cells.push([imageCell, contentCell]);
      });
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "Cards Insights", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/kaufmanrossin-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        "#CybotCookiebotDialog",
        ".sbc-modal-popup"
      ]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        "header",
        ".announcement-wrapper",
        ".breadcrumb-wrapper",
        ".sbc-kaufman-footer",
        ".epab",
        ".mktoForm",
        "iframe",
        "link",
        "noscript"
      ]);
    }
  }

  // tools/importer/transformers/kaufmanrossin-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document };
      const sections = payload && payload.template && payload.template.sections;
      if (!sections || sections.length < 2) return;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const sectionEl = element.querySelector(section.selector);
        if (!sectionEl) continue;
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(sectionMetadata);
        }
        if (i > 0) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-services-page.js
  var parsers = {
    "hero-split": parse,
    "columns-featured": parse2,
    "columns-highlight": parse3,
    "quote": parse4,
    "stats": parse5,
    "carousel": parse6,
    "cards-featured": parse7,
    "cards-insights": parse8
  };
  var transformers = [
    transform,
    transform2
  ];
  var PAGE_TEMPLATE = {
    name: "services-page",
    description: "Services detail page with overview of service offerings",
    urls: ["https://kaufmanrossin.com/services/family-office-services/"],
    blocks: [
      {
        name: "hero-split",
        instances: ["#sbc-hero-split-width-image-text-block_538d4b9b64675f64c35740adabaa8ab1"]
      },
      {
        name: "columns-featured",
        instances: ["#sbc-body-copy-with-featured-image-video-block_475b7413bd328d3473a06750c1e9ede7", "#sbc-body-copy-with-featured-image-video-block_33bfa22fcc6816821f2f07b7824dec4c"]
      },
      {
        name: "columns-highlight",
        instances: ["#sbc-hero-split-width-image-text-block_722e66724c051fc1c8e105e5b4e3efc0"]
      },
      {
        name: "quote",
        instances: ["#sbc-content-callout-quote-block_147cc7afdd1ea7a47666a761eaeef80c"]
      },
      {
        name: "stats",
        instances: ["#sbc-stats-callout-block_544f9a1a22bcbca243d5394c6475f91c"]
      },
      {
        name: "carousel",
        instances: ["#sbc-kaufman-related-professionals-block_cda90b0925e62d874c5cbb355eedf365"]
      },
      {
        name: "cards-featured",
        instances: ["#sbc-kaufman-related-content-for-services-block_be31bb6131fb24bbcd3e46475f3b2bb4 .sbc-related-content-for-industries-block__resources"]
      },
      {
        name: "cards-insights",
        instances: ["#sbc-kaufman-related-content-for-services-block_be31bb6131fb24bbcd3e46475f3b2bb4 .sbc-related-content-for-industries-block__rest"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero",
        selector: "#sbc-hero-split-width-image-text-block_538d4b9b64675f64c35740adabaa8ab1",
        style: null,
        blocks: ["hero-split"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Why Us Introduction",
        selector: "#sbc-kaufman-body-copy-articles-block_146f3ec5c4bf4291d3a11546eb8da1a0",
        style: null,
        blocks: [],
        defaultContent: ["#sbc-kaufman-body-copy-articles-block_146f3ec5c4bf4291d3a11546eb8da1a0"]
      },
      {
        id: "section-3",
        name: "Tailored Solutions",
        selector: "#sbc-body-copy-with-featured-image-video-block_33bfa22fcc6816821f2f07b7824dec4c",
        style: null,
        blocks: ["columns-featured"],
        defaultContent: []
      },
      {
        id: "section-4",
        name: "Ensuring Alignment",
        selector: "#sbc-kaufman-body-copy-articles-block_f757db2ffe11bb0078c4310d5faf0cd5",
        style: null,
        blocks: [],
        defaultContent: ["#sbc-kaufman-body-copy-articles-block_f757db2ffe11bb0078c4310d5faf0cd5"]
      },
      {
        id: "section-5",
        name: "Quote Callout",
        selector: "#sbc-content-callout-quote-block_147cc7afdd1ea7a47666a761eaeef80c",
        style: "dark-blue",
        blocks: ["quote"],
        defaultContent: []
      },
      {
        id: "section-6",
        name: "Lifestyle Services",
        selector: "#sbc-kaufman-body-copy-articles-block_97475a04eea00bb7f02200431f7b4f1c",
        style: null,
        blocks: [],
        defaultContent: ["#sbc-kaufman-body-copy-articles-block_97475a04eea00bb7f02200431f7b4f1c"]
      },
      {
        id: "section-7",
        name: "Role of Wealth Managers",
        selector: "#sbc-hero-split-width-image-text-block_722e66724c051fc1c8e105e5b4e3efc0",
        style: null,
        blocks: ["columns-highlight"],
        defaultContent: []
      },
      {
        id: "section-8",
        name: "Tailored Services for HNW",
        selector: "#sbc-kaufman-body-copy-articles-block_bc003a3acc16e7f2c04efdb371a8498f",
        style: null,
        blocks: [],
        defaultContent: ["#sbc-kaufman-body-copy-articles-block_bc003a3acc16e7f2c04efdb371a8498f"]
      },
      {
        id: "section-9",
        name: "Stats Callout",
        selector: "#sbc-stats-callout-block_544f9a1a22bcbca243d5394c6475f91c",
        style: "green",
        blocks: ["stats"],
        defaultContent: []
      },
      {
        id: "section-10",
        name: "Fraud Prevention",
        selector: "#sbc-kaufman-body-copy-articles-block_236af04f8b48d0febb10cf35fb213642",
        style: null,
        blocks: [],
        defaultContent: ["#sbc-kaufman-body-copy-articles-block_236af04f8b48d0febb10cf35fb213642"]
      },
      {
        id: "section-11",
        name: "Key Contacts",
        selector: "#sbc-kaufman-related-professionals-block_cda90b0925e62d874c5cbb355eedf365",
        style: null,
        blocks: ["carousel"],
        defaultContent: []
      },
      {
        id: "section-12",
        name: "Latest Insights",
        selector: "#sbc-kaufman-related-content-for-services-block_be31bb6131fb24bbcd3e46475f3b2bb4",
        style: null,
        blocks: ["cards-featured", "cards-insights"],
        defaultContent: []
      }
    ]
  };
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_services_page_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_services_page_exports);
})();
