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
import { usePaymentMethods } from 'src/hooks/usePaymentMethods'
import {  fetchPaymentMethods } from 'src/store/apps/settings/asyncthunk'
import {  deletePaymentMethod } from 'src/store/apps/settings/asyncthunk'

import CustomSpinner from 'src/@core/components/custom-spinner'



const PaymentMethodTable = ({ OpenPayment, DoSetSelectedPayment }) => {
  const dispatch = useAppDispatch()

  const [PaymentMethodsList, loading, paging] = usePaymentMethods()
  const [deleteModal, setDeleteModal] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [selectedMethod, setSelectedMethod] = useState(null)

  const setActivePaymentMethod = (value) => {
    OpenPayment()
    DoSetSelectedPayment(value)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  console.log(paging, 'paging')

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const doDelete = (method) => {
    setDeleteModal(true)
    setSelectedMethod(method.id)
  }

  const doCancelDelete = () => {
    setDeleteModal(false)
    setSelectedMethod(null)
  }

  const ondeleteClick = () => {
    deletePaymentMethod(selectedMethod).then((res)=>{
      if(res.data.success){
        dispatch(fetchPaymentMethods({ page: page + 1, limit: 10 }))
      }
    })
    doCancelDelete()
  }

  useEffect(() => {
    dispatch(fetchPaymentMethods({ page: page + 1, limit: 10 }))

     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage])

  return (
    <Fragment>
      <TableContainer component={Paper} sx={{ maxHeight: 840 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell align='left' sx={{ minWidth: 50, maxWidth: 50 }}>
                S/N
              </TableCell>
              <TableCell align='center' sx={{ minWidth: 100 }}>
                Payment
              </TableCell>
              <TableCell align='center' sx={{ minWidth: 100 }}>
                Type
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

              // </Box>
              <Fragment>
                {PaymentMethodsList?.length &&  PaymentMethodsList?.map((paymentItem, i) => (
                  <TableRow hover role='checkbox' key={paymentItem.id}>
                    <TableCell align='left'>{i + 1}</TableCell>
                    <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                      {paymentItem?.name || '--'}
                    </TableCell>
                    <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                      {paymentItem?.type || '--'}
                    </TableCell>
                    {/* <TableCell align='center'>{paymentItem?.createdBy || '--'}</TableCell> */}
                    <TableCell align='center'>
                      {/* {paymentItem.status ? ( */}
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
                      <IconButton size='small' onClick={() => setActivePaymentMethod(paymentItem)}>
                        <Icon icon='tabler:edit' />
                      </IconButton>

                      <IconButton size='small' onClick={() => doDelete(paymentItem)}>
                        <Icon icon='tabler:trash' />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}

                {PaymentMethodsList?.length === 0 && (
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
        
        // rowsPerPageOptions={[5, 10]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <DeleteDialog open={deleteModal} handleClose={doCancelDelete} handleDelete={ondeleteClick} />
    </Fragment>
  )
}

export default PaymentMethodTable
