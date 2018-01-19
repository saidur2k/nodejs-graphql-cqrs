const { makeExecutableSchema } = require('graphql-tools');
const gql = require('graphql-tag');
const { GraphQLDateTime } = require('graphql-iso-date');

const { data } = require('./data');

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

const fakeData = data;
module.exports = makeExecutableSchema({
  typeDefs,
  resolvers: {
    DateTime: GraphQLDateTime,
    Query: {
      allShows: () => fakeData
    },
    Mutation: {
      addShow: (_, data) => {
        fakeData.push(data);
        return true;
      }
    }
  }
});
