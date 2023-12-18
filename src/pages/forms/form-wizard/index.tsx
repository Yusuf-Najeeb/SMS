// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Demo Components Imports
import StepperCustomVertical from '../../../views/forms/form-wizard/StepperCustomVertical'
import StepperCustomHorizontal from '../../../views/forms/form-wizard/StepperCustomHorizontal'
import StepperAlternativeLabel from '../../../views/forms/form-wizard/StepperAlternativeLabel'
import StepperVerticalWithNumbers from '../../../views/forms/form-wizard/StepperVerticalWithNumbers'
import StepperLinearWithValidation from '../../../views/forms/form-wizard/StepperLinearWithValidation'
import StepperLinearAndValidation from '../../../views/forms/form-wizard/StepperLinearAndValidation'
import StepperVerticalWithoutNumbers from '../../../views/forms/form-wizard/StepperVerticalWithoutNumbers'

const FormWizard = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h6'>Linear Stepper with Validation</Typography>
      </Grid>
      <Grid item xs={12}>
        <StepperLinearWithValidation />
      </Grid>
      <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(8)} !important` }}>
        <Typography variant='h6'>Alternative Label</Typography>
      </Grid>
      <Grid item xs={12}>
        <StepperAlternativeLabel />
      </Grid>
      <Grid item xs={12}>
        <StepperVerticalWithNumbers />
      </Grid>
      <Grid item xs={12}>
        <StepperVerticalWithoutNumbers />
      </Grid>
      <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(8)} !important` }}>
        <Typography variant='h6'>Custom Horizontal Stepper</Typography>
      </Grid>
      <Grid item xs={12}>
        <StepperCustomHorizontal />
      </Grid>
      <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(8)} !important` }}>
        <Typography variant='h6'>Custom Vertical Stepper</Typography>
      </Grid>
      <Grid item xs={12}>
        <StepperCustomVertical />
      </Grid>
      <Grid item xs={12}>
        <StepperLinearAndValidation />
      </Grid>
    </Grid>
  )
}

export default FormWizard
