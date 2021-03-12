import {
  Flex,
  Heading,
  HStack,
  Icon,
  Link,
  Spacer,
  Stack,
  Text,
  Tooltip,
  useColorMode,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

const CreatorCard = ({ people }) => {
  const { colorMode } = useColorMode();
  const darkHover = {
    background: 'gray.700',
    cursor: 'pointer',
  };
  const lightHover = {
    background: 'gray.300',
    cursor: 'pointer',
  };

  return (
    <Stack
      w="full"
      p={5}
      border="1px solid #e1e7ec"
      borderRadius="md"
      boxShadow="md"
      spacing={4}
      _hover={colorMode === 'dark' ? darkHover : lightHover}
    >
      <HStack>
        <Heading fontSize="2xl">{people.name}</Heading>
      </HStack>

      <HStack>
        <Text>{people.description}</Text>
      </HStack>

      <Flex>
        <HStack>
          {people.contacts.map((contact) => (
            <Tooltip label={contact.name} key={`${people.name}-${contact.icon}`}>
              <Link href={contact.link} isExternal>
                <Icon as={contact.icon} />
              </Link>
            </Tooltip>
          ))}
        </HStack>

        <Spacer />

        <HStack>
          {people.technologies.map((technology) => (
            <Icon key={`${people.name}-${technology}`} as={technology} />
          ))}
        </HStack>
      </Flex>
    </Stack>
  );
};

CreatorCard.propTypes = {
  people: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        icon: PropTypes.func.isRequired,
        link: PropTypes.string.isRequired,
      })
    ),
    technologies: PropTypes.arrayOf(PropTypes.func).isRequired,
  }).isRequired,
};

export default CreatorCard;
