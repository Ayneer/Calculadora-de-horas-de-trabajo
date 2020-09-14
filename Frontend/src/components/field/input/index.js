import React from 'react';
import { TextField } from "@material-ui/core";

export const renderInput = ({ input, type, meta: { touched, error }, label, id, InputProps, disabled, required }) => {

    return (
        <div style={{ display: 'grid' }}>
            <TextField
                {...input}
                autoComplete="new-password"
                autoCorrect="off"
                spellCheck="off"
                type={type}
                disabled={disabled}
                id={id}
                label={label}
                InputProps={InputProps}
                error={touched && error ? true : false}
                helperText={touched && error}
                required={required}
            />
        </div>
    )
};