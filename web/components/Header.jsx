/* eslint-disable jsx-a11y/anchor-is-valid */
import { chakra, HStack, Icon, Image, Link, Spacer } from '@chakra-ui/react';
import NextLink from 'next/link';
import { HiOfficeBuilding, HiUser } from 'react-icons/hi';

const Header = () => {
  return (
    <HStack as="nav" p={4} spacing={2} bg="white" color="black">
      <NextLink href="/" passHref>
        <Link flexShrink={0}>
          <HStack spacing={2}>
            <Image src="/logo.png" w={6} h={6} borderRadius="md" />
            <chakra.span fontSize="lg">Project Asuna</chakra.span>
          </HStack>
        </Link>
      </NextLink>

      <Spacer />

      <HStack spacing={4}>
        <NextLink href="/rooms" passHref>
          <Link flexShrink={0}>
            <HStack spacing={2}>
              <Icon as={HiOfficeBuilding} />
              <chakra.div>Rooms</chakra.div>
            </HStack>
          </Link>
        </NextLink>
        <NextLink href="/profile" passHref>
          <Link flexShrink={0}>
            <HStack spacing={2}>
              <Icon as={HiUser} />
              <chakra.div>Profile</chakra.div>
            </HStack>
          </Link>
        </NextLink>
      </HStack>
    </HStack>
  );
};

export default Header;
