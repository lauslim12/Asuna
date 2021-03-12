import { Box, Center, chakra, Flex, HStack, Icon, Image, Stack, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { FaMoneyBillAlt } from 'react-icons/fa';
import { GiEscalator } from 'react-icons/gi';
import { IoMdConstruct } from 'react-icons/io';
import { RiProfileFill, RiQuestionFill } from 'react-icons/ri';

const Details = ({ roomData }) => {
  const allFeatures = roomData.roomFeatures.join(', ');

  return (
    <Flex minH="90vh" justify="center" flexDirection={['column', 'column', 'row']}>
      <Flex bg="#f7f7f7" flex="0 0 50%" justify="center" align="center" p={10}>
        <Stack spacing={5}>
          <Text
            bgImage="linear-gradient(to right, #7dd56f, #28b487)"
            bgClip="text"
            color="transparent"
            letterSpacing="0.2rem"
            lineHeight={1.3}
            textTransform="uppercase"
            fontWeight="700"
            fontSize="2xl"
            textAlign={['center', 'left', 'left']}
          >
            SOME QUICK FACTS
          </Text>
          <HStack spacing={4}>
            <Icon as={GiEscalator} fill="#55c57a" boxSize={[4, 5, 7]} />
            <chakra.p textTransform="uppercase" fontWeight="bold" color="#777777">
              FLOOR
            </chakra.p>
            <chakra.p color="#777777">{roomData.floor.number}</chakra.p>
          </HStack>
          <HStack spacing={4}>
            <Icon as={RiProfileFill} fill="#55c57a" boxSize={[4, 5, 7]} />
            <chakra.p textTransform="uppercase" fontWeight="bold" color="#777777">
              FLOOR ID
            </chakra.p>
            <chakra.p color="#777777">{roomData.floor.name}</chakra.p>
          </HStack>
          <HStack mb={10} spacing={4}>
            <Icon as={IoMdConstruct} fill="#55c57a" boxSize={[4, 5, 7]} />
            <chakra.p textTransform="uppercase" fontWeight="bold" color="#777777">
              CONSTRUCTED
            </chakra.p>
            <chakra.p color="#777777">
              {new Date(roomData.createdAt).toISOString().split('T')[0]}
            </chakra.p>
          </HStack>

          <Text
            bgImage="linear-gradient(to right, #7dd56f, #28b487)"
            bgClip="text"
            color="transparent"
            letterSpacing="0.2rem"
            lineHeight={1.3}
            textTransform="uppercase"
            fontWeight="700"
            fontSize="xl"
          >
            PRICE
          </Text>
          <HStack spacing={4} mb={10}>
            <Icon as={FaMoneyBillAlt} fill="#55c57a" boxSize={[4, 5, 7]} />
            <chakra.p textTransform="uppercase" fontWeight="bold" color="#777777">
              IDR
            </chakra.p>
            <chakra.p color="#777777">{roomData.price.toLocaleString('id')}</chakra.p>
          </HStack>

          <Text
            bgImage="linear-gradient(to right, #7dd56f, #28b487)"
            bgClip="text"
            color="transparent"
            letterSpacing="0.2rem"
            lineHeight={1.3}
            textTransform="uppercase"
            fontWeight="700"
            fontSize="xl"
          >
            TYPE
          </Text>
          <HStack spacing={4}>
            <Icon as={RiQuestionFill} fill="#55c57a" boxSize={[4, 5, 7]} />
            <chakra.p textTransform="uppercase" fontWeight="bold" color="#777777">
              A(N)
            </chakra.p>
            <chakra.p color="#777777" textTransform="capitalize">
              {roomData.type}
            </chakra.p>
          </HStack>
        </Stack>
      </Flex>

      <Flex
        flex="0 0 50%"
        justify="center"
        align="center"
        flexDirection="column"
        p={10}
        bg="white"
        color="black"
      >
        <Stack spacing={5}>
          <Box mb={2}>
            <Center minH={0} flex={1}>
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/images/thumbnails/${roomData.thumbnail}`}
                h="full"
                borderRadius="full"
              />
            </Center>
          </Box>

          <Text
            bgImage="linear-gradient(to right, #7dd56f, #28b487)"
            bgClip="text"
            color="transparent"
            letterSpacing="0.2rem"
            lineHeight={1.3}
            textTransform="uppercase"
            fontWeight="700"
            fontSize="2xl"
            textAlign={['center', 'left', 'left']}
          >
            ABOUT THIS ROOM
          </Text>

          <Text mb={10}>{roomData.description}</Text>

          <Text
            bgImage="linear-gradient(to right, #7dd56f, #28b487)"
            bgClip="text"
            color="transparent"
            letterSpacing="0.2rem"
            lineHeight={1.3}
            textTransform="uppercase"
            fontWeight="700"
            fontSize="2xl"
            textAlign={['center', 'left', 'left']}
          >
            ROOM FEATURES
          </Text>

          <Text mb={10}>{allFeatures}</Text>
        </Stack>
      </Flex>
    </Flex>
  );
};

Details.propTypes = {
  roomData: PropTypes.instanceOf(Object).isRequired,
};

export default Details;
