import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const ControlledMultipleFiles = ({ stateDispatch, formLabel, formHelper }) => (
  <FormControl isRequired>
    <FormLabel>{formLabel}</FormLabel>
    <input
      type="file"
      onChange={({ currentTarget: { files } }) => stateDispatch(files)}
      multiple
      required
    />

    <FormHelperText fontSize="xs">{formHelper}</FormHelperText>
  </FormControl>
);

ControlledMultipleFiles.propTypes = {
  stateDispatch: PropTypes.func.isRequired,
  formLabel: PropTypes.string.isRequired,
  formHelper: PropTypes.string.isRequired,
};

export default ControlledMultipleFiles;
