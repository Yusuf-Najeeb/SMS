// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useAppDispatch } from 'src/hooks'
import { CircularProgress, MenuItem,  } from '@mui/material'
import { fetchStaffs } from '../../../store/apps/staff/asyncthunk'
import { useStaff } from '../../../hooks/useStaff'
import { assignRoomToStaff, fetchRooms, removeStaffInRoom } from '../../../store/apps/rooms/asyncthunk'


const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const schema = yup.object().shape({
  staffId: yup.string()
})

const defaultValues = {
  staffId: ''
}

const ManageTeacherInRoom = ({ open, toggle, room, status }) => {
  const dispatch = useAppDispatch()
  const [StaffData] = useStaff()

  const [openTeacherModal, setTeacherModal] = useState(false)
  const [itemsArray, setItemsArray] = useState([])


  const toggleTeacherModal = ()=> {
    // toggle()
    setTeacherModal(!openTeacherModal)
  }

  const handleChange = event => {
    setShowInputField(event.target.checked)
  }

  useEffect(() => {
    dispatch(fetchStaffs({ page: 1, limit: 300, key: '' }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const handleClose = () => {
    toggle()
    reset()
  }


  const onSubmit = async data => {

    let payload = {
         roomId:  room.id,
         staffId: Number(data.staffId),
       }

       if (status){

        assignRoomToStaff(payload).then(response => {
        if (response?.data.success) {
          handleClose()
          dispatch(fetchRooms({ page: 1, limit: 10, key: '' }))
        }
      })
       }else {
        removeStaffInRoom(payload).then(response => {
          if (response?.data.success) {
            handleClose()
            dispatch(fetchRooms({ page: 1, limit: 10, key: '' }))
          }
        })
       }


  }


  return (
    <Fragment>

    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 450 } } }}
    >
      <Header>
        <Typography variant='h5'>{status ? 'Assign Staff' : 'Remove Staff'}</Typography>
        <IconButton
          size='small'
          onClick={handleClose}
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
        <form onSubmit={handleSubmit(onSubmit)}>

           <Controller
            name='staffId'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                select
                fullWidth
                label='Staff'
                value={value}
                required
                sx={{ mb: 4 }}
                onChange={onChange}
                error={Boolean(errors.staffId)}
                {...(errors.staffId && { helperText: errors.staffId.message })}
              >
                <MenuItem value=''>Select Staff</MenuItem>
                {StaffData?.result?.map((item, i) => {
                  return (
                    <MenuItem key={i} value={item.id}>
                      {`${item.firstName?.toUpperCase()} ${item.lastName?.toUpperCase()}`}
                    </MenuItem>
                  )
                })}
              </CustomTextField>
            )}
          /> 


          <Box sx={{ mt: 5,  }}>

          {/* <Button type='button' variant='outlined' onClick={toggleTeacherModal} sx={{ width: '45%' }}>
              Select Teachers
            </Button> */}
            

            <Button type='submit' variant='contained' sx={{ width: '100%' }}>
              {isSubmitting && <CircularProgress size={20} color='secondary' sx={{ ml: 2 }} /> }
              {status ? "Assign": "Remove"}
              
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>

    {/* <SearchTeacher itemsArray={itemsArray} setItemsArray={setItemsArray} openModal={openTeacherModal} closeModal={toggleTeacherModal} /> */}
    </Fragment>
  )
}

export default ManageTeacherInRoom
