import MenuCard from '../../components/Admin/MenuCard';
import Layout from '../../components/Layout';
import withAdministrator from '../../utils/withAdministrator';

export const getServerSideProps = withAdministrator(() => {
  return {
    props: {},
  };
});

function AdminHomepage() {
  return (
    <Layout title={['Admin']}>
      <MenuCard />
    </Layout>
  );
}

export default AdminHomepage;
