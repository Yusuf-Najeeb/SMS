import React, { Fragment, useEffect, useState } from 'react'
import { useAppDispatch } from 'src/hooks'

import Paper from '@mui/material/Paper'
import {  Menu, MenuItem } from '@mui/material'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
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
import Stats from '../component/Stats'
import PageHeaderWithSearch from '../component/PageHeaderWithSearch'
import { useStudent } from '../../../hooks/useStudent'
import { deleteStudent, fetchStudents, updateStudent } from '../../../store/apps/Student/asyncthunk'
import { fetchClasses } from '../../../store/apps/classes/asyncthunk'
import AddStudent from './AddStudent'
import EditStudent from './EditStudent'
import ViewStudent from './ViewStudent'
import { useClasses } from '../../../hooks/useClassess'
import AssignGeneralCategory from './AssignGeneralCategory'
import AssignHostelCategory from './AssignHostelCategory'
import AssignSubject from './AssignSubject'
import AssignClass from './AssignClass'
import ManageStudentInRoom from './AssignStudentToRoom'

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

const StudentsTable = () => {
  const dispatch = useAppDispatch()

  const [StudentData, loading, paging] = useStudent()
  const [ClassesList] = useClasses()

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [showModal, setShowModal] = useState(false)
  const [openEditDrawer, setEditDrawer] = useState(false)
  const [openViewDrawer, setViewDrawer] = useState(false)
  const [openStudentCategoryDrawer, setStudentCategoryDrawer] = useState(false)
  const [openStudentSubjectDrawer, setStudentSubjectDrawer] = useState(false)
  const [openClassDrawer, setStudentClassDrawer] = useState(false)
  const [openHostelCategoryDrawer, setHostelCategoryDrawer] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState()
  const [studentToUpdate, setStudentToUpdate] = useState(null)
  const [studentInView, setStudentInView] = useState(null)
  const [studentToAssignCategory, setStudentToAssignCategory] = useState(null)
  const [studentToAssignClass, setStudentToAssignClass] = useState(null)
  const [studentToAssignSubject, setStudentToAssignSubject] = useState(null)
  const [studentToAssignHostelCategory, setStudentToAssignHostelCategory] = useState(null)
  const [refetch, setFetch] = useState(false)
  const [key, setKey] = useState('')
  const [anchorEl, setAnchorEl] = useState(Array(StudentData?.result?.length)?.fill(null))

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

  const toggleCategoryModal = () => {
    setStudentCategoryDrawer(!openStudentCategoryDrawer)
  }

  const toggleClassModal = () => {
    setStudentClassDrawer(!openClassDrawer)
  }

  const toggleHostelCategoryModal = () => {
    setHostelCategoryDrawer(!openHostelCategoryDrawer)
  }

  const toggleSubjectModal = () => {
    setStudentSubjectDrawer(!openStudentSubjectDrawer)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
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

    updateStudent(payload, value?.id).then(res => {
      if (res.data.success) {
        dispatch(fetchStudents({ page: 1, key: '' }))
      }
    })
  }

  const setStudentToEdit = value => {
    handleRowOptionsClose(StudentData?.result?.indexOf(value))
    setEditDrawer(!openEditDrawer)
    setStudentToUpdate(value)
  }

  const setStudentToView = value => {
    handleRowOptionsClose(StudentData?.result?.indexOf(value))
    setViewDrawer(!openViewDrawer)
    setStudentInView(value)
  }

  const setStudentToAssignCategories = value => {
    handleRowOptionsClose(StudentData?.result?.indexOf(value))
    toggleCategoryModal()
    setStudentToAssignCategory(value)
  }

  const setStudentToAssignSubjects = value => {
    handleRowOptionsClose(StudentData?.result?.indexOf(value))
    toggleSubjectModal()
    setStudentToAssignSubject(value)
  }

  const setStudentToAssignClassRoom = value => {
    handleRowOptionsClose(StudentData?.result?.indexOf(value))
    toggleClassModal()
    setStudentToAssignClass(value)
  }

  const setStudentToAssignHostelCategories = value => {
    handleRowOptionsClose(StudentData?.result?.indexOf(value))
    toggleHostelCategoryModal()
    setStudentToAssignHostelCategory(value)
  }

  const closeEditModal = () => {
    setEditDrawer(!openEditDrawer)
  }

  const closeViewModal = () => {
    setViewDrawer(!openViewDrawer)
  }

  const doDelete = value => {
    setDeleteModal(true)
    setSelectedStudent(value.id)
  }

  const doCancelDelete = () => {
    setDeleteModal(false)
    setSelectedStudent(null)
  }

  const ondeleteClick = async () => {
    deleteStudent(selectedStudent).then(res => {
      if (res.status) {
        dispatch(fetchStudents({ page: 1, key: '' }))
        doCancelDelete()
      }
    })
  }

  useEffect(() => {
    dispatch(fetchClasses({ page: 1, limit: 300, key: '' }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    dispatch(fetchStudents({ page: page + 1, key }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch, page, key])

  return (
    <>
      <Stats data={StudentData} statTitle='Students' />

      <PageHeaderWithSearch
        searchPlaceholder={'Search Student'}
        action='Add Student'
        toggle={toggleModal}
        handleFilter={setKey}
      />

      <Fragment>
        <TableContainer component={Paper} sx={{ maxHeight: 840 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                <TableCell align='left' sx={{ minWidth: 250 }}>
                  Student
                </TableCell>
                {/* <TableCell align='center' sx={{ minWidth: 150 }}>
                Religion
              </TableCell> */}
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
                  Student Type
                </TableCell>
                <TableCell align='left' sx={{ minWidth: 140 }}>
                  Status
                </TableCell>
                <TableCell align='left' sx={{ minWidth: 140 }}>
                  User ID
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
                  {StudentData?.result?.length &&
                    StudentData?.result.map((item, i) => {
                      const className = ClassesList?.find(c => c.id === item.classId)

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
                                {`${item?.firstName} ${item?.lastName}`}
                              </Typography>
                              <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
                                {item?.email || '--'}
                              </Typography>
                            </Box>
                          </TableCell>

                          <TableCell align='left' sx={{ textTransform: 'uppercase', fontSize: '13px' }}>
                            {`${className?.name} ${className?.type}` || '--'}
                          </TableCell>
                          <TableCell align='left' sx={{ textTransform: 'uppercase' }}>
                            {formatDate(item?.dateOfBirth) || '--'}
                          </TableCell>
                          <TableCell align='left' sx={{ textTransform: 'uppercase' }}>
                            {item?.gender || '--'}
                          </TableCell>

                          <TableCell align='left' sx={{ textTransform: 'uppercase' }}>
                            {item?.boarder ?  'Boarding': 'Day'}
                          </TableCell>

                          <TableCell align='left' sx={{ textTransform: 'uppercase' }}>
                            {item.status ? (
                              <CustomChip
                                rounded
                                skin='light'
                                size='small'
                                label={'Active'}
                                color='success'
                                sx={{ textTransform: 'capitalize' }}
                              />
                            ) : (
                              <CustomChip
                                rounded
                                skin='light'
                                size='small'
                                label={'Inactive'}
                                color='error'
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

                            <FormGroup row sx={{ transform: 'translateX(-4%)' }}>
                              <FormControlLabel
                                value='start'
                                label=''
                                labelPlacement='start'
                                control={<Switch checked={item.status} onChange={() => handleToggle(item)} />}
                              />
                            </FormGroup>

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
                          <MenuItem onClick={() => setStudentToEdit(item)} sx={{ '& svg': { mr: 2 } }}>
                            <Icon icon='tabler:edit' fontSize={20} />
                            Edit Student
                          </MenuItem>
                          <MenuItem onClick={() => setStudentToView(item)} sx={{ '& svg': { mr: 2 } }}>
                            <Icon icon='tabler:eye' fontSize={20} />
                            View Student
                          </MenuItem>
                          {/* <MenuItem onClick={() => setStudentToAssignCategories(item)} sx={{ '& svg': { mr: 2 } }}>
                            <Icon icon='clarity:assign-user-solid' fontSize={20} />
                            Assign Category
                          </MenuItem> */}
                           <MenuItem onClick={() => setStudentToAssignClassRoom(item)} sx={{ '& svg': { mr: 2 } }}>
                            <Icon icon='fluent:stack-add-20-filled' fontSize={20} />
                            Change Class
                          </MenuItem>
                          <MenuItem onClick={() => setStudentToAssignSubjects(item)} sx={{ '& svg': { mr: 2 } }}>
                            <Icon icon='fluent:stack-add-20-filled' fontSize={20} />
                            Assign Subject
                          </MenuItem>
                          {item.boarder && <MenuItem onClick={() => setStudentToAssignHostelCategories(item)} sx={{ '& svg': { mr: 2 } }}>
                            <Icon icon='clarity:assign-user-solid' fontSize={20} />
                            Assign Hostel Room
                          </MenuItem>}
                            
                          </Menu>
                          </>
                          </TableCell>
                        </TableRow>
                      )
                    })}

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
          rowsPerPageOptions={[5, 10]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        <AddStudent open={showModal} closeModal={toggleModal} refetchData={updateFetch} />
        <EditStudent
          open={openEditDrawer}
          selectedStudent={studentToUpdate}
          fetchData={updateFetch}
          closeModal={closeEditModal}
        />
        <ViewStudent open={openViewDrawer} closeCanvas={closeViewModal} student={studentInView} />
        <DeleteDialog open={deleteModal} handleClose={doCancelDelete} handleDelete={ondeleteClick} />
        {studentToAssignCategory &&  <AssignGeneralCategory open={openStudentCategoryDrawer} toggle={toggleCategoryModal} Student={studentToAssignCategory} page={page}/> }
        {studentToAssignClass &&  <AssignClass open={openClassDrawer} toggle={toggleClassModal} Student={studentToAssignClass} page={page}/> }
        {studentToAssignHostelCategory && <ManageStudentInRoom open={openHostelCategoryDrawer} toggle={toggleHostelCategoryModal} Student={studentToAssignHostelCategory} page={page}/> }
        {studentToAssignSubject && <AssignSubject open={openStudentSubjectDrawer} toggle={toggleSubjectModal} Student={studentToAssignSubject} page={page}  />}
      </Fragment>
    </>
  )
}

export default StudentsTable
