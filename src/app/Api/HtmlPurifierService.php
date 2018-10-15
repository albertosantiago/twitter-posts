<?php namespace App\Api;

/**
 * Html Purifer service.
 * @author Alberto Santiago <chucho@wetdog.co>
 */
class HtmlPurifierService{

    public function __construct($conf){
        $config = $this->createHTMLPurifierConf($conf);
        $this->htmlPurifier = new \HTMLPurifier($config);
    }

    public function purify($content)
    {
        return $this->htmlPurifier->purify($content);
    }

    protected function createHTMLPurifierConf($conf){
        $config = \HTMLPurifier_Config::createDefault();
        $config->set('HTML.DefinitionID', $conf['definition_id']);
        $config->set('HTML.DefinitionRev', $conf['definition_version']);
        $config->set('Cache.SerializerPath', $conf['cache_path'] );
        $config->set('Filter.ExtractStyleBlocks', $conf['extract_style_blocks']);
        $config->set('HTML.SafeIframe', $conf['safe_iframe']);
        $config->set('URI.SafeIframeRegexp', $conf['safe_iframe_regexp']);
        if ($def = $config->maybeGetRawHTMLDefinition()) {
            $def->addAttribute('blockquote', 'data-conversation', 'CDATA');
            foreach($conf['custom_tags'] as $tagName => $tagConf){
                $def->addElement(
                    $tagName,
                    $tagConf['type'],
                    $tagConf['contents'],
                    $tagConf['attr_collections'],
                    $tagConf['attributes']
                );
            }
        }
        return $config;
    }
}
