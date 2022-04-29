import { Heading, Text, useColorMode, VStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';

function Padding({ title, text, bgDark, bgLight }) {
  const { colorMode } = useColorMode();

  return (
    <VStack
      minH="50vh"
      bgColor={colorMode === 'dark' ? bgDark : bgLight}
      mb={16}
      px={8}
      justify="center"
      rounded="1rem"
      color={colorMode === 'dark' ? 'black' : 'white'}
    >
      <Heading
        as="h1"
        size="xl"
        fontWeight="bold"
        letterSpacing="0.5rem"
        textAlign="center"
        textTransform="uppercase"
      >
        {title}
      </Heading>
      <Text textAlign="center">{text}</Text>
    </VStack>
  );
}

Padding.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  bgDark: PropTypes.string.isRequired,
  bgLight: PropTypes.string.isRequired,
};

export default Padding;
