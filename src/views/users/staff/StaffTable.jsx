import React, { Fragment, useEffect, useState } from 'react'
import { useAppDispatch } from 'src/hooks'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { Box, FormControlLabel, FormGroup, IconButton, Switch, Typography } from '@mui/material'
import DeleteDialog from 'src/@core/components/delete-dialog'
import Icon from 'src/@core/components/icon'
import NoData from 'src/@core/components/emptydata/NoData'
import { styled } from '@mui/material/styles'

import { formatDate } from '../../../@core/utils/format'

import CustomSpinner from 'src/@core/components/custom-spinner'
import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomChip from 'src/@core/components/mui/chip'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import Stats from '../component/Stats'
import PageHeaderWithSearch from '../component/PageHeaderWithSearch'
import { fetchClasses } from '../../../store/apps/classes/asyncthunk'
import { useClasses } from '../../../hooks/useClassess'
import { fetchStaffs, updateStaff } from '../../../store/apps/staff/asyncthunk'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { useStaff } from '../../../hooks/useStaff'
import UpdateStaff from './UpdateStaff'
import ViewStaff from './ViewStaff'
import AddStaff from './AddStaff'

const userRoleObj = {
  'super-admin': { icon: 'grommet-icons:user-admin', color: 'info' },
  admin: { icon: 'tabler:device-laptop', color: 'secondary' },
  teacher: { icon: 'tabler:circle-check', color: 'success' },
  librarian: { icon: 'tabler:edit', color: 'info' },
  accountant: { icon: 'tabler:chart-pie-2', color: 'primary' },
  'house-master': { icon: 'tabler:user', color: 'warning' }
}

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL

const renderClient = row => {
  const initials = `${row.firstName} ${row.lastName}`
  if (row?.profilePicture !== null && row?.profilePicture?.length) {
    return (
      <CustomAvatar
        src={`${backendURL?.replace('api', '')}/${row?.profilePicture}`}
        sx={{ mr: 2.5, width: 32, height: 32 }}
      />
    )
  } else {
    return (
      <CustomAvatar
        skin='light'
        color='info'
        sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: theme => theme.typography.body1.fontSize }}
      >
        {getInitials(initials || 'John Doe')}
      </CustomAvatar>
    )
  }
}

export const TableCellStyled = styled(TableCell)(({ theme }) => ({
//   color: `${theme.palette.primary.main} !important`
}))

