import React from 'react'
import { Controller } from 'react-hook-form'
import CustomTextField from 'src/@core/components/mui/text-field'

const FormController = ({ name, control, requireBoolean, label, error, errorMessage, required }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: requireBoolean }}
      render={({ field: { value, onChange } }) => (
        <CustomTextField
          fullWidth
          required={required}
          value={value}
          label={label}
          onChange={onChange}
          error={Boolean(error)}
          aria-describedby={`stepper-linear-${name}`}
          {...(error && { helperText: errorMessage })}
        />
      )}
    />
  )
}

export default FormController
