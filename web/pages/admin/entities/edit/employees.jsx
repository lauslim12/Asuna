import { Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState } from 'react';

import ControlledNumber from '../../../../components/Forms/ControlledNumber';
import ControlledSelect from '../../../../components/Forms/ControlledSelect';
import ControlledText from '../../../../components/Forms/ControlledText';
import FormActions from '../../../../components/Forms/FormActions';
import FormHeading from '../../../../components/Forms/FormHeading';
import FormOverlay from '../../../../components/Forms/FormOverlay';
import Layout from '../../../../components/Layout';
import { getAuth, patchAuth, post } from '../../../../utils/apiHelper';
import jobdescHelper from '../../../../utils/jobdescHelper';
import webRoutes from '../../../../utils/webRoutes';
import withAdministrator from '../../../../utils/withAdministrator';

export const getServerSideProps = withAdministrator(async (ctx) => {
  const { data } = await getAuth(
    `${process.env.PRIVATE_API_URL}/api/v1/employees/${ctx.query.id}`,
    ctx.req.cookies?.jwt
  );

  if (!data) {
    return {
      redirect: {
        destination: webRoutes.adminHomepage,
        permanent: false,
      },
    };
  }

  return {
    props: {
      data,
    },
  };
});

function EditEmployees({ data }) {
  const [user, setUser] = useState(data.user.email);
  const [salary, setSalary] = useState(data.salary);
  const [jobdesc, setJobdesc] = useState(data.jobdesc);
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authorization = await post({ key: 'edit_employee_key' }, '/api/checkAuth');

    if (authorization.status === 'fail') {
      return toast({
        title: 'Failed to fetch cookie!',
        description: 'Failed to fetch cookie! Please contact your system admin.',
        status: 'error',
        isClosable: true,
      });
    }

    const apiResponse = await patchAuth(
      { email: user, salary, jobdesc },
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/employees/${data._id}`,
      authorization.token
    );

    if (apiResponse.status === 'success') {
      toast({
        title: 'Successfully edited!',
        description: 'Thank you! You will be redirected shortly.',
        status: 'success',
        isClosable: true,
      });

      return setTimeout(() => router.push(webRoutes.adminEntities('employees')), 1000);
    }

    return toast({
      title: 'Failed to create!',
      description: apiResponse.message,
      status: 'error',
      isClosable: true,
    });
  };

  return (
    <Layout title={['Create Employee']}>
      <FormOverlay submitAction={handleSubmit}>
        <FormHeading formTitle="Create a new Employee!" />

        <Text textAlign="center" fontSize="sm">
          Hello Owner! Please fill up some details first!
        </Text>

        <ControlledText
          stateValue={user}
          stateDispatch={setUser}
          formLabel="User"
          formHelper="User email to be used to be linked to the Employee account."
          formPlaceholder="alexander_programmer@gmail.com"
        />

        <ControlledNumber
          stateValue={salary}
          stateDispatch={setSalary}
          formLabel="Salary"
          formHelper="The salary for the employee."
        />

        <ControlledSelect
          stateValue={jobdesc}
          stateDispatch={setJobdesc}
          formLabel="Jobdesc"
          formHelper="The employee jobdesc"
          optionValues={jobdescHelper}
          keyToDisplay="name"
        />

        <FormActions cancelPath={webRoutes.adminHomepage} />
      </FormOverlay>
    </Layout>
  );
}

EditEmployees.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export default EditEmployees;
