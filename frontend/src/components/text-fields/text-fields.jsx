import React from 'react';

import StyledTextField from './StyledTextField.util';

import './index.css';

export function OutlineTextField(props) {
    return (
        <StyledTextField {...props} variant="outlined" className="width-100" />
    );
}

export function MultilineTextField(props) {
    return (
        <StyledTextField {...props} variant="outlined" multiline className="width-100" />
    );
}
