import React, {Fragment, useEffect, useState } from 'react'
import { useAppDispatch } from 'src/hooks'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import {  Card, CardContent, CardHeader, Grid, IconButton, MenuItem } from '@mui/material'
import Icon from 'src/@core/components/icon'
import NoData from 'src/@core/components/emptydata/NoData'
import CustomTextField from 'src/@core/components/mui/text-field'

import CustomSpinner from 'src/@core/components/custom-spinner'
import { formatDate } from '../../../@core/utils/format'
import GetUserData from '../../../@core/utils/getUserData'
import { fetchStaffActivityLog } from '../../../store/apps/staffActivityLog/asyncthunk'
import { useStaffActivityLog } from '../../../hooks/useStaffActivityLog'
import { useStaff } from '../../../hooks/useStaff'
import { fetchStaffs } from '../../../store/apps/staff/asyncthunk'



const StaffActivityLog = () => {

  const userData = GetUserData()
    
  const dispatch = useAppDispatch()
  const [StaffData] = useStaff()
  const [StaffActivityLogData, loading, paging] = useStaffActivityLog()



  const [staffId, setStaffId] = useState('')
  const [GradingParametersList, setGradingParametersList] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [openModal, setOpenModal] = useState(false)
  const [selectedParameter, setSelectedParameter] = useState(null)


  const OpenParameterModal = () => {
    if (openModal) {
      setOpenModal(false)
      setSelectedParameter(null)
    } else {
      setOpenModal(true)
    }
  }

  const setActiveCategory = (value) => {
    OpenParameterModal()
    setSelectedParameter(value)
  }

  const handleChangeStaff = e => {
    Number(setStaffId(e.target.value))
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  useEffect(()=>{
    dispatch(fetchStaffs({ page: 1, limit: 300, key: '',  }))

     // eslint-disable-next-line 
  },[])



  useEffect(() => {
    dispatch(fetchStaffActivityLog({ page: page + 1, limit: 10, staffId }))

     // eslint-disable-next-line 
  }, [page, rowsPerPage, staffId])

  return (
    <Fragment>

<Card>
        <CardHeader title='Filter' />
        <CardContent>
          <Grid container spacing={12}>
          <Grid item xs={12} sm={3}>
              <CustomTextField
                select
                fullWidth
                label='Staff*'
                SelectProps={{ value: staffId, onChange: e => handleChangeStaff(e) }}
              >
                <MenuItem>Select Staff</MenuItem>
                {StaffData?.result?.map(item => (
                  <MenuItem key={item?.id} value={item?.id} sx={{textTransform: 'uppercase'}}>
                    {`${item?.firstName} ${item?.lastName}`}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>

            </Grid>
            </CardContent>
            </Card>


      <TableContainer component={Paper} sx={{ maxHeight: 840, mt: 15 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell align='left' sx={{ minWidth: 50, maxWidth: 50 }}>
                S/N
              </TableCell>
              <TableCell align='center' sx={{ minWidth: 100 }}>
                Name
              </TableCell>
              <TableCell align='center' sx={{ minWidth: 100 }}>
                Percentage
              </TableCell>
              {/* <TableCell align='center' sx={{ minWidth: 100 }}>
                Created By
              </TableCell> */}
              <TableCell align='center' sx={{ minWidth: 100 }}>
                Date Created
              </TableCell>
              {(userData?.role?.name == 'super-admin' || userData?.role?.name == 'admin') && 
              <TableCell align='center' sx={{ minWidth: 100 }}>
                Actions
              </TableCell>
                }
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow className='text-center'>
                <TableCell colSpan={6}>
                  <CustomSpinner />
                </TableCell>
              </TableRow>
            ) : (

              // </Box>
              <Fragment>
                {GradingParametersList?.map((item, i) => (
                  <TableRow hover role='checkbox' key={item.id}>
                    <TableCell align='left'>{i + 1}</TableCell>
                    <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                      {item?.name || '--'}
                    </TableCell>
                    <TableCell align='center' sx={{ textTransform: 'capitalize' }}>
                      {item?.percentage || '--'}
                    </TableCell>
                    <TableCell align='center'>
                      {formatDate(item?.createdAt)}

                    </TableCell>

                    {(userData?.role?.name == 'super-admin' || userData?.role?.name == 'admin') && 
                    <TableCell align='center' sx={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                      <IconButton size='small' onClick={() => setActiveCategory(item)}>
                        <Icon icon='tabler:edit' />
                      </IconButton>
                    </TableCell>
                   }
                  </TableRow>
                ))}

                {GradingParametersList?.length === 0 && (
                  <tr className='text-center'>
                    <td colSpan={6}>
                      <NoData />
                    </td>
                  </tr>
                )}
              </Fragment>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        page={page}
        component='div'

        count={paging?.totalItems}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[10]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

    </Fragment>
  )
}

export default StaffActivityLog
