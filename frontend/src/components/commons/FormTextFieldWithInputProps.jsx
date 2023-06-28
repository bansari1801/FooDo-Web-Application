// ==========================================
//  Author: Bansari Shah
// ==========================================

import { InputAdornment, TextField } from "@mui/material";

export function FormTextFieldWithInputProps(props) {

  const fieldName = props.fieldName;
  const disabled = props?.disabled ? true : false;
  return (
    <>
      <TextField
        id={props.fieldName}
        disabled={disabled}
        fullWidth
        label={props.fieldLabel}
        value={props.formik.values[fieldName].toString()}
        onChange={props.formik.handleChange(fieldName)}
        error={
          props.formik.touched[fieldName] &&
          Boolean(props.formik.errors[fieldName])
        }
        helperText={
          props.formik.touched[fieldName] && props.formik.errors[fieldName]
        }
        color="neutral"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {props.inputAdornment}
            </InputAdornment>
          ),
        }}
      />
    </>
  );
}
