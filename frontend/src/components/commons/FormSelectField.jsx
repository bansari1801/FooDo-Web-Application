// ==========================================
//  Author: Bansari Shah
// ==========================================

import { MenuItem, TextField } from '@mui/material';

export function FormSelectField(props) {
  const fieldName = props.fieldName;
  const isArray = props.isArray || false;
  const obj = `${props.fieldArrayKey}[${props.fieldIndex}].${fieldName}`;

  return (
    <>
      {isArray ? (
        <TextField
          select
          id={`${props.fieldArrayKey}[${props.fieldIndex}].${fieldName}`}
          fullWidth
          type={props.type ? props.type : 'text'}
          label={props.fieldLabel}
          value={props.formik.values[props.fieldArrayKey][props.fieldIndex][fieldName]}
          onChange={props.formik.handleChange(obj)}
          error={
            props.formik.errors[`${props.fieldArrayKey}`] &&
            props.formik.errors[props.fieldArrayKey][props.fieldIndex] &&
            props.formik.touched[props.fieldArrayKey] &&
            props.formik.touched[props.fieldArrayKey][props.fieldIndex] &&
            props.formik.errors[props.fieldArrayKey][props.fieldIndex][fieldName] &&
            props.formik.touched[props.fieldArrayKey][props.fieldIndex][fieldName] &&
            Boolean(props.formik.errors[props.fieldArrayKey][props.fieldIndex][fieldName])
          }
          helperText={
            props.formik.errors[`${props.fieldArrayKey}`] &&
            props.formik.errors[props.fieldArrayKey][props.fieldIndex] &&
            props.formik.touched[props.fieldArrayKey] &&
            props.formik.touched[props.fieldArrayKey][props.fieldIndex] &&
            props.formik.errors[props.fieldArrayKey][props.fieldIndex][fieldName] &&
            props.formik.touched[props.fieldArrayKey][props.fieldIndex][fieldName] &&
            props.formik.errors[props.fieldArrayKey][props.fieldIndex][fieldName]
          }
          color="neutral"
        >
          {props?.options?.map((option) => (
            <MenuItem value={option.value}>{option.label}</MenuItem>
          ))}
        </TextField>
      ) : (
        <TextField
          id={props.fieldName}
          fullWidth
          select
          label={props.fieldLabel}
          value={props.formik.values[fieldName]}
          onChange={props.formik.handleChange(fieldName)}
          error={props.formik.touched[fieldName] && Boolean(props.formik.errors[fieldName])}
          helperText={props.formik.touched[fieldName] && props.formik.errors[fieldName]}
          color="neutral"
        >
          {props.options.map((option) => (
            <MenuItem value={option.value}>{option.label}</MenuItem>
          ))}
        </TextField>
      )}
    </>
  );
}
