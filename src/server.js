// app.js
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });
server.start().then(res => {
  server.applyMiddleware({ app });
});

module.exports = app;

// server.js
const app = require('./app');
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
