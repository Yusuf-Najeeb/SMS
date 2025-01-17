import React, { useState, useEffect, Fragment } from 'react'
import Drawer from '@mui/material/Drawer'

import IconButton from '@mui/material/IconButton'

import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import Divider from '@mui/material/Divider'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import TableContainer from '@mui/material/TableContainer'
import TableCell from '@mui/material/TableCell'

import CustomChip from 'src/@core/components/mui/chip'
import NoData from 'src/@core/components/emptydata/NoData'

import Icon from 'src/@core/components/icon'
import { Alert, Stack } from '@mui/material'
import { fetchStudentsInClass, getSingleClass } from '../../../store/apps/classes/asyncthunk'

import { TableCellStyled } from '../Guardian/GuardianTable'
import { truncateText } from '../../../@core/utils/truncateText'


const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const ViewClass = ({ open, closeCanvas, classRoom }) => {

  const [studentsInClass, setStudentsInClass] = useState([])
  const [classSubjects, setClassSubjects] = useState([])

  const theme = useTheme()
  const [classTeacher, setClassTeacher] = useState('')



  useEffect(() => {
    if (classRoom) {
      fetchStudentsInClass(classRoom.id).then(res => {
        if (res?.data?.success) {
          setStudentsInClass(res.data.data)
        }
      })

      getSingleClass(classRoom?.id).then(res => {
        if (res?.data?.success) {
          setClassSubjects(res?.data?.data?.subjects)
        }
      })
      if (classRoom?.staff) {
        const { title, firstName, lastName } = classRoom?.staff
        setClassTeacher(`${title}. ${firstName} ${lastName}`)
      }
    }
  }, [classRoom])

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 800, sm: 800 } } }}
    >
      <Header>
        <Typography variant='h5'>View Class</Typography>
        <IconButton
          size='small'
          onClick={closeCanvas}
          sx={{
            // p: '0.438rem',
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

      {/* body */}

      <Box sx={{ p: theme => theme.spacing(0, 3, 3) }}>
        <Fragment>
          {classRoom !== null && classRoom !== undefined ? (
            <Fragment>
              <Divider>Class Details</Divider>

              <CardContent sx={{ p: [`${theme.spacing(6)} !important`, `${theme.spacing(10)} !important`] }}>
                <Stack spacing={4} sx={{ py: `${theme.spacing(0)} !important` }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ color: 'text.secondary' }}>Name</Typography>

                    <Typography sx={{ color: 'text.secondary', textTransform: 'uppercase' }}>
                      {classRoom.name}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ color: 'text.secondary' }}>Type</Typography>

                    <Typography sx={{ color: 'text.secondary', textTransform: 'uppercase' }}>
                      {classRoom.type}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ color: 'text.secondary' }}>Category:</Typography>

                    <CustomChip
                      rounded
                      skin='light'
                      size='small'
                      label={classRoom.category.name}
                      color='info'
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ color: 'text.secondary' }}>Capacity:</Typography>

                    <Typography sx={{ color: 'text.secondary' }}>{classRoom.capacity}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ color: 'text.secondary' }}>Class Teacher:</Typography>
                    {classTeacher ? (
                     <Typography sx={{ color: 'text.secondary' }}>{classTeacher}</Typography>
                    ) : (
                      <CustomChip
                        rounded
                        skin='light'
                        size='small'
                        label={'No Class Teacher'}
                        color='error'
                        sx={{ textTransform: 'capitalize' }}
                      />
                    )}
                  </Box>
                </Stack>
              </CardContent>

              {classSubjects?.length > 0 ? (
                <Grid item sx={{ mt: 5, mb: 5 }} xs={12} sm={12} md={12}>
                  <Typography variant='h5'>Subjects </Typography>
                  <Alert severity='success'>
                    {classSubjects?.map((subject, index) => (
                      <Fragment key={subject.id}>
                        {index > 0 && ', '}
                        <span style={{ textTransform: 'uppercase' }}>{`${index + 1}. ${subject?.name}`}</span>
                      </Fragment>
                    ))}
                  </Alert>
                </Grid>
              ) : (
                <Grid item sx={{ mt: 5, mb: 5 }} xs={12} sm={12} md={12}>
                  <Alert severity='error'>No Registered Subjects For This Class</Alert>
                </Grid>
              )}

              <Divider sx={{ mt: '10px', mb: '10px' }}>Students In Class</Divider>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>S/N</TableCell>
                      <TableCell>NAME</TableCell>
                      <TableCell>GENDER</TableCell>
                      <TableCell>USER ID</TableCell>
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
                    {studentsInClass.length > 0 ? (
                      studentsInClass.map((item, i) => (
                        <TableRow key={item.id}>
                          <TableCell>{i + 1}</TableCell>

                          <TableCell>{`${truncateText(item?.firstName)} ${truncateText(item?.lastName)}` || '--'}</TableCell>
                          <TableCell>{item?.gender || '--'}</TableCell>
                          <TableCell component={TableCellStyled} sx={{ textTransform: 'uppercase', fontSize: '13px' }}>
                            {item?.identificationNumber}
                          </TableCell>
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

              <Divider />

              {/* <CardContent sx={{ px: [6, 10] }}>
                  <Typography sx={{ color: 'text.secondary' }}>
                    <Typography component='span' sx={{ mr: 1.5, fontWeight: 500, color: 'inherit' }}>
                      Title:
                    </Typography>
                    {classRoom?.title || 'No available note'}
                  </Typography>
                </CardContent> */}
            </Fragment>
          ) : (
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Alert severity='error'>classRoom does not exist. Please check the list of classRooms: </Alert>
              </Grid>
            </Grid>
          )}
        </Fragment>
      </Box>
    </Drawer>
  )
}

export default ViewClass
