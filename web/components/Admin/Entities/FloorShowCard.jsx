import {
  Badge,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  HStack,
  Spacer,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';

const FloorShowCard = () => {
  return (
    <Wrap>
      <WrapItem>
        <Flex>
          <VStack bg="blue.400" p={5} borderTopLeftRadius="md" borderBottomLeftRadius="md">
            <Heading fontSize="xl">FLOOR</Heading>

            <Spacer />

            <Heading>1</Heading>
          </VStack>

          <Spacer />

          <VStack
            p={5}
            direction="column"
            align="center"
            bg="green.200"
            borderTopRightRadius="md"
            borderBottomRightRadius="md"
            w="175px"
          >
            <Heading fontSize="md">Teyvat</Heading>

            <Spacer />

            <VStack>
              <Badge colorScheme="red">Since 2020/02/05</Badge>
              <Badge colorScheme="red">Modified 2020/02/05</Badge>
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
      </WrapItem>
    </Wrap>
  );
};

export default FloorShowCard;
