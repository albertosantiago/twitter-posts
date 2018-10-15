/*
* PERSONALIZACIONES TWITTER USUARIO.
*/
<?php
    //dd($user);
    $headerBackgroundColor = "#000";
    if(!empty($user->profile_link_color)){
        $headerBackgroundColor = "#".$user->profile_link_color;
    }
    if(!empty($user->profile_banner_url)){
        $backgroundImg = $user->profile_banner_url;
    }
    $profileImage = str_replace("_normal", "",$user->profile_image_url_https);
?>
.header-background{
    background-color: <?php echo $headerBackgroundColor; ?>;
    <?php
      if(!empty($backgroundImg)){
    ?>
      background-image: url('<?php echo $backgroundImg; ?>');
      background-repeat: no-repeat;
      background-size: 100% ;
      padding-top:250px;
    <?php
      }else{
    ?>
      padding-top:100px;
    <?php
      }
    ?>
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border: 1px solid #ccc;
}
