'use strict';

import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import interact from 'interact.js';


var getCaptionHeight = function(caption){
    if(caption===undefined){
        return 0;
    }
    return (Math.ceil(caption.length/40)*12)+25;
};

class TwpPostImgComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        alt: props.data.alt,
        type: props.data.type,
        caption: props.data.caption,
        src: props.data.src,
        width: props.data.width,
        height: props.data.height,
        align    : props.data.align,
        marginTop    : props.data.marginTop,
        marginBottom : props.data.marginBottom,
        marginLeft   : props.data.marginLeft,
        marginRight  : props.data.marginRight,
        paddingTop    : props.data.paddingTop,
        paddingBottom : props.data.paddingBottom,
        paddingLeft   : props.data.paddingLeft,
        paddingRight  : props.data.paddingRight,
        borderWidth  : props.data.borderWidth,
        borderColor  : props.data.borderColor
    };
    this.dom = undefined;
  }

  render() {
      var styles     = this.getStyles();
      var imgStyles  = this.getImgStyle();
      var smallStyle = this.getSmallStyle();

      var small = '';
      if((this.state.caption!==undefined)&&
        (this.state.caption!=='')){
          small = <small style={smallStyle}>{this.state.caption}</small>;
      }

      return <div>
                <div className="clearFix"></div>
                <div style={styles} className="twp-img" ref="container">
                    <img style={imgStyles} src={this.state.src} alt={this.state.alt}/>
                    {small}
                </div>
            </div>;
  }

  getImgStyle(){
      var borderRadius = '0px';
      if(this.state.type=='rounded'){
         borderRadius = "10px";
      }
      if(this.state.type==='circular'){
         borderRadius = "500rem";
      }
      return {
          width: this.state.width + 'px',
          height: this.state.height + 'px',
          borderRadius: borderRadius,
          borderStyle: "solid",
          borderWidth: this.state.borderWidth + 'px',
          borderColor: this.state.borderColor,
          paddingTop: this.state.paddingTop + 'px',
          paddingBottom: this.state.paddingBottom + 'px',
          paddingLeft: this.state.paddingLeft + 'px',
          paddingRight: this.state.paddingRight + 'px',
          marginTop: this.state.marginTop + 'px',
          marginBottom: '0px',
          marginLeft: this.state.marginLeft + 'px',
          marginRight: this.state.marginRight + 'px',
      }
  }

  getSmallStyle(){

      var styles = {
          width: "100%",
          float: "none",
          clear: "both",
          display: 'block',
          marginTop: '15px',
          marginBottom: this.state.marginBottom + 'px',
      };

      if(this.state.align=='center'){
          styles.width = "60%";
          styles.margin = "0 auto";
      }

      return styles;
  }

  getStyles(){
      var width = parseInt(this.state.width) + (2*parseInt(this.state.borderWidth));
      width += parseInt(this.state.paddingLeft) + parseInt(this.state.paddingRight);
      width += parseInt(this.state.marginLeft) + parseInt(this.state.marginRight);

      var height = parseInt(this.state.height) + (2*parseInt(this.state.borderWidth));
      height += parseInt(this.state.paddingTop) + parseInt(this.state.paddingBottom);
      height += getCaptionHeight(this.state.caption) + parseInt(this.state.marginTop) + parseInt(this.state.marginBottom);

      var styles = {
          width: width + 'px',
          height: height + 'px',
          margin: this.state.margin + 'px',
          textAlign: 'center',
          display: 'block',
          overflow: 'hidden',
      };

      if(this.state.align=='center'){
          styles.width = "98%";
      }

      return styles;
  }
}

class TwpPostImgHTMLElement extends HTMLElement {

    constructor(){
        super();
        this.data = {
            src      : undefined,
            type     : undefined,
            width    : undefined,
            height   : undefined,
            alt      : undefined,
            align    : undefined,
            caption  : undefined,
            marginTop    : undefined,
            marginBottom : undefined,
            marginLeft   : undefined,
            marginRight  : undefined,
            paddingTop    : undefined,
            paddingBottom : undefined,
            paddingLeft   : undefined,
            paddingRight  : undefined,
            borderWidth  : undefined,
            borderColor  : undefined
        };
        this.component = false;
        this.wrapper   = undefined;
        this.setData = this.setData.bind(this);
        this.renderComponent   = this.renderComponent.bind(this);
        this.connectedCallback = this.connectedCallback.bind(this);
        this.getImgWidthForWrapper  = this.getImgWidthForWrapper.bind(this);
        this.getImgHeightForWrapper = this.getImgHeightForWrapper.bind(this);
        this.getWrapperHeight = this.getWrapperHeight.bind(this);
        this.getWrapperWidth  = this.getWrapperWidth.bind(this);
        this.root = $(this);
    }

