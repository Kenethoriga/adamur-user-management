const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateOTP, sendOTPEmail } = require('../services/emailService');
const { generateToken } = require('../utils/jwtUtils');
const prisma = require('../models/user');

module.exports = {
  Query: {
    async getUser(_, { email }) {
      return await prisma.user.findUnique({ where: { email } });
    },
  },
  
  Mutation: {
    async register(_, { email, password }) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { email, password: hashedPassword },
      });
      const otp = generateOTP();
      await sendOTPEmail(user.email, otp);
      return 'OTP sent for verification';
    },

    async login(_, { email, password }) {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user || !user.isVerified) throw new Error('Account not verified');
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) throw new Error('Invalid credentials');
      const token = generateToken(user.id);
      return { token };
    },

    async verifyAccount(_, { email, otp }) {
      const user = await prisma.user.findUnique({ where: { email } });
      if (user.otp !== otp || user.otpExpires < new Date()) throw new Error('OTP expired or invalid');
      await prisma.user.update({
        where: { email },
        data: { isVerified: true, otp: null, otpExpires: null },
      });
      return 'Account verified successfully';
    },

    async requestPasswordReset(_, { email }) {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) throw new Error('User not found');
      const token = generateToken(user.id, '15m');
      // send email with the reset link and token
      return 'Password reset email sent';
    },

    async resetPassword(_, { token, newPassword }) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await prisma.user.update({
        where: { id: decoded.userId },
        data: { password: hashedPassword },
      });
      return 'Password reset successfully';
    },
  },
};
