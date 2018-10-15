

class SessionManagerStub{

    constructor(){
        this.stub = {
            logged: false
        };
        this.callbacks = {
            'onlogin':[]
        };
    }

    setStub(key, value){
        this.stub[key] = value;
    }

    isLogged(){
        return this.stub.logged;
    }

    isGuest(){
        return !this.stub.logged;
    }

    setLogged(logged){
        this.stub.logged = logged;
    }

    onLogin(callback){
        this.callbacks.onlogin.push(callback);
    }

    uploadLibraryItem(params){
        var res = {
            "data":{
                "type":"img",
                "mimeType":"image\/png",
                "user_id":3979906515,
                "src":"\/img\/users\/3979906515_Screenshot from 2017-02-12 00:34:23.png?cacheBreaker=1492446686",
                "size":297765,
                "_id":"58f4eddee07e984dc0632723"
            },
            "status":200
        };
        params.success(res);
    }

    removeLibraryItem(params){
        params.success();
    }

    getUserLibrary(params){
        var res = {
            "data":[{
                "_id":"58f4ea07e07e985b514c3f89",
                "type":"img",
                "mimeType":"image\/png",
                "user_id":3979906515,
                "src":"\/img\/users\/3979906515_Screenshot from 2016-11-06 23:25:22.png?cacheBreaker=1492445703",
                "size":90265
            },{
                "_id":"58f4ea08e07e985b514c3f8c",
                "type":"img",
                "mimeType":"image\/png",
                "user_id":3979906515,
                "src":"\/img\/users\/3979906515_Screenshot from 2016-11-29 16:37:17.png?cacheBreaker=1492445704",
                "size":1123492
            },{
                "_id":"58f4eddee07e984dc0632723",
                "type":"img",
                "mimeType":"image\/png",
                "user_id":3979906515,
                "src":"\/img\/users\/3979906515_Screenshot from 2017-02-12 00:34:23.png?cacheBreaker=1492446686","size":297765
            }],
            "status":200
        };
        params.callback(res);
    }
};

export default SessionManagerStub;
