<?php

namespace Tests\Api;

use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\Api\UserRepository as UserRepository;

class UserRepositoryTest extends TestCase
{
    public function testLoadUser()
    {
        $this->loadFixture('users','users.json');
        $userRepository = new UserRepository();
        $user = $userRepository->getUser(3979906515,false);
        $this->assertEquals($user->screen_name,'WetdogCompany');
        $this->assertEquals($user->name,'Chucho');
        $this->assertEquals($user->lang,'en');
        //Ahora por la id interna
        $user = $userRepository->getUser($user->_id);
        $this->assertEquals($user->screen_name,'WetdogCompany');
        $this->assertEquals($user->name,'Chucho');
        $this->assertEquals($user->lang,'en');
        //Ahora actualizamos el usuario.
        $userRepository->updateUser($user->id, [
            'screen_name' => 'Carapolla',
            'name' => 'Cara Polla Garcia'
        ]);
        $user = $userRepository->getUser(3979906515,false);
        $this->assertEquals($user->screen_name,'Carapolla');
        $this->assertEquals($user->name,'Cara Polla Garcia');
        //Ahora buscamos por Query.
        $user = $userRepository->findOne([
            'screen_name' => 'Carapolla'
        ]);
        $this->assertEquals($user->screen_name,'Carapolla');
        $this->assertEquals($user->name,'Cara Polla Garcia');
        //Ahora probamos el insertOrUpdateUser, con esto deberia clonar el usuario e insertarlo.
        unset($user->_id);
        $user = $userRepository->insertOrUpdateUser($user);
        $this->assertNotEmpty($user->_id);
    }
}
