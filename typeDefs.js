import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    users: [User]
    user(id: ID!): User
  }

  input newUserInputForm {
    lastName: String!
    firstName: String!
    password: String!
    email: String!
  }

  input signinInputForm {
    email: String!
    password: String!
  }

  type Mutation {
    signupUser(userNew: newUserInputForm!): User
    signinUser(signinInputForm: signinInputForm!): Token
  }

  type Token {
    token: String!
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    todoList: [todoList]
  }

  type todoList {
    title: String!
    by: ID!
  }
`;

export default typeDefs;
