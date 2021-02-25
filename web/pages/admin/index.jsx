import MenuCard from '../../components/Admin/MenuCard';
import Layout from '../../components/Layout';
import { getAuth } from '../../helpers/apiHelper';

export const getServerSideProps = async (ctx) => {
  const token = ctx.req.cookies.jwt;

  if (!token) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false,
      },
    };
  }

  const { data } = await getAuth(`${process.env.PRIVATE_API_URL}/api/v1/users/me`, token);

  if (data.role !== 'admin') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const AdminHomepage = () => {
  return (
    <Layout title={['Admin']}>
      <MenuCard />
    </Layout>
  );
};

export default AdminHomepage;
