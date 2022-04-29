import { FormControl, FormHelperText, FormLabel, Input } from '@chakra-ui/react';
import PropTypes from 'prop-types';

function ControlledText({ stateValue, stateDispatch, formLabel, formHelper, formPlaceholder }) {
  return (
    <FormControl isRequired>
      <FormLabel>{formLabel}</FormLabel>
      <Input
        autoComplete="off"
        placeholder={formPlaceholder}
        value={stateValue}
        onChange={({ currentTarget: { value } }) => stateDispatch(value)}
        focusBorderColor="green.500"
        size="lg"
      />

      <FormHelperText fontSize="xs">{formHelper}</FormHelperText>
    </FormControl>
  );
}

ControlledText.propTypes = {
  stateValue: PropTypes.string.isRequired,
  stateDispatch: PropTypes.func.isRequired,
  formLabel: PropTypes.string.isRequired,
  formHelper: PropTypes.string.isRequired,
  formPlaceholder: PropTypes.string.isRequired,
};

export default ControlledText;
