import { Flex, useColorMode, useColorModeValue, VStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';

function FormOverlay({ submitAction, children }) {
  const { colorMode } = useColorMode();
  const bg = useColorModeValue('#fafafa');

  return (
    <Flex
      as="form"
      borderRadius="md"
      direction="column"
      align="center"
      justify="center"
      encType="multipart/form-data"
      onSubmit={submitAction}
    >
      <VStack
        px={[7, 14]}
        py={[5, 10]}
        spacing={5}
        borderRadius="md"
        w={['full', 'full', '60%']}
        border={colorMode === 'light' ? '1px solid #000' : '1px solid #fff'}
        bg={bg}
      >
        {children}
      </VStack>
    </Flex>
  );
}

FormOverlay.propTypes = {
  submitAction: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default FormOverlay;
