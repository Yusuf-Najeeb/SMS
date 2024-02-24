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
import {  assignRoomToStudent, fetchRooms, removeStudentInRoom } from '../../../store/apps/rooms/asyncthunk'
import { useStudent } from '../../../hooks/useStudent'
import { fetchStudents } from '../../../store/apps/Student/asyncthunk'


const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const schema = yup.object().shape({
  studentId: yup.string()
})

const defaultValues = {
  studentId: ''
}

const ManageStudentInRoom = ({ open, toggle, Room, status }) => {
  const dispatch = useAppDispatch()
  const [StudentData] = useStudent()

  const [openTeacherModal, setTeacherModal] = useState(false)
  const [itemsArray, setItemsArray] = useState([])


  useEffect(() => {
    dispatch(fetchStudents({ page: 1, key: '' }))

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
         roomId:  Room.id,
         studentId: Number(data.studentId),
       }

       if (status){

        assignRoomToStudent(payload).then(response => {
        if (response.data.success) {
          handleClose()
          dispatch(fetchRooms({ page: 1, limit: 10, key: '' }))
        }
      })
       }else {
        removeStudentInRoom(payload).then(response => {
          if (response.data.success) {
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
        <Typography variant='h5'>{status ? 'Assign Student' : 'Remove Student'}</Typography>
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
            name='studentId'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                select
                fullWidth
                label='Student'
                value={value}
                required
                sx={{ mb: 4 }}
                onChange={onChange}
                error={Boolean(errors.studentId)}
                {...(errors.studentId && { helperText: errors.studentId.message })}
              >
                <MenuItem value=''>Select Staff</MenuItem>
                {StudentData?.result?.map((item, i) => {
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

export default ManageStudentInRoom
