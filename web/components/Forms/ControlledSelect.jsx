/* eslint-disable no-underscore-dangle */
import { FormControl, FormHelperText, FormLabel, Select } from '@chakra-ui/react';
import PropTypes from 'prop-types';

// '_id' because of MongoDB's id.
function ControlledSelect({
  stateValue,
  stateDispatch,
  formLabel,
  formHelper,
  optionValues,
  keyToDisplay,
}) {
  return (
    <FormControl isRequired>
      <FormLabel>{formLabel}</FormLabel>
      <Select
        isRequired
        errorBorderColor="green.500"
        size="lg"
        onChange={({ currentTarget: { value } }) => stateDispatch(value)}
        value={stateValue}
      >
        {optionValues.map((value) => (
          <option key={value._id} value={value._id}>
            {value[keyToDisplay]}
          </option>
        ))}
      </Select>

      <FormHelperText fontSize="xs">{formHelper}</FormHelperText>
    </FormControl>
  );
}

ControlledSelect.propTypes = {
  stateValue: PropTypes.string.isRequired,
  stateDispatch: PropTypes.func.isRequired,
  formLabel: PropTypes.string.isRequired,
  formHelper: PropTypes.string.isRequired,
  optionValues: PropTypes.arrayOf(Object).isRequired,
  keyToDisplay: PropTypes.string.isRequired,
};

export default ControlledSelect;
