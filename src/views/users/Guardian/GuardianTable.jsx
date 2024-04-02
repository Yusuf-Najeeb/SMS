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
import { usePaymentMethods } from 'src/hooks/usePaymentMethods'
import { styled } from '@mui/material/styles'

import { formatDate } from '../../../@core/utils/format'

import CustomSpinner from 'src/@core/components/custom-spinner'
import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomChip from 'src/@core/components/mui/chip'

import { useAppSelector } from '../../../hooks'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import Stats from '../component/Stats'
import PageHeaderWithSearch from '../component/PageHeaderWithSearch'
import { deleteGuardian, fetchGuardian, updateGuardian } from '../../../store/apps/guardian/asyncthunk'
import AddGuardian from './AddGuardian'
import EditGuardian from './EditGuardian'
import ViewGuardian from './ViewGuardian'

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL

const renderClient = row => {
  const initials = `${row.firstName} ${row.lastName}`
  if (row?.profilePicture !== null && row?.profilePicture?.length) {
    return (
      <CustomAvatar
        src={`${backendURL?.replace('api', '')}/${row?.profilePicture}`}
        sx={{ mr: 2.5, width: 32, height: 32, transform: 'translateY(10px)' }}
      />
    )
  } else {
    return (
      <CustomAvatar
        skin='light'
        //eslint_disable-next-line
        // color={row?.title.length > 2 ? 'primary' : 'secondary'}
        color='info'
        sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: theme => theme.typography.body1.fontSize }}
      >
        {getInitials(initials || 'John Doe')}
      </CustomAvatar>
    )
  }
}

export const TableCellStyled = styled(TableCell)(({ theme }) => ({
  // color: `${theme.palette.primary.main} !important`
}))

const GuardianTable = () => {
  const dispatch = useAppDispatch()

  const GuardianData = useAppSelector(store => store.guardian.GuardianData)
  const paging = useAppSelector(store => store.guardian.paging)
  const loading = useAppSelector(store => store.guardian.loading)

  const [PaymentMethodsList] = usePaymentMethods()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [showModal, setShowModal] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState(null)
  const [openEditDrawer, setEditDrawer] = useState(false)
  const [openViewDrawer, setViewDrawer] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedGuardian, setSelectedGuardian] = useState()
  const [guardianToUpdate, setGuardianToUpdate] = useState(null)
  const [guardianInView, setGuardianInView] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const [refetch, setFetch] = useState(false)
  const [key, setKey] = useState('')

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const setActivePaymentMethod = value => {
    OpenPayment()
    DoSetSelectedPayment(value)
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

    updateGuardian(payload, value?.email).then(res => {
      if (res.data.success) {
        dispatch(fetchGuardian({ page: 1, key: '' }))
      }
    })
  }

  const setGuardianToEdit = value => {
    setEditDrawer(!openEditDrawer)
    setGuardianToUpdate(value)
  }

  const setGuardianToView = value => {
    setViewDrawer(!openViewDrawer)
    setGuardianInView(value)
  }

  const closeEditModal = () => {
    setEditDrawer(!openEditDrawer)
  }

  const closeViewModal = () => {
    setViewDrawer(!openViewDrawer)
  }

  const doDelete = value => {
    setDeleteModal(true)
    setSelectedGuardian(value.email)
  }

  const doCancelDelete = () => {
    setDeleteModal(false)
    setSelectedGuardian(null)
  }

  const ondeleteClick = async () => {
    deleteGuardian(selectedGuardian).then(res => {
      if (res.status) {
        dispatch(fetchGuardian({ page: 1, key }))
        doCancelDelete()
      }
    })
  }

  useEffect(() => {
    dispatch(fetchGuardian({ page: page + 1, key }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, refetch, key])

  return (
    <>
      <Stats data={GuardianData} statTitle='Guardian' />

      <PageHeaderWithSearch
        searchPlaceholder={'Search Guardian'}
        action='Add Guardian'
        toggle={toggleModal}
        handleFilter={setKey}
      />

      <Fragment>
        <TableContainer component={Paper} sx={{ maxHeight: 840 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                <TableCell align='left' sx={{ minWidth: 280 }}>
                  Guardian
                </TableCell>
                {/* <TableCell align='center' sx={{ minWidth: 150 }}>
                Religion
              </TableCell> */}
                <TableCell align='center' sx={{ minWidth: 150 }}>
                  Phone
                </TableCell>
                <TableCell align='center' sx={{ minWidth: 150 }}>
                  Gender
                </TableCell>
                <TableCell align='center' sx={{ minWidth: 150 }}>
                  Status
                </TableCell>
                <TableCell align='center' sx={{ minWidth: 140 }}>
                  User ID
                </TableCell>
                <TableCell align='center' sx={{ minWidth: 140 }}>
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
                  {GuardianData?.result?.length &&
                    GuardianData?.result.map(item => (
                      <TableRow hover role='checkbox' key={item.id}>
                        <TableCell align='left' sx={{ display: 'flex', gap: '8px' }}>
                          {renderClient(item)}
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
                              {`${item?.firstName} ${item?.lastName}`}
                            </Typography>
                            <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
                              {item?.email}
                            </Typography>
                          </Box>
                        </TableCell>

                        {/* <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                        {item?.religion || '--'}
                      </TableCell> */}
                        <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                          {item?.phone || '--'}
                        </TableCell>
                        <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                          {item?.gender || '--'}
                        </TableCell>
                        <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
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
                          align='center'
                          sx={{ textTransform: 'uppercase', fontSize: '13px' }}
                        >
                          {item?.identificationNumber || '--'}
                        </TableCell>

                        <TableCell
                          align='left'
                          sx={
                            item?.profilePicture !== null && item?.profilePicture?.length > 5
                              ? {
                                  display: 'flex',
                                  justifyContent: 'center',
                                  gap: '10px',
                                  transform: 'translateY(0px)'
                                }
                              : {
                                  display: 'flex',
                                  justifyContent: 'center',
                                  gap: '10px',
                                  transform: 'translateY(7.4px)'
                                }
                          }
                        >
                          <IconButton size='small' onClick={() => setGuardianToEdit(item)}>
                            <Icon icon='tabler:edit' />
                          </IconButton>

                          <IconButton size='small' onClick={() => setGuardianToView(item)}>
                            <Icon icon='tabler:eye' />
                          </IconButton>

                          {/* <IconButton size='small' onClick={() => doDelete(item)}>
                          <Icon icon='tabler:trash' />
                        </IconButton> */}

                          <FormGroup row sx={{ transform: 'translateX(-40%)' }}>
                            <FormControlLabel
                              value='start'
                              label=''
                              labelPlacement='start'
                              control={<Switch checked={item.status} onChange={() => handleToggle(item)} />}
                            />
                          </FormGroup>
                        </TableCell>
                      </TableRow>
                    ))}

                  {GuardianData?.result?.length === 0 && (
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

        <AddGuardian open={showModal} closeModal={toggleModal} refetchData={updateFetch} />
        <EditGuardian
          open={openEditDrawer}
          selectedGuardian={guardianToUpdate}
          fetchData={updateFetch}
          closeModal={closeEditModal}
        />
        <ViewGuardian open={openViewDrawer} guardian={guardianInView} closeCanvas={closeViewModal} />
        <DeleteDialog open={deleteModal} handleClose={doCancelDelete} handleDelete={ondeleteClick} />
      </Fragment>
    </>
  )
}

export default GuardianTable
