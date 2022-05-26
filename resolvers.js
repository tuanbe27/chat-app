import { PrismaClient } from '@prisma/client';
import { AuthenticationError, ApolloError } from 'apollo-server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    users: () => users,
    user: (_, { id }, { userLoggedIn }) => {
      if (!userLoggedIn) {
        throw new Error('You are not logged in');
      }
      return users.find((e) => e.id === id);
    },
  },
  User: {
    todoList: (parent) => {
      return todoList.filter((todo) => todo.by === parent.id);
    },
  },
  Mutation: {
    signupUser: async (_, { userNew }) => {
      const hashedPassword = await bcrypt.hash(userNew.password, 10);
      const user = await prisma.user.findUnique({
        where: { email: userNew.email },
      });
      if (user)
        throw new AuthenticationError('User already exists with that email');
      const newUser = await prisma.user.create({
        data: {
          ...userNew,
          password: hashedPassword,
        },
      });
      return newUser;
    },
    signinUser: async (_, { signinInputForm }) => {
      const user = await prisma.user.findUnique({
        where: { email: signinInputForm.email },
      });
      if (!user)
        throw new AuthenticationError("User doesn't exists with that mail");
      const checkPassword = await bcrypt.compare(
        signinInputForm.password,
        user.password
      );

      if (!checkPassword)
        throw new AuthenticationError('Email or password is invalid');
      const token = jwt.sign({ userId: user.id }, process.env.JWT_KEY);
      return { token };
    },
  },
};
