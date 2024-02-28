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
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import CustomChip from 'src/@core/components/mui/chip'
import DeleteDialog from 'src/@core/components/delete-dialog'
import Icon from 'src/@core/components/icon'
import NoData from 'src/@core/components/emptydata/NoData'

import CustomSpinner from 'src/@core/components/custom-spinner'
import { useSubjects } from '../../../hooks/useSubjects'
import { deleteSubject, fetchSubjects } from '../../../store/apps/subjects/asyncthunk'
import ManageSubjects from './ManageSubjects'
import PageHeader from '../component/PageHeader'
import AssignSubjectTeacher from './ManageSubjectTeacher'
import ManageSubjectTeacher from './ManageSubjectTeacher'
import ManageGradingParameter from './ManageGradingParameter'

const SubjectsTable = () => {
  const dispatch = useAppDispatch()

  const [SubjectsList, loading, paging] = useSubjects()
  const [deleteModal, setDeleteModal] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [subjectToDelete, setSubjectToDelete] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [openParameterModal, setOpenParameterModal] = useState(false)
  const [openAssignSubjectModal, setAssignSubjectModal] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [type, setType] = useState('')
  const [subjectToAssign, setSubjectToAssign] = useState(null)
  const [subjectToAssignParameter, setSubjectToAssignParameter] = useState(null)
  const [assignSubject, setAssignSubject] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const OpenSubjectModal = () => {
    if (openModal) {
      setOpenModal(false)
      setSelectedSubject(null)
    } else {
      setOpenModal(true)
    }
  }

  const toggleAssignModal = () => {
    if (openAssignSubjectModal) {
      setAssignSubjectModal(false)
      setSubjectToAssign(null)
    } else {
      setAssignSubjectModal(true)
    }
  }

  const toggleParameterModal = ()=>{
    setOpenParameterModal(!openParameterModal)
  }

  const setSubjectToAssignTeacher = value => {
    setAssignSubject(true)
    toggleAssignModal()
    
    // handleRowOptionsClose()
    setSubjectToAssign(value)
  }

  const setSubjectToRemoveTeacher = value => {
    setAssignSubject(false)
    toggleAssignModal()

    // handleRowOptionsClose()
    setSubjectToAssign(value)
  }

  const setActiveSubject = value => {
    // handleRowOptionsClose()
    OpenSubjectModal()
    setSelectedSubject(value)
  }

  const setSubjectToAssignGradingParameter = value => {
    // handleRowOptionsClose()
    toggleParameterModal()
    setSubjectToAssignParameter(value)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const doDelete = category => {
    handleRowOptionsClose()
    setDeleteModal(true)
    setSubjectToDelete(category.id)
  }

  const doCancelDelete = () => {
    setDeleteModal(false)
    setSubjectToDelete(null)
  }

  const ondeleteClick = () => {
    deleteSubject(subjectToDelete).then(res => {
      if (res.data.success) {
        dispatch(fetchSubjects({ page: 1, limit: 10, categoryId: '' }))
      }
    })
    doCancelDelete()
  }

  useEffect(() => {
    dispatch(fetchSubjects({ page: page + 1, limit: 10, categoryId: '' }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, type])

  return (
    <Fragment>
      <PageHeader toggle={OpenSubjectModal} action={'Add Subject'} />

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
                Category
              </TableCell>
              {/* <TableCell align='center' sx={{ minWidth: 100 }}>
                Created By
              </TableCell> */}
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
                {SubjectsList?.map((item, i) => (
                  <TableRow hover role='checkbox' key={item.id}>
                    <TableCell align='left'>{i + 1}</TableCell>
                    <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                      {item?.name || '--'}
                    </TableCell>
                    <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                      {item?.category.name || '--'}
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
                      

                    <Tooltip title='Edit Subject'>
                        <IconButton size='small' onClick={() => setActiveSubject(item)}>
                          <Icon icon='tabler:edit' />
                        </IconButton>
                        </Tooltip>

                        <Tooltip title='Delete Subject'>
                        <IconButton size='small' onClick={() => doDelete(item)}>
                          <Icon icon='tabler:trash' />
                        </IconButton>
                        </Tooltip>

                        <Tooltip title='Assign Subject To Teacher'>
                        <IconButton size='small' onClick={() => setSubjectToAssignTeacher(item)}>
                          <Icon icon='fluent:stack-add-20-filled' />
                        </IconButton>
                        </Tooltip>

                        {item?.staffs?.length > 0 && 
                        <Tooltip title='Remove Subject From Teacher'>
                        <IconButton size='small' onClick={() => setSubjectToRemoveTeacher(item)}>
                          <Icon icon='mingcute:user-remove-fill' />
                        </IconButton>
                        </Tooltip>
                        }

                        <Tooltip title='Assign Grading Parameter to Subject '>
                        <IconButton size='small' onClick={() => setSubjectToAssignGradingParameter(item)}>
                          <Icon icon='solar:notification-lines-remove-bold' />
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
                         
                          <MenuItem onClick={() => setActiveSubject(item)} sx={{ '& svg': { mr: 2 } }}>
                            <Icon icon='tabler:edit' fontSize={20} />
                            Edit Subject
                          </MenuItem>
                          <MenuItem onClick={() => doDelete(item)} sx={{ '& svg': { mr: 2 } }}>
                            <Icon icon='tabler:trash' fontSize={20} />
                            Delete Subject
                          </MenuItem>
                          <MenuItem onClick={() => setSubjectToAssignTeacher(item)} sx={{ '& svg': { mr: 2 } }}>
                            <Icon icon='clarity:assign-user-solid' fontSize={20} />
                            Assign Teacher
                          </MenuItem>
                            <MenuItem onClick={() => setSubjectToRemoveTeacher(item)} sx={{ '& svg': { mr: 2 } } }>
                              <Icon icon='mingcute:user-remove-fill' fontSize={20} />
                              Remove Teacher
                            </MenuItem>
                          <MenuItem onClick={() => setSubjectToAssignGradingParameter(item)} sx={{ '& svg': { mr: 2 } } }>
                              <Icon icon='clarity:assign-user-solid' fontSize={20} />
                              Assign Parameter
                            </MenuItem>
                        </Menu>
                      </> */}
                    </TableCell>
                  </TableRow>
                ))}

                {SubjectsList?.length === 0 && (
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

      {openModal && <ManageSubjects open={openModal} toggle={OpenSubjectModal} subjectToEdit={selectedSubject} />}

      {openAssignSubjectModal && 
      <ManageSubjectTeacher
        open={openAssignSubjectModal}
        toggle={toggleAssignModal}
        subject={subjectToAssign}
        status={assignSubject}
      /> }

      <DeleteDialog open={deleteModal} handleClose={doCancelDelete} handleDelete={ondeleteClick} />
      <ManageGradingParameter open={openParameterModal} toggle={toggleParameterModal}  subject={subjectToAssignParameter} />
    </Fragment>
  )
}

export default SubjectsTable
