<?php

$local = array();
$production = array();

//BANNER DEBAJO DEL JUEGO
$local['post.bottom.desktop'] = <<<EOD
<div style="display:inline-block;width:100%;height:60px;background-color:#00FF00"></div>
EOD;
$production['post.bottom.desktop'] = <<<EOD
<!-- desktop_bottom -->
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<ins class="adsbygoogle"
     style="display:inline-block;width:728px;height:90px"
     data-ad-client="ca-pub-2093322466626616"
     data-ad-slot="6351098283"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>
EOD;

$local['post.bottom.responsive'] = <<<EOD
<div style="display:inline-block;width:100%;height:60px;background-color:#00FF00"></div>
EOD;
$production['post.bottom.responsive'] = <<<EOD
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- bottom_responsive -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-2093322466626616"
     data-ad-slot="3258031088"
     data-ad-format="auto"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>
EOD;

$local['post.lateral.responsive'] = <<<EOD
<div style="display:inline-block;width:100%;height:250px;background-color:#00FF00"></div>
EOD;
$production['post.lateral.responsive'] = <<<EOD
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- twitter-posts -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-2093322466626616"
     data-ad-slot="3970880285"
     data-ad-format="auto"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>
EOD;


$local['home.lateral.fixed.left'] = <<<EOD
<div style="display:inline-block;width:100%;height:250px;background-color:#00FF00"></div>
EOD;
$production['home.lateral.fixed.left'] = <<<EOD
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- twitter-posts -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-2093322466626616"
     data-ad-slot="3970880285"
     data-ad-format="auto"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>
EOD;


$local['home.lateral.fixed.right'] = <<<EOD
<div style="display:inline-block;width:100%;height:250px;background-color:#00FF00"></div>
EOD;
$production['home.lateral.fixed.right'] = <<<EOD
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- twitter-posts -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-2093322466626616"
     data-ad-slot="3970880285"
     data-ad-format="auto"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>
EOD;

$local['full_page_mobile'] = '';
$production['full_page_mobile'] = <<<EOD
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<script>
  (adsbygoogle = window.adsbygoogle || []).push({
    google_ad_client: "ca-pub-2093322466626616",
    enable_page_level_ads: true
  });
</script>
EOD;


//DEPENDENCIAS
$localDependencies = "";
$productionDependencies = "";

return array(

    'local'  => [
        'slots' => $local,
        'dependencies' => $localDependencies
    ],
    'production' => [
        'slots' => $production,
        'dependencies' => $productionDependencies
    ]
);
