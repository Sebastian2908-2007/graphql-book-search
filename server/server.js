const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const {typeDefs, resolvers} = require('./schema');
const { authMiddleware } = require('./utils/auth');


const app = express();
const PORT = process.env.PORT || 3001;

const startApolloServer = async () => {
  // create apollo server passing in our schema "typedefs" "resolvers"
  const server =  new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
  });

  // start the server
  await server.start();

  // intigrate apollo server with express
  server.applyMiddleware({ app });

  // log graphql playground url
  console.log(`use GraphQl playground @ http://localhost:${PORT}${server.graphqlPath}`);

};
// start apollo server
startApolloServer();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
