# Twitter Posts

## Instalación Desarrollo

1) Actualizar bower y node en frontal:

cd frontend
npm cache clean
bower cache clean
npm install
bower install


2) Actualizar composer, bower y node en el backend:

cd backend
npm cache clean
bower cache clean
sudo composer clear-cache
npm install
bower install
bower update
sudo composer install

3) Descargar y configurar MongoDB

Arrancar mongodb en una consola, arrancar el servidor php.

cd mongodb/bin/
sudo ./mongod

cd backend
sudo php artisan serve


Descripción

Plataforma de blogging realizada con Laravel, React y MongoDB enfocada a usuarios de twitter. 
