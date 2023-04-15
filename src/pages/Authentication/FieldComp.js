import React from 'react';
import { Label, Input, FormFeedback } from 'reactstrap';

const FieldComp = ({ validation, inputProps, label, options }) => {
  const { name, type, placeholder } = inputProps;

  return (
    <div className="mb-3">
      <Label htmlFor={name} className="form-label">
        {label} <span className="text-danger">*</span>
      </Label>
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={validation.handleChange}
        onBlur={validation.handleBlur}
        value={validation.values[name] || ''}
        invalid={
          validation.touched[name] && validation.errors[name] ? true : false
        }
        {...(options && { children: options })}
      />
      {validation.touched[name] && validation.errors[name] ? (
        <FormFeedback type="invalid">
          <div>{validation.errors[name]}</div>
        </FormFeedback>
      ) : null}
    </div>
  );
};

export default FieldComp;
