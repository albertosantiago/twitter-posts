<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use App\Api\SessionManager as SessionManager;
use View;

class StartSessionManager
{
    public function __construct(SessionManager $sessionManager)
    {
       $this->sessionManager = $sessionManager;
    }

    public function handle($request, Closure $next, $guard = null)
    {
        /**
        * Aqui cargamos el usuario de twitter para que este listo para cuando llegue al controlador.
        */
        $this->sessionManager->loadFromSession();
        /**
        * Inyectamos en las vistas los usuarios necesarios, normalmente el dueño de la plantilla
        * es el mismo que el usuario actual excepto si estamos viendo sus posts.
        */
        $currentUser =  $this->sessionManager->getCurrentUser();
        View::share('currentUser', $currentUser);
        View::share('owner',       $currentUser);
        return $next($request);
    }
}
