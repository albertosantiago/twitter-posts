<?php

return [
    'definition_id' => 'post-html-purifier',
    'definition_version' => 21,
    'cache_path' => storage_path('htmlpurifier'),
    'extract_style_blocks' => true,
    'safe_iframe' => true,
    'safe_iframe_regexp' =>'%^(https?:)?//(www\.youtube(?:-nocookie)?\.com/embed/|player\.vimeo\.com/video/)%',
    //Custom Tags definition.
    'custom_tags' => [
        'twp-post-img' => [
            'type' => 'Block',
            'contents' => 'Flow',
            'attr_collections' => 'Common',
            'attributes' => [
                'src' => 'URI',
                'id' => 'CDATA',
                'alt' => 'CDATA',
                'align' => 'CDATA',
                'width' => 'CDATA',
                'height' => 'CDATA',
                'data-caption' => 'CDATA',
                'data-type' => 'CDATA',
                'data-border-width' => 'CDATA',
                'data-border-color' => 'CDATA',
                'data-margin-top' => 'CDATA',
                'data-margin-left' => 'CDATA',
                'data-margin-right' => 'CDATA',
                'data-margin-bottom' => 'CDATA',
                'data-padding-top' => 'CDATA',
                'data-padding-left' => 'CDATA',
                'data-padding-right' => 'CDATA',
                'data-padding-bottom' => 'CDATA',
                'data-type' => 'CDATA',
            ]
        ],
        'twp-gallery' => [
            'type' => 'Block',
            'contents' => 'Flow',
            'attr_collections' => 'Common',
            'attributes' => [
                'id' => 'CDATA',
                'data-fullscreen' => 'CDATA',
                'data-nav' => 'CDATA',
            ]
        ],
        'twp-data' => [
            'type' => 'Block',
            'contents' => 'Flow',
            'attr_collections' => 'Common',
            'attributes' => [
                'id' => 'CDATA',
                'data-type' => 'CDATA',
                'data-thumb' => 'CDATA',
                'data-src' => 'CDATA',
                'data-description' => 'CDATA',
                'data-caption' => 'CDATA'
            ]
        ],
        'twp-post-link' => [
            'type' => 'Inline',
            'contents' => 'Flow',
            'attr_collections' => 'Common',
            'attributes' => [
                'href' => 'URI',
                'id' => 'CDATA',
                'title' => 'CDATA',
                'data-text'  => 'CDATA',
                'data-color' => 'CDATA'
            ]
        ],
        'twp-post-mention' => [
            'type' => 'Inline',
            'contents' => 'Flow',
            'attr_collections' => 'Common',
            'attributes' => [
                'id' => 'CDATA',
                'data-screen-name' => 'CDATA',
                'data-text'  => 'CDATA',
                'data-color' => 'CDATA'
            ]
        ],
        'twp-tweet' => [
            'type' => 'Block',
            'contents' => 'Flow',
            'attr_collections' => 'Common',
            'attributes' => [
                'id' => 'CDATA',
                'data-screen-name' => 'CDATA',
                'data-url' => 'CDATA',
                'data-text' => 'CDATA',
                'data-images' => 'CDATA',
                'data-video' => 'CDATA',
                'data-youtube' => 'CDATA',
                'data-links' => 'CDATA',
                'data-author-name' => 'CDATA',
                'data-author-screen-name' => 'CDATA',
                'data-author-image' => 'CDATA'
            ]
        ],
        'twp-tweet-thread' => [
            'type' => 'Block',
            'contents' => 'Flow',
            'attr_collections' => 'Common',
            'attributes' => [
                'id' => 'CDATA'
            ]
        ],
    ]
];
