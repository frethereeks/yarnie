import { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { $Enums } from '@prisma/client';
import jwt from "jsonwebtoken"
import { appRoutePaths } from '@/routes/paths';
import prisma from '@/lib/prisma';
import bcryptjs from "bcryptjs"
import { TAuthUser } from '@/types';
import { DefaultSession, User } from "next-auth"
// import { JWT } from "next-auth/jwt"

export type ExtendedUser = User & {
    role: $Enums.Role
    id: string
} & DefaultSession['user'];

declare module "next-auth/jwt" {
    interface JWT {
        role: $Enums.Role
        id: string
    }
}

declare module "next-auth" {
    interface Session {
        user: ExtendedUser
    }
}

// declare module "next-auth" {
//     interface Session {
//         user: ExtendedUser & DefaultSession["user"]
//     }
// }

export const authOptions: NextAuthOptions = {
    debug: process.env.NODE_ENV !== 'production',
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
                console.log({ email, password })
                const user = await prisma.ynUser.findFirst({ where: { email: email.toLowerCase() } })
                if (!user) return null
                const matchPassword = await bcryptjs.compare(password, user.password)
                if (!matchPassword) return null
                if (user.status === "Pending") {
                    throw new Error("Your account status is set to Pending at the moment. Please, contact the admin for account activation.")
                }
                else if (user.status === "Suspended") {
                    throw new Error("Oh No! Your account has been suspended. If you believe this is an error, contact the admin")
                }
                return user as User
            },
        })
    ],
    pages: {
        signIn: appRoutePaths.signin,
        error: appRoutePaths.signin,
        signOut: appRoutePaths.logout,
    },
    secret: process.env.JWT,
    useSecureCookies: process.env.NODE_ENV === "production",
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
                    role: token.role,
                    id: token.id,
                }
            };
        },
        jwt({ token, user, trigger, session }) {
            if (user) {
                const currentUser = user as TAuthUser
                return {
                    ...token,
                    id: currentUser.id,
                    email: currentUser.email,
                    image: currentUser.image,
                    name: `${currentUser.firstname} ${currentUser.lastname}`,
                    role: currentUser.role
                }
            }
            // This check is necessary to update the server session in real-time
            if (trigger === "update") {
                return { ...token, ...session.user }
            }

            return token;
        },
    }
}


