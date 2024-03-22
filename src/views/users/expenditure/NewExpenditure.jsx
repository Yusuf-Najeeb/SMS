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
import { Card, CardContent, CardHeader, Grid, IconButton, Menu, MenuItem } from '@mui/material'

import Icon from 'src/@core/components/icon'
import NoData from 'src/@core/components/emptydata/NoData'
import { styled } from '@mui/material/styles'
import CreateExpenditure from './CreateExpenditure'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import CustomSpinner from 'src/@core/components/custom-spinner'
import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomChip from 'src/@core/components/mui/chip'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import PageHeaderWithSearch from '../component/PageHeaderWithSearch'
import { useExpenditure } from '../../../hooks/useExpenditure'
import { deleteExpenditure, fetchExpenditure } from '../../../store/apps/expenditure/asyncthunk'

import EditExpenditure from './EditExpenditure'
import PayExpenditureBalance from './PayExpenditure'
import ViewExpenditure from './ViewExpenditure'

import DeleteDialog from '../../../@core/components/delete-dialog'
import { formatDate } from '../../../@core/utils/format'
import { useSession } from '../../../hooks/useSession'
import { fetchSession } from '../../../store/apps/session/asyncthunk'

const TableCellStyled = styled(TableCell)(({ theme }) => ({
  color: `${theme.palette.primary.main} !important`
}))

