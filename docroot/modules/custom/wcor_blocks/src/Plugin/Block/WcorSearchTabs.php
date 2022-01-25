<?php

namespace Drupal\wcor_blocks\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a custom block.
 *
 * @Block(
 *   id = "wcor_blocks__search_page_tabs",
 *   admin_label = @Translation("WCOR Search Page Tabs"),
 *   category = @Translation("WCOR"),
 * )
 */
class WcorSearchTabs extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function defaultConfiguration() {

    return [
      'label_display' => FALSE,
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function build() {

    // @TODO: Add tab links, once available.
    $html = '
<ul class="nav">
  <li class="nav-item">
    <h3><a class="nav-link active" href="#">All</a></h3>
  </li>
  <li class="nav-item">
    <h3><a class="nav-link" href="#">News</a></h3>
  </li>
  <li class="nav-item">
    <h3><a class="nav-link" href="#">Service</a></h3>
  </li>
  <li class="nav-item">
    <h3><a class="nav-link" href="#">Document</a></h3>
  </li>
</ul>
';

    return [
      'div' => [
        '#type' => 'html_tag',
        '#tag' => 'div',
        '#id' => 'wcor-search-page-tabs',
        '#attributes' => [
          'class' => ['wcor-blocks'],
          'id' => 'wcor-search-page-tabs',
        ],
        '#children' => $html,
      ],
      '#attached' => [
        'library' => [],
      ],
    ];
  }

}
