import {
  FormControl,
  FormHelperText,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

const ControlledNumber = ({ stateValue, stateDispatch, formLabel, formHelper }) => (
  <FormControl isRequired>
    <FormLabel>{formLabel}</FormLabel>
    <NumberInput
      defaultValue={stateValue}
      min={1}
      onChange={(value) => stateDispatch(value)}
      focusBorderColor="green.500"
      size="lg"
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>

    <FormHelperText fontSize="xs">{formHelper}</FormHelperText>
  </FormControl>
);

ControlledNumber.propTypes = {
  stateValue: PropTypes.number.isRequired,
  stateDispatch: PropTypes.func.isRequired,
  formLabel: PropTypes.string.isRequired,
  formHelper: PropTypes.string.isRequired,
};

export default ControlledNumber;
