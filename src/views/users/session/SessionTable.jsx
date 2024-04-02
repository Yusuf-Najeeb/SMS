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
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
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



const SessionTable = () => {
  const dispatch = useAppDispatch()


//   const [GradingParametersList, loading, paging] = useCategories()

  const [SessionData, loading, paging] = useSession()
  const [deleteModal, setDeleteModal] = useState(false)
  const [currentSessionModal, setCurrentSessionModal] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [SessionToDelete, setSessionToDelete] = useState(null)
  const [SessionToMakeCurrent, setSessionToMakeCurrent] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [selectedSession, setSelectedSession] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const OpenSessionModal = () => {
    if (openModal) {
      setOpenModal(false)
      setSelectedSession(null)
    } else {
      setOpenModal(true)
    }
  }

  const setActiveSession = (value) => {
    handleRowOptionsClose()
    OpenSessionModal()
    setSelectedSession(value)
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
  }, [page, rowsPerPage])

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
              {/* <TableCell align='center' sx={{ minWidth: 100 }}>
                Created By
              </TableCell> */}
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

              // </Box>
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
                    {/* <TableCell align='center'>{item?.createdBy || '--'}</TableCell> */}
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

                      {/* <>
                        <IconButton size='small' onClick={handleRowOptionsClick}>
                          <Icon icon='tabler:dots-vertical' />
                        </IconButton>
                        <Menu
                          keepMounted
                          anchorEl={anchorEl}
                          open={rowOptionsOpen}
                          onClose={handleRowOptionsClose}
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
                            Delete Session
                          </MenuItem>
                          <MenuItem onClick={() => toggleCurrentSessionModal(item)} sx={{ '& svg': { mr: 2 } }}>
                            <Icon icon='fluent:stack-add-20-filled' fontSize={20} />
                            Make Current Session
                          </MenuItem>
                          
                        </Menu>
                      </> */}
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
      <DeleteDialog open={deleteModal} handleClose={doCancelDelete} handleDelete={ondeleteClick} />
      <MakeCurrentSessionDialog open={currentSessionModal} handleClose={doCancelMakeSession} handleConfirm={onConfirmation} />
    </Fragment>
  )
}

export default SessionTable
