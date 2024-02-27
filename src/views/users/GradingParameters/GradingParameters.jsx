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
import { deleteCategory, fetchCategories } from '../../../store/apps/categories/asyncthunk'
import { useGradingParameters } from '../../../hooks/useGradingParameters'
import { fetchGradingParameters } from '../../../store/apps/gradingParameters/asyncthunk'
import PageHeader from '../component/PageHeader'
import ManageGradingParameters from './ManageGradingParameters'
import { formatDate, formatDateToReadableFormat } from '../../../@core/utils/format'



const GradingParametersTable = () => {
  const dispatch = useAppDispatch()


//   const [GradingParametersList, loading, paging] = useCategories()

  const [GradingParametersList, loading, paging] = useGradingParameters()
  const [deleteModal, setDeleteModal] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [categoryToDelete, setCategoryToDelete] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [selectedParameter, setSelectedParameter] = useState(null)
  const [type, setType] = useState('')

  const OpenParameterModal = () => {
    if (openModal) {
      setOpenModal(false)
      setSelectedParameter(null)
    } else {
      setOpenModal(true)
    }
  }

  const setActiveCategory = (value) => {
    OpenParameterModal()
    setSelectedParameter(value)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const doDelete = (category) => {
    setDeleteModal(true)
    setCategoryToDelete(category.id)
  }

  const doCancelDelete = () => {
    setDeleteModal(false)
    setCategoryToDelete(null)
  }

  const ondeleteClick = () => {
    deleteCategory(categoryToDelete).then((res)=>{
      if(res.data.success){
        dispatch(fetchCategories({ page: 1, limit: 10, type: '' }))
      }
    })
    doCancelDelete()
  }

  useEffect(() => {
    dispatch(fetchGradingParameters({ page: page + 1, limit: 10 }))

     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage])

  return (
    <Fragment>


<PageHeader toggle={OpenParameterModal} action={'Add Grading Parameter'} />

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
                Percentage
              </TableCell>
              {/* <TableCell align='center' sx={{ minWidth: 100 }}>
                Created By
              </TableCell> */}
              <TableCell align='center' sx={{ minWidth: 100 }}>
                Date Created
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
                {GradingParametersList?.map((item, i) => (
                  <TableRow hover role='checkbox' key={item.id}>
                    <TableCell align='left'>{i + 1}</TableCell>
                    <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                      {item?.name || '--'}
                    </TableCell>
                    <TableCell align='center' sx={{ textTransform: 'capitalize' }}>
                      {item?.percentage || '--'}
                    </TableCell>
                    {/* <TableCell align='center'>{item?.createdBy || '--'}</TableCell> */}
                    <TableCell align='center'>
                      {/* {item.status ? ( */}
                      {formatDate(item?.createdAt)}

                        {/* <CustomChip
                          rounded
                          skin='light'
                          size='small'
                          label='Active'
                          color='success'
                          sx={{ textTransform: 'capitalize' }}
                        /> */}
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
                ))}

                {GradingParametersList?.length === 0 && (
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

        {openModal && <ManageGradingParameters open={openModal} toggle={OpenParameterModal} parameterToEdit={selectedParameter} />}
      <DeleteDialog open={deleteModal} handleClose={doCancelDelete} handleDelete={ondeleteClick} />
    </Fragment>
  )
}

export default GradingParametersTable