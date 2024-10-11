# Adamur User Management System

This project is a backend user management system built using **Node.js**, **GraphQL**, and **Prisma**. It handles user registration, account verification, secure login, password reset functionality, and uses JWT for authentication. The system also supports OTP-based email verification, making it a good fit for educational platforms like Adamur.

## Features

1. **User Registration**
   - Users can register using their email and password.
   - Strong email format and password validation (min length, alphanumeric).
   - Passwords are encrypted using bcryptjs before being stored.
   - Sends an OTP via email for account verification.

2. **User Login**
   - Users can log in with their email and password.
   - Returns a JWT token on successful login.
   - Handles non-verified user login attempts gracefully.

3. **Account Verification**
   - Verifies the user's account using an OTP sent via email after registration.

4. **Password Reset**
   - Sends a password reset email with a secure token.
   - Allows the user to reset their password using the token.

## Technology Stack

- **Backend**: Node.js, Express, GraphQL
- **Database**: Prisma with PostgreSQL (or SQLite for development)
- **Authentication**: JWT (for login and password reset)
- **Email Service**: Nodemailer with Gmail SMTP
- **Testing**: Jest, Supertest

## Project Structure

