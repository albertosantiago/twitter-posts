import React, { Component } from 'react';
import {
  ShareButtons,
  ShareCounts,
  generateShareIcon,
} from 'react-share';


const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  TelegramShareButton,
  WhatsappShareButton,
} = ShareButtons;

const {
  FacebookShareCount,
  GooglePlusShareCount,
  LinkedinShareCount,
  PinterestShareCount,
  VKShareCount,
  OKShareCount,
} = ShareCounts;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const LinkedinIcon = generateShareIcon('linkedin');
const PinterestIcon = generateShareIcon('pinterest');
const VKIcon = generateShareIcon('vk');
const OKIcon = generateShareIcon('ok');
const TelegramIcon = generateShareIcon('telegram');
const WhatsappIcon = generateShareIcon('whatsapp');

class SocialShare extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            post: props.post
        };
    }

    render() {
        const shareUrl = 'https://twitter-posts.com/posts/view/'+this.state.post.slug+"/"+this.state.post.id;
        const title    = this.state.post.title;

        return (
          <div className="social-share-container">
            <div className="social-share-item">
              <FacebookShareButton
                url={shareUrl}
                title={title}
                className="social-share-item__share-button">
                <FacebookIcon
                  size={30}
                  round />
              </FacebookShareButton>
            </div>

            <div className="social-share-item">
              <TwitterShareButton
                url={shareUrl}
                title={title}
                className="social-share-item__share-button">
                <TwitterIcon
                  size={30}
                  round />
              </TwitterShareButton>
            </div>

            <div className="social-share-item">
              <TelegramShareButton
                url={shareUrl}
                title={title}
                className="social-share-item__share-button">
                <TelegramIcon size={30} round />
              </TelegramShareButton>
            </div>

            <div className="social-share-item">
              <WhatsappShareButton
                url={shareUrl}
                title={title}
                separator=":: "
                className="social-share-item__share-button">
                <WhatsappIcon size={30} round />
              </WhatsappShareButton>
            </div>

            <div className="social-share-item">
              <GooglePlusShareButton
                url={shareUrl}
                className="social-share-item__share-button">
                <GooglePlusIcon
                  size={30}
                  round />
              </GooglePlusShareButton>
            </div>

            <div className="social-share-item">
              <LinkedinShareButton
                url={shareUrl}
                title={title}
                windowWidth={750}
                windowHeight={600}
                className="social-share-item__share-button">
                <LinkedinIcon
                  size={30}
                  round />
              </LinkedinShareButton>
            </div>

            <div className="social-share-item">
              <PinterestShareButton
                url={String(window.location)}
                windowWidth={1000}
                windowHeight={730}
                className="social-share-item__share-button">
                <PinterestIcon size={30} round />
              </PinterestShareButton>
            </div>

            <div className="social-share-item">
              <VKShareButton
                url={shareUrl}
                windowWidth={660}
                windowHeight={460}
                className="social-share-item__share-button">
                <VKIcon
                  size={30}
                  round />
              </VKShareButton>
            </div>

    		<div className="social-share-item">
              <OKShareButton
                url={shareUrl}
                windowWidth={660}
                windowHeight={460}
                className="social-share-item__share-button">
                <OKIcon
                  size={30}
                  round />
              </OKShareButton>
            </div>
          </div>
        );
    }
}

export default SocialShare;
