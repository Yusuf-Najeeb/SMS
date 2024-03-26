import React, { Fragment, useEffect, useState } from 'react'
import { useAppDispatch } from 'src/hooks'

import Paper from '@mui/material/Paper'
import {  Tooltip } from '@mui/material'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { Box, IconButton, Typography } from '@mui/material'
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
import {  fetchApplicantsForGuardian, updateApplicant } from '../../../store/apps/applicants/asyncthunk'
import PageHeader from '../component/PageHeader'
import GetUserData from '../../../@core/utils/getUserData'
import { useGuardianApplicants } from '../../../hooks/useGuardianApplicants'
import AddApplicant from './AddApplicant'
import EditApplicant from './EditApplicant'

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

        // color={row?.title.length > 2 ? 'primary' : 'secondary'}
        color='info'
        sx={{ mr: 2.5, width: 32, height: 32, fontWeight: 500, fontSize: theme => theme.typography.body1.fontSize }}
      >
        {getInitials(initials || 'John Doe')}
      </CustomAvatar>
    )
  }
}

export const TableCellStyled = styled(TableCell)(({ theme }) => ({

//   color: `${theme.palette.primary.dark} !important`
//   color: `${theme.palette.secondary.main} !important`
}))

const ApplicantsTableForParents = () => {

  const userData = GetUserData()

  const dispatch = useAppDispatch()

  const [ApplicantsData, loading] = useGuardianApplicants()

  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedApplicant, setSelectedApplicant] = useState(null)
  const [refetch, setFetch] = useState(false)

  const setActiveApplicant = (value)=> {
    setShowEditModal(true)
    setSelectedApplicant(value)

  }

  const toggleEditModal = ()=> {
    setShowEditModal(!showEditModal)
  }


  const toggleModal = () => {
    setShowModal(!showModal)
  }



  const updateFetch = () => setFetch(!refetch)


  useEffect(() => {
    dispatch(fetchApplicantsForGuardian({id: userData.id}))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch])

  return (
    <>

      <PageHeader
        action='Add Applicant'
        toggle={toggleModal}
      />

      <Fragment>
        <TableContainer component={Paper} sx={{ maxHeight: 840 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                <TableCell align='left' sx={{ minWidth: 250 }}>
                  Applicant
                </TableCell>
                <TableCell align='left' sx={{ minWidth: 160 }}>
                  Class
                </TableCell>
                <TableCell align='left' sx={{ minWidth: 150 }}>
                  Date of Birth
                </TableCell>
                <TableCell align='left' sx={{ minWidth: 150 }}>
                  Gender
                </TableCell>
                <TableCell align='left' sx={{ minWidth: 150 }}>
                 Date Applied
                </TableCell>
                <TableCell align='left' sx={{ minWidth: 140 }}>
                  Status
                </TableCell>
                <TableCell align='left' sx={{ minWidth: 140 }}>
                ID NUMBER
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
                  {ApplicantsData?.length > 0 &&
                    ApplicantsData?.map((item, i) => {

                      return (
                        <TableRow hover role='checkbox' key={item.id}>
                          <TableCell align='left' 
                               sx={item?.profilePicture !== null && item?.profilePicture.length > 5 ? {
                                display: 'flex',
                                gap: '8px',
                               transform: 'translateY(10.8px)'
                              }
                             : {display: 'flex',
                             gap: '8px',
                            transform: 'translateY(0.7px)'
                           }}
                          
                          >
                            {renderClient(item)}
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
                                {`${item?.firstName} ${item?.lastName}`}
                              </Typography>
                              <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
                                {item?.email || '--'}
                              </Typography>
                            </Box>
                          </TableCell>

                          <TableCell align='left' sx={{ textTransform: 'uppercase', fontSize: '13px' }}>
                            {`${item?.className} ` || '--'}
                          </TableCell>
                          <TableCell align='left' sx={{ textTransform: 'uppercase' }}>
                            {formatDate(item?.dateOfBirth) || '--'}
                          </TableCell>
                          <TableCell align='left' sx={{ textTransform: 'uppercase' }}>
                            {item?.gender || '--'}
                          </TableCell>

                          <TableCell align='left' sx={{ textTransform: 'uppercase' }}>
                            {formatDate(item?.createdAt)}
                          </TableCell>

                          <TableCell align='left' sx={{ textTransform: 'uppercase' }}>
                            {item.status ? (
                              <CustomChip
                                rounded
                                skin='light'
                                size='small'
                                label={'Accepted'}
                                color='success'
                                sx={{ textTransform: 'capitalize' }}
                              />
                            ) : (
                              <CustomChip
                                rounded
                                skin='light'
                                size='small'
                                label={'Pending'}
                                color='warning'
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
                            sx={{ display: 'flex', justifyContent: 'center', gap: '10px', transform: 'translateY(25.5%)' }}
                          >
                          <Tooltip title='Edit Applicant Information'>
                          <IconButton size='small' onClick={() => setActiveApplicant(item)}>
                        <Icon icon='tabler:edit' />
                      </IconButton>
                      </Tooltip>
                          </TableCell>
                        </TableRow>
                      )
                    })}

                  {ApplicantsData?.length === 0 && (
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

        {/* <TablePagination
          page={page}
          component='div'
          count={paging?.totalItems}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}

        <AddApplicant open={showModal} closeModal={toggleModal} refetchData={updateFetch} />

       {showEditModal &&  <EditApplicant open={showEditModal} refetchData={updateFetch} apllicantToEdit={selectedApplicant} closeModal={toggleEditModal} /> }
       
        {/* <DeleteDialog open={deleteModal} handleClose={doCancelDelete} handleDelete={ondeleteClick} /> */}
      </Fragment>
    </>
  )
}

export default ApplicantsTableForParents
