import RegisterForm from '../../components/Auth/RegisterForm';
import Layout from '../../components/Layout';

function SignUp() {
  return (
    <Layout title={['Sign Up']}>
      <RegisterForm />
    </Layout>
  );
}

export default SignUp;
