import { Button, Collapse, Grid, Heading, Icon, useDisclosure, VStack } from '@chakra-ui/react';
import { FaArrowCircleDown } from 'react-icons/fa';

import Creators from '../../data/Creators';
import CreatorCard from './CreatorCard';

const CreatorsSection = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <VStack w="full">
      <Button
        onClick={onToggle}
        aria-label="Show the creators of this website"
        leftIcon={<Icon as={FaArrowCircleDown} />}
        rightIcon={<Icon as={FaArrowCircleDown} />}
        variant="ghost"
        colorScheme="green"
      >
        Click me!
      </Button>
      <Collapse in={isOpen} animateOpacity w="full">
        <Heading as="h1" size="xl" fontWeight="bold" textAlign="center">
          Team
        </Heading>

        <Grid templateColumns={{ lg: 'repeat(2, 1fr)' }} gap={5} w="full" mt={5}>
          {Creators.map((creator) => (
            <CreatorCard key={creator.id} people={creator} />
          ))}
        </Grid>
      </Collapse>
    </VStack>
  );
};

export default CreatorsSection;
