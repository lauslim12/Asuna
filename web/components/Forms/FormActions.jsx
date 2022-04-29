import { Button, ButtonGroup, Icon } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { IoCreateOutline } from 'react-icons/io5';
import { MdCancel } from 'react-icons/md';

function FormActions({ cancelPath }) {
  const router = useRouter();

  return (
    <ButtonGroup variant="outline" spacing={6}>
      <Button type="submit" leftIcon={<Icon as={IoCreateOutline} />} colorScheme="teal">
        Submit
      </Button>
      <Button leftIcon={<Icon as={MdCancel} />} onClick={() => router.push(cancelPath)}>
        Cancel
      </Button>
    </ButtonGroup>
  );
}

FormActions.propTypes = {
  cancelPath: PropTypes.string.isRequired,
};

export default FormActions;