const ExpenditureTable = () => {
  // ** State
  const [page, setPage] = useState(0)
  const [key, setKey] = useState('')
  const [year, setYear] = useState('')
  const [term, setTerm] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [showModal, setShowModal] = useState(false)
  const [refetch, setFetch] = useState(false)
  const [openEditDrawer, setEditDrawer] = useState(false)
  const [openDeleteModal, setDeleteModal] = useState(false)
  const [openPayModal, setOpenPayModal] = useState(false)
  const [expenditureToUpdate, setExpenditureToUpdate] = useState(null)
  const [expenditureToPay, setExpenditureToPay] = useState(null)
  const [expenditureInView, setExpenditureInView] = useState(null)
  const [expenditureToDelete, setExpenditureToDelete] = useState(null)
  const [openViewModal, setOpenViewModal] = useState(false)
  const [filteredData, setFilteredData] = useState([])
  
  // ** Hooks
  const dispatch = useAppDispatch()
  const [SessionData] = useSession()
  const [ExpenditureData, loading, paging] = useExpenditure()
  const [anchorEl, setAnchorEl] = useState(Array(ExpenditureData?.length)?.fill(null))

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const handleChangeSession = e => {
    setYear(e.target.value)
  }

  const toggleViewModal = () => {
    setOpenViewModal(!openViewModal)
  }

  const setExpenditureToView = value => {
    setOpenViewModal(true)
    setExpenditureInView(value)
    handleRowOptionsClose(ExpenditureData?.indexOf(value))
  }

  const updateFetch = () => setFetch(!refetch)
  const closeEditModal = () => setEditDrawer(!openEditDrawer)

  const setPayExpenditure = value => {
    setExpenditureToPay(value)
    setOpenPayModal(true)
  }

  const togglePayModal = () => setOpenPayModal(!openPayModal)

  const setExpenditureToEdit = value => {
    handleRowOptionsClose(ExpenditureData?.indexOf(value))

    setEditDrawer(true)
    setExpenditureToUpdate(value)
  }

  // const closeModal = () => setEditDrawer(!openEditDrawer)

  //  functions from classes
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const closeViewModal = () => {
    setViewDrawer(!openViewDrawer)
    setClassInView(null)
  }

  const doDelete = value => {
    handleRowOptionsClose(ExpenditureData?.indexOf(value))
    setDeleteModal(true)
    setExpenditureToDelete(value.id)
  }

  const doCancelDelete = () => {
    setDeleteModal(false)
    setExpenditureToDelete(null)
  }

  const ondeleteClick = () => {
    deleteExpenditure(expenditureToDelete).then(res => {
      if (res?.data) {
        dispatch(fetchExpenditure({ page: page == 0 ? page + 1 : page, limit: 10, key: '' }))
      }
    })
    doCancelDelete()
  }

  useEffect(()=>{
    if(SessionData?.length > 0){
      const filteredSession = SessionData.reduce((acc, curr) => {
        const existingItem = acc.find(item => item.name === curr.name);
    
        if (!existingItem) {
            acc.push(curr);
        }
    
        return acc;

    }, []);

    setFilteredData(filteredSession)
    }

  },[SessionData])

  useEffect(() => {
    dispatch(fetchExpenditure({ page: page + 1, limit: 10, key, year, term }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, key, refetch, year])

  useEffect(() => {
    dispatch(fetchSession({ page: 1, limit: 300 }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>

<Card>
        <CardHeader title='Filter' />
        <CardContent>
          <Grid container spacing={12}>
           

            <Grid item xs={12} sm={3}>
              <CustomTextField
                select
                fullWidth
                label='Year'
                SelectProps={{ value: year, onChange: e => handleChangeSession(e) }}
              >
                <MenuItem value=''>{year ? 'Show All' :'Select Year'}</MenuItem>
                {filteredData?.map(item => (
                  <MenuItem key={item?.id} value={item?.name} sx={{ textTransform: 'uppercase' }}>
                    {`${item.name}`}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            
          </Grid>
        </CardContent>
      </Card>

      <PageHeaderWithSearch
        searchPlaceholder={'Search Expenditure'}
        action='Create Expenditure'
        toggle={toggleModal}
        handleFilter={setKey}
      />

      <Fragment>
        <TableContainer component={Paper} sx={{ maxHeight: 840 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                <TableCell align='left' sx={{ minWidth: 100 }}>
                  S/N
                </TableCell>
                <TableCell align='center' sx={{ minWidth: 180 }}>
                  Amount
                </TableCell>
                <TableCell align='center' sx={{ minWidth: 180 }}>
                  Amount Paid
                </TableCell>
                <TableCell align='center' sx={{ minWidth: 180 }}>
                  Category
                </TableCell>
                <TableCell align='center' sx={{ minWidth: 180 }}>
                  Year
                </TableCell>
                <TableCell align='center' sx={{ minWidth: 140 }}>
                  Payment Date
                </TableCell>
                <TableCell align='center' sx={{ minWidth: 140 }}>
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
                  {ExpenditureData?.map((item, i) => {
                    return (
                      <TableRow hover role='checkbox' key={item.id}>
                        <TableCell align='left' sx={{ textTransform: 'uppercase' }}>
                          {i + 1}
                        </TableCell>
                        <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                          {`₦${item?.amount || '--'}`}
                        </TableCell>
                        <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                          {item.amount == item.amountPaid ? (
                            <CustomChip
                              rounded
                              skin='light'
                              size='small'
                              label={`₦${item?.amountPaid || '--'}`}
                              color='success'
                              sx={{ textTransform: 'uppercase' }}
                            />
                          ) : (
                            <CustomChip
                              rounded
                              skin='light'
                              size='small'
                              label={`₦${item?.amountPaid || '--'}`}
                              color='error'
                              sx={{ textTransform: 'uppercase' }}
                            />
                          )}
                        </TableCell>
                        <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                          {item?.category?.name || '--'}
                        </TableCell>
                        <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                          {item?.year || '--'}
                        </TableCell>
                        <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                          {`${formatDate(item?.createdAt)}` || '--'}
                        </TableCell>
                        <TableCell align='left' sx={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
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
                              <MenuItem
                                onClick={() => {
                                  setExpenditureToEdit(item)
                                }}
                                sx={{ '& svg': { mr: 2 } }}
                              >
                                <Icon icon='tabler:edit' fontSize={20} />
                                Edit Amount
                              </MenuItem>

                              <MenuItem onClick={() => setExpenditureToView(item)} sx={{ '& svg': { mr: 2 } }}>
                                <Icon icon='tabler:eye' fontSize={20} />
                                View Expenditure
                              </MenuItem>

                              <MenuItem onClick={() => doDelete(item)} sx={{ '& svg': { mr: 2 } }}>
                                <Icon icon='tabler:trash' fontSize={20} />
                                Delete Expenditure
                              </MenuItem>
                              {item.amount !== item.amountPaid ? (
                                <MenuItem onClick={() => setPayExpenditure(item)} sx={{ '& svg': { mr: 2 } }}>
                                  <Icon icon='ph:hand-coins-light' fontSize={20} />
                                  Pay Outstanding
                                </MenuItem>
                              ) : null}
                            
                            </Menu>
                          </>
                        </TableCell>
                      </TableRow>
                    )
                  })}

                  {ExpenditureData?.length === 0 && (
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
          rowsPerPageOptions={[10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <CreateExpenditure open={showModal} closeModal={toggleModal} fetchData={updateFetch} />

        <EditExpenditure
          open={openEditDrawer}
          closeModal={closeEditModal}
          fetchData={updateFetch}
          selectedExpenditure={expenditureToUpdate}
        />
        <PayExpenditureBalance
          expenditure={expenditureToPay}
          open={openPayModal}
          togglePayModal={togglePayModal}
          fetchData={updateFetch}
        />

        {openViewModal && (
          <ViewExpenditure open={openViewModal} closeCanvas={toggleViewModal} expenditure={expenditureInView} />
        )}

        <DeleteDialog open={openDeleteModal} handleClose={doCancelDelete} handleDelete={ondeleteClick} />
      </Fragment>
    </>
  )
}

export default ExpenditureTable
