<style type="text/css">
    .components_form_cron input{
        width:12%;
        display:inline;
        margin-left:10px;
    }
</style>
<div class="components_form_cron">
    <?php
    if(empty($value)){
        $value = [
            'second' => '*',
            'minute' => '*',
            'hour' => '*',
            'day' => '*',
            'month' => '*',
            'year' => '*',
        ];
    }
    ?>
    {{ Form::text($name."[minute]", $value['second'], array_merge(['class' => 'form-control', 'maxlength'=>'6']), $attributes) }}
    {{ Form::text($name."[hour]",  $value['minute'], array_merge(['class' => 'form-control', 'maxlength'=>'6']), $attributes) }}
    {{ Form::text($name."[month_day]",  $value['hour'], array_merge(['class' => 'form-control','maxlength'=>'6']), $attributes) }}
    {{ Form::text($name."[month]",  $value['day'], array_merge(['class' => 'form-control','maxlength'=>'6']), $attributes) }}
    {{ Form::text($name."[week_day]",  $value['month'], array_merge(['class' => 'form-control','maxlength'=>'6']), $attributes) }}
    {{ Form::text($name."[year]", $value['year'], array_merge(['class' => 'form-control','maxlength'=>'6']), $attributes) }}
</div>
