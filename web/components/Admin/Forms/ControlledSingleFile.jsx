import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const ControlledSingleFile = ({ stateDispatch, formLabel, formHelper }) => (
  <FormControl isRequired>
    <FormLabel>{formLabel}</FormLabel>
    <input
      type="file"
      onChange={({ currentTarget: { files } }) => stateDispatch(files[0])}
      required
    />

    <FormHelperText fontSize="xs">{formHelper}</FormHelperText>
  </FormControl>
);

ControlledSingleFile.propTypes = {
  stateDispatch: PropTypes.func.isRequired,
  formLabel: PropTypes.string.isRequired,
  formHelper: PropTypes.string.isRequired,
};

export default ControlledSingleFile;
