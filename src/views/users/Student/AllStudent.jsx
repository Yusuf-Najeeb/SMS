import React, { useEffect, useState, Fragment } from 'react'

import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import IconButton from '@mui/material/IconButton'
import CustomSpinner from '../../../@core/components/custom-spinner'
import Icon from 'src/@core/components/icon'

import TablePagination from '@mui/material/TablePagination'

import CustomChip from 'src/@core/components/mui/chip'

import NoData from '../../../@core/components/emptyData/NoData'
import { useDispatch } from 'react-redux'
import PageHeader from '../component/PageHeader'
import CreateStudent from './CreateStudent'

import { fetchStudents, deleteStaff } from '../../../store/apps/Student/asyncthunk'
import { useStudent } from '../../../hooks/useStudent'

const StudentTable = () => {
  const dispatch = useDispatch()

  const [StudentData, loading, paging] = useStudent()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [addStudentOpen, setStudentOpen] = useState(false)
  const [refetch, setFetch] = useState(false)
  const [student, setStudent] = useState(null)

  const [openEditDrawer, setEditDrawer] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedStudent, setSelectedRole] = useState(null)

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

  const setActiveStaff = value => {
    setStudent(value)
    setOpenCanvas(true)
  }

  const updateFetch = () => setFetch(!refetch)

  const ondeleteClick = () => {
    dispatch(deleteRole(selectedStudent))
    updateFetch()
    doCancelDelete()
  }
  const toggleRoleDrawer = () => setaddStudentOpen(!addStudentOpen)
  const toggleEditDrawer = () => setEditDrawer(!openEditDrawer)

  const toggleStudent = () => setStudentOpen(!addStudentOpen)

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

  //   useEffect(() => {
  //     dispatch(fetchRoles({ page: page + 1, limit: 10 }))

  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [page, refetch])
  useEffect(() => {
    dispatch(fetchStudents())
  }, [page, refetch])

  return (
    <div>
      <PageHeader action='Create ' toggle={toggleStudent} />
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
                {StudentData?.map((student, i) => (
                  <TableRow hover role='checkbox' key={student?.id}>
                    <TableCell align='left'>{i + 1}</TableCell>
                    <TableCell align='left'>{`${student?.firstName} ${student?.lastName}`}</TableCell>
                    <TableCell align='left'>{student.email}</TableCell>
                    <TableCell align='left'>{student?.title}</TableCell>

                    <TableCell align='left' sx={{ display: 'flex' }}>
                      <IconButton size='small' onClick={() => setStudentfToEdit(student)}>
                        <Icon icon='tabler:edit' />
                      </IconButton>
                      <IconButton size='small' onClick={() => doDelete(student)}>
                        <Icon icon='tabler:trash' />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}

                {StudentData?.length === 0 && (
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
      {/* 
      <DeleteDialog open={deleteModal} handleClose={doCancelDelete} handleDelete={ondeleteClick} /> */}

      {openEditDrawer && (
        <EditStudent
          open={openEditDrawer}
          closeModal={toggleEditDrawer}
          refetchStudent={updateFetch}
          selectedStudent={studentToView}
        />
      )}

      {addStudentOpen && <CreateStudent open={addStudentOpen} closeModal={toggleRoleDrawer} />}

      {addStudentOpen && (
        <CreateStudent open={addStudentOpen} closeModal={toggleStudent} refetchStudent={updateFetch} />
      )}
    </div>
  )
}

export default StudentTable
