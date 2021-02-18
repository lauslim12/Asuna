import { chakra, HStack, Icon, Image, Spacer } from '@chakra-ui/react';
import { HiOfficeBuilding, HiUser } from 'react-icons/hi';

const Header = () => {
  return (
    <HStack as="nav" p={4} spacing={2} bg="white" color="black">
      <HStack spacing={2}>
        <Image src="/logo.png" w={6} h={6} borderRadius="md" />
        <chakra.span fontSize="lg">Project Asuna</chakra.span>
      </HStack>

      <Spacer />

      <HStack spacing={4}>
        <HStack spacing={2}>
          <Icon as={HiOfficeBuilding} />
          <chakra.div>Rooms</chakra.div>
        </HStack>
        <HStack spacing={2}>
          <Icon as={HiUser} />
          <chakra.div>Profile</chakra.div>
        </HStack>
      </HStack>
    </HStack>
  );
};

export default Header;
