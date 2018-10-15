import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import App from 'app/app';
import TinyMce from './TinyMce';
import TagEditor from './TagEditor';
import FeaturedImagePicker from './FeaturedImagePicker';
import ConfigPostEditor from './ConfigPostEditor';

const Translate = require('react-i18nify').Translate;
const I18n = require('react-i18nify').I18n;

$.fn.form = require('semantic-ui-form');
$.fn.transition = require('semantic-ui-transition');
$.fn.transition.settings.silent = true;

class EditorComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            id: props.post.id,
            content: props.post.content,
            title: props.post.title,
            tags: props.post.tags,
            slug: props.post.slug,
            adult_content: props.post.adult_content,
            in_reply_to:     props.post.in_reply_to,
            comments_status: props.post.comments_status,
            mention_notifications_status: props.post.mention_notifications_status,
            featured_img: props.post.featured_img,
            showPreview: false,
            showPublish: false,
            showUnpublish: false
        };
        this.dom = undefined;
        this.getTemplate = this.getTemplate.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChangeContent = this.handleChangeContent.bind(this);
        this.handleChangeFeaturedImg = this.handleChangeFeaturedImg.bind(this);
        this.handleChangeTags    = this.handleChangeTags.bind(this);
        this.handleChangeConfig  = this.handleChangeConfig.bind(this);
        this.handlePreview = this.handlePreview.bind(this);
        this.handlePublish = this.handlePublish.bind(this);
        this.handleUnpublish = this.handleUnpublish.bind(this);
        this.handleSubmit    = this.handleSubmit.bind(this);
        this.handleSubmitSuccess  = this.handleSubmitSuccess.bind(this);
        this.handleSubmitError    = this.handleSubmitError.bind(this);
        this.handleSave  = this.handleSave.bind(this);
        this.refresh     = this.refresh.bind(this);
    }

    componentDidMount() {
        this.dom = $(ReactDOM.findDOMNode(this));
        var submitForm = this.handleSubmit;
        var settings = {
            onSuccess: submitForm,
            inline: true,
            fields : {
                title: {
                    identifier: 'title',
                        rules: [{
                            type : 'empty',
                            prompt : 'Please enter a title'
                        }]
                 },
                 content: {
                      identifier: 'content',
                      rules: [{
                          type   : 'empty',
                          prompt : 'Please enter a post'
                        },{
                          type   : 'minLength[140]',
                          prompt : 'Your post must be at least {ruleValue} characters'
                        }]
                 },
                 tags: {
                      identifier: 'tags',
                      rules: [{
                          type   : 'empty',
                          prompt : 'Please enter some tags'
                        },{
                          type   : 'minLength[10]',
                          prompt : 'The tags field must be at least {ruleValue} characters'
                        }]
                 },
                 adult_content:{
                     identifier: 'adult_content'
                 },
                 mention_notifications_status:{
                     identifier: 'mention_notifications_status'
                 },
                 comments_status:{
                     identifier: 'comments_status'
                 },
                 in_reply_to: {
                     identifier: 'in_reply_to',
                     optional: true,
                     rules: [{
                         type : 'url',
                         prompt : 'Please enter a correct url'
                     }]
                 },
            }
        };
        this.dom.find('.ui.twitter-posts-editor.form').form(settings);
    }

    render() {
        var params = {};
        params.title = I18n.t('editor.new_post');
        params.activePublish = "disabled";
        params.postLink = '';

        if(this.state.id){
            params.title = I18n.t('editor.edit_post');
            params.activePublish = "";
            params.postLink = <a className="ui button right" href={"/posts/view/"+this.state.slug+"/"+this.state.id}>{I18n.t('app.view')}</a>;
        }

        params.publishButton = <div className={"small ui primary button right floated " + params.activePublish} onClick={this.handlePublish} ref="pub">{I18n.t('app.publish')}</div>;
        if(this.props.post.status_str==='published'){
            params.publishButton = <div className={"small ui red button right floated "} onClick={this.handleUnpublish} ref="unpub">{I18n.t('app.unpublish')}</div>;
        }
        if(this.props.withColumns){
            return this.getColumnTemplate(params);
        }
        return this.getTemplate(params);
    }

    getTemplate(params){
        return <div>
            <div className="ui grid twitter-posts-editor form">
                <div className="sixteen wide column">
                    <div className="ui message-container"></div>
                    <h2 className="ui top attached header">{params.title}{params.postLink}</h2>
                    <div className="ui bottom attached segment">
                        <div className="small ui button" onClick={this.handleSave} ref="save">{I18n.t('app.save')}</div>
                        <div className="small ui default button" onClick={this.handlePreview} ref="preview">{I18n.t('app.preview')}</div>
                        {params.publishButton}
                    </div>
                </div>
                <div className="sixteen wide column">
                    <div className="ui large form">
                        <input type="hidden" name="slug" value={this.state.slug} />
                        <input type="hidden" name="_id" value={this.state.id} />
                        <div className="field">
                            <label>{I18n.t('app.title')}</label>
                            <input type="text" name="title" placeholder={I18n.t('editor.post_title')} value={this.state.title} onChange={this.handleInputChange}/>
                        </div>
                        <div className="field">
                            <label>{I18n.t('app.content')}</label>
                            <TinyMce content={this.state.content} onChangeContent={this.handleChangeContent}/>
                        </div>
                        <div className="ui error message"></div>
                    </div>
                </div>
                <div className="sixteen wide column">
                    <h4 className="ui top attached header">{I18n.t('app.setup')}</h4>
                    <div className="ui bottom attached segment">
                        <ConfigPostEditor adult_content={this.state.adult_content}
                                          comments_status={this.state.comments_status}
                                          mention_notifications_status={this.state.mention_notifications_status}
                                          in_reply_to={this.state.in_reply_to}
                                          onChangeConfig={this.handleChangeConfig}/>
                    </div>
                </div>
                <div className="sixteen wide column">
                    <h4 className="ui top attached header">Featured Image</h4>
                    <div className="ui bottom attached segment">
                        <FeaturedImagePicker img={this.state.featured_img} onChange={this.handleChangeFeaturedImg} />
                    </div>
                </div>
                <div className="sixteen wide column">
                    <h4 className="ui top attached header">Tags</h4>
                    <div className="ui bottom attached segment">
                        <TagEditor tags={this.state.tags} onChangeTags={this.handleChangeTags}/>
                    </div>
                </div>
            </div>
        </div>;
    }

    getColumnTemplate(params){
        return <div>
            <div className="ui grid twitter-posts-editor form">
                <div className="eleven wide column">
                    <div className="ui message-container"></div>
                    {params.postLink}
                    <h2>{params.title}</h2>
                    <div className="ui large form">
                        <input type="hidden" name="slug" value={this.state.slug} />
                        <input type="hidden" name="_id" value={this.state.id} />
                        <div className="field">
                            <input type="text" name="title" placeholder={I18n.t('editor.post_title')} value={this.state.title} onChange={this.handleInputChange}/>
                        </div>
                        <div className="field">
                            <label>{I18n.t('app.content')}</label>
                            <TinyMce content={this.state.content} onChangeContent={this.handleChangeContent}/>
                        </div>
                        <div className="ui error message"></div>
                    </div>
                </div>
                <div className="five wide column">
                    <h4 className="ui top attached header">{I18n.t('app.actions')}</h4>
                    <div className="ui bottom attached segment">
                        <div className="small ui button" onClick={this.handleSave} ref="save">{I18n.t('app.save')}</div>
                        <div className="small ui default button" onClick={this.handlePreview} ref="preview">{I18n.t('app.preview')}</div>
                        {params.publishButton}
                    </div>
                    <h4 className="ui top attached header">{I18n.t('app.setup')}</h4>
                    <div className="ui bottom attached segment">
                        <ConfigPostEditor adult_content={this.state.adult_content}
                                          comments_status={this.state.comments_status}
                                          mention_notifications_status={this.state.mention_notifications_status}
                                          in_reply_to={this.state.in_reply_to}
                                          onChangeConfig={this.handleChangeConfig}/>
                    </div>
                    <h4 className="ui top attached header">{I18n.t('editor.featured_img')}</h4>
                    <div className="ui bottom attached segment">
                        <FeaturedImagePicker  img={this.state.featured_img} onChange={this.handleChangeFeaturedImg} />
                    </div>
                    <h4 className="ui top attached header">{I18n.t('app.tags')}</h4>
                    <div className="ui bottom attached segment">
                        <TagEditor tags={this.state.tags} onChangeTags={this.handleChangeTags}/>
                    </div>
                </div>
            </div>
        </div>;
    }


    handleInputChange(event) {
       const target = event.target;
       const value = target.type === 'checkbox' ? target.checked : target.value;
       const name  = target.name;

       this.setState({
         [name]: value
       });
    }

    handleChangeConfig(config){
        this.setState({
            adult_content: config.adult_content,
            in_reply_to: config.in_reply_to,
            comments_status: config.comments_status,
        });
    }

    handleChangeContent(content){
        this.setState({
          content: content
        });
    }

    handleChangeTags(tags){
        this.setState({
          tags: tags
        });
    }

    handleChangeFeaturedImg(src){
        this.setState({
          featured_img: src
        });
    }

    handleSave(e){
        var container = document.createElement('div');
        $(container).html(this.state.content);
        $(container).trigger("create");
        var renderedHTML = $(container).html();
        this.setState({content:renderedHTML});
        this.dom.find('#post-content').val(renderedHTML);
        this.dom.find('.ui.twitter-posts-editor.form').form('validate form');
    }

    handleSubmit() {
        var self = this;
        this.dom.find(".ui.twitter-posts.form").addClass("loading");
        this.dom.find(".ui.submit.button").addClass("loading");
        var params = {
            data : {
                id: this.state.id,
                title: this.state.title,
                tags:  this.state.tags,
                content: this.state.content,
                in_reply_to: this.state.in_reply_to,
                comments_status: this.state.comments_status,
                adult_content: this.state.adult_content,
                featured_img: this.state.featured_img,
                _token:  this.state._token,
            },
            done: function(data){
                self.dom.find(".ui.large.form").removeClass("loading");
                self.dom.find(".ui.submit.button").removeClass("loading");
                if(data.status==200){
                    self.handleSubmitSuccess(data);
                }else{
                    self.handleSubmitError();
                }
                self.dom.find('.message .close').on('click', function(){
                    self.dom.find(this)
                      .closest('.message')
                      .transition('fade');
                });
            }
        };
        App.get('postManager').save(params);
    }

    handleSubmitSuccess(ret){
        var self = this;
        if(ret.id){
            this.setState({id:ret.id});
            this.setState({slug:ret.data.slug});
            history.replaceState({}, "Editing post `" + this.props.title + '´', "/posts/edit/" + ret.id );
        }
        var successMsg = "<div class='ui success message'>" +
                         "<i class='close icon'></i>" +
                         "<div class='header'>Post Saved</div>" +
                         "<p>The post was successufully saved.</p>" +
                         "</div>";
        this.dom.find(".message-container").html(successMsg);
        this.dom.find(".ui.large.form").addClass("success");
    }

    handleSubmitError(){
        var errorMsg = "<div class='ui error message'>" +
                         "<i class='close icon'></i>" +
                         "<div class='header'>Form Error</div>" +
                         "<p>There was a problem during the send. Sorry for the inconvenience. Please, try again later.</p></div>";
        this.dom.find(".message-container").html(errorMsg);
        this.dom.find(".ui.large.form").addClass("error");
    }

    handlePreview(e) {
        window.__editing = false;
        App.get('modalManager').create('ModalPreview', {
            title: this.state.title,
            tags:  this.state.tags,
            content: this.state.content
        });
        twttr.widgets.load();
    }

    handlePublish(e) {
        App.get('modalManager').create('ModalPublish', {
            user_screen_name: this.props.post.user_screen_name,
            id:     this.state.id,
            title:  this.state.title,
            tags:   this.state.tags,
            slug:   this.state.slug,
            content:      this.state.content,
            onSuccess:    this.refresh,
        });
    }

    handleUnpublish(e) {
        App.get('modalManager').create('ModalUnpublish',{
            post: this.props.post,
            onSuccess:this.refresh
        });
    }

    refresh(){
        window.location.reload();
    }
};

EditorComponent.defaultProps = {};
export default EditorComponent ;
