import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react';

function Services() {
  return (
    <VStack spacing={5} mb={16} px={8} minH="50vh">
      <Heading as="h1" size="xl" fontWeight="bold" letterSpacing="0.5rem" textAlign="center">
        OUR SERVICES
      </Heading>
      <Box bg="teal.400" mb={5} p={2} transform="skewX(-20deg)" rounded="sm">
        <Text align="center" fontWeight="bold" fontSize={['sm', 'md', 'lg']}>
          We provide services that do not exist in other companies.
        </Text>
      </Box>

      <Grid templateColumns={{ lg: 'repeat(2, 1fr)' }} gap={6} fontSize="xl">
        <Text>❤️ Comfortable working environment</Text>
        <Text>✨ Various types of rooms for your comfort</Text>
        <Text>🚀 Full stacked with features for convenience</Text>
        <Text>🤑 Low prices, extremely high quality rooms</Text>
        <Text>🌏 Networking opportunities</Text>
        <Text>✔️ Modern IT systems</Text>
        <Text>🔥 Ready to help you anytime</Text>
        <Text>👍 Friendly owner</Text>
        <Text>🖥️ Our app is open-source</Text>
        <Text>⚡ Fast response</Text>
      </Grid>
    </VStack>
  );
}

export default Services;
