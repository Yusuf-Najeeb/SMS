// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// ** Custom Component Import

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useAppDispatch } from 'src/hooks'
import {
  Checkbox,
  CircularProgress,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material'
import { fetchCategories } from '../../../store/apps/categories/asyncthunk'
import { useCategories } from '../../../hooks/useCategories'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { fetchSubjects } from '../../../store/apps/subjects/asyncthunk'
import axios from 'axios'



const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const ITEM_HEIGHT = 28
const ITEM_PADDING_TOP = 8

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

const AssignSubjectCategories = ({ open, toggle, Subject, page }) => {
  const dispatch = useAppDispatch()
  const [CategoriesData] = useCategories()

  const [CategoryNames, setCategoryNames] = useState([])
  const [isSubmitting, setSubmitting] = useState(false)

  const handleChange = event => {
    const {
      target: { value }
    } = event
    setCategoryNames(
        
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  const onSubmit = async e => {
    e.preventDefault()

    const categoryId = CategoryNames.map(item => {
      const matchingObject = CategoriesData.find(obj => obj.name === item)

      return matchingObject ? matchingObject.id : null
    })

    const payload = {
      subjectId: Subject.id,
      categoryId
    }


    try {
      setSubmitting(true)
      const res = await axios.post('/subjects/addcategory', payload)

      if (res.data.success) {
        toggle()
        notifySuccess(categoryId.length > 1 ? 'Categories Assigned' : 'Category Assigned')
        dispatch(fetchSubjects({ page: page == 0 ? page + 1 : page, limit: 10, categoryId: '' }))
      }
    } catch (error) {
      setSubmitting(false)
      notifyError(categoryId?.length > 1 ? 'Unable to Assign Categories' : 'Unable to Assign Category')
    }
  }

  useEffect(() => {
    dispatch(fetchCategories({ page: 1, limit: 300, type: 'subject' }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h5'>Assign Category</Typography>
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
            <InputLabel id='demo-multiple-name-label'>Select Category</InputLabel>
            <Select
              labelId='demo-multiple-name-label'
              id='demo-multiple-name'
              multiple
              value={CategoryNames}
              onChange={handleChange}
              input={<OutlinedInput label='Category' />}
              renderValue={selected => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {CategoriesData?.map(parameter => (
                <MenuItem key={parameter?.id} value={parameter?.name} style={{ textTransform: 'uppercase' }}>
                  <Checkbox checked={CategoryNames.indexOf(parameter) > -1} />
                  <ListItemText primary={parameter?.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button type='submit' variant='contained' sx={{ width: '100%' }} disabled= {CategoryNames?.length < 1}>
              {isSubmitting && <CircularProgress size={20} color='secondary' sx={{ ml: 2 }} />}
              {'Assign'}
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default AssignSubjectCategories
