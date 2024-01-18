import React, { useEffect, useState, Fragment } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import IconButton from '@mui/material/IconButton'

import Icon from 'src/@core/components/icon'

import TablePagination from '@mui/material/TablePagination'

import CustomChip from 'src/@core/components/mui/chip'
//import { useAppDispatch, useAppSelector } from '../../../hooks'
//import NoData from '../../../@core/components/emptyData/NoData'
//import NoData from '../../../@core/components/emptyData/NoData'
import NoData from '../../../@core/components/emptyData/NoData'
// import { deleteRole, fetchRoles } from '../../../store/apps/roles/asyncthunk'
// import CustomSpinner from '../../../@core/components/custom-spinner'
// import { formatFirstLetter } from '../../../@core/utils/format'
// import DeleteDialog from '../../../@core/components/delete-dialog'
//import EditRole from './EditRole'
import editStaff from '../../../views/users/staff/editStaff'

import PageHeader from '../component/PageHeader'
import CreateStaff from '../../../views/users/staff/createStaff'
import { useStudent } from '../../../hooks/useStudent'

const StudentTable = () => {
  //   const dispatch = useAppDispatch()

  const [StudentData, loading, paging] = useStudent()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  //   const [role, setRole] = useState(null)
  const [addRoleOpen, setaddRoleOpen] = useState(false)
  const [refetch, setFetch] = useState(false)

  const [openEditDrawer, setEditDrawer] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedRole, setSelectedRole] = useState(null)

  //   const [roleToView, setRoleToView] = useState(null)

  //   const setActiveRole = value => {
  //     setRole(value)
  //     setOpenCanvas(true)
  //}

  //   // are you sure ou want to delete funtion
  //   const doDelete = value => {
  //     setDeleteModal(true)
  //     setSelectedRole(value?.id)
  //   }

  //   const doCancelDelete = () => {
  //     setDeleteModal(false)
  //     setSelectedRole(null)
  //   }

  const updateFetch = () => setFetch(!refetch)

  const ondeleteClick = () => {
    dispatch(deleteRole(selectedRole))
    updateFetch()
    doCancelDelete()
  }

  //   const setRoleToEdit = prod => {
  //     setEditDrawer(true)
  //     setRoleToView(prod)
  //   }

  const handleChangePage = newPage => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const toggleRoleDrawer = () => setaddRoleOpen(!addRoleOpen)
  const toggleEditDrawer = () => setEditDrawer(!openEditDrawer)

  //   useEffect(() => {
  //     dispatch(fetchRoles({ page: page + 1, limit: 10 }))

  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [page, refetch])

  return (
    <div>
      <PageHeader action='Add Staff List' toggle={toggleRoleDrawer} />
      <TableContainer component={Paper} sx={{ maxHeight: 840 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                S/N
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                NAME
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                Email
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                Password
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                Phone Number
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                ACTIONS
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
                {StudentData?.map((role, i) => (
                  <TableRow hover role='checkbox' key={role.id}>
                    <TableCell align='left'>{i + 1}</TableCell>
                    <TableCell align='left'>{formatFirstLetter(role?.name)}</TableCell>

                    <TableCell align='left' sx={{ display: 'flex' }}>
                      <IconButton size='small' onClick={() => setRoleToEdit(role)}>
                        <Icon icon='tabler:edit' />
                      </IconButton>
                      <IconButton size='small' onClick={() => doDelete(role)}>
                        <Icon icon='tabler:trash' />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}

                {StudentData?.length === 0 && (
                  <tr className='text-center'>
                    <td colSpan={6}>
                      {' '}
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
        rowsPerPageOptions={[5, 10, 20]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* <DeleteDialog open={deleteModal} handleClose={doCancelDelete} handleDelete={ondeleteClick} /> */}

      {openEditDrawer && (
        <editStaff
          open={openEditDrawer}
          closeModal={toggleEditDrawer}
          refetchRoles={updateFetch}
          selectedRole={roleToView}
        />
      )}

      {addRoleOpen && <CreateStaff open={addRoleOpen} closeModal={toggleRoleDrawer} refetchRoles={updateFetch} />}
    </div>
  )
}

export default StudentTable
