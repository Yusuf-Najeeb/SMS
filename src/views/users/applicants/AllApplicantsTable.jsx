import React, { Fragment, useEffect, useState } from 'react'
import { useAppDispatch } from 'src/hooks'

import Paper from '@mui/material/Paper'
import {  Menu, MenuItem, Tooltip } from '@mui/material'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
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
import {  fetchStudents } from '../../../store/apps/Student/asyncthunk'
import { fetchClasses } from '../../../store/apps/classes/asyncthunk'

import { useClasses } from '../../../hooks/useClassess'
import { deleteApplicant, fetchApplicants, updateApplicant } from '../../../store/apps/applicants/asyncthunk'
import { useApplicants } from '../../../hooks/useApplicants'
import { truncateText } from '../../../@core/utils/truncateText'

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

const AllApplicantsTable = () => {



  const dispatch = useAppDispatch()

  const [ApplicantsData, loading] = useApplicants()
  const [ClassesList] = useClasses()

  const [showModal, setShowModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedApplicant, setSelectedApplicant] = useState("")
  const [refetch, setFetch] = useState(false)
  const [anchorEl, setAnchorEl] = useState(Array(ApplicantsData?.length)?.fill(null))

  const handleRowOptionsClick = (event, index) => {
    const newAnchorEl = [...anchorEl]
    newAnchorEl[index] = event.currentTarget
    setAnchorEl(newAnchorEl)
  }

  const handleRowOptionsClose = index => {
    const newAnchorEl = [...anchorEl]
    newAnchorEl[index] = null
    setAnchorEl(newAnchorEl)
  }

  const toggleModal = () => {
    setShowModal(!showModal)
  }


  const updateFetch = () => setFetch(!refetch)

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleToggle = (value) => {

    let payload
    if(value.status){
      payload = {
        status: false
      }
    }
    else {
      payload = {
        status: true
      }
    }

    updateApplicant(payload, value?.email).then(res => {
      if (res.data.success) {
        dispatch(fetchApplicants())
      }
    })
  }


  const doDelete = value => {
    setDeleteModal(true)
    setSelectedApplicant(value.email)
  }

  const doCancelDelete = () => {
    setDeleteModal(false)
    setSelectedApplicant('')
  }

  const ondeleteClick = async () => {
    deleteApplicant(selectedApplicant).then(res => {
      if (res?.data?.success) {
        dispatch(fetchApplicants())
        doCancelDelete()
      }
    })
  }

  useEffect(() => {
    dispatch(fetchClasses({ page: 1, limit: 300, key: '' }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    dispatch(fetchApplicants())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>

      {/* <PageHeader
        action='Add Student'
        toggle={toggleModal}
      /> */}

      <Box sx={{mt: 15}}>
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
                                {`${truncateText(item?.firstName)} ${truncateText(item?.lastName)}`}
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
                            sx={{ display: 'flex', justifyContent: 'center', gap: '10px' , }}
                          >
                            <Tooltip title= {item?.status ? 'Reject Applicant' : 'Accept Applicant'}>
                            <FormGroup row sx={{ transform: 'translateX(-4%)' }}>
                              <FormControlLabel
                                value='start'
                                label=''
                                labelPlacement='start'
                                control={<Switch checked={item.status} onChange={() => handleToggle(item)} />}
                              />
                            </FormGroup>
                            </Tooltip>

                            <>
                        <IconButton size='small' onClick={event => handleRowOptionsClick(event, i)}>
                          <Icon icon='tabler:dots-vertical' />
                        </IconButton>
                        <Menu
                          keepMounted
                          anchorEl={anchorEl[i]}
                          open={Boolean(anchorEl[i])}
                          onClose={() => handleRowOptionsClose(i)}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right'
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                          }}
                          PaperProps={{ style: { minWidth: '8rem' } }}
                        >
                         
                          <MenuItem onClick={() => doDelete(item)} sx={{ '& svg': { mr: 2 } }}>
                            <Icon icon='tabler:trash' fontSize={20} />
                            Delete Applicant
                          </MenuItem>
                            
                          </Menu>
                          </>
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

        {/* <AddStudent open={showModal} closeModal={toggleModal} refetchData={updateFetch} /> */}
       
        <DeleteDialog open={deleteModal} handleClose={doCancelDelete} handleDelete={ondeleteClick} />
      </Box>
    </>
  )
}

export default AllApplicantsTable
