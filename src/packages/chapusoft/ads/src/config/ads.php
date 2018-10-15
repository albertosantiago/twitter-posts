<?php

$local = array();
$production = array();

//BANNER DEBAJO DEL JUEGO
$local['post.bottom.desktop'] = <<<EOD
<div style="display:inline-block;width:100%;height:60px;background-color:#00FF00"></div>
EOD;
$production['post.bottom.desktop'] = <<<EOD
<!-- responsive2 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-2093322466626616"
     data-ad-slot="5837781485"
     data-ad-format="auto"></ins>
     <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
     <script>
     (adsbygoogle = window.adsbygoogle || []).push({});
     </script>
EOD;


//DEPENDENCIAS
$localDependencies = "";
$productionDependencies =  <<<EOD
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>
EOD;


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
