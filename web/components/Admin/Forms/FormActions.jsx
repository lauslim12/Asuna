import { Button, ButtonGroup, Icon } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { IoCreateOutline } from 'react-icons/io5';
import { MdCancel } from 'react-icons/md';

const FormActions = ({ submitAction, cancelPath }) => {
  const router = useRouter();

  return (
    <ButtonGroup variant="outline" spacing={6}>
      <Button
        type="submit"
        leftIcon={<Icon as={IoCreateOutline} />}
        colorScheme="teal"
        onClick={submitAction}
      >
        Edit
      </Button>
      <Button leftIcon={<Icon as={MdCancel} />} onClick={() => router.push(cancelPath)}>
        Cancel
      </Button>
    </ButtonGroup>
  );
};

FormActions.propTypes = {
  submitAction: PropTypes.func.isRequired,
  cancelPath: PropTypes.string.isRequired,
};

export default FormActions;
