import Layout from '../components/Layout';
import NotFoundPage from '../components/NotFoundPage';

function Error404Page() {
  return (
    <Layout title={['Not Found!']}>
      <NotFoundPage />
    </Layout>
  );
}

export default Error404Page;
