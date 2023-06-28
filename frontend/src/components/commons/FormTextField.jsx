// ==========================================
//  Author: Bansari Shah, Khushalkumar Gondaliya
// ==========================================
import { TextField } from '@mui/material';

export function FormTextField(props) {
  const fieldName = props.fieldName;
  const isArray = props.isArray || false;
  const obj = `${props.fieldArrayKey}[${props.fieldIndex}].${fieldName}`;

  return (
    <>
      {isArray ? (
        <TextField
          id={`${props.fieldArrayKey}[${props.fieldIndex}]` + (props.fieldName ? `.${fieldName}` : ``)}
          fullWidth
          type={props.type ? props.type : 'text'}
          label={props.fieldLabel}
          value={props.fieldName ? props.formik.values[props.fieldArrayKey][props.fieldIndex][fieldName] : props.formik.values[props.fieldArrayKey][props.fieldIndex]}
          onChange={props.handleChange ? props.handleChange : props.formik.handleChange(props.fieldName ? obj : `${props.fieldArrayKey}[${props.fieldIndex}]`)}
          error={
            props.formik.errors[`${props.fieldArrayKey}`] &&
            props.formik.errors[props.fieldArrayKey][props.fieldIndex] &&
            props.formik.touched[props.fieldArrayKey] &&
            props.formik.touched[props.fieldArrayKey][props.fieldIndex] &&
            (props.fieldName ? props.formik.errors[props.fieldArrayKey][props.fieldIndex][fieldName] : props.formik.errors[props.fieldArrayKey][props.fieldIndex]) &&
            (props.fieldName ? props.formik.touched[props.fieldArrayKey][props.fieldIndex][fieldName] : props.formik.touched[props.fieldArrayKey][props.fieldIndex]) &&
            Boolean(props.fieldName ? props.formik.errors[props.fieldArrayKey][props.fieldIndex][fieldName] : props.formik.errors[props.fieldArrayKey][props.fieldIndex])
          }
          helperText={
            props.formik.errors[`${props.fieldArrayKey}`] &&
            props.formik.errors[props.fieldArrayKey][props.fieldIndex] &&
            props.formik.touched[props.fieldArrayKey] &&
            props.formik.touched[props.fieldArrayKey][props.fieldIndex] &&
            (props.fieldName ? props.formik.errors[props.fieldArrayKey][props.fieldIndex][fieldName] : props.formik.errors[props.fieldArrayKey][props.fieldIndex]) &&
            (props.fieldName ? props.formik.touched[props.fieldArrayKey][props.fieldIndex][fieldName] : props.formik.errors[props.fieldArrayKey][props.fieldIndex]) &&
            (props.fieldName ? props.formik.errors[props.fieldArrayKey][props.fieldIndex][fieldName] : props.formik.errors[props.fieldArrayKey][props.fieldIndex])
          }
          color="neutral"
        />
      ) : (
        <TextField
          id={props.fieldName}
          fullWidth
          type={props.type ? props.type : 'text'}
          label={props.fieldLabel}
          value={props.formik.values[fieldName]}
          onChange={props.formik.handleChange(fieldName)}
          error={props.formik.touched[fieldName] && Boolean(props.formik.errors[fieldName])}
          helperText={props.formik.touched[fieldName] && props.formik.errors[fieldName]}
          color="neutral"
        />
      )}
    </>
  );
}
