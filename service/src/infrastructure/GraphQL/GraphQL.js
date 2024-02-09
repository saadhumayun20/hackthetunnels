import express from 'express';
const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const { YourQueryType } = require('./resolvers');
const { YourMutationType } = require('./mutations');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    yourQuery: YourQueryType,
  },
});

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    yourMutation: YourMutationType,
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

// resolvers.js

const { GraphQLObjectType, GraphQLString } = require('graphql');
const { YourServiceFunction } = require('../services/yourService');

const YourQueryType = new GraphQLObjectType({
  name: 'YourQueryType',
  fields: {
    yourField: {
      type: GraphQLString,
      resolve: async () => {
        try {
          const result = await YourServiceFunction();
          return result;
        } catch (error) {
          throw new Error('Error fetching data from service.');
        }
      },
    },
  },
});

module.exports = { YourQueryType };

// mutations.js

const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require('graphql');
const { YourMutationServiceFunction } = require('../services/yourService');

const YourMutationType = new GraphQLObjectType({
  name: 'YourMutationType',
  fields: {
    yourMutationField: {
      type: GraphQLString,
      args: {
        input: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: async (_, { input }) => {
        try {
          const result = await YourMutationServiceFunction(input);
          return result;
        } catch (error) {
          throw new Error('Error performing mutation.');
        }
      },
    },
  },
});

module.exports = { YourMutationType };

// server.js

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./infrastructure/graphql/schema');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  '/api/graphql',
  graphqlHTTP({
    schema,
    graphiql: true, // Enable GraphiQL for development
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
