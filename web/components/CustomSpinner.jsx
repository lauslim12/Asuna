import { Spinner, Text, VStack } from '@chakra-ui/react';

function CustomSpinner() {
  return (
    <VStack spacing={5}>
      <Text textAlign="center">Please wait while we are processing your request!</Text>
      <Spinner size="xl" color="green.300" thickness="4px" emptyColor="gray.300" />
    </VStack>
  );
}

export default CustomSpinner;
