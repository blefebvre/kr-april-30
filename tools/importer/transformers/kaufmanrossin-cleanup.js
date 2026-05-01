/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: kaufmanrossin cleanup.
 * Removes non-authorable site-wide elements from kaufmanrossin.com pages.
 * All selectors verified against migration-work/cleaned.html.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Cookie consent dialog - found as <div id="CybotCookiebotDialog"> in cleaned.html line 2
    // Modal popup - found as <section id="sbc-modal-popup-block_0465f29df42a4e7a97f2ae2e4f4cc92e" class="sbc-modal-popup"> in cleaned.html line 4245
    WebImporter.DOMUtils.remove(element, [
      '#CybotCookiebotDialog',
      '.sbc-modal-popup',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Site header - found as <header> wrapping <section id="sbc-kaufman-header-block_..."> in cleaned.html line 1007
    // Announcement bar - found as <div class="announcement-wrapper"> in cleaned.html line 2365
    // Breadcrumbs - found as <div class="breadcrumb-wrapper"> in cleaned.html line 2367
    // Site footer - found as <section class="sbc-kaufman-footer"> after </main> in cleaned.html line 4268
    // Empty span - found as <span class="epab"> in cleaned.html line 1005
    // Marketo form - found as <form class="mktoForm"> in cleaned.html line 4901
    // Tracking iframes - found as multiple <iframe> elements (doubleclick, marketo, cookiebot) in cleaned.html lines 4903-4916
    // Link and noscript elements
    WebImporter.DOMUtils.remove(element, [
      'header',
      '.announcement-wrapper',
      '.breadcrumb-wrapper',
      '.sbc-kaufman-footer',
      '.epab',
      '.mktoForm',
      'iframe',
      'link',
      'noscript',
    ]);
  }
}
