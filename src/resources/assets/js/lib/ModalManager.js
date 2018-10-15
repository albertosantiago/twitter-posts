import $ from 'jquery';
import ReactDOM from 'react-dom';
import React from 'react';

import ModalLogin from      'app/components/ModalLogin';
import ModalRetweet from    'app/components/ModalRetweet';
import ModalPostDelete from 'app/components/post/ModalPostDelete';
import ModalPreview from    'app/components/editor/ModalPreview';
import ModalPublish from    'app/components/editor/ModalPublish';
import ModalUnpublish from  'app/components/editor/ModalUnpublish';
import ModalImage from 'app/components/editor/ModalImage';
import ModalImageGallery from 'app/components/editor/ModalImageGallery';
import ModalLibrary from 'app/components/editor/ModalLibrary';
import ModalTweet from 'app/components/editor/ModalTweet';
import ModalThread from 'app/components/editor/ModalThread';
import ModalLink from 'app/components/editor/ModalLink';
import ModalMention from 'app/components/editor/ModalMention';
import ModalMedia from 'app/components/editor/ModalMedia';
import ModalEditorCode from 'app/components/editor/ModalEditorCode';

var modals = {
    ModalLogin:      ModalLogin,
    ModalRetweet:    ModalRetweet,
    ModalPostDelete: ModalPostDelete,
    ModalPublish:    ModalPublish,
    ModalUnpublish:  ModalUnpublish,
    ModalPreview:    ModalPreview,
    ModalEditorCode: ModalEditorCode,
    ModalImageGallery: ModalImageGallery,
    ModalImage:   ModalImage,
    ModalLibrary: ModalLibrary,
    ModalTweet:   ModalTweet,
    ModalThread:   ModalThread,
    ModalMedia:   ModalMedia,
    ModalLink:    ModalLink,
    ModalMention: ModalMention
};

class ModalManager{

    constructor(){
        this.modals = [];
        this.modalContainers = [];
        this.unmount = this.unmount.bind(this);
        this.create  = this.create.bind(this);
    }

    create(className, options){
        var index  =  this.modals.length;
        var zIndex = 100 + index;
        var self = this;

        var container   = document.createElement("div");
        container.setAttribute('class','app-modal-container');
        container.id    = "app-modal-container-"+index;
        $(container).css('z-index', zIndex);
        $('body').append(container);

        options.context = container;
        var onUserCancel = options.onUserCancel;
        options.onUserCancel = function(){
            self.unmount(index);
            if(onUserCancel!==undefined){
                onUserCancel();
            }
        };

        var modal = React.createElement(modals[className], options, null);
        this.modalContainers.push(ReactDOM.render(modal, container));
        this.modals.push(modal);
    }


    unmount(index){
        ReactDOM.unmountComponentAtNode(document.getElementById('app-modal-container-'+index));
        $('#app-modal-container-'+index).remove();
    }

};

export default ModalManager;
