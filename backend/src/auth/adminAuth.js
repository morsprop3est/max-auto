import AdminJSExpress from '@adminjs/express'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const buildAuthenticatedRouter = (adminJs) => {
  return AdminJSExpress.buildAuthenticatedRouter(adminJs, {
    authenticate: async (email, password) => {
      const user = await prisma.user.findUnique({ where: { email } })
      if (user && user.isAdmin && bcrypt.compareSync(password, user.password)) {
        return user
      }
      return null
    },
    cookieName: 'adminjs',
    cookiePassword: process.env.ADMIN_COOKIE_SECRET || 'cookie-secret',
  })
}