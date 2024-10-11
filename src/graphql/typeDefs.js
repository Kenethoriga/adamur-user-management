const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    id: ID!
    email: String!
    isVerified: Boolean!
    createdAt: String!
  }

  type Token {
    token: String!
  }

  type Query {
    getUser(email: String!): User
  }

  type Mutation {
    register(email: String!, password: String!): String
    login(email: String!, password: String!): Token
    verifyAccount(email: String!, otp: String!): String
    requestPasswordReset(email: String!): String
    resetPassword(token: String!, newPassword: String!): String
  }
`;
