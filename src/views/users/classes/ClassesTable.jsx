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
import { Box, IconButton, Typography } from '@mui/material'
import DeleteDialog from 'src/@core/components/delete-dialog'
import Icon from 'src/@core/components/icon'
import NoData from 'src/@core/components/emptydata/NoData'
import { styled } from '@mui/material/styles'

import { formatDate } from '../../../@core/utils/format'

import CustomSpinner from 'src/@core/components/custom-spinner'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { useAppSelector } from '../../../hooks'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import Stats from '../component/Stats'
import PageHeaderWithSearch from '../component/PageHeaderWithSearch'
import { useClasses } from '../../../hooks/useClassess'
import { deleteClass, fetchClasses } from '../../../store/apps/classes/asyncthunk'
import ManageClass from './ManageClass'
import { useStaff } from '../../../hooks/useStaff'
import { fetchStaffs } from '../../../store/apps/staff/asyncthunk'

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL

const renderClient = row => {
  const initials = `${row.firstName} ${row.lastName}`
  if (row.profilePicture?.length) {
    return (
      <CustomAvatar
        src={`${backendURL?.replace('api', '')}/${row.profilePicture}`}
        sx={{ mr: 2.5, width: 38, height: 38 }}
      />
    )
  } else {
    return (
      <CustomAvatar
        skin='light'

        // color={row?.title.length > 2 ? 'primary' : 'secondary'}
        color='primary'
        sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: theme => theme.typography.body1.fontSize }}
      >
        {getInitials(initials || 'John Doe')}
      </CustomAvatar>
    )
  }
}

const TableCellStyled = styled(TableCell)(({theme})=> ({
    color: `${theme.palette.primary.main} !important` 
}))

const ClassesTable = () => {
  const dispatch = useAppDispatch()

  const [ClassesList, loading, paging] = useClasses()

  const [StaffData] = useStaff()
 
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [showModal, setShowModal] = useState(false)
  const [openEditDrawer, setEditDrawer] = useState(false)
  const [openViewDrawer, setViewDrawer] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedClass, setSelectedClass] = useState()
  const [ClassToUpdate, setClassToUpdate] = useState(null)
  const [guardianInView, setGuardianInView] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const [refetch, setFetch] = useState(false)
  const [key, setKey] = useState('')

  const toggleModal = ()=>{
    setShowModal(!showModal)
  }

  const OpenModal = () => {
    if (showModal) {
      setShowModal(false)
      setClassToUpdate(null)
    } else {
      setShowModal(true)
    }
  }


  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  console.log(paging, 'paging')


  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const setClassToEdit = (value) => {
    OpenModal()
    setClassToUpdate(value)
  }

  const setGuardianToView = (value) => {
    setViewDrawer(!openViewDrawer)
    setGuardianInView(value)
  }


  const closeViewModal = ()=> {
    setViewDrawer(!openViewDrawer)
    setGuardianInView(null)
}

  const doDelete = value => {
    setDeleteModal(true)
    setSelectedClass(value.id)
  }

  const doCancelDelete = () => {
    setDeleteModal(false)
    setSelectedClass(null)
  }

  const ondeleteClick = async () => {
    deleteClass(selectedClass).then((res)=>{

        if (res.status) {
          dispatch(fetchClasses({page: 1, limit: 10, key}))
          doCancelDelete()
        }
    })
   
  }

  useEffect(() => {
    dispatch(fetchClasses({page: page + 1, limit: 10, key}))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage])

  useEffect(() => {
    dispatch(fetchStaffs({page: 1, limit: 300, key: ''}))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
       {/* <Stats data={ClassesList} statTitle='Classes'/> */}

<PageHeaderWithSearch searchPlaceholder={'Search Class'} action="Add Class" toggle={toggleModal} handleFilter={setKey}/>
  
    <Fragment>
      <TableContainer component={Paper} sx={{ maxHeight: 840 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell align='left' sx={{ minWidth: 200 }}>
                Class
              </TableCell>
              {/* <TableCell align='center' sx={{ minWidth: 150 }}>
                Religion
              </TableCell> */}
              <TableCell align='center' sx={{ minWidth: 180 }}>
                Type
              </TableCell>
              <TableCell align='center' sx={{ minWidth: 180 }}>
                Capacity
              </TableCell>
              <TableCell align='center' sx={{ minWidth: 180 }}>
                Class Teacher
              </TableCell>
             
              <TableCell align='center' sx={{ minWidth: 140 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {loading ? (
              <TableRow className='text-center'>
                <TableCell colSpan={6}>
                  <CustomSpinner />
                </TableCell>
              </TableRow>
            ) : (

              // </Box>

              <Fragment>
                {ClassesList?.length &&
                  ClassesList?.map((item) => {
                    const classTeacher = StaffData?.result?.find((staff)=> staff.id === item.staffId  )

                    return (
                    <TableRow hover role='checkbox' key={item.id} >
                      <TableCell align='left' sx={{ textTransform: 'uppercase' }}>
                        {item?.name || '--'}
                      </TableCell>

                      {/* <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                        {item?.religion || '--'}
                      </TableCell> */}
                      <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                        {item?.type || '--'}
                      </TableCell>
                      <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                        {item?.capacity || '--'}
                      </TableCell>
                      <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                        {`${classTeacher?.firstName} ${classTeacher?.lastName}` || '--'}
                      </TableCell>

                      <TableCell align='left' sx={{ display: 'flex', justifyContent: 'center', gap: '10px' ,}}>
                        <IconButton size='small' onClick={() => setClassToEdit(item)}>
                          <Icon icon='tabler:edit' />
                        </IconButton>

                        <IconButton size='small' onClick={() => setGuardianToView(item)}>
                          <Icon icon='tabler:eye' />
                        </IconButton>

                        <IconButton size='small' onClick={() => doDelete(item)}>
                          <Icon icon='tabler:trash' />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )})}

                {ClassesList?.length === 0 && (
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

{showModal && <ManageClass open={showModal} toggle={OpenModal} classToEdit={ClassToUpdate} />}

      <DeleteDialog open={deleteModal} handleClose={doCancelDelete} handleDelete={ondeleteClick} />
    </Fragment>

    </>
  )
}

export default ClassesTable
