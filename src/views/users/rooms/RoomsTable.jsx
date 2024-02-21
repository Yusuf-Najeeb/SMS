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
import { IconButton } from '@mui/material'
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



const RoomsTable = () => {
  const dispatch = useAppDispatch()


  const [CategoriesData] = useCategories()
  const [RoomsList, loading, paging] = useRooms()
  const [deleteModal, setDeleteModal] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [RoomToDelete, setRoomToDelete] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [type, setType] = useState('')
  const [key, setKey] = useState('')

  const OpenSubjectModal = () => {
    if (openModal) {
      setOpenModal(false)
      setSelectedRoom(null)
    } else {
      setOpenModal(true)
    }
  }

  const setActiveCategory = (value) => {
    OpenSubjectModal()
    setSelectedRoom(value)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const doDelete = (room) => {
    setDeleteModal(true)
    setRoomToDelete(room.id)
  }

  const doCancelDelete = () => {
    setDeleteModal(false)
    setRoomToDelete(null)
  }

  const ondeleteClick = () => {
    deleteRoom(RoomToDelete).then((res)=>{
      if(res.data.success){
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
    dispatch(fetchRooms({ page: page + 1, limit: 10, key  }))

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
                Category
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

              // </Box>
              <Fragment>
                {RoomsList?.map((item, i) => {
                 const roomCategory = CategoriesData.find((category)=> item.categoryId == category.id)

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
                      <IconButton size='small' onClick={() => setActiveCategory(item)}>
                        <Icon icon='tabler:edit' />
                      </IconButton>

                      <IconButton size='small' onClick={() => doDelete(item)}>
                        <Icon icon='tabler:trash' />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )}
                
                )}

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
      <DeleteDialog open={deleteModal} handleClose={doCancelDelete} handleDelete={ondeleteClick} />
    </Fragment>
  )
}

export default RoomsTable
