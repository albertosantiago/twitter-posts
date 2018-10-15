lock '3.5.0'

set :ssh_options, { user: 'deploy' }
set :tmp_dir, '/home/deploy/tmp'
set :application, 'twitter-posts'
set :repo_url, 'git@gitlab.com:chucho/twitter-posts.git'
set :deploy_to, '/var/www/twitter-posts/deploy'

set :backend, "#{fetch(:deploy_to)}/current/src"
set :publicDir, "#{fetch(:deploy_to)}/current/src/public"

namespace :app do
    backend = fetch(:backend)
    publicDir = fetch(:publicDir)
    desc "Stop App"
    task :stop do
        on roles(:app) do
            if test("[ -d #{backend} ]")
                within backend do
                    f = "#{backend}/artisan"
                    if test("[ -f #{f} ]")
                        execute :php, "artisan down"
                    else
                        info "There are no previous version in host!"
                    end
                end
            else
                info "There are no previous version in host!"
            end
        end
    end
    desc "Start App"
    task :start do
        on roles(:app) do
            within backend do
                execute :php, "artisan cache:clear"
                execute :php, "artisan view:clear"
                execute :php, "artisan up"
            end
        end
    end
    desc "Clean App"
    task :clean do
        on roles(:app) do
            within deploy_to do
                execute "rm current/* -rf"
            end
        end
    end
    desc "Set deploy permits"
    task :set_deploy_permits do
        on roles(:app) do
            within deploy_to do
                execute "sudo chmod 775 * -R"
                execute "sudo chown deploy:www-data * -R"
            end
        end
    end
    desc "Restore production permits"
    task :restore_permits do
        on roles(:app) do
            within deploy_to do
                execute "sudo chmod 775 * -R"
                execute "sudo chown deploy:www-data * -R"
            end
        end
    end
end

namespace :setup do
    backend = fetch(:backend)
    publicDir = fetch(:publicDir)
    desc "Install composer and bower dependencies, make pending migrations in db and change file permissions"
    task :init do
        on roles(:app) do
            within backend do
                execute :composer, "install --no-dev"
                execute :composer, "dumpautoload"
                execute "sudo chmod 775 #{fetch(:release_path)} -R"
                execute "rm #{fetch(:backend)}/storage -rf"
                execute "ln -s #{fetch(:deploy_to)}/shared/storage/ #{fetch(:backend)}/storage"
            end
            within publicDir do
                execute :bower, "install"
            end
        end
    end
    desc "Setup File Permissions"
    task :permissions do
        on roles(:app) do
            within deploy_to do
                execute "sudo chmod 775 #{fetch(:deploy_to)} -R"
            end
        end
    end
end

namespace :environment do
    backend = fetch(:backend)
    desc "Set environment variables"
    task :set_variables do
        on roles(:app) do
            within backend do
                puts ("--> Create environment configuration file")
                execute "cat /dev/null > #{fetch(:backend)}/.env"
                execute "echo APP_ENV=\"#{fetch(:app_env)}\" >> #{fetch(:backend)}/.env"
                execute "echo APP_URL=\"#{fetch(:app_url)}\" >> #{fetch(:backend)}/.env"
                execute "echo APP_DEBUG=\"#{fetch(:app_debug)}\" >> #{fetch(:backend)}/.env"
                execute "echo APP_KEY=\"#{fetch(:app_key)}\" >> #{fetch(:backend)}/.env"
                execute "echo DB_HOST=\"#{fetch(:db_host)}\" >> #{fetch(:backend)}/.env"
                execute "echo DB_DATABASE=\"#{fetch(:db_database)}\" >> #{fetch(:backend)}/.env"
                execute "echo DB_USER=\"#{fetch(:db_user)}\" >> #{fetch(:backend)}/.env"
                execute "echo DB_PASSWORD=\"#{fetch(:db_password)}\" >> #{fetch(:backend)}/.env"
                execute "echo MAILGUN_DOMAIN=\"#{fetch(:mailgun_domain)}\" >> #{fetch(:backend)}/.env"
                execute "echo MAILGUN_SECRET=\"#{fetch(:mailgun_secret)}\" >> #{fetch(:backend)}/.env"
                execute "echo COOKIE_DOMAIN=\"#{fetch(:cookie_domain)}\" >> #{fetch(:backend)}/.env"
                execute "echo CDN_URL=\"#{fetch(:cdn_url)}\" >> #{fetch(:backend)}/.env"
                execute "echo APP_VERSION=\"#{fetch(:current_revision)}\" >> #{fetch(:backend)}/.env"
            end
        end
    end
end

namespace :deploy do
    before :starting, "stop" do
        invoke("app:set_deploy_permits")
    end
    after :finished,  "setup" do
        invoke("environment:set_variables")
        invoke("setup:init")
        invoke("app:restore_permits")
        invoke("app:start")
    end
    before :cleanup, "setup:permissions"
end
