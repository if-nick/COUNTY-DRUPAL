/**
 * @file Scripting for site-wide headers.
 */

(function (Drupal) {
  "use strict";

  /***
   * Create search sort option.
   *
   * Because designs call for a simplified search-sort form that combines
   * multiple options, we create here in Javascript. That avoids creating more
   * templates , especially if we probably need Javascript anyway.
   */
  Drupal.behaviors.westySearchSort = {
    attach: function (context) {
      // Run only once.
      if (context !== document) return;

      // Check for our empty div in the view header.
      const container = document.querySelector(
        "main .view-header div#westy-search-sort-order"
      );

      if (!container) return;

      // Construct a URL object for inspecting or replacing parameters.
      let href = new URL(window.location.href);
      let title_sort = href.searchParams.get("sort_by") === "title";

      // Add our select markup.
      let selectBox = document.createRange().createContextualFragment(`
        <select class="form-select form-select-md" aria-label="form-select-md">
          <option value="title" ${
            title_sort ? "selected" : ""
          }>Sort | A to Z</option>
          <option value="relevance" ${
            title_sort ? "" : "selected"
          }>Sort | By relevance</option>
        </select>`);
      container.appendChild(selectBox);

      // Check for select-list changes.
      const select = container.querySelector("select");
      select.addEventListener("change", function () {
        let href = new URL(window.location.href);
        if (this.value.indexOf("title") > -1) {
          href.searchParams.set("sort_by", "title");
          href.searchParams.set("sort_order", "ASC");
        } else {
          href.searchParams.set("sort_by", "relevance");
          href.searchParams.set("sort_order", "DESC");
        }
        // Redirect with the new URL parameters.
        window.location = href;
      });
    },
  };

  /***
   * Search Header Facets
   *
   * To allow showing facets in the sidebar (as facets blocks) as well as
   * showing facet-badges in the header we copy them using JavaScript.
   * When facets render on the page they're initially anchor tags, then hidden
   * as the facets' javascript runs and recreates them as checkboxes. We use
   * the anchor tags to avoid waiting for facets' javascript to run.
   */
  Drupal.behaviors.westySearchFacets = {
    attach: function (context) {
      // Run only once.
      if (context !== document) return;

      // Find the active facets
      const facets = document.querySelectorAll(
        "main .facet-item > a.is-active"
      );

      // Find the view-header for appending them.
      const container = document.querySelector(
        "main .view-header div#westy-search-active-facets"
      );

      facets.forEach((facet) => {
        // Place the new facet-badges.
        let match = facet.innerText.match(/\(-\) (?<cleanStr>[^(]+)/);
        if (!match || !match.groups.cleanStr) return;

        let badge = document.createElement("a");
        badge.href = facet.href;
        badge.innerText = `${match.groups.cleanStr.trim()} X`;

        container.appendChild(badge);
      });
    },
  };
})(Drupal);
