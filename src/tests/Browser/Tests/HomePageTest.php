<?php

namespace Tests\Tests;

use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\Browser\Pages\HomePage;

class HomePageTest extends DuskTestCase
{

    public function testShowHome()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit(new HomePage())
                    ->assertSee('Welcome to Twitter Posts!')
                    ->assertSee('Login')
                    ->assertSee('Write Something!');

            $browser->clickLink('Login');
        });
    }
}
