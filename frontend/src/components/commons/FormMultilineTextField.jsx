// ==========================================
//  Author: Bansari Shah
// ==========================================

import { TextField } from '@mui/material';

export function FormMultilineTextField(props) {
  const fieldName = props.fieldName;
  return (
    <>
      <TextField
        id={props.fieldName}
        fullWidth
        label={props.fieldLabel}
        value={props.formik.values[fieldName]}
        onChange={props.formik.handleChange(fieldName)}
        error={props.formik.touched[fieldName] && Boolean(props.formik.errors[fieldName])}
        helperText={props.formik.touched[fieldName] && props.formik.errors[fieldName]}
        color="neutral"
        multiline
        maxRows={props.maxRows}
      />
    </>
  );
}
