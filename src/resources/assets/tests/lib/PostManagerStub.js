var postMock  = require("tests/lib/post_mock");

class PostManagerStub{

    unpublish(params){
        params.done();
    }

    publish(params){
        params.done();
    }

    createTweetForPublish(params){
        return params.title;
    }

    checkTweetForPublish(params){
        //var expectedLink = 'https://twitter-posts.com/posts/view/'+params.postSlug+'/'+params.postId;
        var content = params.content;

        /**if(content.search(expectedLink)===-1){
            return false;
        }**/

        var links   = /\bhttp.*\b/i;
        var tweet   = content.replace(links, 'http://t.co/SSSSSSSSSSS');
        var rest = 140 - tweet.length;
        if(rest<0){
            return false;
        }
        return true;
    }

    save(params){
        var data = {
            type: 'post',
            id: postMock.id,
            status: 200,
            data: postMock
        };
        params.done(data);
    }
}

export default PostManagerStub;
