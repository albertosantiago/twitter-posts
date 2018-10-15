@extends('simple-layout')
@inject('helpers', 'App\Api\FrontalHelpers')
@section('content')
    @if(($previousMessage)&&(!$hasMessageSuccess))
        <div class="contact-form">
            <div class="success">
                <h1 class="brand">Twitter Posts</h1>
                <h2>Sorry, you cannot send a message.</h2>
                <p>We detect a send of one message from your ip. Because, our policy against spammers, you have to wait at least one hour to send another.</p>
                <div class="back-button">
                    <a href="/" class="ui button primary huge">Back to Home </a>
                </div>
            </div>
        </div>
    @else
        @if($hasMessageSuccess)
            <div class="contact-form">
                <div class="success">
                    <h1 class="brand">Twitter Posts</h1>
                    <h2>Thank you for the message!</h2>
                    <p>The message was successfully sended. We'll contact you as soon as possible.</p>
                    <div class="back-button">
                        <a href="/" class="ui button primary huge">Back to Home </a>
                    </div>
                </div>
            </div>
        @else
            <div class="contact-form">
                <h1 class="brand">Twitter-Posts&nbsp;&nbsp;<small>Contact Form</small></h1>
                <form class="ui contact big form" method="POST">
                    {{csrf_field()}}
                    <div class="field">
                        <label>Name</label>
                        <input type="text" name="name" placeholder="Your name here" value="{{ old('name') }}">
                    </div>
                    <div class="field">
                        <label>Email</label>
                        <input type="text" name="email" placeholder="Email" value="{{ old('email') }}">
                    </div>
                    <div class="field">
                        <label>Message</label>
                        <textarea name="message" placeholder="Your message here">{{ old('message') }}</textarea>
                    </div>
                    @if ($errors->count() > 0)
                        <div class="ui error message" style="display:block;">
                            <ul class="list">
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                            </ul>
                        </div>
                    @else
                        <div class="ui error message"></div>
                    @endif
                    <div class="actions">
                        <button class="ui submit button right" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        @endif
    @endif
@endsection
@section('js')
    @if(!$hasMessageSuccess)
        <script type="text/javascript" src="{{$helpers->cdn("/js/contact.js")}}" ></script>
    @endif
@endsection
