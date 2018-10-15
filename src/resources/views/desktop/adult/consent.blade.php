@extends('simple-layout')
@section('content')
<div class="page-error">
    <div class="ui message">
        <h1 class="brand">Adult Content Warning</h1>
        <form action="/adult/consent" method="POST">
            {{csrf_field()}}
            <input type="hidden" name="url" value="{{$url}}" />
            <p>This content may contain sensitive material. Your media settings are configured to warn you when media may be sensitive.</p>
            <p>Please, continue to the page, only if you are older than 18 years old.</p>
            <div class="field" style="padding:20px;">
                <div class="ui checkbox">
                    <input type="checkbox" name="dont_show_me_again" value="ok"/>
                    <label>Show me always adult content.</label>
                </div>
            </div>
            <br/>
            <div class="ui buttons">
                <a class="ui button primary large" onclick="goBack()">Go back</a>
                <div class="or"></div>
                <button class="ui submit button large">View Content</button>
            </div>
        </form>
    </div>
</div>
@endsection
@section('js')
<script type="text/javascript">
    function goBack(){
        window.history.back();
    }
</script>
@endsection
