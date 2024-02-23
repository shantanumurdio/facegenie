import React from "react";
import TextField from '@mui/material/TextField';

export const InputField = (props) => {
    const { name, label, type, formik, disabled, size, margin } = props
    return (
        <TextField
            required
            margin={margin}
            fullWidth
            size={size}
            name={name}
            label={label}
            type={type}
            value={formik.values[name]}
            onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
            disabled={disabled}
            error={formik.touched[name] && Boolean(formik.errors[name])}
            helperText={formik.touched[name] && formik.errors[name]}
        />
    )
}