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
import { Button, Card, CardContent, CardHeader, Grid, IconButton, MenuItem } from '@mui/material'
import DeleteDialog from 'src/@core/components/delete-dialog'
import Icon from 'src/@core/components/icon'
import NoData from 'src/@core/components/emptydata/NoData'
import CustomTextField from 'src/@core/components/mui/text-field'

import CustomSpinner from 'src/@core/components/custom-spinner'
import { useGradingParameters } from '../../../hooks/useGradingParameters'
import { deleteGradingParameter, fetchGradeParameters, fetchGradingParameters } from '../../../store/apps/gradingParameters/asyncthunk'
import PageHeader from '../component/PageHeader'
import ManageGradingParameters from './ManageGradingParameters'
import { formatDate } from '../../../@core/utils/format'
import GetUserData from '../../../@core/utils/getUserData'
import { fetchCategories } from '../../../store/apps/categories/asyncthunk'
import { useCategories } from '../../../hooks/useCategories'



const GradingParametersTable = () => {

  const userData = GetUserData()
    
  const dispatch = useAppDispatch()
  const [CategoriesData] = useCategories()

  // const [GradingParametersList] = useGradingParameters()


  const [GradingParametersList, setGradingParametersList] = useState([])
  const [classCategoryId, setClassCategoryId] = useState('')
  const [deleteModal, setDeleteModal] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [ParameterToDelete, setParameterToDelete] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [selectedParameter, setSelectedParameter] = useState(null)
  const [loading, setLoading] = useState(false)
  const [paging, setPaging] = useState({ currentPage: 1, totalItems: 0, itemsPerPage: 0, totalPages: 0 })

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

  const handleChangeClassCategory = e => {
    Number(setClassCategoryId(e.target.value))
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
    setParameterToDelete(category.id)
  }

  const doCancelDelete = () => {
    setDeleteModal(false)
    setParameterToDelete(null)
  }

  const ondeleteClick = () => {
    deleteGradingParameter(ParameterToDelete).then((res)=>{
      if(res.data.success){
        fetchGradeParameters({ page: 1, limit: 10 , classCategoryId})
      }
    })
    doCancelDelete()
  }

  const fetchParameters = async () => {
    setLoading(true)

    const res = await fetchGradeParameters({ page: 1, limit: 10 , classCategoryId})


    if (res?.data?.data?.length > 0) {
      const { currentPage, totalItems, itemsPerPage, totalPages } = res?.data.paging

      setGradingParametersList([...res?.data.data])
      setPaging({ currentPage, totalItems, itemsPerPage, totalPages })
      setLoading(false)
    } else {
      setLoading(false)

      setGradingParametersList([])
      setPaging({ currentPage: 1, totalItems: 0, itemsPerPage: 0, totalPages: 0 })
    }
  }

  useEffect(() => {
    dispatch(fetchCategories({ page: 1, limit: 300, type: 'class' }))

     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage])

  return (
    <Fragment>

<Card>
        <CardHeader title='Filter' />
        <CardContent>
          <Grid container spacing={12}>
          <Grid item xs={12} sm={3}>
              <CustomTextField
                select
                fullWidth
                label='Class Category*'
                SelectProps={{ value: classCategoryId, onChange: e => handleChangeClassCategory(e) }}
              >
                <MenuItem>Select Class Category</MenuItem>
                {CategoriesData?.map(item => (
                  <MenuItem key={item?.id} value={item?.id} sx={{textTransform: 'uppercase'}}>
                    {`${item?.name}`}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>

            <Grid item xs={12} sm={6} md={6} sx={{mt: 5}}>
            <Button onClick={fetchParameters} 
              disabled= {!classCategoryId}
            variant='contained'  sx={{ '& svg': { mr: 2 }, backgroundColor: 'success.light' }}>
          <Icon fontSize='1.125rem' icon='ic:baseline-cloud-download' />
          Fetch Grading Parameters
        </Button>
            </Grid>

            </Grid>
            </CardContent>
            </Card>


   {(userData?.role?.name == 'super-admin' || userData?.role?.name == 'admin') &&  <PageHeader toggle={OpenParameterModal} action={'Add Grading Parameter'} /> }

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
              {(userData?.role?.name == 'super-admin' || userData?.role?.name == 'admin') && 
              <TableCell align='center' sx={{ minWidth: 100 }}>
                Actions
              </TableCell>
                }
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

                    {(userData?.role?.name == 'super-admin' || userData?.role?.name == 'admin') && 
                    <TableCell align='center' sx={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                      <IconButton size='small' onClick={() => setActiveCategory(item)}>
                        <Icon icon='tabler:edit' />
                      </IconButton>

                      <IconButton size='small' onClick={() => doDelete(item)}>
                        <Icon icon='tabler:trash' />
                      </IconButton>
                    </TableCell>
                   }
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
