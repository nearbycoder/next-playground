import { ApolloServer, gql } from 'apollo-server-micro';

const typeDefs = gql`
  type User {
    token: String
  }

  type Query {
    sayHello: String
  }
  type Mutation {
    signIn(username: String, password: String): User
  }
`;

const resolvers = {
  Query: {
    sayHello(parent, args, context) {
      if (context.user) {
      }
      return context.myProperty;
    }
  },
  Mutation: {
    signIn(parent, args, _context) {
      console.log('made it');
      // find user and create jwt
      return { token: 'test' };
    }
  }
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    console.log(req.cookies.jwt);

    return {
      myProperty: 'hello property',
      user: {}
    };
  }
});

export const config = {
  api: {
    bodyParser: false
  }
};

export default apolloServer.createHandler({ path: '/api/graphql' });
