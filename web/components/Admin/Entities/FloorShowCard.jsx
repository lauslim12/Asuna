import {
  Badge,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  HStack,
  Spacer,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

const FloorShowCard = ({ data }) => {
  const bg = useColorModeValue('green.200', 'green.500');

  return (
    <Flex>
      <VStack bg="blue.400" p={5} borderTopLeftRadius="md" borderBottomLeftRadius="md">
        <Heading fontSize="xl">FLOOR</Heading>

        <Spacer />

        <Heading>{data.number}</Heading>
      </VStack>

      <VStack
        p={5}
        direction="column"
        align="center"
        bg={bg}
        borderTopRightRadius="md"
        borderBottomRightRadius="md"
        w="175px"
      >
        <Heading fontSize="md">{data.name}</Heading>

        <Spacer />

        <VStack>
          <Badge colorScheme="red">
            {`Since ${new Date(data.createdAt).toISOString().split('T')[0]}`}
          </Badge>
          <Badge colorScheme="red">
            {`Modified ${new Date(data.lastModified).toISOString().split('T')[0]}`}
          </Badge>
        </VStack>

        <Spacer />

        <HStack>
          <ButtonGroup>
            <Button size="xs" colorScheme="orange">
              Edit
            </Button>
            <Button size="xs" colorScheme="red">
              Delete
            </Button>
          </ButtonGroup>
        </HStack>
      </VStack>
    </Flex>
  );
};

FloorShowCard.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export default FloorShowCard;
