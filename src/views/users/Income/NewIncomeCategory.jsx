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
import { IconButton } from '@mui/material'
import DeleteDialog from 'src/@core/components/delete-dialog'
import Icon from 'src/@core/components/icon'
import NoData from 'src/@core/components/emptydata/NoData'

import CustomSpinner from 'src/@core/components/custom-spinner'

import { deleteCategory, fetchCategories } from '../../../store/apps/categories/asyncthunk'
import PageHeader from '../component/PageHeader'
import { useCategories } from '../../../hooks/useCategories'
import CreateCategory from '../component/CreateCategory'
import { formatDate } from '@fullcalendar/core'

const NewIncomeCategories = () => {
  const dispatch = useAppDispatch()

  const [CategoriesData, loading, paging] = useCategories()

  const [deleteModal, setDeleteModal] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [categoryToDelete, setCategoryToDelete] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [fetch, setFetch] = useState(false)

  const toggleCategoryModal = () => {
    setOpenModal(!openModal)
  
}

  // const setActiveCategory = value => {
  //   OpenCategoryModal()
  //   setSelectedCategory(value)
  // }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const doDelete = category => {
    setDeleteModal(true)
    setCategoryToDelete(category.id)
  }

  const doCancelDelete = () => {
    setDeleteModal(false)
    setCategoryToDelete(null)
  }

  const ondeleteClick = () => {
    deleteCategory(categoryToDelete).then(res => {
      if (res.data.success) {
        dispatch(fetchCategories({ page: page == 0 ? page + 1 : page, limit: 10, type: 'income' }))
      }
    })
    doCancelDelete()
  }

  const updateFetch = ()=> setFetch(!fetch)

  useEffect(() => {
    dispatch(fetchCategories({ page: page + 1, limit: 10, type: 'income' }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, fetch])

  return (
    <Fragment>
      <PageHeader action={'Add Category'} toggle={toggleCategoryModal} />

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
                Type
              </TableCell>
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
              <Fragment>
                {CategoriesData?.map((item, i) => (
                  <TableRow hover role='checkbox' key={item.id}>
                    <TableCell align='left'>{i + 1}</TableCell>
                    <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                      {item?.name || '--'}
                    </TableCell>
                    <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                      {item?.type || '--'}
                    </TableCell>
                    <TableCell align='center' sx={{ textTransform: 'capitalize' }}>
                    {`${formatDate(item?.createdAt)}` || '--'}
                    </TableCell>
                  
                    <TableCell align='center' sx={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                      {/* <IconButton size='small' onClick={() => setActiveCategory(item)}>
                        <Icon icon='tabler:edit' />
                      </IconButton> */}

                      <IconButton size='small' onClick={() => doDelete(item)}>
                        <Icon icon='tabler:trash' />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}

                {CategoriesData?.length === 0 && (
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

      {/* {openModal && <ManageCategories open={openModal} toggle={OpenCategoryModal} categoryToEdit={selectedCategory} />} */}
      <CreateCategory open={openModal} closeModal={toggleCategoryModal} fetchData={updateFetch} type={'income'} />
      <DeleteDialog open={deleteModal} handleClose={doCancelDelete} handleDelete={ondeleteClick} />
    </Fragment>
  )
}

export default NewIncomeCategories
