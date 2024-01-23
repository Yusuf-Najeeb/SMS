import Typography from '@mui/material'
import { Grid } from '@mui/material'
//import StepperLinearAndValidation from 'src/views/forms/form-wizard/StepperLinearAndValidation'
//import Signup from '../../../../src/views/forms/form-wizard/SignUp'
import Signup from '../../views/forms/form-wizard/SignUp'
const Sign = () => {
  return (
    <div>
      <Grid>
        <Grid item xs={12}>
          <Signup />
        </Grid>
      </Grid>
    </div>
  )
}
export default Sign
