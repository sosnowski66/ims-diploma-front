import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Controller } from "react-hook-form";
import {
    TextField,
    InputAdornment,
    IconButton,
} from "@material-ui/core";

export const PasswordInput = ({label, classes, control, name, id, value, onChange}) => {
    const [passwordVisibility, setPasswordVisibility] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisibility(!passwordVisibility);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <TextField
            id={id}
            name={name}
            type={passwordVisibility ? "text" : "password"}
            label={label}
            className={classes}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={togglePasswordVisibility}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {passwordVisibility ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                )
            }}
            inputProps={{minLength: 8, maxLength: 24}}
            required
            value={value}
            onChange={onChange}
        />
    );
};

