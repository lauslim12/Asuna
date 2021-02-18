import { Text, VStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const RoomCard = ({ roomData }) => {
  return (
    <VStack bg="green">
      <Text>{roomData.name}</Text>
      <Text>{roomData.description}</Text>
      <Text>{roomData.price}</Text>
      <Text>{roomData.type}</Text>
    </VStack>
  );
};

RoomCard.propTypes = {
  roomData: PropTypes.instanceOf(Object).isRequired,
};

export default RoomCard;
