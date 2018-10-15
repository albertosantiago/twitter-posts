import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

$.fn.form = require('semantic-ui-form');
$.fn.transition = require('semantic-ui-transition');
$.fn.transition.settings.silent = true;

class TwitterShare extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            user_screen_name: undefined,
            post_id: props.post.id
        };
        this.dom = undefined;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount() {
        this.dom = $(ReactDOM.findDOMNode(this));
        var submitForm = this.handleSubmit;
        var settings = {
            onSuccess: submitForm,
            inline: false,
            fields : {
                user_screen_name: {
                    identifier: 'user_screen_name',
                        rules: [{
                            type : 'empty',
                            prompt : 'Please enter a correct twitter user screen name'
                        }]
                 },
            }
        };
        var ret = this.dom.form(settings);
    }

    handleInputChange(event) {
       const target = event.target;
       const value = target.type === 'checkbox' ? target.checked : target.value;
       const name = target.name;

       this.setState({
         [name]: value
       });
    }

    render(){
        return <div className="ui twitter-share form">
                    <div className="field">
                        <label>Suggest to Twitter User:</label>
                    </div>
                    <div className="field">
                        <div className="ui labeled input">
                          <div className="ui label">@</div>
                          <input type="text" placeholder="whoever" name="user_screen_name" value={this.state.user_screen_name} onChange={this.handleInputChange}/>
                        </div>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <button className="ui tiny button primary" onClick={this.handleSave}>Share</button>
                    </div>
                    <hr/>
            </div>
    }

    handleSave(e){
        var ret = this.dom.form('validate form');
    }

    handleSubmit(){
        $.getJSON('/ajax/suggest',
            {
                post_id: this.state.post_id,
                user_screen_name: this.state.user_screen_name
            }
        );
        this.props.callback();
    }
}

export default TwitterShare;
