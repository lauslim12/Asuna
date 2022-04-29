import { Button, Heading, Icon, Stack, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { AiFillProfile } from 'react-icons/ai';
import { HiOfficeBuilding } from 'react-icons/hi';
import { IoEnter } from 'react-icons/io5';

import webRoutes from '../../utils/webRoutes';

function CustomButton({ colorScheme, content, href, icon }) {
  return (
    <NextLink href={href} passHref>
      <Button colorScheme={colorScheme} leftIcon={<Icon as={icon} />}>
        {content}
      </Button>
    </NextLink>
  );
}

function Go() {
  return (
    <VStack spacing={5} mb={5} px={8}>
      <Heading as="h1" size="xl" fontWeight="bold" textAlign="center" mb={5}>
        Let&apos;s go and see further 🚀
      </Heading>

      <Stack direction={['column', 'column', 'row']}>
        <CustomButton
          colorScheme="red"
          content="See all available rooms"
          href={webRoutes.listOfRooms}
          icon={HiOfficeBuilding}
        />
        <CustomButton
          colorScheme="blue"
          content="Register an account"
          href={webRoutes.signUp}
          icon={AiFillProfile}
        />
        <CustomButton
          colorScheme="green"
          content="Log in to your account"
          href={webRoutes.signIn}
          icon={IoEnter}
        />
      </Stack>
    </VStack>
  );
}

CustomButton.propTypes = {
  colorScheme: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
};

export default Go;
