<div class="user-image">
    <?php
       $profileImage = str_replace("_normal", "", $owner->profile_image_url_https);
    ?>
    <img src="<?php echo $profileImage; ?>" />
</div>
