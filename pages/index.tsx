import { useMutation } from 'graphql-hooks';
import cookie from 'js-cookie';
import nextCookies from 'next-cookies';

export const signInMutation = `
  mutation SignIn($username: String!, $password: String!){
    signIn(username: $username, password: $password) {
      token
    }
  }
`;

function Index() {
  const [signIn] = useMutation(signInMutation, {
    variables: { username: 'nearbycoder@gmail.com', password: 'blah@blah' }
  });

  return (
    <form>
      <input type="text" name="username" />
      <input type="text" name="password" />
      <button
        onClick={async e => {
          e.preventDefault();
          const { data } = await signIn();
          if (data.signIn) {
            cookie.set('jwt', data.signIn.token);
          }
        }}
        type="submit">
        Submit
      </button>
    </form>
  );
}

Index.getInitialProps = ctx => {
  const cookies = nextCookies(ctx);

  return {};
};

export default Index;
