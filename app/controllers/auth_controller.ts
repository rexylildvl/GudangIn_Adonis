import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async showRegister({ inertia }: HttpContext) {
    return inertia.render('auth/register')
  }

  async showLogin({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  async register({ request, response, auth, session }: HttpContext) {
    const { email, password, fullName } = request.only(['email', 'password', 'fullName'])

    try {
      const user = await User.create({
        email,
        password,
        fullName,
      })

      await auth.use('web').login(user)
      session.flash('success', 'Registration successful!')
      return response.redirect('/dashboard')
    } catch (error) {
      session.flash('error', 'Registration failed. Email might already exist.')
      return response.redirect().back()
    }
  }

  async login({ request, response, auth, session }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    try {
      const user = await User.verifyCredentials(email, password)
      await auth.use('web').login(user)
      session.flash('success', 'Login successful!')
      return response.redirect('/dashboard')
    } catch (error) {
      session.flash('error', 'Invalid credentials')
      return response.redirect().back()
    }
  }

  async logout({ auth, response, session }: HttpContext) {
    await auth.use('web').logout()
    session.flash('success', 'Logged out successfully!')
    return response.redirect('/login')
  }
}
