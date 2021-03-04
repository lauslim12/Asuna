import { FormControl, FormHelperText, FormLabel, Input } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const ControlledPassword = ({
  stateValue,
  stateDispatch,
  formLabel,
  formHelper,
  formPlaceholder,
}) => (
  <FormControl isRequired>
    <FormLabel>{formLabel}</FormLabel>
    <Input
      type="password"
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

ControlledPassword.propTypes = {
  stateValue: PropTypes.string.isRequired,
  stateDispatch: PropTypes.func.isRequired,
  formLabel: PropTypes.string.isRequired,
  formHelper: PropTypes.string.isRequired,
  formPlaceholder: PropTypes.string.isRequired,
};

export default ControlledPassword;