    connectedCallback() {
        let self = this;
        this.data = {
            id    : $(this).attr("id"),
            src   : $(this).attr("src"),
            alt      : $(this).attr("alt"),
            align    : $(this).attr("align"),
            width    : $(this).attr("width"),
            height   : $(this).attr("height"),
            caption  : $(this).attr("data-caption"),
            type     : $(this).attr("data-type"),
            marginTop    : $(this).attr("data-margin-top") || 0,
            marginBottom : $(this).attr("data-margin-bottom") || 0,
            marginLeft   : $(this).attr("data-margin-left") || 0,
            marginRight  : $(this).attr("data-margin-right") || 0,
            paddingTop    : $(this).attr("data-padding-top") || 0,
            paddingBottom : $(this).attr("data-padding-bottom") || 0,
            paddingLeft   : $(this).attr("data-padding-left") || 0,
            paddingRight  : $(this).attr("data-padding-right") || 0,
            borderWidth  : $(this).attr("data-border-width") || 0,
            borderColor  : $(this).attr("data-border-color") || 0
        };
        var wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'twp-post-img-wrapper');

        var wrapperHeight = this.getWrapperHeight();
        var wrapperWidth  = this.getWrapperWidth();

        $(wrapper).css("width",  wrapperWidth + "px");
        $(wrapper).css("height", wrapperHeight + "px");
        $(wrapper).css('padding','10px');
        $(wrapper).css('display','block');
        $(wrapper).css('box-sizing','border-box');

        var oldWrapper = this.getElementsByClassName("twp-post-img-wrapper");

