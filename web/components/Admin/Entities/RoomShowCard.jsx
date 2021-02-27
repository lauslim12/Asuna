/* eslint-disable no-underscore-dangle */
import { Badge, Box, Button, ButtonGroup, Image, Stack, Text, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';

import webRoutes from '../../../helpers/webRoutes';

const RoomShowCard = ({ data }) => {
  return (
    <Box
      borderWidth={1}
      borderColor="white"
      borderRadius="md"
      p={4}
      boxShadow="0 30px 60px rgba(0, 0, 0, 0.15)"
    >
      <Box mb={4} textAlign="center">
        <Badge fontSize="sm" colorScheme="red">
          {`Location: Floor ${data.floor.number}`}
        </Badge>
      </Box>

      <Stack spacing={3}>
        <VStack spacing={3}>
          <Box>
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/images/thumbnails/${data.thumbnail}`}
              h="full"
              borderRadius="full"
            />
          </Box>
          <Text>{data.name}</Text>
          <Badge colorScheme="green">{data.type}</Badge>
        </VStack>

        <VStack>
          <ButtonGroup>
            <Button size="xs" colorScheme="green" w="75px">
              <NextLink href={webRoutes.adminEditEntities('rooms', data._id)}>Edit Room</NextLink>
            </Button>
            <Button size="xs" colorScheme="red" w="75px">
              Delete Room
            </Button>
          </ButtonGroup>
        </VStack>
      </Stack>
    </Box>
  );
};

RoomShowCard.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export default RoomShowCard;
