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
import { IconButton, Menu, MenuItem } from '@mui/material'
import CustomChip from 'src/@core/components/mui/chip'
import DeleteDialog from 'src/@core/components/delete-dialog'
import Icon from 'src/@core/components/icon'
import NoData from 'src/@core/components/emptydata/NoData'

import CustomSpinner from 'src/@core/components/custom-spinner'
import { deleteSubject, fetchSubjects } from '../../../store/apps/subjects/asyncthunk'
import PageHeader from '../component/PageHeader'
import { useRooms } from '../../../hooks/useRooms'
import { deleteRoom, fetchRooms } from '../../../store/apps/rooms/asyncthunk'
import { fetchCategories } from '../../../store/apps/categories/asyncthunk'
import { useCategories } from '../../../hooks/useCategories'
import ManageRooms from './ManageRooms'
import ManageTeacherInRoom from './ManageTeachersInRoom'
import ManageStudentInRoom from './ManageStudentInRoom'
import { indexof } from 'stylis'
import ViewRoom from './ViewRoom'

const RoomsTable = () => {
  const dispatch = useAppDispatch()

  const [CategoriesData] = useCategories()
  const [RoomsList, loading, paging] = useRooms()
  const [deleteModal, setDeleteModal] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [RoomToDelete, setRoomToDelete] = useState(null)
  const [RoomToView, setRoomToView] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [openViewModal, setOpenViewModal] = useState(false)
  const [openAssignStaffModal, setAssignStaffModal] = useState(false)
  const [openAssignStudentModal, setAssignStudentModal] = useState(false)
  const [roomToAssignToStaff, setRoomToAssignToStaff] = useState(null)
  const [roomToAssignToStudent, setRoomToAssignToStudent] = useState(null)
  const [assignRoomToStaff, setAssignRoomToStaff] = useState(false)
  const [assignRoomToStudent, setAssignRoomToStudent] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [type, setType] = useState('')
  const [key, setKey] = useState('')

const [anchorEl, setAnchorEl] = useState(Array(RoomsList?.length)?.fill(null));


const handleRowOptionsClick = (event, index) => {
    const newAnchorEl = [...anchorEl];
    newAnchorEl[index] = event.currentTarget;
    setAnchorEl(newAnchorEl);
  };


const handleRowOptionsClose = (index) => {
    const newAnchorEl = [...anchorEl];
    newAnchorEl[index] = null;
    setAnchorEl(newAnchorEl);
  };

  const OpenSubjectModal = () => {
    if (openModal) {
      setOpenModal(false)
      setSelectedRoom(null)
    } else {
      setOpenModal(true)
    }
  }

  const toggleAssignStaffModal = () => {
    if (openAssignStaffModal) {
      setAssignStaffModal(false)
      setRoomToAssignToStaff(null)
    } else {
      setAssignStaffModal(true)
    }
  }

  const toggleViewModal =()=> {
    setOpenViewModal(!openViewModal)
  }

  const toggleAssignStudentModal = () => {
    if (openAssignStudentModal) {
      setAssignStudentModal(false)
      setRoomToAssignToStaff(null)
    } else {
      setAssignStudentModal(true)
    }
  }

  const setRoomToAssignStaff = value => {
    setAssignRoomToStaff(true)
    toggleAssignStaffModal()
    handleRowOptionsClose(RoomsList?.indexOf(value))
    setRoomToAssignToStaff(value)
  }

  const setRoomToRemoveStaff = value => {
    setAssignRoomToStaff(false)
    toggleAssignStaffModal()
    handleRowOptionsClose(RoomsList?.indexOf(value))
    setRoomToAssignToStaff(value)
  }

  const setRoomToAssignStudent = value => {
    setAssignRoomToStudent(true)
    toggleAssignStudentModal()
    handleRowOptionsClose(RoomsList?.indexOf(value))
    setRoomToAssignToStudent(value)
  }

  const setRoomToRemoveStudent = value => {
    setAssignRoomToStudent(false)
    toggleAssignStudentModal()
    handleRowOptionsClose(RoomsList?.indexOf(value))
    setRoomToAssignToStudent(value)
  }

  const setRoomInView = value => {
    toggleViewModal()
    handleRowOptionsClose(RoomsList?.indexOf(value))

    // console.log(RoomsList?.indexOf(value), 'index')
    setRoomToView(value)
  }

  const setActiveCategory = value => {
    OpenSubjectModal()
    handleRowOptionsClose(RoomsList?.indexOf(value))

    // console.log(RoomsList?.indexOf(value), 'index')
    setSelectedRoom(value)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const doDelete = room => {
    setDeleteModal(true)
    setRoomToDelete(room.id)
  }

  const doCancelDelete = () => {
    setDeleteModal(false)
    setRoomToDelete(null)
  }

  const ondeleteClick = () => {
    deleteRoom(RoomToDelete).then(res => {
      if (res.data.success) {
        dispatch(fetchRooms({ page: 1, limit: 10, key: '' }))
      }
    })
    doCancelDelete()
  }

  useEffect(() => {
    dispatch(fetchCategories({ page: 1, limit: 300, type: 'room' }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    dispatch(fetchRooms({ page: page + 1, limit: 10, key }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, key])

  return (
    <Fragment>
      <PageHeader toggle={OpenSubjectModal} action={'Add Room'} />

      <TableContainer component={Paper} sx={{ maxHeight: 840 }}>
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
                Capacity
              </TableCell>
              <TableCell align='center' sx={{ minWidth: 100 }}>
                Hostel
              </TableCell>
              <TableCell align='center' sx={{ minWidth: 100 }}>
                Status
              </TableCell>
              <TableCell align='center' sx={{ minWidth: 100 }}>
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
                {RoomsList?.map((item, i) => {
                  const roomCategory = CategoriesData.find(category => item.categoryId == category.id)

                  return (
                    <TableRow hover role='checkbox' key={item.id}>
                      <TableCell align='left'>{i + 1}</TableCell>
                      <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                        {item?.name || '--'}
                      </TableCell>
                      <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                        {item?.capacity || '--'}
                      </TableCell>
                      <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                        {roomCategory?.name || '--'}
                      </TableCell>
                      {/* <TableCell align='center'>{item?.createdBy || '--'}</TableCell> */}
                      <TableCell align='center'>
                        {/* {item.status ? ( */}
                        <CustomChip
                          rounded
                          skin='light'
                          size='small'
                          label='Active'
                          color='success'
                          sx={{ textTransform: 'capitalize' }}
                        />
                        {/* ) : (
                        <CustomChip
                          rounded
                          skin='light'
                          size='small'
                          label='Inactive'
                          color='warning'
                          sx={{ textTransform: 'capitalize' }}
                        />
                      )} */}
                      </TableCell>
                      <TableCell align='center' sx={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                        <>
                          <IconButton size='small' onClick={(event)=> handleRowOptionsClick(event, i)}>
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
                            <MenuItem onClick={() => setActiveCategory(item)} sx={{ '& svg': { mr: 2 } }}>
                              <Icon icon='tabler:edit' fontSize={20} />
                              Edit Room
                            </MenuItem>
                            <MenuItem onClick={() => setRoomInView(item)} sx={{ '& svg': { mr: 2 } }}>
                              <Icon icon='tabler:edit' fontSize={20} />
                              View Students In Room
                            </MenuItem>
                            <MenuItem onClick={() => doDelete(item)} sx={{ '& svg': { mr: 2 } }}>
                              <Icon icon='tabler:trash' fontSize={20} />
                              Delete Room
                            </MenuItem>

                            <MenuItem onClick={() => setRoomToAssignStaff(item)} sx={{ '& svg': { mr: 2 } }}>
                              <Icon icon='clarity:assign-user-solid' fontSize={20} />
                              Assign Staff
                            </MenuItem>

                            <MenuItem onClick={() => setRoomToRemoveStaff(item)} sx={{ '& svg': { mr: 2 } }}>
                              <Icon icon='mingcute:user-remove-fill' fontSize={20} />
                              Remove Staff
                            </MenuItem>

                            <MenuItem onClick={() => setRoomToAssignStudent(item)} sx={{ '& svg': { mr: 2 } }}>
                              <Icon icon='clarity:assign-user-solid' fontSize={20} />
                              Assign Student
                            </MenuItem>

                            <MenuItem onClick={() => setRoomToRemoveStudent(item)} sx={{ '& svg': { mr: 2 } }}>
                              <Icon icon='mingcute:user-remove-fill' fontSize={20} />
                              Remove Student
                            </MenuItem>
                          </Menu>
                        </>
                      </TableCell>
                    </TableRow>
                  )
                })}

                {RoomsList?.length === 0 && (
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

      {openModal && <ManageRooms open={openModal} toggle={OpenSubjectModal} roomToEdit={selectedRoom} />}
    <ViewRoom open={openViewModal} closeCanvas={toggleViewModal} Room={RoomToView} />
      <DeleteDialog open={deleteModal} handleClose={doCancelDelete} handleDelete={ondeleteClick} />
      <ManageTeacherInRoom
        open={openAssignStaffModal}
        toggle={toggleAssignStaffModal}
        room={roomToAssignToStaff}
        status={assignRoomToStaff}
      />
      <ManageStudentInRoom
        open={openAssignStudentModal}
        toggle={toggleAssignStudentModal}
        Room={roomToAssignToStudent}
        status={assignRoomToStudent}
      />
    </Fragment>
  )
}

export default RoomsTable
