import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import App from 'app/app';
import SocialShare from './SocialShare';
import TwitterShare from './TwitterShare';

$.fn.dropdown = require('semantic-ui-dropdown');
$.fn.transition = require('semantic-ui-transition');
$.fn.transition.settings.silent = true;

class ShareButtonComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
        };
        this.hideDropdown = this.hideDropdown.bind(this);
    }

    componentDidMount(){
        this.dom = $(ReactDOM.findDOMNode(this));
        this.dom.dropdown();
    }

    render() {
        return <div className="ui floating dropdown item share-button">
                <i className="share alternate icon"></i>
                &nbsp;Share&nbsp;
                <i className="dropdown icon"></i>
                <div className="menu">
                    <div className="interactable-item"><TwitterShare post={this.props.post} callback={this.hideDropdown}/></div>
                    <div className="item"><SocialShare post={this.props.post} /></div>
                </div>
              </div>;
    }


    hideDropdown(e){
        this.dom.dropdown('hide');
    }

};

ShareButtonComponent.defaultProps = {};

export default ShareButtonComponent ;