        if(oldWrapper.length>0){
            oldWrapper = oldWrapper[0];
            this.replaceChild(wrapper, oldWrapper);
        }else{
            this.appendChild(wrapper);
        }
        this.wrapper = wrapper;
        var mountPoint = document.createElement('div');
        if(window.__editing){
            this.wrapper.attachShadow({mode: "open"}).appendChild(mountPoint);
            this.setEdit();
        }else{
            this.wrapper.appendChild(mountPoint);
        }
        this.mountPoint = mountPoint;
        this.renderComponent();
    }

    setEdit(){
        var self = this;
        var removeFunction = function(event) {
            event.preventDefault();
            var key = event.keyCode || event.charCode;
            if( key == 8 || key == 46 ){
                self.autoRemove();
            }
        };
        this.root.find(".twp-post-img-wrapper").on('mousedown', function(e){
            e.preventDefault();
        });
        this.root.find(".twp-post-img-wrapper").click(function(){
            document.activeElement.blur();
            $("html").on('keydown', removeFunction);
            self.root.find(".twp-post-img-wrapper").css('border','4px solid #ddd');
            var wrapper = self.root.find(".twp-post-img-wrapper").first().get(0);
            interact(wrapper).resizable({
                preserveAspectRatio: true,
                square : true,
                edges: {
                    left: true,
                    right: true,
                    bottom: true,
                    top: true
                }
            }).on('resizemove', function (event) {

                var width  = self.getImgWidthForWrapper(event.rect.width);
                var height = self.getImgHeightForWrapper(event.rect.height);
                var ratio = self.data.width/self.data.height;

                if(self.data.align==='center'){
                    self.data.height = height;
                    self.data.width  = height*ratio;
                }else{
                    self.data.width  = width;
                    self.data.height = width/ratio;
                }

                $(self).attr("width", self.data.width);
                $(self).attr("height", self.data.height);
                self.renderComponent();
            });
        });
        this.root.find(".twp-post-img-wrapper").dblclick(function(){
            window.modalManager.create('ModalImage',{
                tag: self,
                callback: function(data){
                    self.setData(data);
                }
            });
        });
        $("body").click(function(event){
            if($(event.target).parents('twp-post-img').length===0){
                $("html").off('keydown', removeFunction);
                self.root.find(".twp-post-img-wrapper").css('border','0px');
            }
        });
    }

    renderComponent(){
        var data = this.data;
        var width = this.getWrapperWidth();
        var height = this.getWrapperHeight();
        $(this.wrapper).css("width", width);
        $(this.wrapper).css("height", height);

        if(this.data.align=='center'){
            $(this.wrapper).css("width", "96%");
            $(this.wrapper).css("clear", "both");
            $(this.wrapper).css("float", "none");
        }
        if(this.data.align==='left'){
            $(this.wrapper).css("float", "left");
        }
        if(this.data.align==='right'){
            $(this.wrapper).css("float", "right");
        }

        if(this.component){
            ReactDOM.unmountComponentAtNode(this.mountPoint);
            this.component = false;
        }
        this.component = ReactDOM.render(<TwpPostImgComponent data={data} />, this.mountPoint);
    }

    setData(data){
        this.data = {
            src      : data.src,
            alt      : data.alt,
            caption  : data.caption,
            width    : data.width,
            height   : data.height,
            align    : data.align,
            type     : data.type,
            marginTop    : data.marginTop || 0,
            marginBottom : data.marginBottom || 0,
            marginLeft   : data.marginLeft || 0,
            marginRight  : data.marginRight || 0,
            paddingTop    : data.paddingTop || 0,
            paddingBottom : data.paddingBottom || 0,
            paddingLeft   : data.paddingLeft || 0,
            paddingRight  : data.paddingRight || 0,
            borderWidth  : data.borderWidth || 0,
            borderColor  : data.borderColor || 0
        };
        var attr = {
            'src'      : data.src,
            'alt'      : data.alt,
            'width'    : data.width,
            'height'   : data.height,
            'align'    : data.align,
            'data-caption'  : data.caption,
            'data-type' : data.type,
            'data-margin-top'    : data.marginTop || 0,
            'data-margin-bottom' : data.marginBottom || 0,
            'data-margin-left'   : data.marginLeft || 0,
            'data-margin-right'  : data.marginRight || 0,
            'data-padding-top'   : data.paddingTop || 0,
            'data-padding-bottom' : data.paddingBottom || 0,
            'data-padding-left'   : data.paddingLeft || 0,
            'data-padding-right'  : data.paddingRight || 0,
            'data-border-width'  : data.borderWidth || 0,
            'data-border-color'  : data.borderColor || 0
        };
        $(this).attr(attr);
        this.renderComponent();
    }

    autoRemove(){
        ReactDOM.unmountComponentAtNode(this.mountPoint);
        $(this).detach();
    }

    getWrapperHeight(){
        var height = parseInt(this.data.height) + (2*parseInt(this.data.borderWidth));
        height += parseInt(this.data.paddingTop) + parseInt(this.data.paddingBottom);
        height += getCaptionHeight(this.data.caption) + parseInt(this.data.marginTop) + parseInt(this.data.marginBottom);
        height += 20;
        return height;
    }

    getWrapperWidth(){
        var width = parseInt(this.data.width) + (2*parseInt(this.data.borderWidth));
        width += parseInt(this.data.paddingLeft) + parseInt(this.data.paddingRight);
        width += parseInt(this.data.marginLeft) + parseInt(this.data.marginRight);
        width += 20;
        return width;
    }

    getImgHeightForWrapper(wrapperHeight){
        var paddingHeight = (parseInt(this.data.paddingTop) + parseInt(this.data.paddingBottom));
        var marginHeight  = (parseInt(this.data.marginTop) + parseInt(this.data.marginBottom));
        var borderHeight  = (2*parseInt(this.data.borderWidth));
        var smallHeight   = getCaptionHeight(this.data.caption);

        var diff = paddingHeight + marginHeight + borderHeight + smallHeight;
        var height = wrapperHeight - diff;
        return height;
    }

    getImgWidthForWrapper(wrapperWidth){
        var paddingWidth = (parseInt(this.data.paddingLeft) + parseInt(this.data.paddingRight));
        var marginWidth  = (parseInt(this.data.marginLeft) + parseInt(this.data.marginRight));
        var borderWidth  = (2*parseInt(this.data.borderWidth));

        var diff = paddingWidth + marginWidth + borderWidth;
        var width = wrapperWidth - diff;
        return width;
    }
}

if(window.customElements!==undefined){
    if(window.customElements.get('twp-post-img')===undefined){
        window.customElements.define('twp-post-img', TwpPostImgHTMLElement);
    }
}

export default TwpPostImgHTMLElement;
