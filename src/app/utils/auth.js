import CredentialsProvider from "next-auth/providers/credentials";

import User from "@/app/models/user";
import bcrypt from "bcrypt";
import connectDb from "./db";

export const authOptions = {
	session: {
		strategy: "jwt",
	},

	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				console.log("I AM BEING CALLED", credentials);

				if (!credentials.email || !credentials.password) {
					throw new Error("Email and Password Required");
				}
				try {
					await connectDb();
					const user = await User.findOne({
						email: credentials.email,
					}).lean();

					if (!user) {
						throw new Error("Invalid Credentials");
					}

					const isMatch = await bcrypt.compare(
						credentials.password,
						user.password,
					);

					if (!isMatch) {
						throw new Error("Invalid Credentials");
					}
					const { password, ...userWithOutPassword } = user;
					return userWithOutPassword;
				} catch (error) {
					throw new Error("Authentication Failed");
				}
			},
		}),
	],

	callbacks: {
		// user login attempt
		async signIn({ user }) {
			console.log(user, "user from signIn");
			return !!user;
		},
		// jwt token
		async jwt({ token, user }) {
			console.log(user, "user from jwt callback");
			if (user) {
				token.user = {
					id: user._id,
					email: user.email,
					name: user.name,
					role: user.role,
				};
			}

			return token;
		},
		// session
		async session({ session, token }) {
			if (token.user) {
				session.user = token.user;
			}
			return session;
		},
	},

	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: "/login",
	},
};
