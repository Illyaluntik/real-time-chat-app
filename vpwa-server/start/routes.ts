/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('register', 'AuthController.register')
  Route.post('login', 'AuthController.login')
  Route.post('logout', 'AuthController.logout').middleware('auth')
  Route.get('account', 'AuthController.account').middleware('auth')
  Route.get('me', 'AuthController.me').middleware('auth')
}).prefix('api/account')

Route.group(() => {
  Route.post('create', 'ChannelsController.create')
}).prefix('api/channel')

Route.group(() => {
  Route.post('invite', 'MembersController.invite')
  Route.post('load', 'MembersController.load')
  Route.post('members', 'MembersController.members')
  Route.post('leave', 'MembersController.leave')
}).prefix('api/channel')

Route.group(() => {
  Route.post('', 'KicksController.kick')
}).prefix('kick')

