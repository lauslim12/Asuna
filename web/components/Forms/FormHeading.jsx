import { Heading } from '@chakra-ui/react';
import PropTypes from 'prop-types';

function FormHeading({ formTitle }) {
  return (
    <Heading
      textAlign="center"
      fontSize={['md', 'md', 'lg']}
      textTransform="uppercase"
      color="#4e54c8"
    >
      {formTitle}
    </Heading>
  );
}

FormHeading.propTypes = {
  formTitle: PropTypes.string.isRequired,
};

export default FormHeading;
