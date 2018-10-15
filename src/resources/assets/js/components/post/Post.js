import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import PostAdminMenu from './PostAdminMenu';
import PostGuestMenu from './PostGuestMenu';
import TimeFormatter from './TimeFormatter';


/**
* ¡¡¡¡IMPORTANTE!!!
* ANTIGUO COMPONENTE, NO USADO MÁS.
* PENDIENTE DE BORRAR.
**/

class PostComponent extends React.Component {

    constructor(props){
        super(props);
        let tmpDate = this.props.post.modified_at.date.split(".")[0];
        this.state = {
            isGuest: true,
            modified_at: tmpDate
        };
        this.renderTags = this.renderTags.bind(this);
    }

    render(){
        let draft = '';
        if(this.props.post.status_str==='draft'){
            draft = <small>- (Private Draft)</small>;
        }
        let inResponseTo = '';
        if(this.props.post.in_reply_to){
            inResponseTo = <div className='ui message in_reaction_to'><span>In reaction To:&nbsp;&nbsp;</span><a href={this.props.post.in_reply_to} rel="nofollow" target="_blank">{this.props.post.in_reply_to}</a><div className="clearfix"></div></div>;
        }
        let ownerMenu = '';
        if(this.props.isOwner){
            ownerMenu = <PostAdminMenu postId={this.props.post.id}/>;
        }
        let guestMenu = '';
        if(this.props.post.tweet_id_str){
            guestMenu = <PostGuestMenu post={this.props.post} tweet_id_str={this.props.post.tweet_id_str} post_id_str={this.props.post._id}  isGuest={this.state.isGuest} />;
        }
        return <div>
                    <div className="ui top attached segment" >
                        <div className="toolbox-container">
                            {ownerMenu}
                        </div>
                        <div className="content post-content">
                            <div className="post-header">
                                <h1>{this.props.post.title}{draft}</h1>
                                <TimeFormatter date={this.state.modified_at} />
                                {inResponseTo}
                            </div>
                            <div className='post-body' dangerouslySetInnerHTML={this.createMarkup()} />
                        </div>
                        <div className="clearfix"></div>
                        <div className="content post-tags">
                            <div dangerouslySetInnerHTML={this.renderTags()} />
                        </div>
                    </div>
                    <div className="guest-menu-container">
                        {guestMenu}
                    </div>
                </div>;
    }

    renderTags(){
        var renderedTags = '';
        var tags = this.props.post.tags.split(" ");
        var screenName = this.props.owner.screen_name;

        for(var i=0;i<tags.length;i++){
            let tag = tags[i].substring(1);
            renderedTags += "<a href='/"+screenName+"?hashtag="+tag+"'>"+tags[i]+"</a>  ";
        }
        return {__html: renderedTags};
    }

    createMarkup(){
        return {__html:this.props.post.content};
    }
};

PostComponent.defaultProps = {};

export default PostComponent ;
