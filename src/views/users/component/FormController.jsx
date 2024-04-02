import React from 'react'
import { Controller } from 'react-hook-form'
import CustomTextField from 'src/@core/components/mui/text-field'
import { getCurrency } from '../../../@core/utils/format'
import { InputAdornment } from '@mui/material'

const currency = getCurrency()

const FormController = ({ name, control, requireBoolean, label, error, errorMessage, required, moneyInputField }) => {
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
         InputProps={ moneyInputField && {  
            startAdornment: (
              <InputAdornment position='start'>
                <p>{currency.symbol}</p>
              </InputAdornment>
            )
          }}
        />
      )}
    />
  )
}

export default FormController
