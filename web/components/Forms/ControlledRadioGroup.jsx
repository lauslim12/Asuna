import {
  chakra,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

function ControlledRadioGroup({ types, stateDispatch, formLabel, formHelper, defaultValue }) {
  return (
    <FormControl isRequired>
      <RadioGroup defaultValue={defaultValue} onChange={stateDispatch}>
        <FormLabel>{formLabel}</FormLabel>
        <HStack spacing={5}>
          {types.map((type) => (
            <Radio key={type} colorScheme="red" value={type}>
              <chakra.p textTransform="capitalize">{type}</chakra.p>
            </Radio>
          ))}
        </HStack>
      </RadioGroup>

      <FormHelperText fontSize="xs">{formHelper}</FormHelperText>
    </FormControl>
  );
}

ControlledRadioGroup.propTypes = {
  types: PropTypes.arrayOf(String).isRequired,
  stateDispatch: PropTypes.func.isRequired,
  formLabel: PropTypes.string.isRequired,
  formHelper: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
};

export default ControlledRadioGroup;
