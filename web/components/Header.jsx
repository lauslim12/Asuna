/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  chakra,
  HStack,
  Icon,
  IconButton,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  useColorMode,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { FaLock, FaMoon, FaSignInAlt, FaTrello } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { HiOfficeBuilding, HiUser } from 'react-icons/hi';

import webRoutes from '../helpers/webRoutes';

const Header = () => {
  const { toggleColorMode } = useColorMode();

  return (
    <HStack as="nav" p={4} spacing={2}>
      <NextLink href={webRoutes.homepage} passHref>
        <Link flexShrink={0}>
          <HStack spacing={2}>
            <Image src="/logo.png" w={6} h={6} borderRadius="md" />
            <chakra.span fontSize="lg">Asuna</chakra.span>
          </HStack>
        </Link>
      </NextLink>

      <Spacer />

      <HStack spacing={3}>
        <IconButton
          colorScheme="blue"
          aria-label="Activate Dark Mode"
          icon={<Icon as={FaMoon} />}
          variant="outline"
          onClick={() => toggleColorMode()}
        />

        <Menu isLazy>
          <MenuButton
            as={IconButton}
            aria-label="Navigation Menu"
            size="md"
            variant="solid"
            icon={<Icon as={GiHamburgerMenu} color="blue.400" />}
          />
          <MenuList>
            <NextLink href={webRoutes.listOfRooms} passHref>
              <Link flexShrink={0}>
                <MenuItem icon={<Icon as={HiOfficeBuilding} />} command="⌘T">
                  Rooms
                </MenuItem>
              </Link>
            </NextLink>
            <NextLink href={webRoutes.profile} passHref>
              <Link flexShrink={0}>
                <MenuItem icon={<Icon as={HiUser} />} command="⌘N">
                  Profile
                </MenuItem>
              </Link>
            </NextLink>
            <NextLink href={webRoutes.signIn} passHref>
              <Link flexShrink={0}>
                <MenuItem icon={<Icon as={FaSignInAlt} />} command="⌘⇧N">
                  Sign In
                </MenuItem>
              </Link>
            </NextLink>
            <NextLink href={webRoutes.signUp} passHref>
              <Link flexShrink={0}>
                <MenuItem icon={<Icon as={FaTrello} />} command="⌘O">
                  Sign Up
                </MenuItem>
              </Link>
            </NextLink>
            <NextLink href={webRoutes.adminHomepage} passHref>
              <Link flexShrink={0}>
                <MenuItem icon={<Icon as={FaLock} />} command="⌘X">
                  Admin
                </MenuItem>
              </Link>
            </NextLink>
          </MenuList>
        </Menu>
      </HStack>
    </HStack>
  );
};

export default Header;
