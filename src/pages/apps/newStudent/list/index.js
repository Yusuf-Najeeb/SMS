// ** React Imports
//import { useState, useEffect, forwardRef } from 'react'
// import StepperLinearWithValidation from 'src/views/forms/form-wizard/StepperLinearWithValidation'
import StepperAlternativeLabel from 'src/views/forms/form-wizard/StepperAlternativeLabel'

import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'

const InvoiceList = () => {
  return (
    <Grid>
      <Grid item xs={12}>
        <Typography variant='h6'>Linear Stepper with Validation</Typography>
      </Grid>
      <Grid item xs={12}>
        <StepperAlternativeLabel />
      </Grid>
    </Grid>
  )
}

export default InvoiceList
