
window.projectVersion = 'master';

(function(root) {

    var bhIndex = null;
    var rootPath = '';
    var treeHtml = '        <ul>                <li data-name="namespace:" class="opened">                    <div style="padding-left:0px" class="hd">                        <span class="glyphicon glyphicon-play"></span><a href=".html">App</a>                    </div>                    <div class="bd">                                <ul>                <li data-name="namespace:App_Api" class="opened">                    <div style="padding-left:18px" class="hd">                        <span class="glyphicon glyphicon-play"></span><a href="App/Api.html">Api</a>                    </div>                    <div class="bd">                                <ul>                <li data-name="class:App_Api_SessionManager" >                    <div style="padding-left:44px" class="hd leaf">                        <a href="App/Api/SessionManager.html">SessionManager</a>                    </div>                </li>                            <li data-name="class:App_Api_SocialManager" >                    <div style="padding-left:44px" class="hd leaf">                        <a href="App/Api/SocialManager.html">SocialManager</a>                    </div>                </li>                            <li data-name="class:App_Api_TwitterManager" >                    <div style="padding-left:44px" class="hd leaf">                        <a href="App/Api/TwitterManager.html">TwitterManager</a>                    </div>                </li>                            <li data-name="class:App_Api_TwitterStubService" >                    <div style="padding-left:44px" class="hd leaf">                        <a href="App/Api/TwitterStubService.html">TwitterStubService</a>                    </div>                </li>                            <li data-name="class:App_Api_UserRepository" >                    <div style="padding-left:44px" class="hd leaf">                        <a href="App/Api/UserRepository.html">UserRepository</a>                    </div>                </li>                            <li data-name="class:App_Api_Util" >                    <div style="padding-left:44px" class="hd leaf">                        <a href="App/Api/Util.html">Util</a>                    </div>                </li>                </ul></div>                </li>                            <li data-name="namespace:App_Console" class="opened">                    <div style="padding-left:18px" class="hd">                        <span class="glyphicon glyphicon-play"></span><a href="App/Console.html">Console</a>                    </div>                    <div class="bd">                                <ul>                <li data-name="namespace:App_Console_Commands" >                    <div style="padding-left:36px" class="hd">                        <span class="glyphicon glyphicon-play"></span><a href="App/Console/Commands.html">Commands</a>                    </div>                    <div class="bd">                                <ul>                <li data-name="namespace:App_Console_Commands_Twitter" >                    <div style="padding-left:54px" class="hd">                        <span class="glyphicon glyphicon-play"></span><a href="App/Console/Commands/Twitter.html">Twitter</a>                    </div>                    <div class="bd">                                <ul>                <li data-name="class:App_Console_Commands_Twitter_SearchReplies" >                    <div style="padding-left:80px" class="hd leaf">                        <a href="App/Console/Commands/Twitter/SearchReplies.html">SearchReplies</a>                    </div>                </li>                </ul></div>                </li>                            <li data-name="class:App_Console_Commands_BaseCommand" >                    <div style="padding-left:62px" class="hd leaf">                        <a href="App/Console/Commands/BaseCommand.html">BaseCommand</a>                    </div>                </li>                            <li data-name="class:App_Console_Commands_SystemLogTrait" >                    <div style="padding-left:62px" class="hd leaf">                        <a href="App/Console/Commands/SystemLogTrait.html">SystemLogTrait</a>                    </div>                </li>                </ul></div>                </li>                            <li data-name="class:App_Console_Kernel" >                    <div style="padding-left:44px" class="hd leaf">                        <a href="App/Console/Kernel.html">Kernel</a>                    </div>                </li>                </ul></div>                </li>                            <li data-name="namespace:App_Exceptions" class="opened">                    <div style="padding-left:18px" class="hd">                        <span class="glyphicon glyphicon-play"></span><a href="App/Exceptions.html">Exceptions</a>                    </div>                    <div class="bd">                                <ul>                <li data-name="class:App_Exceptions_Handler" >                    <div style="padding-left:44px" class="hd leaf">                        <a href="App/Exceptions/Handler.html">Handler</a>                    </div>                </li>                </ul></div>                </li>                            <li data-name="namespace:App_Http" class="opened">                    <div style="padding-left:18px" class="hd">                        <span class="glyphicon glyphicon-play"></span><a href="App/Http.html">Http</a>                    </div>                    <div class="bd">                                <ul>                <li data-name="namespace:App_Http_Controllers" >                    <div style="padding-left:36px" class="hd">                        <span class="glyphicon glyphicon-play"></span><a href="App/Http/Controllers.html">Controllers</a>                    </div>                    <div class="bd">                                <ul>                <li data-name="namespace:App_Http_Controllers_Admin" >                    <div style="padding-left:54px" class="hd">                        <span class="glyphicon glyphicon-play"></span><a href="App/Http/Controllers/Admin.html">Admin</a>                    </div>                    <div class="bd">                                <ul>                <li data-name="namespace:App_Http_Controllers_Admin_Auth" >                    <div style="padding-left:72px" class="hd">                        <span class="glyphicon glyphicon-play"></span><a href="App/Http/Controllers/Admin/Auth.html">Auth</a>                    </div>                    <div class="bd">                                <ul>                <li data-name="class:App_Http_Controllers_Admin_Auth_ForgotPasswordController" >                    <div style="padding-left:98px" class="hd leaf">                        <a href="App/Http/Controllers/Admin/Auth/ForgotPasswordController.html">ForgotPasswordController</a>                    </div>                </li>                            <li data-name="class:App_Http_Controllers_Admin_Auth_LoginController" >                    <div style="padding-left:98px" class="hd leaf">                        <a href="App/Http/Controllers/Admin/Auth/LoginController.html">LoginController</a>                    </div>                </li>                            <li data-name="class:App_Http_Controllers_Admin_Auth_RegisterController" >                    <div style="padding-left:98px" class="hd leaf">                        <a href="App/Http/Controllers/Admin/Auth/RegisterController.html">RegisterController</a>                    </div>                </li>                            <li data-name="class:App_Http_Controllers_Admin_Auth_ResetPasswordController" >                    <div style="padding-left:98px" class="hd leaf">                        <a href="App/Http/Controllers/Admin/Auth/ResetPasswordController.html">ResetPasswordController</a>                    </div>                </li>                </ul></div>                </li>                            <li data-name="namespace:App_Http_Controllers_Admin_CMS" >                    <div style="padding-left:72px" class="hd">                        <span class="glyphicon glyphicon-play"></span><a href="App/Http/Controllers/Admin/CMS.html">CMS</a>                    </div>                    <div class="bd">                                <ul>                <li data-name="class:App_Http_Controllers_Admin_CMS_ContactController" >                    <div style="padding-left:98px" class="hd leaf">                        <a href="App/Http/Controllers/Admin/CMS/ContactController.html">ContactController</a>                    </div>                </li>                            <li data-name="class:App_Http_Controllers_Admin_CMS_PostController" >                    <div style="padding-left:98px" class="hd leaf">                        <a href="App/Http/Controllers/Admin/CMS/PostController.html">PostController</a>                    </div>                </li>                            <li data-name="class:App_Http_Controllers_Admin_CMS_UserController" >                    <div style="padding-left:98px" class="hd leaf">                        <a href="App/Http/Controllers/Admin/CMS/UserController.html">UserController</a>                    </div>                </li>                </ul></div>                </li>                            <li data-name="class:App_Http_Controllers_Admin_AdminController" >                    <div style="padding-left:80px" class="hd leaf">                        <a href="App/Http/Controllers/Admin/AdminController.html">AdminController</a>                    </div>                </li>                            <li data-name="class:App_Http_Controllers_Admin_AuthController" >                    <div style="padding-left:80px" class="hd leaf">                        <a href="App/Http/Controllers/Admin/AuthController.html">AuthController</a>                    </div>                </li>                            <li data-name="class:App_Http_Controllers_Admin_CronController" >                    <div style="padding-left:80px" class="hd leaf">                        <a href="App/Http/Controllers/Admin/CronController.html">CronController</a>                    </div>                </li>                            <li data-name="class:App_Http_Controllers_Admin_LogController" >                    <div style="padding-left:80px" class="hd leaf">                        <a href="App/Http/Controllers/Admin/LogController.html">LogController</a>                    </div>                </li>                            <li data-name="class:App_Http_Controllers_Admin_ProcessController" >                    <div style="padding-left:80px" class="hd leaf">                        <a href="App/Http/Controllers/Admin/ProcessController.html">ProcessController</a>                    </div>                </li>                            <li data-name="class:App_Http_Controllers_Admin_ServerController" >                    <div style="padding-left:80px" class="hd leaf">                        <a href="App/Http/Controllers/Admin/ServerController.html">ServerController</a>                    </div>                </li>                </ul></div>                </li>                            <li data-name="class:App_Http_Controllers_Controller" >                    <div style="padding-left:62px" class="hd leaf">                        <a href="App/Http/Controllers/Controller.html">Controller</a>                    </div>                </li>                            <li data-name="class:App_Http_Controllers_MainController" >                    <div style="padding-left:62px" class="hd leaf">                        <a href="App/Http/Controllers/MainController.html">MainController</a>                    </div>                </li>                            <li data-name="class:App_Http_Controllers_PagesController" >                    <div style="padding-left:62px" class="hd leaf">                        <a href="App/Http/Controllers/PagesController.html">PagesController</a>                    </div>                </li>                            <li data-name="class:App_Http_Controllers_PostController" >                    <div style="padding-left:62px" class="hd leaf">                        <a href="App/Http/Controllers/PostController.html">PostController</a>                    </div>                </li>                            <li data-name="class:App_Http_Controllers_ProfileController" >                    <div style="padding-left:62px" class="hd leaf">                        <a href="App/Http/Controllers/ProfileController.html">ProfileController</a>                    </div>                </li>                            <li data-name="class:App_Http_Controllers_RobotsController" >                    <div style="padding-left:62px" class="hd leaf">                        <a href="App/Http/Controllers/RobotsController.html">RobotsController</a>                    </div>                </li>                            <li data-name="class:App_Http_Controllers_TwitterController" >                    <div style="padding-left:62px" class="hd leaf">                        <a href="App/Http/Controllers/TwitterController.html">TwitterController</a>                    </div>                </li>                            <li data-name="class:App_Http_Controllers_UploadsController" >                    <div style="padding-left:62px" class="hd leaf">                        <a href="App/Http/Controllers/UploadsController.html">UploadsController</a>                    </div>                </li>                </ul></div>                </li>                            <li data-name="namespace:App_Http_Middleware" >                    <div style="padding-left:36px" class="hd">                        <span class="glyphicon glyphicon-play"></span><a href="App/Http/Middleware.html">Middleware</a>                    </div>                    <div class="bd">                                <ul>                <li data-name="class:App_Http_Middleware_EncryptCookies" >                    <div style="padding-left:62px" class="hd leaf">                        <a href="App/Http/Middleware/EncryptCookies.html">EncryptCookies</a>                    </div>                </li>                            <li data-name="class:App_Http_Middleware_RedirectIfAuthenticated" >                    <div style="padding-left:62px" class="hd leaf">                        <a href="App/Http/Middleware/RedirectIfAuthenticated.html">RedirectIfAuthenticated</a>                    </div>                </li>                            <li data-name="class:App_Http_Middleware_StartSessionManager" >                    <div style="padding-left:62px" class="hd leaf">                        <a href="App/Http/Middleware/StartSessionManager.html">StartSessionManager</a>                    </div>                </li>                            <li data-name="class:App_Http_Middleware_TrimStrings" >                    <div style="padding-left:62px" class="hd leaf">                        <a href="App/Http/Middleware/TrimStrings.html">TrimStrings</a>                    </div>                </li>                            <li data-name="class:App_Http_Middleware_VerifyCsrfToken" >                    <div style="padding-left:62px" class="hd leaf">                        <a href="App/Http/Middleware/VerifyCsrfToken.html">VerifyCsrfToken</a>                    </div>                </li>                </ul></div>                </li>                            <li data-name="class:App_Http_Kernel" >                    <div style="padding-left:44px" class="hd leaf">                        <a href="App/Http/Kernel.html">Kernel</a>                    </div>                </li>                </ul></div>                </li>                            <li data-name="namespace:App_Model" class="opened">                    <div style="padding-left:18px" class="hd">                        <span class="glyphicon glyphicon-play"></span><a href="App/Model.html">Model</a>                    </div>                    <div class="bd">                                <ul>                <li data-name="class:App_Model_Admin" >                    <div style="padding-left:44px" class="hd leaf">                        <a href="App/Model/Admin.html">Admin</a>                    </div>                </li>                            <li data-name="class:App_Model_ContactMessage" >                    <div style="padding-left:44px" class="hd leaf">                        <a href="App/Model/ContactMessage.html">ContactMessage</a>                    </div>                </li>                            <li data-name="class:App_Model_CronTask" >                    <div style="padding-left:44px" class="hd leaf">                        <a href="App/Model/CronTask.html">CronTask</a>                    </div>                </li>                            <li data-name="class:App_Model_Post" >                    <div style="padding-left:44px" class="hd leaf">                        <a href="App/Model/Post.html">Post</a>                    </div>                </li>                            <li data-name="class:App_Model_Tweet" >                    <div style="padding-left:44px" class="hd leaf">                        <a href="App/Model/Tweet.html">Tweet</a>                    </div>                </li>                            <li data-name="class:App_Model_User" >                    <div style="padding-left:44px" class="hd leaf">                        <a href="App/Model/User.html">User</a>                    </div>                </li>                </ul></div>                </li>                            <li data-name="namespace:App_Providers" class="opened">                    <div style="padding-left:18px" class="hd">                        <span class="glyphicon glyphicon-play"></span><a href="App/Providers.html">Providers</a>                    </div>                    <div class="bd">                                <ul>                <li data-name="class:App_Providers_AppServiceProvider" >                    <div style="padding-left:44px" class="hd leaf">                        <a href="App/Providers/AppServiceProvider.html">AppServiceProvider</a>                    </div>                </li>                            <li data-name="class:App_Providers_AuthServiceProvider" >                    <div style="padding-left:44px" class="hd leaf">                        <a href="App/Providers/AuthServiceProvider.html">AuthServiceProvider</a>                    </div>                </li>                            <li data-name="class:App_Providers_BroadcastServiceProvider" >                    <div style="padding-left:44px" class="hd leaf">                        <a href="App/Providers/BroadcastServiceProvider.html">BroadcastServiceProvider</a>                    </div>                </li>                            <li data-name="class:App_Providers_ComposerServiceProvider" >                    <div style="padding-left:44px" class="hd leaf">                        <a href="App/Providers/ComposerServiceProvider.html">ComposerServiceProvider</a>                    </div>                </li>                            <li data-name="class:App_Providers_EventServiceProvider" >                    <div style="padding-left:44px" class="hd leaf">                        <a href="App/Providers/EventServiceProvider.html">EventServiceProvider</a>                    </div>                </li>                            <li data-name="class:App_Providers_RouteServiceProvider" >                    <div style="padding-left:44px" class="hd leaf">                        <a href="App/Providers/RouteServiceProvider.html">RouteServiceProvider</a>                    </div>                </li>                </ul></div>                </li>                </ul></div>                </li>                </ul>';

    var searchTypeClasses = {
        'Namespace': 'label-default',
        'Class': 'label-info',
        'Interface': 'label-primary',
        'Trait': 'label-success',
        'Method': 'label-danger',
        '_': 'label-warning'
    };

    var searchIndex = [
                    
            {"type": "Namespace", "link": "App.html", "name": "App", "doc": "Namespace App"},{"type": "Namespace", "link": "App/Api.html", "name": "App\\Api", "doc": "Namespace App\\Api"},{"type": "Namespace", "link": "App/Console.html", "name": "App\\Console", "doc": "Namespace App\\Console"},{"type": "Namespace", "link": "App/Console/Commands.html", "name": "App\\Console\\Commands", "doc": "Namespace App\\Console\\Commands"},{"type": "Namespace", "link": "App/Console/Commands/Twitter.html", "name": "App\\Console\\Commands\\Twitter", "doc": "Namespace App\\Console\\Commands\\Twitter"},{"type": "Namespace", "link": "App/Exceptions.html", "name": "App\\Exceptions", "doc": "Namespace App\\Exceptions"},{"type": "Namespace", "link": "App/Http.html", "name": "App\\Http", "doc": "Namespace App\\Http"},{"type": "Namespace", "link": "App/Http/Controllers.html", "name": "App\\Http\\Controllers", "doc": "Namespace App\\Http\\Controllers"},{"type": "Namespace", "link": "App/Http/Controllers/Admin.html", "name": "App\\Http\\Controllers\\Admin", "doc": "Namespace App\\Http\\Controllers\\Admin"},{"type": "Namespace", "link": "App/Http/Controllers/Admin/Auth.html", "name": "App\\Http\\Controllers\\Admin\\Auth", "doc": "Namespace App\\Http\\Controllers\\Admin\\Auth"},{"type": "Namespace", "link": "App/Http/Controllers/Admin/CMS.html", "name": "App\\Http\\Controllers\\Admin\\CMS", "doc": "Namespace App\\Http\\Controllers\\Admin\\CMS"},{"type": "Namespace", "link": "App/Http/Middleware.html", "name": "App\\Http\\Middleware", "doc": "Namespace App\\Http\\Middleware"},{"type": "Namespace", "link": "App/Model.html", "name": "App\\Model", "doc": "Namespace App\\Model"},{"type": "Namespace", "link": "App/Providers.html", "name": "App\\Providers", "doc": "Namespace App\\Providers"},
            {"type": "Interface", "fromName": "App\\Api", "fromLink": "App/Api.html", "link": "App/Api/SocialManager.html", "name": "App\\Api\\SocialManager", "doc": "&quot;&quot;"},
                    
            
            {"type": "Class", "fromName": "App\\Api", "fromLink": "App/Api.html", "link": "App/Api/SessionManager.html", "name": "App\\Api\\SessionManager", "doc": "&quot;Session management for users from social networks.&quot;"},
                                                        {"type": "Method", "fromName": "App\\Api\\SessionManager", "fromLink": "App/Api/SessionManager.html", "link": "App/Api/SessionManager.html#method___construct", "name": "App\\Api\\SessionManager::__construct", "doc": "&quot;Initializes SessionManager&quot;"},
                    {"type": "Method", "fromName": "App\\Api\\SessionManager", "fromLink": "App/Api/SessionManager.html", "link": "App/Api/SessionManager.html#method_loadFromSession", "name": "App\\Api\\SessionManager::loadFromSession", "doc": "&quot;Load the User from session recovering it from the DB&quot;"},
                    {"type": "Method", "fromName": "App\\Api\\SessionManager", "fromLink": "App/Api/SessionManager.html", "link": "App/Api/SessionManager.html#method_isLogged", "name": "App\\Api\\SessionManager::isLogged", "doc": "&quot;Check if the user is already logged.&quot;"},
                    {"type": "Method", "fromName": "App\\Api\\SessionManager", "fromLink": "App/Api/SessionManager.html", "link": "App/Api/SessionManager.html#method_getCurrentUserId", "name": "App\\Api\\SessionManager::getCurrentUserId", "doc": "&quot;Return the current user ID&quot;"},
                    {"type": "Method", "fromName": "App\\Api\\SessionManager", "fromLink": "App/Api/SessionManager.html", "link": "App/Api/SessionManager.html#method_getCurrentUser", "name": "App\\Api\\SessionManager::getCurrentUser", "doc": "&quot;Return the current user&quot;"},
                    {"type": "Method", "fromName": "App\\Api\\SessionManager", "fromLink": "App/Api/SessionManager.html", "link": "App/Api/SessionManager.html#method_getGuestUser", "name": "App\\Api\\SessionManager::getGuestUser", "doc": "&quot;Return a instance of the guest user&quot;"},
                    {"type": "Method", "fromName": "App\\Api\\SessionManager", "fromLink": "App/Api/SessionManager.html", "link": "App/Api/SessionManager.html#method_logout", "name": "App\\Api\\SessionManager::logout", "doc": "&quot;Clean session data&quot;"},
            
            {"type": "Class", "fromName": "App\\Api", "fromLink": "App/Api.html", "link": "App/Api/SocialManager.html", "name": "App\\Api\\SocialManager", "doc": "&quot;&quot;"},
                    
            {"type": "Class", "fromName": "App\\Api", "fromLink": "App/Api.html", "link": "App/Api/TwitterManager.html", "name": "App\\Api\\TwitterManager", "doc": "&quot;Twitter Rest\/Api Manager&quot;"},
                                                        {"type": "Method", "fromName": "App\\Api\\TwitterManager", "fromLink": "App/Api/TwitterManager.html", "link": "App/Api/TwitterManager.html#method___construct", "name": "App\\Api\\TwitterManager::__construct", "doc": "&quot;Initialize the manager.&quot;"},
                    {"type": "Method", "fromName": "App\\Api\\TwitterManager", "fromLink": "App/Api/TwitterManager.html", "link": "App/Api/TwitterManager.html#method_getLoginURL", "name": "App\\Api\\TwitterManager::getLoginURL", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Api\\TwitterManager", "fromLink": "App/Api/TwitterManager.html", "link": "App/Api/TwitterManager.html#method_checkCredentials", "name": "App\\Api\\TwitterManager::checkCredentials", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Api\\TwitterManager", "fromLink": "App/Api/TwitterManager.html", "link": "App/Api/TwitterManager.html#method_setWithRelations", "name": "App\\Api\\TwitterManager::setWithRelations", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Api\\TwitterManager", "fromLink": "App/Api/TwitterManager.html", "link": "App/Api/TwitterManager.html#method_updateUser", "name": "App\\Api\\TwitterManager::updateUser", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Api\\TwitterManager", "fromLink": "App/Api/TwitterManager.html", "link": "App/Api/TwitterManager.html#method_getUser", "name": "App\\Api\\TwitterManager::getUser", "doc": "&quot;&quot;"},
            
            {"type": "Class", "fromName": "App\\Api", "fromLink": "App/Api.html", "link": "App/Api/TwitterStubService.html", "name": "App\\Api\\TwitterStubService", "doc": "&quot;&quot;"},
                                                        {"type": "Method", "fromName": "App\\Api\\TwitterStubService", "fromLink": "App/Api/TwitterStubService.html", "link": "App/Api/TwitterStubService.html#method___construct", "name": "App\\Api\\TwitterStubService::__construct", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Api\\TwitterStubService", "fromLink": "App/Api/TwitterStubService.html", "link": "App/Api/TwitterStubService.html#method_postTweet", "name": "App\\Api\\TwitterStubService::postTweet", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Api\\TwitterStubService", "fromLink": "App/Api/TwitterStubService.html", "link": "App/Api/TwitterStubService.html#method_reconfig", "name": "App\\Api\\TwitterStubService::reconfig", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Api\\TwitterStubService", "fromLink": "App/Api/TwitterStubService.html", "link": "App/Api/TwitterStubService.html#method_getRequestToken", "name": "App\\Api\\TwitterStubService::getRequestToken", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Api\\TwitterStubService", "fromLink": "App/Api/TwitterStubService.html", "link": "App/Api/TwitterStubService.html#method_getAuthorizeURL", "name": "App\\Api\\TwitterStubService::getAuthorizeURL", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Api\\TwitterStubService", "fromLink": "App/Api/TwitterStubService.html", "link": "App/Api/TwitterStubService.html#method_getCredentials", "name": "App\\Api\\TwitterStubService::getCredentials", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Api\\TwitterStubService", "fromLink": "App/Api/TwitterStubService.html", "link": "App/Api/TwitterStubService.html#method_createTweet", "name": "App\\Api\\TwitterStubService::createTweet", "doc": "&quot;&quot;"},
            
            {"type": "Class", "fromName": "App\\Api", "fromLink": "App/Api.html", "link": "App/Api/UserRepository.html", "name": "App\\Api\\UserRepository", "doc": "&quot;&quot;"},
                                                        {"type": "Method", "fromName": "App\\Api\\UserRepository", "fromLink": "App/Api/UserRepository.html", "link": "App/Api/UserRepository.html#method___construct", "name": "App\\Api\\UserRepository::__construct", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Api\\UserRepository", "fromLink": "App/Api/UserRepository.html", "link": "App/Api/UserRepository.html#method_updateUser", "name": "App\\Api\\UserRepository::updateUser", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Api\\UserRepository", "fromLink": "App/Api/UserRepository.html", "link": "App/Api/UserRepository.html#method_getUser", "name": "App\\Api\\UserRepository::getUser", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Api\\UserRepository", "fromLink": "App/Api/UserRepository.html", "link": "App/Api/UserRepository.html#method_insertOrUpdateUser", "name": "App\\Api\\UserRepository::insertOrUpdateUser", "doc": "&quot;&quot;"},
            
            {"type": "Class", "fromName": "App\\Api", "fromLink": "App/Api.html", "link": "App/Api/Util.html", "name": "App\\Api\\Util", "doc": "&quot;&quot;"},
                                                        {"type": "Method", "fromName": "App\\Api\\Util", "fromLink": "App/Api/Util.html", "link": "App/Api/Util.html#method_implodeList", "name": "App\\Api\\Util::implodeList", "doc": "&quot;&quot;"},
            
            {"type": "Class", "fromName": "App\\Console\\Commands", "fromLink": "App/Console/Commands.html", "link": "App/Console/Commands/BaseCommand.html", "name": "App\\Console\\Commands\\BaseCommand", "doc": "&quot;&quot;"},
                                                        {"type": "Method", "fromName": "App\\Console\\Commands\\BaseCommand", "fromLink": "App/Console/Commands/BaseCommand.html", "link": "App/Console/Commands/BaseCommand.html#method___construct", "name": "App\\Console\\Commands\\BaseCommand::__construct", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Console\\Commands\\BaseCommand", "fromLink": "App/Console/Commands/BaseCommand.html", "link": "App/Console/Commands/BaseCommand.html#method___destruct", "name": "App\\Console\\Commands\\BaseCommand::__destruct", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Console\\Commands\\BaseCommand", "fromLink": "App/Console/Commands/BaseCommand.html", "link": "App/Console/Commands/BaseCommand.html#method_setLock", "name": "App\\Console\\Commands\\BaseCommand::setLock", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Console\\Commands\\BaseCommand", "fromLink": "App/Console/Commands/BaseCommand.html", "link": "App/Console/Commands/BaseCommand.html#method_removeLock", "name": "App\\Console\\Commands\\BaseCommand::removeLock", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Console\\Commands\\BaseCommand", "fromLink": "App/Console/Commands/BaseCommand.html", "link": "App/Console/Commands/BaseCommand.html#method_getCurrentInstances", "name": "App\\Console\\Commands\\BaseCommand::getCurrentInstances", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Console\\Commands\\BaseCommand", "fromLink": "App/Console/Commands/BaseCommand.html", "link": "App/Console/Commands/BaseCommand.html#method_getClassSign", "name": "App\\Console\\Commands\\BaseCommand::getClassSign", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Console\\Commands\\BaseCommand", "fromLink": "App/Console/Commands/BaseCommand.html", "link": "App/Console/Commands/BaseCommand.html#method_error", "name": "App\\Console\\Commands\\BaseCommand::error", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Console\\Commands\\BaseCommand", "fromLink": "App/Console/Commands/BaseCommand.html", "link": "App/Console/Commands/BaseCommand.html#method_info", "name": "App\\Console\\Commands\\BaseCommand::info", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Console\\Commands\\BaseCommand", "fromLink": "App/Console/Commands/BaseCommand.html", "link": "App/Console/Commands/BaseCommand.html#method_handle", "name": "App\\Console\\Commands\\BaseCommand::handle", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Console\\Commands\\BaseCommand", "fromLink": "App/Console/Commands/BaseCommand.html", "link": "App/Console/Commands/BaseCommand.html#method_getSignature", "name": "App\\Console\\Commands\\BaseCommand::getSignature", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Console\\Commands\\BaseCommand", "fromLink": "App/Console/Commands/BaseCommand.html", "link": "App/Console/Commands/BaseCommand.html#method_getLastExecution", "name": "App\\Console\\Commands\\BaseCommand::getLastExecution", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Console\\Commands\\BaseCommand", "fromLink": "App/Console/Commands/BaseCommand.html", "link": "App/Console/Commands/BaseCommand.html#method_getStatus", "name": "App\\Console\\Commands\\BaseCommand::getStatus", "doc": "&quot;&quot;"},
            
            {"type": "Trait", "fromName": "App\\Console\\Commands", "fromLink": "App/Console/Commands.html", "link": "App/Console/Commands/SystemLogTrait.html", "name": "App\\Console\\Commands\\SystemLogTrait", "doc": "&quot;&quot;"},
                                                        {"type": "Method", "fromName": "App\\Console\\Commands\\SystemLogTrait", "fromLink": "App/Console/Commands/SystemLogTrait.html", "link": "App/Console/Commands/SystemLogTrait.html#method_log", "name": "App\\Console\\Commands\\SystemLogTrait::log", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Console\\Commands\\SystemLogTrait", "fromLink": "App/Console/Commands/SystemLogTrait.html", "link": "App/Console/Commands/SystemLogTrait.html#method_getLogs", "name": "App\\Console\\Commands\\SystemLogTrait::getLogs", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Console\\Commands\\SystemLogTrait", "fromLink": "App/Console/Commands/SystemLogTrait.html", "link": "App/Console/Commands/SystemLogTrait.html#method_getLastExecLog", "name": "App\\Console\\Commands\\SystemLogTrait::getLastExecLog", "doc": "&quot;&quot;"},
            
            {"type": "Class", "fromName": "App\\Console\\Commands\\Twitter", "fromLink": "App/Console/Commands/Twitter.html", "link": "App/Console/Commands/Twitter/SearchReplies.html", "name": "App\\Console\\Commands\\Twitter\\SearchReplies", "doc": "&quot;&quot;"},
                                                        {"type": "Method", "fromName": "App\\Console\\Commands\\Twitter\\SearchReplies", "fromLink": "App/Console/Commands/Twitter/SearchReplies.html", "link": "App/Console/Commands/Twitter/SearchReplies.html#method___construct", "name": "App\\Console\\Commands\\Twitter\\SearchReplies::__construct", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Console\\Commands\\Twitter\\SearchReplies", "fromLink": "App/Console/Commands/Twitter/SearchReplies.html", "link": "App/Console/Commands/Twitter/SearchReplies.html#method_start", "name": "App\\Console\\Commands\\Twitter\\SearchReplies::start", "doc": "&quot;&quot;"},
            
            {"type": "Class", "fromName": "App\\Console", "fromLink": "App/Console.html", "link": "App/Console/Kernel.html", "name": "App\\Console\\Kernel", "doc": "&quot;&quot;"},
                                                        {"type": "Method", "fromName": "App\\Console\\Kernel", "fromLink": "App/Console/Kernel.html", "link": "App/Console/Kernel.html#method_schedule", "name": "App\\Console\\Kernel::schedule", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Console\\Kernel", "fromLink": "App/Console/Kernel.html", "link": "App/Console/Kernel.html#method_commands", "name": "App\\Console\\Kernel::commands", "doc": "&quot;Esto mola, es para crear comandos con un closure.&quot;"},
            
            {"type": "Class", "fromName": "App\\Exceptions", "fromLink": "App/Exceptions.html", "link": "App/Exceptions/Handler.html", "name": "App\\Exceptions\\Handler", "doc": "&quot;&quot;"},
                                                        {"type": "Method", "fromName": "App\\Exceptions\\Handler", "fromLink": "App/Exceptions/Handler.html", "link": "App/Exceptions/Handler.html#method_report", "name": "App\\Exceptions\\Handler::report", "doc": "&quot;Report or log an exception.&quot;"},
                    {"type": "Method", "fromName": "App\\Exceptions\\Handler", "fromLink": "App/Exceptions/Handler.html", "link": "App/Exceptions/Handler.html#method_render", "name": "App\\Exceptions\\Handler::render", "doc": "&quot;Render an exception into an HTTP response.&quot;"},
                    {"type": "Method", "fromName": "App\\Exceptions\\Handler", "fromLink": "App/Exceptions/Handler.html", "link": "App/Exceptions/Handler.html#method_unauthenticated", "name": "App\\Exceptions\\Handler::unauthenticated", "doc": "&quot;Convert an authentication exception into an unauthenticated response.&quot;"},
            
            {"type": "Class", "fromName": "App\\Http\\Controllers\\Admin", "fromLink": "App/Http/Controllers/Admin.html", "link": "App/Http/Controllers/Admin/AdminController.html", "name": "App\\Http\\Controllers\\Admin\\AdminController", "doc": "&quot;&quot;"},
                                                        {"type": "Method", "fromName": "App\\Http\\Controllers\\Admin\\AdminController", "fromLink": "App/Http/Controllers/Admin/AdminController.html", "link": "App/Http/Controllers/Admin/AdminController.html#method_dashboard", "name": "App\\Http\\Controllers\\Admin\\AdminController::dashboard", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\Admin\\AdminController", "fromLink": "App/Http/Controllers/Admin/AdminController.html", "link": "App/Http/Controllers/Admin/AdminController.html#method_createAdmin", "name": "App\\Http\\Controllers\\Admin\\AdminController::createAdmin", "doc": "&quot;&quot;"},
            
            {"type": "Class", "fromName": "App\\Http\\Controllers\\Admin", "fromLink": "App/Http/Controllers/Admin.html", "link": "App/Http/Controllers/Admin/AuthController.html", "name": "App\\Http\\Controllers\\Admin\\AuthController", "doc": "&quot;&quot;"},
                                                        {"type": "Method", "fromName": "App\\Http\\Controllers\\Admin\\AuthController", "fromLink": "App/Http/Controllers/Admin/AuthController.html", "link": "App/Http/Controllers/Admin/AuthController.html#method___construct", "name": "App\\Http\\Controllers\\Admin\\AuthController::__construct", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\Admin\\AuthController", "fromLink": "App/Http/Controllers/Admin/AuthController.html", "link": "App/Http/Controllers/Admin/AuthController.html#method_validator", "name": "App\\Http\\Controllers\\Admin\\AuthController::validator", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\Admin\\AuthController", "fromLink": "App/Http/Controllers/Admin/AuthController.html", "link": "App/Http/Controllers/Admin/AuthController.html#method_create", "name": "App\\Http\\Controllers\\Admin\\AuthController::create", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\Admin\\AuthController", "fromLink": "App/Http/Controllers/Admin/AuthController.html", "link": "App/Http/Controllers/Admin/AuthController.html#method_changePassword", "name": "App\\Http\\Controllers\\Admin\\AuthController::changePassword", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\Admin\\AuthController", "fromLink": "App/Http/Controllers/Admin/AuthController.html", "link": "App/Http/Controllers/Admin/AuthController.html#method_showChangePasswordForm", "name": "App\\Http\\Controllers\\Admin\\AuthController::showChangePasswordForm", "doc": "&quot;&quot;"},
            
            {"type": "Class", "fromName": "App\\Http\\Controllers\\Admin\\Auth", "fromLink": "App/Http/Controllers/Admin/Auth.html", "link": "App/Http/Controllers/Admin/Auth/ForgotPasswordController.html", "name": "App\\Http\\Controllers\\Admin\\Auth\\ForgotPasswordController", "doc": "&quot;&quot;"},
                                                        {"type": "Method", "fromName": "App\\Http\\Controllers\\Admin\\Auth\\ForgotPasswordController", "fromLink": "App/Http/Controllers/Admin/Auth/ForgotPasswordController.html", "link": "App/Http/Controllers/Admin/Auth/ForgotPasswordController.html#method___construct", "name": "App\\Http\\Controllers\\Admin\\Auth\\ForgotPasswordController::__construct", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\Admin\\Auth\\ForgotPasswordController", "fromLink": "App/Http/Controllers/Admin/Auth/ForgotPasswordController.html", "link": "App/Http/Controllers/Admin/Auth/ForgotPasswordController.html#method_guard", "name": "App\\Http\\Controllers\\Admin\\Auth\\ForgotPasswordController::guard", "doc": "&quot;&quot;"},
            
            {"type": "Class", "fromName": "App\\Http\\Controllers\\Admin\\Auth", "fromLink": "App/Http/Controllers/Admin/Auth.html", "link": "App/Http/Controllers/Admin/Auth/LoginController.html", "name": "App\\Http\\Controllers\\Admin\\Auth\\LoginController", "doc": "&quot;&quot;"},
                                                        {"type": "Method", "fromName": "App\\Http\\Controllers\\Admin\\Auth\\LoginController", "fromLink": "App/Http/Controllers/Admin/Auth/LoginController.html", "link": "App/Http/Controllers/Admin/Auth/LoginController.html#method___construct", "name": "App\\Http\\Controllers\\Admin\\Auth\\LoginController::__construct", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\Admin\\Auth\\LoginController", "fromLink": "App/Http/Controllers/Admin/Auth/LoginController.html", "link": "App/Http/Controllers/Admin/Auth/LoginController.html#method_login", "name": "App\\Http\\Controllers\\Admin\\Auth\\LoginController::login", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\Admin\\Auth\\LoginController", "fromLink": "App/Http/Controllers/Admin/Auth/LoginController.html", "link": "App/Http/Controllers/Admin/Auth/LoginController.html#method_getLogin", "name": "App\\Http\\Controllers\\Admin\\Auth\\LoginController::getLogin", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\Admin\\Auth\\LoginController", "fromLink": "App/Http/Controllers/Admin/Auth/LoginController.html", "link": "App/Http/Controllers/Admin/Auth/LoginController.html#method_getLogout", "name": "App\\Http\\Controllers\\Admin\\Auth\\LoginController::getLogout", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\Admin\\Auth\\LoginController", "fromLink": "App/Http/Controllers/Admin/Auth/LoginController.html", "link": "App/Http/Controllers/Admin/Auth/LoginController.html#method_guard", "name": "App\\Http\\Controllers\\Admin\\Auth\\LoginController::guard", "doc": "&quot;&quot;"},
            
            {"type": "Class", "fromName": "App\\Http\\Controllers\\Admin\\Auth", "fromLink": "App/Http/Controllers/Admin/Auth.html", "link": "App/Http/Controllers/Admin/Auth/RegisterController.html", "name": "App\\Http\\Controllers\\Admin\\Auth\\RegisterController", "doc": "&quot;&quot;"},
                                                        {"type": "Method", "fromName": "App\\Http\\Controllers\\Admin\\Auth\\RegisterController", "fromLink": "App/Http/Controllers/Admin/Auth/RegisterController.html", "link": "App/Http/Controllers/Admin/Auth/RegisterController.html#method___construct", "name": "App\\Http\\Controllers\\Admin\\Auth\\RegisterController::__construct", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\Admin\\Auth\\RegisterController", "fromLink": "App/Http/Controllers/Admin/Auth/RegisterController.html", "link": "App/Http/Controllers/Admin/Auth/RegisterController.html#method_validator", "name": "App\\Http\\Controllers\\Admin\\Auth\\RegisterController::validator", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\Admin\\Auth\\RegisterController", "fromLink": "App/Http/Controllers/Admin/Auth/RegisterController.html", "link": "App/Http/Controllers/Admin/Auth/RegisterController.html#method_create", "name": "App\\Http\\Controllers\\Admin\\Auth\\RegisterController::create", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\Admin\\Auth\\RegisterController", "fromLink": "App/Http/Controllers/Admin/Auth/RegisterController.html", "link": "App/Http/Controllers/Admin/Auth/RegisterController.html#method_guard", "name": "App\\Http\\Controllers\\Admin\\Auth\\RegisterController::guard", "doc": "&quot;&quot;"},
            
            {"type": "Class", "fromName": "App\\Http\\Controllers\\Admin\\Auth", "fromLink": "App/Http/Controllers/Admin/Auth.html", "link": "App/Http/Controllers/Admin/Auth/ResetPasswordController.html", "name": "App\\Http\\Controllers\\Admin\\Auth\\ResetPasswordController", "doc": "&quot;&quot;"},
                                                        {"type": "Method", "fromName": "App\\Http\\Controllers\\Admin\\Auth\\ResetPasswordController", "fromLink": "App/Http/Controllers/Admin/Auth/ResetPasswordController.html", "link": "App/Http/Controllers/Admin/Auth/ResetPasswordController.html#method___construct", "name": "App\\Http\\Controllers\\Admin\\Auth\\ResetPasswordController::__construct", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\Admin\\Auth\\ResetPasswordController", "fromLink": "App/Http/Controllers/Admin/Auth/ResetPasswordController.html", "link": "App/Http/Controllers/Admin/Auth/ResetPasswordController.html#method_changePassword", "name": "App\\Http\\Controllers\\Admin\\Auth\\ResetPasswordController::changePassword", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\Admin\\Auth\\ResetPasswordController", "fromLink": "App/Http/Controllers/Admin/Auth/ResetPasswordController.html", "link": "App/Http/Controllers/Admin/Auth/ResetPasswordController.html#method_showChangePasswordForm", "name": "App\\Http\\Controllers\\Admin\\Auth\\ResetPasswordController::showChangePasswordForm", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\Admin\\Auth\\ResetPasswordController", "fromLink": "App/Http/Controllers/Admin/Auth/ResetPasswordController.html", "link": "App/Http/Controllers/Admin/Auth/ResetPasswordController.html#method_guard", "name": "App\\Http\\Controllers\\Admin\\Auth\\ResetPasswordController::guard", "doc": "&quot;&quot;"},
            
            {"type": "Class", "fromName": "App\\Http\\Controllers\\Admin\\CMS", "fromLink": "App/Http/Controllers/Admin/CMS.html", "link": "App/Http/Controllers/Admin/CMS/ContactController.html", "name": "App\\Http\\Controllers\\Admin\\CMS\\ContactController", "doc": "&quot;&quot;"},
                                                        {"type": "Method", "fromName": "App\\Http\\Controllers\\Admin\\CMS\\ContactController", "fromLink": "App/Http/Controllers/Admin/CMS/ContactController.html", "link": "App/Http/Controllers/Admin/CMS/ContactController.html#method_index", "name": "App\\Http\\Controllers\\Admin\\CMS\\ContactController::index", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\Admin\\CMS\\ContactController", "fromLink": "App/Http/Controllers/Admin/CMS/ContactController.html", "link": "App/Http/Controllers/Admin/CMS/ContactController.html#method_delete", "name": "App\\Http\\Controllers\\Admin\\CMS\\ContactController::delete", "doc": "&quot;&quot;"},
            
            {"type": "Class", "fromName": "App\\Http\\Controllers\\Admin\\CMS", "fromLink": "App/Http/Controllers/Admin/CMS.html", "link": "App/Http/Controllers/Admin/CMS/PostController.html", "name": "App\\Http\\Controllers\\Admin\\CMS\\PostController", "doc": "&quot;&quot;"},
                                                        {"type": "Method", "fromName": "App\\Http\\Controllers\\Admin\\CMS\\PostController", "fromLink": "App/Http/Controllers/Admin/CMS/PostController.html", "link": "App/Http/Controllers/Admin/CMS/PostController.html#method_index", "name": "App\\Http\\Controllers\\Admin\\CMS\\PostController::index", "doc": "&quot;&quot;"},
            
            {"type": "Class", "fromName": "App\\Http\\Controllers\\Admin\\CMS", "fromLink": "App/Http/Controllers/Admin/CMS.html", "link": "App/Http/Controllers/Admin/CMS/UserController.html", "name": "App\\Http\\Controllers\\Admin\\CMS\\UserController", "doc": "&quot;&quot;"},
                                                        {"type": "Method", "fromName": "App\\Http\\Controllers\\Admin\\CMS\\UserController", "fromLink": "App/Http/Controllers/Admin/CMS/UserController.html", "link": "App/Http/Controllers/Admin/CMS/UserController.html#method_index", "name": "App\\Http\\Controllers\\Admin\\CMS\\UserController::index", "doc": "&quot;&quot;"},
            
            {"type": "Class", "fromName": "App\\Http\\Controllers\\Admin", "fromLink": "App/Http/Controllers/Admin.html", "link": "App/Http/Controllers/Admin/CronController.html", "name": "App\\Http\\Controllers\\Admin\\CronController", "doc": "&quot;&quot;"},
                                                        {"type": "Method", "fromName": "App\\Http\\Controllers\\Admin\\CronController", "fromLink": "App/Http/Controllers/Admin/CronController.html", "link": "App/Http/Controllers/Admin/CronController.html#method_index", "name": "App\\Http\\Controllers\\Admin\\CronController::index", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\Admin\\CronController", "fromLink": "App/Http/Controllers/Admin/CronController.html", "link": "App/Http/Controllers/Admin/CronController.html#method_create", "name": "App\\Http\\Controllers\\Admin\\CronController::create", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\Admin\\CronController", "fromLink": "App/Http/Controllers/Admin/CronController.html", "link": "App/Http/Controllers/Admin/CronController.html#method_store", "name": "App\\Http\\Controllers\\Admin\\CronController::store", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\Admin\\CronController", "fromLink": "App/Http/Controllers/Admin/CronController.html", "link": "App/Http/Controllers/Admin/CronController.html#method_destroy", "name": "App\\Http\\Controllers\\Admin\\CronController::destroy", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\Admin\\CronController", "fromLink": "App/Http/Controllers/Admin/CronController.html", "link": "App/Http/Controllers/Admin/CronController.html#method_getCommandsArray", "name": "App\\Http\\Controllers\\Admin\\CronController::getCommandsArray", "doc": "&quot;&quot;"},
            
            {"type": "Class", "fromName": "App\\Http\\Controllers\\Admin", "fromLink": "App/Http/Controllers/Admin.html", "link": "App/Http/Controllers/Admin/LogController.html", "name": "App\\Http\\Controllers\\Admin\\LogController", "doc": "&quot;&quot;"},
                                                        {"type": "Method", "fromName": "App\\Http\\Controllers\\Admin\\LogController", "fromLink": "App/Http/Controllers/Admin/LogController.html", "link": "App/Http/Controllers/Admin/LogController.html#method_index", "name": "App\\Http\\Controllers\\Admin\\LogController::index", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\Admin\\LogController", "fromLink": "App/Http/Controllers/Admin/LogController.html", "link": "App/Http/Controllers/Admin/LogController.html#method_json", "name": "App\\Http\\Controllers\\Admin\\LogController::json", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\Admin\\LogController", "fromLink": "App/Http/Controllers/Admin/LogController.html", "link": "App/Http/Controllers/Admin/LogController.html#method_delete", "name": "App\\Http\\Controllers\\Admin\\LogController::delete", "doc": "&quot;&quot;"},
            
            {"type": "Class", "fromName": "App\\Http\\Controllers\\Admin", "fromLink": "App/Http/Controllers/Admin.html", "link": "App/Http/Controllers/Admin/ProcessController.html", "name": "App\\Http\\Controllers\\Admin\\ProcessController", "doc": "&quot;&quot;"},
                                                        {"type": "Method", "fromName": "App\\Http\\Controllers\\Admin\\ProcessController", "fromLink": "App/Http/Controllers/Admin/ProcessController.html", "link": "App/Http/Controllers/Admin/ProcessController.html#method_index", "name": "App\\Http\\Controllers\\Admin\\ProcessController::index", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\Admin\\ProcessController", "fromLink": "App/Http/Controllers/Admin/ProcessController.html", "link": "App/Http/Controllers/Admin/ProcessController.html#method_exec", "name": "App\\Http\\Controllers\\Admin\\ProcessController::exec", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\Admin\\ProcessController", "fromLink": "App/Http/Controllers/Admin/ProcessController.html", "link": "App/Http/Controllers/Admin/ProcessController.html#method_getProcesses", "name": "App\\Http\\Controllers\\Admin\\ProcessController::getProcesses", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\Admin\\ProcessController", "fromLink": "App/Http/Controllers/Admin/ProcessController.html", "link": "App/Http/Controllers/Admin/ProcessController.html#method_getProcess", "name": "App\\Http\\Controllers\\Admin\\ProcessController::getProcess", "doc": "&quot;&quot;"},
            
            {"type": "Class", "fromName": "App\\Http\\Controllers\\Admin", "fromLink": "App/Http/Controllers/Admin.html", "link": "App/Http/Controllers/Admin/ServerController.html", "name": "App\\Http\\Controllers\\Admin\\ServerController", "doc": "&quot;&quot;"},
                                                        {"type": "Method", "fromName": "App\\Http\\Controllers\\Admin\\ServerController", "fromLink": "App/Http/Controllers/Admin/ServerController.html", "link": "App/Http/Controllers/Admin/ServerController.html#method_index", "name": "App\\Http\\Controllers\\Admin\\ServerController::index", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\Admin\\ServerController", "fromLink": "App/Http/Controllers/Admin/ServerController.html", "link": "App/Http/Controllers/Admin/ServerController.html#method_info", "name": "App\\Http\\Controllers\\Admin\\ServerController::info", "doc": "&quot;&quot;"},
            
            {"type": "Class", "fromName": "App\\Http\\Controllers", "fromLink": "App/Http/Controllers.html", "link": "App/Http/Controllers/Controller.html", "name": "App\\Http\\Controllers\\Controller", "doc": "&quot;&quot;"},
                                                        {"type": "Method", "fromName": "App\\Http\\Controllers\\Controller", "fromLink": "App/Http/Controllers/Controller.html", "link": "App/Http/Controllers/Controller.html#method_forbidden", "name": "App\\Http\\Controllers\\Controller::forbidden", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\Controller", "fromLink": "App/Http/Controllers/Controller.html", "link": "App/Http/Controllers/Controller.html#method_badRequest", "name": "App\\Http\\Controllers\\Controller::badRequest", "doc": "&quot;&quot;"},
            
            {"type": "Class", "fromName": "App\\Http\\Controllers", "fromLink": "App/Http/Controllers.html", "link": "App/Http/Controllers/MainController.html", "name": "App\\Http\\Controllers\\MainController", "doc": "&quot;&quot;"},
                                                        {"type": "Method", "fromName": "App\\Http\\Controllers\\MainController", "fromLink": "App/Http/Controllers/MainController.html", "link": "App/Http/Controllers/MainController.html#method___construct", "name": "App\\Http\\Controllers\\MainController::__construct", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\MainController", "fromLink": "App/Http/Controllers/MainController.html", "link": "App/Http/Controllers/MainController.html#method_index", "name": "App\\Http\\Controllers\\MainController::index", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\MainController", "fromLink": "App/Http/Controllers/MainController.html", "link": "App/Http/Controllers/MainController.html#method_showContactForm", "name": "App\\Http\\Controllers\\MainController::showContactForm", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\MainController", "fromLink": "App/Http/Controllers/MainController.html", "link": "App/Http/Controllers/MainController.html#method_handleContactForm", "name": "App\\Http\\Controllers\\MainController::handleContactForm", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\MainController", "fromLink": "App/Http/Controllers/MainController.html", "link": "App/Http/Controllers/MainController.html#method_hasPreviousMessage", "name": "App\\Http\\Controllers\\MainController::hasPreviousMessage", "doc": "&quot;&quot;"},
            
            {"type": "Class", "fromName": "App\\Http\\Controllers", "fromLink": "App/Http/Controllers.html", "link": "App/Http/Controllers/PagesController.html", "name": "App\\Http\\Controllers\\PagesController", "doc": "&quot;&quot;"},
                                                        {"type": "Method", "fromName": "App\\Http\\Controllers\\PagesController", "fromLink": "App/Http/Controllers/PagesController.html", "link": "App/Http/Controllers/PagesController.html#method_view", "name": "App\\Http\\Controllers\\PagesController::view", "doc": "&quot;&quot;"},
            
            {"type": "Class", "fromName": "App\\Http\\Controllers", "fromLink": "App/Http/Controllers.html", "link": "App/Http/Controllers/PostController.html", "name": "App\\Http\\Controllers\\PostController", "doc": "&quot;&quot;"},
                                                        {"type": "Method", "fromName": "App\\Http\\Controllers\\PostController", "fromLink": "App/Http/Controllers/PostController.html", "link": "App/Http/Controllers/PostController.html#method___construct", "name": "App\\Http\\Controllers\\PostController::__construct", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\PostController", "fromLink": "App/Http/Controllers/PostController.html", "link": "App/Http/Controllers/PostController.html#method_view", "name": "App\\Http\\Controllers\\PostController::view", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\PostController", "fromLink": "App/Http/Controllers/PostController.html", "link": "App/Http/Controllers/PostController.html#method_postsByUser", "name": "App\\Http\\Controllers\\PostController::postsByUser", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\PostController", "fromLink": "App/Http/Controllers/PostController.html", "link": "App/Http/Controllers/PostController.html#method_create", "name": "App\\Http\\Controllers\\PostController::create", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\PostController", "fromLink": "App/Http/Controllers/PostController.html", "link": "App/Http/Controllers/PostController.html#method_edit", "name": "App\\Http\\Controllers\\PostController::edit", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\PostController", "fromLink": "App/Http/Controllers/PostController.html", "link": "App/Http/Controllers/PostController.html#method_showForm", "name": "App\\Http\\Controllers\\PostController::showForm", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\PostController", "fromLink": "App/Http/Controllers/PostController.html", "link": "App/Http/Controllers/PostController.html#method_remove", "name": "App\\Http\\Controllers\\PostController::remove", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\PostController", "fromLink": "App/Http/Controllers/PostController.html", "link": "App/Http/Controllers/PostController.html#method_store", "name": "App\\Http\\Controllers\\PostController::store", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\PostController", "fromLink": "App/Http/Controllers/PostController.html", "link": "App/Http/Controllers/PostController.html#method_publish", "name": "App\\Http\\Controllers\\PostController::publish", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\PostController", "fromLink": "App/Http/Controllers/PostController.html", "link": "App/Http/Controllers/PostController.html#method_reply", "name": "App\\Http\\Controllers\\PostController::reply", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\PostController", "fromLink": "App/Http/Controllers/PostController.html", "link": "App/Http/Controllers/PostController.html#method_like", "name": "App\\Http\\Controllers\\PostController::like", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\PostController", "fromLink": "App/Http/Controllers/PostController.html", "link": "App/Http/Controllers/PostController.html#method_reTweet", "name": "App\\Http\\Controllers\\PostController::reTweet", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\PostController", "fromLink": "App/Http/Controllers/PostController.html", "link": "App/Http/Controllers/PostController.html#method_processContent", "name": "App\\Http\\Controllers\\PostController::processContent", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\PostController", "fromLink": "App/Http/Controllers/PostController.html", "link": "App/Http/Controllers/PostController.html#method_createExcerpt", "name": "App\\Http\\Controllers\\PostController::createExcerpt", "doc": "&quot;&quot;"},
            
            {"type": "Class", "fromName": "App\\Http\\Controllers", "fromLink": "App/Http/Controllers.html", "link": "App/Http/Controllers/ProfileController.html", "name": "App\\Http\\Controllers\\ProfileController", "doc": "&quot;&quot;"},
                                                        {"type": "Method", "fromName": "App\\Http\\Controllers\\ProfileController", "fromLink": "App/Http/Controllers/ProfileController.html", "link": "App/Http/Controllers/ProfileController.html#method___construct", "name": "App\\Http\\Controllers\\ProfileController::__construct", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\ProfileController", "fromLink": "App/Http/Controllers/ProfileController.html", "link": "App/Http/Controllers/ProfileController.html#method_cssProfile", "name": "App\\Http\\Controllers\\ProfileController::cssProfile", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\ProfileController", "fromLink": "App/Http/Controllers/ProfileController.html", "link": "App/Http/Controllers/ProfileController.html#method_cssGuest", "name": "App\\Http\\Controllers\\ProfileController::cssGuest", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\ProfileController", "fromLink": "App/Http/Controllers/ProfileController.html", "link": "App/Http/Controllers/ProfileController.html#method_getCurrentUserMenu", "name": "App\\Http\\Controllers\\ProfileController::getCurrentUserMenu", "doc": "&quot;&quot;"},
            
            {"type": "Class", "fromName": "App\\Http\\Controllers", "fromLink": "App/Http/Controllers.html", "link": "App/Http/Controllers/RobotsController.html", "name": "App\\Http\\Controllers\\RobotsController", "doc": "&quot;&quot;"},
                                                        {"type": "Method", "fromName": "App\\Http\\Controllers\\RobotsController", "fromLink": "App/Http/Controllers/RobotsController.html", "link": "App/Http/Controllers/RobotsController.html#method_sitemap", "name": "App\\Http\\Controllers\\RobotsController::sitemap", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\RobotsController", "fromLink": "App/Http/Controllers/RobotsController.html", "link": "App/Http/Controllers/RobotsController.html#method_robotsTxt", "name": "App\\Http\\Controllers\\RobotsController::robotsTxt", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\RobotsController", "fromLink": "App/Http/Controllers/RobotsController.html", "link": "App/Http/Controllers/RobotsController.html#method_test", "name": "App\\Http\\Controllers\\RobotsController::test", "doc": "&quot;&quot;"},
            
            {"type": "Class", "fromName": "App\\Http\\Controllers", "fromLink": "App/Http/Controllers.html", "link": "App/Http/Controllers/TwitterController.html", "name": "App\\Http\\Controllers\\TwitterController", "doc": "&quot;&quot;"},
                                                        {"type": "Method", "fromName": "App\\Http\\Controllers\\TwitterController", "fromLink": "App/Http/Controllers/TwitterController.html", "link": "App/Http/Controllers/TwitterController.html#method___construct", "name": "App\\Http\\Controllers\\TwitterController::__construct", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\TwitterController", "fromLink": "App/Http/Controllers/TwitterController.html", "link": "App/Http/Controllers/TwitterController.html#method_login", "name": "App\\Http\\Controllers\\TwitterController::login", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\TwitterController", "fromLink": "App/Http/Controllers/TwitterController.html", "link": "App/Http/Controllers/TwitterController.html#method_callback", "name": "App\\Http\\Controllers\\TwitterController::callback", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\TwitterController", "fromLink": "App/Http/Controllers/TwitterController.html", "link": "App/Http/Controllers/TwitterController.html#method_logout", "name": "App\\Http\\Controllers\\TwitterController::logout", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\TwitterController", "fromLink": "App/Http/Controllers/TwitterController.html", "link": "App/Http/Controllers/TwitterController.html#method_error", "name": "App\\Http\\Controllers\\TwitterController::error", "doc": "&quot;&quot;"},
            
            {"type": "Class", "fromName": "App\\Http\\Controllers", "fromLink": "App/Http/Controllers.html", "link": "App/Http/Controllers/UploadsController.html", "name": "App\\Http\\Controllers\\UploadsController", "doc": "&quot;&quot;"},
                                                        {"type": "Method", "fromName": "App\\Http\\Controllers\\UploadsController", "fromLink": "App/Http/Controllers/UploadsController.html", "link": "App/Http/Controllers/UploadsController.html#method___construct", "name": "App\\Http\\Controllers\\UploadsController::__construct", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\UploadsController", "fromLink": "App/Http/Controllers/UploadsController.html", "link": "App/Http/Controllers/UploadsController.html#method_upload", "name": "App\\Http\\Controllers\\UploadsController::upload", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\UploadsController", "fromLink": "App/Http/Controllers/UploadsController.html", "link": "App/Http/Controllers/UploadsController.html#method_index", "name": "App\\Http\\Controllers\\UploadsController::index", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Controllers\\UploadsController", "fromLink": "App/Http/Controllers/UploadsController.html", "link": "App/Http/Controllers/UploadsController.html#method_remove", "name": "App\\Http\\Controllers\\UploadsController::remove", "doc": "&quot;&quot;"},
            
            {"type": "Class", "fromName": "App\\Http", "fromLink": "App/Http.html", "link": "App/Http/Kernel.html", "name": "App\\Http\\Kernel", "doc": "&quot;&quot;"},
                    
            {"type": "Class", "fromName": "App\\Http\\Middleware", "fromLink": "App/Http/Middleware.html", "link": "App/Http/Middleware/EncryptCookies.html", "name": "App\\Http\\Middleware\\EncryptCookies", "doc": "&quot;&quot;"},
                    
            {"type": "Class", "fromName": "App\\Http\\Middleware", "fromLink": "App/Http/Middleware.html", "link": "App/Http/Middleware/RedirectIfAuthenticated.html", "name": "App\\Http\\Middleware\\RedirectIfAuthenticated", "doc": "&quot;&quot;"},
                                                        {"type": "Method", "fromName": "App\\Http\\Middleware\\RedirectIfAuthenticated", "fromLink": "App/Http/Middleware/RedirectIfAuthenticated.html", "link": "App/Http/Middleware/RedirectIfAuthenticated.html#method_handle", "name": "App\\Http\\Middleware\\RedirectIfAuthenticated::handle", "doc": "&quot;Handle an incoming request.&quot;"},
            
            {"type": "Class", "fromName": "App\\Http\\Middleware", "fromLink": "App/Http/Middleware.html", "link": "App/Http/Middleware/StartSessionManager.html", "name": "App\\Http\\Middleware\\StartSessionManager", "doc": "&quot;&quot;"},
                                                        {"type": "Method", "fromName": "App\\Http\\Middleware\\StartSessionManager", "fromLink": "App/Http/Middleware/StartSessionManager.html", "link": "App/Http/Middleware/StartSessionManager.html#method___construct", "name": "App\\Http\\Middleware\\StartSessionManager::__construct", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Http\\Middleware\\StartSessionManager", "fromLink": "App/Http/Middleware/StartSessionManager.html", "link": "App/Http/Middleware/StartSessionManager.html#method_handle", "name": "App\\Http\\Middleware\\StartSessionManager::handle", "doc": "&quot;&quot;"},
            
            {"type": "Class", "fromName": "App\\Http\\Middleware", "fromLink": "App/Http/Middleware.html", "link": "App/Http/Middleware/TrimStrings.html", "name": "App\\Http\\Middleware\\TrimStrings", "doc": "&quot;&quot;"},
                    
            {"type": "Class", "fromName": "App\\Http\\Middleware", "fromLink": "App/Http/Middleware.html", "link": "App/Http/Middleware/VerifyCsrfToken.html", "name": "App\\Http\\Middleware\\VerifyCsrfToken", "doc": "&quot;&quot;"},
                    
            {"type": "Class", "fromName": "App\\Model", "fromLink": "App/Model.html", "link": "App/Model/Admin.html", "name": "App\\Model\\Admin", "doc": "&quot;&quot;"},
                    
            {"type": "Class", "fromName": "App\\Model", "fromLink": "App/Model.html", "link": "App/Model/ContactMessage.html", "name": "App\\Model\\ContactMessage", "doc": "&quot;&quot;"},
                    
            {"type": "Class", "fromName": "App\\Model", "fromLink": "App/Model.html", "link": "App/Model/CronTask.html", "name": "App\\Model\\CronTask", "doc": "&quot;&quot;"},
                    
            {"type": "Class", "fromName": "App\\Model", "fromLink": "App/Model.html", "link": "App/Model/Post.html", "name": "App\\Model\\Post", "doc": "&quot;&quot;"},
                    
            {"type": "Class", "fromName": "App\\Model", "fromLink": "App/Model.html", "link": "App/Model/Tweet.html", "name": "App\\Model\\Tweet", "doc": "&quot;&quot;"},
                    
            {"type": "Class", "fromName": "App\\Model", "fromLink": "App/Model.html", "link": "App/Model/User.html", "name": "App\\Model\\User", "doc": "&quot;&quot;"},
                    
            {"type": "Class", "fromName": "App\\Providers", "fromLink": "App/Providers.html", "link": "App/Providers/AppServiceProvider.html", "name": "App\\Providers\\AppServiceProvider", "doc": "&quot;&quot;"},
                                                        {"type": "Method", "fromName": "App\\Providers\\AppServiceProvider", "fromLink": "App/Providers/AppServiceProvider.html", "link": "App/Providers/AppServiceProvider.html#method_boot", "name": "App\\Providers\\AppServiceProvider::boot", "doc": "&quot;&quot;"},
                    {"type": "Method", "fromName": "App\\Providers\\AppServiceProvider", "fromLink": "App/Providers/AppServiceProvider.html", "link": "App/Providers/AppServiceProvider.html#method_register", "name": "App\\Providers\\AppServiceProvider::register", "doc": "&quot;&quot;"},
            
            {"type": "Class", "fromName": "App\\Providers", "fromLink": "App/Providers.html", "link": "App/Providers/AuthServiceProvider.html", "name": "App\\Providers\\AuthServiceProvider", "doc": "&quot;&quot;"},
                                                        {"type": "Method", "fromName": "App\\Providers\\AuthServiceProvider", "fromLink": "App/Providers/AuthServiceProvider.html", "link": "App/Providers/AuthServiceProvider.html#method_boot", "name": "App\\Providers\\AuthServiceProvider::boot", "doc": "&quot;Register any authentication \/ authorization services.&quot;"},
            
            {"type": "Class", "fromName": "App\\Providers", "fromLink": "App/Providers.html", "link": "App/Providers/BroadcastServiceProvider.html", "name": "App\\Providers\\BroadcastServiceProvider", "doc": "&quot;&quot;"},
                                                        {"type": "Method", "fromName": "App\\Providers\\BroadcastServiceProvider", "fromLink": "App/Providers/BroadcastServiceProvider.html", "link": "App/Providers/BroadcastServiceProvider.html#method_boot", "name": "App\\Providers\\BroadcastServiceProvider::boot", "doc": "&quot;Bootstrap any application services.&quot;"},
            
            {"type": "Class", "fromName": "App\\Providers", "fromLink": "App/Providers.html", "link": "App/Providers/ComposerServiceProvider.html", "name": "App\\Providers\\ComposerServiceProvider", "doc": "&quot;&quot;"},
                                                        {"type": "Method", "fromName": "App\\Providers\\ComposerServiceProvider", "fromLink": "App/Providers/ComposerServiceProvider.html", "link": "App/Providers/ComposerServiceProvider.html#method_boot", "name": "App\\Providers\\ComposerServiceProvider::boot", "doc": "&quot;Bootstrap any application services.&quot;"},
                    {"type": "Method", "fromName": "App\\Providers\\ComposerServiceProvider", "fromLink": "App/Providers/ComposerServiceProvider.html", "link": "App/Providers/ComposerServiceProvider.html#method_register", "name": "App\\Providers\\ComposerServiceProvider::register", "doc": "&quot;Register any application services.&quot;"},
            
            {"type": "Class", "fromName": "App\\Providers", "fromLink": "App/Providers.html", "link": "App/Providers/EventServiceProvider.html", "name": "App\\Providers\\EventServiceProvider", "doc": "&quot;&quot;"},
                                                        {"type": "Method", "fromName": "App\\Providers\\EventServiceProvider", "fromLink": "App/Providers/EventServiceProvider.html", "link": "App/Providers/EventServiceProvider.html#method_boot", "name": "App\\Providers\\EventServiceProvider::boot", "doc": "&quot;Register any events for your application.&quot;"},
            
            {"type": "Class", "fromName": "App\\Providers", "fromLink": "App/Providers.html", "link": "App/Providers/RouteServiceProvider.html", "name": "App\\Providers\\RouteServiceProvider", "doc": "&quot;&quot;"},
                                                        {"type": "Method", "fromName": "App\\Providers\\RouteServiceProvider", "fromLink": "App/Providers/RouteServiceProvider.html", "link": "App/Providers/RouteServiceProvider.html#method_boot", "name": "App\\Providers\\RouteServiceProvider::boot", "doc": "&quot;Define your route model bindings, pattern filters, etc.&quot;"},
                    {"type": "Method", "fromName": "App\\Providers\\RouteServiceProvider", "fromLink": "App/Providers/RouteServiceProvider.html", "link": "App/Providers/RouteServiceProvider.html#method_map", "name": "App\\Providers\\RouteServiceProvider::map", "doc": "&quot;Define the routes for the application.&quot;"},
                    {"type": "Method", "fromName": "App\\Providers\\RouteServiceProvider", "fromLink": "App/Providers/RouteServiceProvider.html", "link": "App/Providers/RouteServiceProvider.html#method_mapWebRoutes", "name": "App\\Providers\\RouteServiceProvider::mapWebRoutes", "doc": "&quot;Define the \&quot;web\&quot; routes for the application.&quot;"},
                    {"type": "Method", "fromName": "App\\Providers\\RouteServiceProvider", "fromLink": "App/Providers/RouteServiceProvider.html", "link": "App/Providers/RouteServiceProvider.html#method_mapApiRoutes", "name": "App\\Providers\\RouteServiceProvider::mapApiRoutes", "doc": "&quot;Define the \&quot;api\&quot; routes for the application.&quot;"},
                    {"type": "Method", "fromName": "App\\Providers\\RouteServiceProvider", "fromLink": "App/Providers/RouteServiceProvider.html", "link": "App/Providers/RouteServiceProvider.html#method_mapAdminRoutes", "name": "App\\Providers\\RouteServiceProvider::mapAdminRoutes", "doc": "&quot;Define the admin routes&quot;"},
            
            
                                        // Fix trailing commas in the index
        {}
    ];

    /** Tokenizes strings by namespaces and functions */
    function tokenizer(term) {
        if (!term) {
            return [];
        }

        var tokens = [term];
        var meth = term.indexOf('::');

        // Split tokens into methods if "::" is found.
        if (meth > -1) {
            tokens.push(term.substr(meth + 2));
            term = term.substr(0, meth - 2);
        }

        // Split by namespace or fake namespace.
        if (term.indexOf('\\') > -1) {
            tokens = tokens.concat(term.split('\\'));
        } else if (term.indexOf('_') > 0) {
            tokens = tokens.concat(term.split('_'));
        }

        // Merge in splitting the string by case and return
        tokens = tokens.concat(term.match(/(([A-Z]?[^A-Z]*)|([a-z]?[^a-z]*))/g).slice(0,-1));

        return tokens;
    };

    root.Sami = {
        /**
         * Cleans the provided term. If no term is provided, then one is
         * grabbed from the query string "search" parameter.
         */
        cleanSearchTerm: function(term) {
            // Grab from the query string
            if (typeof term === 'undefined') {
                var name = 'search';
                var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
                var results = regex.exec(location.search);
                if (results === null) {
                    return null;
                }
                term = decodeURIComponent(results[1].replace(/\+/g, " "));
            }

            return term.replace(/<(?:.|\n)*?>/gm, '');
        },

        /** Searches through the index for a given term */
        search: function(term) {
            // Create a new search index if needed
            if (!bhIndex) {
                bhIndex = new Bloodhound({
                    limit: 500,
                    local: searchIndex,
                    datumTokenizer: function (d) {
                        return tokenizer(d.name);
                    },
                    queryTokenizer: Bloodhound.tokenizers.whitespace
                });
                bhIndex.initialize();
            }

            results = [];
            bhIndex.get(term, function(matches) {
                results = matches;
            });

            if (!rootPath) {
                return results;
            }

            // Fix the element links based on the current page depth.
            return $.map(results, function(ele) {
                if (ele.link.indexOf('..') > -1) {
                    return ele;
                }
                ele.link = rootPath + ele.link;
                if (ele.fromLink) {
                    ele.fromLink = rootPath + ele.fromLink;
                }
                return ele;
            });
        },

        /** Get a search class for a specific type */
        getSearchClass: function(type) {
            return searchTypeClasses[type] || searchTypeClasses['_'];
        },

        /** Add the left-nav tree to the site */
        injectApiTree: function(ele) {
            ele.html(treeHtml);
        }
    };

    $(function() {
        // Modify the HTML to work correctly based on the current depth
        rootPath = $('body').attr('data-root-path');
        treeHtml = treeHtml.replace(/href="/g, 'href="' + rootPath);
        Sami.injectApiTree($('#api-tree'));
    });

    return root.Sami;
})(window);

$(function() {

    // Enable the version switcher
    $('#version-switcher').change(function() {
        window.location = $(this).val()
    });

    
        // Toggle left-nav divs on click
        $('#api-tree .hd span').click(function() {
            $(this).parent().parent().toggleClass('opened');
        });

        // Expand the parent namespaces of the current page.
        var expected = $('body').attr('data-name');

        if (expected) {
            // Open the currently selected node and its parents.
            var container = $('#api-tree');
            var node = $('#api-tree li[data-name="' + expected + '"]');
            // Node might not be found when simulating namespaces
            if (node.length > 0) {
                node.addClass('active').addClass('opened');
                node.parents('li').addClass('opened');
                var scrollPos = node.offset().top - container.offset().top + container.scrollTop();
                // Position the item nearer to the top of the screen.
                scrollPos -= 200;
                container.scrollTop(scrollPos);
            }
        }

    
    
        var form = $('#search-form .typeahead');
        form.typeahead({
            hint: true,
            highlight: true,
            minLength: 1
        }, {
            name: 'search',
            displayKey: 'name',
            source: function (q, cb) {
                cb(Sami.search(q));
            }
        });

        // The selection is direct-linked when the user selects a suggestion.
        form.on('typeahead:selected', function(e, suggestion) {
            window.location = suggestion.link;
        });

        // The form is submitted when the user hits enter.
        form.keypress(function (e) {
            if (e.which == 13) {
                $('#search-form').submit();
                return true;
            }
        });

    
});


