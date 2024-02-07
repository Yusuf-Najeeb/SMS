import React, {  Fragment, } from 'react'
import Drawer from '@mui/material/Drawer'

import IconButton from '@mui/material/IconButton'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { styled, useTheme } from '@mui/material/styles'

import Icon from 'src/@core/components/icon'

import { Alert } from '@mui/material'
import StaffCard from './StaffCard'
import { formatFirstLetter } from '../../../@core/utils/format'


export const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const ViewStaff = ({ open, closeCanvas, staffUser }) => {

  const theme = useTheme()

  console.log(staffUser, 'staff')


  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 800, sm: 800 } } }}
    >
      <Header>
        <Typography variant='h5'>Viewing {`${formatFirstLetter(staffUser?.firstName)} ${formatFirstLetter(staffUser?.lastName)}` || '--'}'s Profile</Typography>
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
            {staffUser !== null && staffUser !== undefined ? (
              <Grid item xs={12} md={5} lg={4}>
                <StaffCard Staff={staffUser}  />
              </Grid>
            ) : (
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <Alert severity='error'>Staff does not exist. Please check the list of Staffs: </Alert>
                </Grid>
              </Grid>
            )}
          </Fragment>
      </Box>
    </Drawer>
  )
}

export default ViewStaff
