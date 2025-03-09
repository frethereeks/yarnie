import { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { User } from '@prisma/client';
import jwt from "jsonwebtoken"
// import { authenticateByRole } from './authByRole';
// import { fetchUser } from '@/actions';
import { appRoutePaths } from '@/routes/paths';
import prisma from '@/lib/prisma';
import bcryptjs from "bcryptjs"

export const authOptions: NextAuthOptions = {
    debug: true,
    providers: [
        CredentialsProvider({
            name: 'Sign in',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'youremail@email.com'
                },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: '*******'
                },
            },
            async authorize(credentials) {
                if (!credentials) return null;
                const { email, password } = credentials;
                // const pass = await bcryptjs.hash("Big-Bright", 10)
                // console.log({pass})
                const user = await prisma.user.findFirst({ where: { email: email.toLowerCase() } })
                if (!user) return null
                const matchPassword = await bcryptjs.compare(password, user.password)
                if (!matchPassword) return null
                if (user.status === "PENDING") {
                    throw new Error("Your account status is set to PENDING at the moment. Please, contact the admin for account activation.")
                }
                else if (user.status === "SUSPENDED") {
                    throw new Error("Oh No! Your account has been suspended. If you believe this is an error, contact the admin")
                }
                return user
            },
        })
    ],
    pages: {
        signIn: appRoutePaths.signin,
        error: appRoutePaths.home,
        signOut: appRoutePaths.logout,
    },
    secret: process.env.JWT,
    jwt: {
        async encode({ secret, token }) {
            if (!token) throw new Error("No token to encode")
            return jwt.sign(token, secret)
        },
        async decode({ secret, token }) {
            if (!token) throw new Error("No token to decode")
            const decodedToken = jwt.verify(token, secret)
            if (typeof decodedToken === "string") {
                return JSON.parse(decodedToken)
            }
            else return decodedToken;
        },
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60
    },
    callbacks: {
        session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id
                }
            };
        },
        jwt({ token, user }) {
            if (user) {
                const currentUser = user as unknown as User
                return {
                    ...token,
                    id: currentUser.id,
                    email: currentUser.email,
                    image: currentUser.image,
                    name: `${currentUser.firstname} ${currentUser.lastname}`,
                    role: currentUser.role
                }
            }

            return token;
        },
    }
}


