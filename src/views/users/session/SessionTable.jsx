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
import { IconButton, Tooltip } from '@mui/material'
import CustomChip from 'src/@core/components/mui/chip'
import DeleteDialog from 'src/@core/components/delete-dialog'
import Icon from 'src/@core/components/icon'
import NoData from 'src/@core/components/emptydata/NoData'

import CustomSpinner from 'src/@core/components/custom-spinner'
import PageHeader from '../component/PageHeader'
import { useSession } from '../../../hooks/useSession'
import { deleteSession, fetchSession, makeCurrentSession } from '../../../store/apps/session/asyncthunk'
import ManageSession from './ManageSession'
import MakeCurrentSessionDialog from './MakeCurrentSession'
import EditSession from './EditSession'
import { formatDate } from '../../../@core/utils/format'



const SessionTable = () => {
  const dispatch = useAppDispatch()

  const [SessionData, loading, paging] = useSession()
  const [deleteModal, setDeleteModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [currentSessionModal, setCurrentSessionModal] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [SessionToDelete, setSessionToDelete] = useState(null)
  const [SessionToMakeCurrent, setSessionToMakeCurrent] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [selectedSession, setSelectedSession] = useState(null)
  const [sessionToEdit, setSessionToEdit] = useState(null)

  console.log(SessionData, 'session data')


  const OpenSessionModal = () => {
    if (openModal) {
      setOpenModal(false)
      setSelectedSession(null)
    } else {
      setOpenModal(true)
    }
  }

  const setActiveSession = (value) => {
    setEditModal(true)
    setSessionToEdit(value)
  }

  const closeEditModal = ()=>{
    setEditModal(false)
    setSessionToEdit(null)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const doDelete = (category) => {
    handleRowOptionsClose()
    setDeleteModal(true)
    setSessionToDelete(category.id)
  }


  const doCancelDelete = () => {
    setDeleteModal(false)
    setSessionToDelete(null)
  }

  const ondeleteClick = () => {
    deleteSession(SessionToDelete).then((res)=>{
      if(res?.data.success){
        dispatch(fetchSession({ page: page + 1, limit: 10 }))
      }
    })
    doCancelDelete()
  }

  const toggleCurrentSessionModal = (session) => {
    handleRowOptionsClose()
    setCurrentSessionModal(true)
    setSessionToMakeCurrent(session?.id)
  }

  const doCancelMakeSession = () => {
    setCurrentSessionModal(false)
    setSessionToMakeCurrent(null)
  }

  const onConfirmation = () => {
    makeCurrentSession(SessionToMakeCurrent).then((res)=>{
      if(res?.data.success){
        dispatch(fetchSession({ page: 1, limit: 10 }))
      }
    })
    doCancelMakeSession()
  }

  useEffect(() => {
    dispatch(fetchSession({ page: page + 1, limit: 10 }))

     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage,])

  return (
    <Fragment>


<PageHeader toggle={OpenSessionModal} action={'Add Session'} />

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
                Term
              </TableCell>
              <TableCell align='center' sx={{ minWidth: 150 }}>
                Start Date
              </TableCell>
              <TableCell align='center' sx={{ minWidth: 150 }}>
                End Date
              </TableCell>
              <TableCell align='center' sx={{ minWidth: 100 }}>
                Current 
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
                {SessionData?.map((item, i) => (
                  <TableRow hover role='checkbox' key={item.id}>
                    <TableCell align='left'>{i + 1}</TableCell>
                    <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                      {item?.name || '--'}
                    </TableCell>
                    <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                      {item?.term || '--'}
                    </TableCell>
                    <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                      {formatDate(item?.startDate) || '--'}
                    </TableCell>
                    <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                      {formatDate(item?.endDate) || '--'}
                    </TableCell>
                    <TableCell align='center'>
                      {item.isCurrent ? 

                         <CustomChip
                          rounded
                          skin='light'
                          size='small'
                          label='True'
                          color='success'
                          sx={{ textTransform: 'capitalize' }}
                        /> 
                      : 
                        <CustomChip
                          rounded
                          skin='light'
                          size='small'
                          label='False'
                          color='error'
                          sx={{ textTransform: 'capitalize' }}
                        />
                      }
                    </TableCell>
                    <TableCell align='center' sx={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>

                        <Tooltip title='Delete Session'>
                        <IconButton size='small' onClick={() => doDelete(item)}>
                          <Icon icon='tabler:trash' />
                        </IconButton>
                        </Tooltip>

                        <Tooltip title='Make Current Session'>
                        <IconButton size='small' onClick={() => toggleCurrentSessionModal(item)}>
                          <Icon icon='material-symbols:assignment-turned-in-sharp' />
                        </IconButton>
                        </Tooltip>

                        <Tooltip title='Edit Session Dates'>
                        <IconButton size='small' onClick={() => setActiveSession(item)}>
                          <Icon icon='tabler:edit' />
                        </IconButton>
                        </Tooltip>

                     
                    </TableCell>
                  </TableRow>
                ))}

                {SessionData?.length === 0 && (
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

        {openModal && <ManageSession open={openModal} toggle={OpenSessionModal} sessionToEdit={selectedSession} />}
        {editModal && <EditSession open={editModal} toggle={closeEditModal} sessionToEdit={sessionToEdit} />}
      <DeleteDialog open={deleteModal} handleClose={doCancelDelete} handleDelete={ondeleteClick} />
      <MakeCurrentSessionDialog open={currentSessionModal} handleClose={doCancelMakeSession} handleConfirm={onConfirmation} />
    </Fragment>
  )
}

export default SessionTable
