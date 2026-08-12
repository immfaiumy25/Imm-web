import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "OTP",
      credentials: {
        email: { label: "Email", type: "email" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.otp) {
          throw new Error("Email dan OTP harus diisi.");
        }

        // 1. Cari OTP di database
        const otpRecord = await prisma.otpVerification.findUnique({
          where: { email: credentials.email },
        });

        if (!otpRecord) {
          throw new Error("OTP tidak ditemukan atau belum di-request.");
        }

        // 2. Cek apakah OTP cocok
        if (otpRecord.otp !== credentials.otp) {
          throw new Error("Kode OTP salah.");
        }

        // 3. Cek apakah OTP expired
        if (new Date() > otpRecord.expiresAt) {
          throw new Error("Kode OTP sudah kedaluwarsa.");
        }

        // 4. Cari user
        const user = await prisma.user.findFirst({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("Pengguna tidak ditemukan.");
        }

        // 5. Hapus OTP yang sudah digunakan
        await prisma.otpVerification.delete({
          where: { email: credentials.email },
        });

        return {
          id: user.id.toString(),
          name: user.username,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days (1 week)
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
};
