// ** React Imports
//import { useState, useEffect, forwardRef } from 'react'
import StepperLinearAndValidation from 'src/views/forms/form-wizard/StepperLinearAndValidation'

import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'

const InvoiceList = () => {
  return (
    <Grid>
      <Grid item xs={12}></Grid>
      <Grid item xs={12}>
        <StepperLinearAndValidation />
      </Grid>
    </Grid>
  )
}

export default InvoiceList
