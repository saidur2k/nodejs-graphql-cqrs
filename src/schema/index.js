const { makeExecutableSchema } = require('graphql-tools');
const gql = require('graphql-tag');
const { GraphQLDateTime } = require('graphql-iso-date');

const { createStore } = require('../event-store');
const eventStore = createStore();
const addShow = require('../commands/addShow');
const getShows = require('../queries/getShows');

const typeDefs = gql`
  scalar DateTime

  type Show {
    title: String!
    time: String!
    host: String!
    location: String!
  }

  type Query {
    allShows: [Show!]!
  }

  type Mutation {
    addShow(
      title: String!
      time: DateTime!
      host: String!
      location: String!
    ): Boolean
  }
`;

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers: {
    DateTime: GraphQLDateTime,
    Query: {
      allShows: () => getShows(eventStore)
    },
    Mutation: {
      addShow: (_, data) => {
        addShow(eventStore, data);
        return true;
      }
    }
  }
});
