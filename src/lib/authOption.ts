// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import ldap from 'ldapjs'
import { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { db } from './database'

const bindDN = process.env.BIND_DN
const bindDNPassword = process.env.BIND_DN_PASSWORD
const baseDN = process.env.BASE_DN

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Acc',
      credentials: {
        username: { label: 'Tài khoản', type: 'text', placeholder: '' },
        password: { label: 'Mật khẩu', type: 'password' }
      },
      async authorize(credentials) {
        const { username, password } = credentials

        const user = await db.staff.findUnique({
          where: {
            username
          }
        })
        if (user?.username === username && user?.password === password) {
          return Promise.resolve(user)
        } else {
          return Promise.resolve(null)
        }
      }
    })
  ],
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: any) {
      const isSignIn = user ? true : false
      if (isSignIn) {
        token.username = user.username as any
        token.entry = user.entry as any
      }
      return token
    },
    async session({ session, token }: any) {
      return {
        user: {
          session,
          token
        }
      }
    }
  }
}
