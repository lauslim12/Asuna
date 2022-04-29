import LoginForm from '../../components/Auth/LoginForm';
import Layout from '../../components/Layout';

function SignIn() {
  return (
    <Layout title={['Sign In']}>
      <LoginForm />
    </Layout>
  );
}

export default SignIn;
