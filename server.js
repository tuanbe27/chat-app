import { ApolloServer, gql } from 'apollo-server';

const users = [
  {
    id: '1',
    username: 'tuanbe',
    email: 'tuanbe@gmail.com',
    password: '12345',
  },
  {
    id: '2',
    username: 'quantrinh',
    email: 'quan@gmail.com',
    password: '12345',
  },
];

const typeDefs = gql`
  type Query {
    users: [User]
    user(id: ID!): User
  }

  type User {
    id: ID
    username: String
    email: String
  }
`;

const resolvers = {
  Query: {
    users: () => users,
    user: (parent, { id }, context) => {
      return users.find((e) => e.id === id);
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
