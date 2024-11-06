/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterUserValidator from 'App/Validators/RegisterUserValidator'

export default class AuthController {
  async register ({request}: HttpContextContract) {
    const data = await request.validate(RegisterUserValidator)
    const user = User.create(data);
    (await user).save()
    return user
  }

  async login ({auth, request}: HttpContextContract) {
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
}