const StaffTable = () => {
  const dispatch = useAppDispatch()

  const [StaffData, loading, paging] = useStaff()

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [showModal, setShowModal] = useState(false)
  const [openEditDrawer, setEditDrawer] = useState(false)
  const [openViewDrawer, setViewDrawer] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState()
  const [staffToUpdate, setStaffToUpdate] = useState(null)
  const [staffInView, setStaffInView] = useState(null)
  const [refetch, setFetch] = useState(false)
  const [key, setKey] = useState('')

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const updateFetch = () => setFetch(!refetch)

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleToggle = value => {
    let payload
    if (value.status) {
      payload = {
        status: false
      }
    } else {
      payload = {
        status: true
      }
    }

    updateStaff(value?.email, payload).then(res => {
      if (res.data.success) {
        dispatch(fetchStaffs({ page: 1, limit: 10, key: '' }))
        notifySuccess('Updated Staff')
      }
    })
  }

  const setStaffToEdit = value => {
    setEditDrawer(!openEditDrawer)
    setStaffToUpdate(value)
  }

  const setStaffToView = value => {
    setViewDrawer(!openViewDrawer)
    setStaffInView(value)
  }

  const closeEditModal = () => {
    setEditDrawer(!openEditDrawer)
  }

  const closeViewModal = () => {
    setViewDrawer(!openViewDrawer)
  }

  const doDelete = value => {
    setDeleteModal(true)
    setSelectedStaff(value.id)
  }

  const doCancelDelete = () => {
    setDeleteModal(false)
    setSelectedStaff(null)
  }

  const ondeleteClick = async () => {
    deleteStaff(selectedStaff).then(res => {
      if (res.status) {
        dispatch(fetchStaffs({ page: 1, limit: 10, key: '' }))
        doCancelDelete()
      }
    })
  }

  useEffect(() => {
    dispatch(fetchClasses({ page: 1, limit: 300, key: '' }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    dispatch(fetchStaffs({ page: page + 1, limit: 10, key }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, key, refetch])

  return (
    <>
      <Stats data={StaffData} statTitle='Staff' />

      <PageHeaderWithSearch
        searchPlaceholder={'Search Staff'}
        action='Add Staff'
        toggle={toggleModal}
        handleFilter={setKey}
      />

      <Fragment>
        <TableContainer component={Paper} sx={{ maxHeight: 840 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                <TableCell align='left' sx={{ minWidth: 250 }}>
                  Staff
                </TableCell>
                {/* <TableCell align='center' sx={{ minWidth: 150 }}>
                Religion
              </TableCell> */}
                <TableCell align='left' sx={{ minWidth: 165 }}>
                  Role
                </TableCell>
                <TableCell align='left' sx={{ minWidth: 165 }}>
                  Employment Date
                </TableCell>

                {/* <TableCell align='left' sx={{ minWidth: 160 }}>
                  Phone
                </TableCell> */}
                <TableCell align='left' sx={{ minWidth: 140 }}>
                  Status
                </TableCell>
                <TableCell align='left' sx={{ minWidth: 140 }}>
                  User ID
                </TableCell>
                <TableCell align='left' sx={{ minWidth: 140, paddingLeft: '30px' }}>
                  Actions
                </TableCell>
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
                <Fragment>
                  {StaffData?.result?.length &&
                    StaffData?.result.map(item => {

                      return (
                        <TableRow hover role='checkbox' key={item.id}>
                          <TableCell align='left' sx={{ display: 'flex', gap: '10px' }}>
                            {renderClient(item)}
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
                                {`${item?.title}. ${item?.firstName} ${item?.lastName}`}
                              </Typography>
                              <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
                                {item?.email || '--'}
                              </Typography>
                            </Box>
                          </TableCell>

                          <TableCell align='left' sx={{ textTransform: 'uppercase', fontSize: '13px', }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CustomAvatar
                                skin='light'
                                sx={{ mr: 4, width: 30, height: 30 }}
                                color={userRoleObj[item?.role?.name].color || 'primary'}
                              >
                                <Icon icon={userRoleObj[item?.role?.name].icon} />
                              </CustomAvatar>
                              <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                                {item?.role?.name}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell align='left' sx={{ textTransform: 'uppercase' }}>
                            {formatDate(item.dateOfEmployment) || '--'}
                          </TableCell>

                          {/* <TableCell align='left' sx={{ textTransform: 'uppercase' }}>
                            {item?.phone || '--'}
                          </TableCell> */}

                          <TableCell align='left' sx={{ textTransform: 'uppercase' }}>
                            {item.status ? (
                              <CustomChip
                                rounded
                                skin='light'
                                size='small'
                                label={'Active'}
                                color='success'
                                sx={{ textTransform: 'capitalize' }}
                              />
                            ) : (
                              <CustomChip
                                rounded
                                skin='light'
                                size='small'
                                label={'Inactive'}
                                color='error'
                                sx={{ textTransform: 'capitalize' }}
                              />
                            )}
                          </TableCell>

                          <TableCell
                            component={TableCellStyled}
                            align='left'
                            sx={{ textTransform: 'uppercase', fontSize: '13px' }}
                          >
                            {item?.identificationNumber || '--'}
                          </TableCell>

                          <TableCell
                            align='left'
                            sx={ item?.profilePicture !== null && item?.profilePicture.length > 5 ? {
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '10px',
                               transform: 'translateY(0px)'
                              }
                             : {display: 'flex',
                             justifyContent: 'center',
                             gap: '10px',
                            transform: 'translateY(7.4px)'
                           }}
                          >
                            <IconButton size='small' onClick={() => setStaffToEdit(item)}>
                              <Icon icon='tabler:edit' />
                            </IconButton>

                            <IconButton size='small' onClick={() => setStaffToView(item)}>
                              <Icon icon='tabler:eye' />
                            </IconButton>

                            {/* {item.status &&  <IconButton size='small' onClick={() => doDelete(item)}>
                            <Icon icon='tabler:trash' />
                          </IconButton>
                            } */}

                            <FormGroup row sx={{ transform: 'translateX(-44%)' }}>
                              <FormControlLabel
                                value='start'
                                label=''
                                labelPlacement='start'
                                control={<Switch checked={item.status} onChange={() => handleToggle(item)} />}
                              />
                            </FormGroup>
                          </TableCell>
                        </TableRow>
                      )
                    })}

                  {StaffData?.length === 0 && (
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
          rowsPerPageOptions={[5, 10]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        {openEditDrawer && (
          <UpdateStaff
            open={openEditDrawer}
            closeModal={closeEditModal}
            refetchStaffs={updateFetch}
            selectedStaff={staffToUpdate}
          />
        )}
        {openViewDrawer && <ViewStaff open={openViewDrawer} closeCanvas={closeViewModal} staffUser={staffInView} />}

        <AddStaff open={showModal} closeModal={toggleModal} refetchStaffs={updateFetch} />
        <DeleteDialog open={deleteModal} handleClose={doCancelDelete} handleDelete={ondeleteClick} />
      </Fragment>
    </>
  )
}

export default StaffTable
