import MenuCard from '../../components/Admin/MenuCard';
import Layout from '../../components/Layout';
import isAdministrator from '../../utils/isAdministrator';

export const getServerSideProps = isAdministrator(() => {
  return {
    props: {},
  };
});

const AdminHomepage = () => {
  return (
    <Layout title={['Admin']}>
      <MenuCard />
    </Layout>
  );
};

export default AdminHomepage;
