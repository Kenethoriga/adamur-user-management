// otpUtils.js
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  }
  
  module.exports = { generateOTP };
  
  // emailService.js
  const nodemailer = require('nodemailer');
  
  async function sendOTPEmail(email, otp) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  
    await transporter.sendMail({
      from: '"Adamur" <noreply@adamur.com>',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}`,
    });
  }
  
  module.exports = { sendOTPEmail };
  