import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import App from 'app/app';
const I18n = require('react-i18nify').I18n;

$.fn.modal = require('semantic-ui-modal');
$.fn.dimmer = require('semantic-ui-dimmer');
$.fn.transition = require('semantic-ui-transition');
$.fn.transition.settings.silent = true;

class FeaturedImagePickerComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            currentImg: props.img,
        };
        this.sessionManager = App.get('sessionManager');
        this.modalManager   = App.get('modalManager');
        this.handleLogin = this.handleLogin.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.setImage    = this.setImage.bind(this);
    }

    componentDidMount(){}

    render() {
        var img = "";
        if((this.state.currentImg!==undefined)&&
            (this.state.currentImg!=="")){
            img = <img src={this.state.currentImg} width="150" />
        }
        return <div className='featured-image-comp'>
                    <button className="ui button" onClick={this.handleClick} ref="pick">{I18n.t('app.pick')}</button>
                    <div className="featured-image-container">
                        {img}
                    </div>
               </div>;
    }

    handleClick(){
        var self = this;
        if(this.sessionManager.isGuest()){
            return this.showLogin();
        }
        var self = this;
        App.get('modalManager').create('ModalLibrary',{
            callback: function(data){
                self.setImage(data);
            }
        }, this.dom);
    }

    setImage(img){
        this.setState({currentImg:img.src});
        this.props.onChange(img.src);
    }

    showLogin(e) {
        this.modalManager.create('ModalLogin', {
            callback:this.handleLogin
        });
    }

    handleLogin(e){
        this.handleClick();
    }

};

FeaturedImagePickerComponent.defaultProps = {};

export default FeaturedImagePickerComponent;
