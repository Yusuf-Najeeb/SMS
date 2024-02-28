// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'


// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useAppDispatch } from 'src/hooks'
import { Checkbox, CircularProgress, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from '@mui/material'
import { fetchGradingParameters } from '../../../store/apps/gradingParameters/asyncthunk'
import { useGradingParameters } from '../../../hooks/useGradingParameters'
import axios from 'axios'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'



const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const ITEM_HEIGHT = 28;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const ManageGradingParameter = ({ open, toggle, subject }) => {
  const dispatch = useAppDispatch()

  const [GradingParametersList] = useGradingParameters()

  const [parameterNames, setParameterNames] = useState([]);
  const [isSubmitting, setSubmitting] = useState(false)

  useEffect(() => {
    dispatch(fetchGradingParameters({ page: 1, limit: 300 }))

     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setParameterNames(

      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const onSubmit = async (e) => {

    e.preventDefault()

    const parameterIds = parameterNames.map(item => {
        const matchingObject = GradingParametersList.find(obj => obj.name === item);

        return matchingObject ? matchingObject.id : null;
    });



    const payload = {
        subjectId: subject.id,
        parameterIds
      }

      try {
        setSubmitting(true)
        const res = await axios.put('/settings/grading-parameter/subject', payload)

        if (res.data.success){
            toggle()
            notifySuccess('Grading Parameter Assigned')
        }
      } catch (error) {
        setSubmitting(false)
        notifyError("Unable to Assign Grading Parameter")
      }


  }


  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h5'>Assign Grading Parameter</Typography>
        <IconButton
          size='small'
          onClick={toggle}
          sx={{
            p: '0.438rem',
            borderRadius: 1,
            color: 'text.primary',
            backgroundColor: 'action.selected',
            '&:hover': {
              backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.16)`
            }
          }}
        >
          <Icon icon='tabler:x' fontSize='1.125rem' />
        </IconButton>
      </Header>
      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <form onSubmit={onSubmit}>

        <FormControl sx={{ mt: 10, mb: 5, width: '100%' }}>

        <InputLabel id="demo-multiple-name-label">Select Grading Parameter</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={parameterNames}
          onChange={handleChange}
          input={<OutlinedInput label="Grading Parameter" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {GradingParametersList?.map((parameter) => (
            <MenuItem
              key={parameter?.id}
              value={parameter?.name}
              style={{textTransform: 'uppercase'}}
            >
              <Checkbox checked={parameterNames.indexOf(parameter) > -1} />
              <ListItemText primary={parameter?.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>


          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button type='submit' variant='contained' sx={{ width: '100%' }} disabled= {parameterNames?.length < 1}>
              {isSubmitting ? <CircularProgress size={20} color='secondary' sx={{ ml: 2 }} /> : "Assign"}
              {/* Assign */}
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default ManageGradingParameter
