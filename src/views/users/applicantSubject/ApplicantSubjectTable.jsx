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
import { deleteSubject, fetchSubjects } from '../../../store/apps/subjects/asyncthunk'
import PageHeader from '../component/PageHeader'
import { fetchApplicantsSubjects } from '../../../store/apps/applicantsSubjects/asyncthunk'
import { useApplicantsSubjects } from '../../../hooks/useApplicantsSubjects'
import { useSubjects } from '../../../hooks/useSubjects'
import ManageApplicantsSubjects from './ManageApplicantSubject'
import ManageApplicant from './ManageApplicant'

const ApplicantsSubjectsTable = () => {
  const dispatch = useAppDispatch()

  const [SubjectsList] = useSubjects()
  const [ApplicantsSubjectsData, loading] = useApplicantsSubjects()
  const [deleteModal, setDeleteModal] = useState(false)
  const [subjectToDelete, setSubjectToDelete] = useState(null)
  const [openAssignSubjectModal, setAssignSubjectModal] = useState(false)
  const [assignSubject, setAssignSubject] = useState(false)
  const [subjectToAssign, setSubjectToAssign] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [refetch, setFetch] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [anchorEl, setAnchorEl] = useState(Array(ApplicantsSubjectsData?.length)?.fill(null))

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

  const OpenSubjectModal = () => {
    if (openModal) {
      setOpenModal(false)
      setSelectedSubject(null)
    } else {
      setOpenModal(true)
    }
  }

  const updateFetch = ()=> {
    setFetch(!refetch)
  }


  const setActiveSubject = value => {
    handleRowOptionsClose(ApplicantsSubjectsData?.indexOf(value))
    OpenSubjectModal()
    setSelectedSubject(value)
  }

  const toggleAssignModal = () => {
    if (openAssignSubjectModal) {
      setAssignSubjectModal(false)
      setSubjectToAssign(null)
    } else {
      setAssignSubjectModal(true)
    }
  }

  const setSubjectToAssignApplicant = value => {
    setAssignSubject(true)
    toggleAssignModal()

    handleRowOptionsClose(ApplicantsSubjectsData?.indexOf(value))
    setSubjectToAssign(value)
  }

  const setSubjectToRemoveApplicant = value => {
    setAssignSubject(false)
    toggleAssignModal()

    handleRowOptionsClose(ApplicantsSubjectsData?.indexOf(value))
    setSubjectToAssign(value)
  }


  const doDelete = value => {
    handleRowOptionsClose(ApplicantsSubjectsData?.indexOf(value))
    setDeleteModal(true)
    setSubjectToDelete(value.id)
  }

  const doCancelDelete = () => {
    setDeleteModal(false)
    setSubjectToDelete(null)
  }

  const ondeleteClick = () => {
    deleteSubject(subjectToDelete).then(res => {
      if (res?.data?.success) {
        dispatch(fetchApplicantsSubjects())
      }
    })
    doCancelDelete()
  }

  useEffect(() => {
    dispatch(fetchApplicantsSubjects())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch])

  useEffect(() => {
    dispatch(fetchSubjects({ page: 1, limit: 100, categoryId: '' }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Fragment>
      <PageHeader toggle={OpenSubjectModal} action={'Add Subject'} />

      <TableContainer component={Paper} sx={{ maxHeight: 840 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell align='left' sx={{ minWidth: 30, maxWidth: 30 }}>
                S/N
              </TableCell>
              <TableCell align='center' sx={{ minWidth: 150 }}>
                Name
              </TableCell>
              <TableCell align='center' sx={{ minWidth: 100 }}>
                Score
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
                {ApplicantsSubjectsData?.map((item, i) => {

                    const Subject = SubjectsList?.find((sub)=> sub.id == item?.subjectId)
                    
                   return (
                  <TableRow hover role='checkbox' key={item.id}>
                    <TableCell align='left'>{i + 1}</TableCell>
                    <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                      {Subject?.name || '--'}
                    </TableCell>
                    <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                      {item?.score}
                    </TableCell>

                   
                    <TableCell align='center'>
                      <CustomChip
                        rounded
                        skin='light'
                        size='small'
                        label='Active'
                        color='success'
                        sx={{ textTransform: 'capitalize' }}
                      />
                      
                    </TableCell>
                    <TableCell align='center' sx={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
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
                          <MenuItem onClick={() => setActiveSubject(item)} sx={{ '& svg': { mr: 2 } }}>
                            <Icon icon='tabler:edit' fontSize={20} />
                            Edit Subject
                          </MenuItem>
                          <MenuItem onClick={() => setSubjectToAssignApplicant(item)} sx={{ '& svg': { mr: 2 } }}>
                            <Icon icon='clarity:assign-user-solid' fontSize={20} />
                            Assign Applicant
                          </MenuItem>

                          {/* {item?.staffs?.length > 0 && ( */}

                            <MenuItem onClick={() => setSubjectToRemoveApplicant(item)} sx={{ '& svg': { mr: 2 } }}>
                              <Icon icon='mingcute:user-remove-fill' fontSize={20} />
                              Remove Applicant
                            </MenuItem>

                          {/* )} */}
                        </Menu>
                      </>
                    </TableCell>
                  </TableRow>
                )})}

                {ApplicantsSubjectsData?.length === 0 && (
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
     

      {openModal && <ManageApplicantsSubjects open={openModal} toggle={OpenSubjectModal} subjectToEdit={selectedSubject} updateData={updateFetch} />}

    

      {deleteModal && <DeleteDialog open={deleteModal} handleClose={doCancelDelete} handleDelete={ondeleteClick} />}

      {openAssignSubjectModal && (
        <ManageApplicant
          open={openAssignSubjectModal}
          toggle={toggleAssignModal}
          subject={subjectToAssign}
          status={assignSubject}
        />
      )}
     
    </Fragment>
  )
}

export default ApplicantsSubjectsTable
