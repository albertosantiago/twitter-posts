import React from 'react';
import $ from 'jquery';

const I18n = require('react-i18nify').I18n;

var util = require('app/lib/util');

class TagEditor extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            tags: props.tags
        };
        this.handleChangeTags = this.handleChangeTags.bind(this);
    }

    shouldComponentUpdate(nextProps,nexStates){
        return true;
    }

    componentDidMount(){}

    handleChangeTags(event)
    {
        var processedTags = '';
        var rawTags =  event.target.value;

        var lastLetter = rawTags[(rawTags.length-1)];
        if(lastLetter!==' '){
            lastLetter = '';
        }
        rawTags  = rawTags.replace(/\s\s/i,' ');
        var tags = rawTags.split(" ");
        for(var i=0;i<tags.length;i++){
            let tag = tags[i];
            if(tag[0]!=='#'){
                if(tag.trim().length>0){
                    tag = '#' + tag;
                }
            }
            if(i<(tags.length-1)){
                if(tag.length>2){
                    processedTags += ' ' + tag;
                }
            }else{
                processedTags += ' ' + tag;
            }
        }
        processedTags = processedTags.trim() + lastLetter;
        processedTags = processedTags.substring(0,120);
        this.setState({tags: processedTags});
        this.props.onChangeTags(processedTags);
    }

    render() {
        return <div id="tags-editor">
                    <div className="field">
                        <textarea name="tags" ref="tags" id="tags" className="tags-editor" placeholder={I18n.t('app.tag_editor.placeholder')} value={this.state.tags} onChange={this.handleChangeTags}></textarea>
                    </div>
               </div>;

    }
}

TagEditor.defaultProps = {};

export default TagEditor;
