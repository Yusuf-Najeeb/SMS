import React, { useState, useEffect, Fragment } from 'react'
import Drawer from '@mui/material/Drawer'

import IconButton from '@mui/material/IconButton'
import { useAppDispatch } from 'src/hooks'

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
import ListTeachers from '../component/ListTeachers'

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

const ViewSubject = ({ open, closeCanvas, Subject }) => {


  const theme = useTheme()


  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 800, sm: 800 } } }}
    >
      <Header>
        <Typography variant='h5'>View Subject</Typography>
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
          {Subject !== null && Subject !== undefined ? (
            <Fragment>
              <Divider>Subject Details</Divider>

              <CardContent sx={{ p: [`${theme.spacing(6)} !important`, `${theme.spacing(10)} !important`] }}>
                <Stack spacing={4} sx={{ py: `${theme.spacing(0)} !important` }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ color: 'text.secondary' }}>Name</Typography>

                    <Typography sx={{ color: 'text.secondary', textTransform: 'uppercase' }}>
                      {Subject.name}
                    </Typography>
                  </Box>

                 
                </Stack>
              </CardContent>

              {Subject?.categories?.length > 0 ? (
                <Grid item sx={{ mt: 5, mb: 5 }} xs={12} sm={12} md={12}>
                  <Typography variant='h5'>{Subject?.categories?.length > 1 ?  `Subject Types` : `Subject Type`} </Typography>
                  <Alert severity='success'>
                    {Subject?.categories?.map((category, index) => (
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
              <Alert severity='error'>No Assigned Subject Type</Alert>
              </Grid>
              }



              {/* <Divider sx={{ mt: '10px', mb: '10px' }}>Subject Teachers</Divider>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>S/N</TableCell>
                      <TableCell>NAME</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody
                    sx={{
                      '& .MuiTableCell-root': {
                        py: `${theme.spacing(2.5)} !important`,
                        fontSize: theme.typography.body1.fontSize
                      }
                    }}
                  >
                    {Subject?.staffs?.length > 0 ? (
                      Subject?.staffs?.map((item, i) => (
                        <TableRow key={item.id}>
                          <TableCell>{i + 1}</TableCell>

                          <TableCell>{`${item?.firstName} ${item?.lastName}` || '--'}</TableCell>

                         
                        </TableRow>
                      ))
                    ) : (
                      <tr className='text-center'>
                        <td colSpan={6}>
                          <NoData />
                        </td>
                      </tr>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              <Divider /> */}

{Subject?.staffs?.length > 0 ? 
            <ListTeachers Users={Subject?.staffs}  />

            : 
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Alert severity='error'>No Teacher Assigned To Subject </Alert>
              </Grid>
            </Grid>


        }

             
            </Fragment>
          ) : (
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Alert severity='error'>Subject does not exist. Please check the list of Subjects: </Alert>
              </Grid>
            </Grid>
          )}
        </Fragment>
      </Box>
    </Drawer>
  )
}

export default ViewSubject
