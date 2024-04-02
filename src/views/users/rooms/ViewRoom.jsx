import React, { useState, useEffect, Fragment } from 'react'
import Drawer from '@mui/material/Drawer'

import IconButton from '@mui/material/IconButton'
import { useAppDispatch } from 'src/hooks'
import CustomChip from 'src/@core/components/mui/chip'

import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import Divider from '@mui/material/Divider'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import TableContainer from '@mui/material/TableContainer'
import TableCell, { TableCellBaseProps } from '@mui/material/TableCell'

import NoData from 'src/@core/components/emptydata/NoData'

import Icon from 'src/@core/components/icon'
import { Alert, Stack } from '@mui/material'
import { fetchSingleRoom } from '../../../store/apps/rooms/asyncthunk'
import { useClasses } from '../../../hooks/useClassess'
import { fetchClasses } from '../../../store/apps/classes/asyncthunk'
import ListStudents from '../component/ListStudents'

const CalcWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(2)
  }
}))

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const ViewRoom = ({ open, closeCanvas, Room }) => {

    const theme = useTheme()
  const dispatch = useAppDispatch()

  const [ClassesList] = useClasses()

    const [roomData, setRoomData] = useState({})


    useEffect(() => {
        dispatch(fetchClasses({ page:  1, limit: 300, key: '' }))
    
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])


 useEffect(()=> {
    if(Room){
        fetchSingleRoom(Room?.id).then((res)=>{
            if(res.data.success){

                setRoomData(res?.data.data)
            }
        })
    }
 },[Room])



  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 800, sm: 800 } } }}
    >
      <Header>
        <Typography variant='h5'>View Room</Typography>
        <IconButton
          size='small'
          onClick={closeCanvas}
          sx={{
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


      <Box sx={{ p: theme => theme.spacing(0, 3, 3) }}>
        <Fragment>
          {Room !== null && Room !== undefined ? (
            <Fragment>
              <Divider>Room Details</Divider>

              <CardContent sx={{ p: [`${theme.spacing(6)} !important`, `${theme.spacing(10)} !important`] }}>
                <Stack spacing={4} sx={{ py: `${theme.spacing(0)} !important` }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ color: 'text.secondary' }}>Name</Typography>

                    <Typography sx={{ color: 'text.secondary', textTransform: 'uppercase' }}>
                      {Room.name}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ color: 'text.secondary' }}>Capacity</Typography>

                    <Typography sx={{ color: 'text.secondary', textTransform: 'uppercase' }}>
                      {Room.capacity}
                    </Typography>
                  </Box>

                {/* {Object.keys(roomCategory).length > 0 &&  */}

                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ color: 'text.secondary' }}>Category</Typography>

                    <CustomChip
                      rounded
                      skin='light'
                      size='small'
                      label={Room?.category?.name}
                      color='info'
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </Box>

                   {/* } */}

                 
                </Stack>
              </CardContent>


              {/* {Room?.categories?.length > 0 ? (
                <Grid item sx={{ mt: 5, mb: 5 }} xs={12} sm={12} md={12}>
                  <Typography variant='h5'>{Room?.categories?.length > 1 ?  `Room Types` : `Room Type`} </Typography>
                  <Alert severity='success'>
                    {Room?.categories?.map((category, index) => (
                      <Fragment key={category.id}>
                        {index > 0 && ', '}
                        <span style={{textTransform: 'uppercase'}} >{`${index + 1}. ${category?.name}`}</span>
                      </Fragment>
                    ))}
                  </Alert>
                </Grid>
              )
              : 
              <Grid item sx={{ mt: 5, mb: 5 }} xs={12} sm={12} md={12}>
              <Alert severity='error'>No Assigned Room Type</Alert>
              </Grid>
              } */}



            {roomData?.students?.length > 0 ? 
            <ListStudents Users={roomData?.students}  ClassList={ClassesList}/>

            : 
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Alert severity='error'>No Students Assigned To Room </Alert>
              </Grid>
            </Grid>


        }

             
            </Fragment>
          ) : (
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Alert severity='error'>Room does not exist. Please check the list of Rooms: </Alert>
              </Grid>
            </Grid>
          )}
        </Fragment>
      </Box>

    </Drawer>
  )
}

export default ViewRoom
