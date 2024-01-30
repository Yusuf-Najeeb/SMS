import React, { useEffect, useState, Fragment } from 'react'

import Card from '@mui/material/Card'
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
import { useDispatch } from 'react-redux'
import NoData from '../../../@core/components/emptyData/NoData'

import CustomSpinner from '../../../@core/components/custom-spinner'

import { formatFirstLetter } from '../../../../src/@core/utils/format'

import DeleteDialog from '../../../@core/components/delete-dialog'

import EditStaff from './EditStaff'
import { fetchStaffs, deleteStaff } from '../../../store/apps/staff/asyncthunk'

import { useStaff } from '../../../hooks/useStaff'

import PageHeader from '../component/PageHeader'
import CreateStaff from './CreateStaff'

const StaffTable = () => {
  //   const dispatch = useAppDispatch()
  const dispatch = useDispatch()

  const [StaffData, loading, paging] = useStaff()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [staff, setStaff] = useState(null)
  const [addStaffOP, setStaffOpen] = useState(false)
  const [refetch, setFetch] = useState(false)
  const [openEditDrawer, setEditDrawer] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectStaff, setselectStaff] = useState(null)

  const [roleToView, setRoleToView] = useState(null)
  //   const [role, setRole] = useState(null)
  const [addRoleOpen, setaddRoleOpen] = useState(false)

  const setActiveStaff = value => {
    setStaff(value)
    setOpenCanvas(true)
  }
  //   const [deleteModal, setDeleteModal] = useState(false)
  //   const [selectedRole, setSelectedRole] = useState(null)

  //   const [roleToView, setRoleToView] = useState(null)

  //   const setActiveRole = value => {
  //     setRole(value)
  //     setOpenCanvas(true)
  //}

  // are you sure ou want to delete funtion
  const doDelete = value => {
    setDeleteModal(true)
    setselectStaff(value?.email)
  }

  const doCancelDelete = () => {
    setDeleteModal(false)
    setselectStaff(null)
  }

  const updateFetch = () => setFetch(!refetch)

  // const ondeleteClick = () => {
  //   dispatch(deleteRole(selectedRole))
  //   updateFetch()
  //   doCancelDelete()
  // }
  const ondeleteClick = async () => {
    const res = await dispatch(deleteStaff(selectStaff))
    console.log(res, 'res')
    if (res.payload.status) {
      updateFetch()
      doCancelDelete()
    }
    //updateFetch()
    // doCancelDelete()
  }

  const setStafffToEdit = prod => {
    setEditDrawer(true)
    setRoleToView(prod)
  }

  const handleChangePage = newPage => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const toggleRoleDrawer = () => setaddRoleOpen(!addRoleOpen)
  const toggleEditDrawer = () => setEditDrawer(!openEditDrawer)

  const toogleStaffDrawer = () => setStaffOpen(!addStaffOP)

  useEffect(() => {
    dispatch(fetchStaffs())
  }, [page, refetch])
  console.log(StaffData, 'All staff')
  return (
    <div>
      <PageHeader action='Create ' toggle={toogleStaffDrawer} />
      <TableContainer component={Card} sx={{ maxHeight: 840 }}>
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
                EMAIL
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                Title
              </TableCell>

              <TableCell align='left' sx={{ minWidth: 100 }}>
                IDENTIFICATION NUMBER
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
                {StaffData?.map((staff, i) => (
                  <TableRow hover role='checkbox' key={staff?.id}>
                    <TableCell align='left'>{i + 1}</TableCell>
                    <TableCell align='left'>{`${staff?.firstName} ${staff?.lastName}`}</TableCell>
                    <TableCell align='left'>{staff.email}</TableCell>
                    <TableCell align='left'>{staff?.title}</TableCell>

                    <TableCell align='left'>{staff?.identificationNumber}</TableCell>

                    <TableCell align='left' sx={{ display: 'flex' }}>
                      <IconButton size='small' onClick={() => setStafffToEdit(staff)}>
                        <Icon icon='tabler:edit' />
                      </IconButton>
                      <IconButton size='small' onClick={() => doDelete(staff)}>
                        <Icon icon='tabler:trash' />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}

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
        rowsPerPageOptions={[5, 10, 20]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <DeleteDialog open={deleteModal} handleClose={doCancelDelete} handleDelete={ondeleteClick} />

      {openEditDrawer && (
        <EditStaff
          open={openEditDrawer}
          closeModal={toggleEditDrawer}
          refetchStaff={updateFetch}
          selectedStaff={roleToView}
        />
      )}

      {addRoleOpen && <CreateStaff open={addRoleOpen} closeModal={toggleRoleDrawer} />}

      {addStaffOP && <CreateStaff open={addStaffOP} closeModal={toogleStaffDrawer} refetchStaff={updateFetch} />}
    </div>
  )
}

export default StaffTable
