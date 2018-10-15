server 'twitter-posts.com', user: 'deploy', roles: %w{app db web}

set :app_env, 'production'
set :app_url, 'https://twitter-posts.com'
set :app_debug, false
set :app_key, 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
set :db_host, 'xxxxxxxx'
set :db_database, 'twitter-posts'
set :db_user, 'xxxxxxx'
set :db_password, 'xxxxxxxx'
set :mailgun_domain, 'twitter-posts.com'
set :mailgun_secret, 'key-xxxxxxxxxxxxxxxxxxxxxxxxxx'
set :cookie_domain, 'twitter-posts.com'
set :netspace_name, 'production'
set :cdn_url, 'https://xxxxxxxxxx.cloudfront.net'
