<?php
namespace Chapusoft\Mongolico;

use Closure;
use Illuminate\Support\Arr;
use MongoDB\Client as MongoClient;

class Database
{
    /**
     * The host address of the database.
     *
     * @var array
     */
    protected $clients;

    /**
     * Create a new Redis connection instance.
     *
     * @param  array  $servers
     * @return void
     */
    public function __construct(array $config)
    {
        $username = Arr::pull($config, 'username');
        $password = Arr::pull($config, 'password');
        $database = Arr::pull($config, 'database');
        $host = Arr::pull($config, 'host');
        $port = Arr::pull($config, 'port');

        $userAuth = "";
        if(!empty($username)){
            $userAuth = "${username}:${password}@";
        }
        $conn = "mongodb://{$userAuth}{$host}:{$port}";
        $this->client = new MongoClient($conn);
        $this->db     = $this->client->$database;
    }

    /**
     * Run a command against the Redis database.
     *
     * @param  string  $method
     * @param  array   $parameters
     * @return mixed
     */
    public function command($method, array $parameters = [])
    {
        return call_user_func_array([$this->client, $method], $parameters);
    }

    /**
     * Dynamically make a Redis command.
     *
     * @param  string  $method
     * @param  array   $parameters
     * @return mixed
     */
    public function __call($method, $parameters)
    {
        return $this->command($method, $parameters);
    }

    public function getCollection($name){
        return $this->db->$name;
    }

    public function dropDatabase(){
        if(env('APP_ENV')=='testing'){
            $this->db->drop();
        }else{
            throw new \Exception("Drop Database is only allowed for Tests", 1);
        }
    }
}
