/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterUserValidator from 'App/Validators/RegisterUserValidator'

export default class AuthController {
  async register ({ auth, request }: HttpContextContract) {
    const data = await request.validate(RegisterUserValidator)
    const user = User.create(data);
    (await user).save()
    return auth.use('api').attempt(data.username, data.password)
  }

  async login ({ auth, request }: HttpContextContract) {
    const username = request.input('username')
    const password = request.input('password')

    return auth.use('api').attempt(username, password)
  }

  async logout ({ auth, response }: HttpContextContract) {
    await auth.logout()
    return response.redirect('/login')
  }

  async account ({ auth }: HttpContextContract) {
    return auth.user
  }

  async me ({ auth }: HttpContextContract) {
    // await auth.user!.load('channels')
    return auth.user
  }
}
