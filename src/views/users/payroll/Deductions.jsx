import React, { useEffect, useState, Fragment } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import IconButton from '@mui/material/IconButton'

import Icon from 'src/@core/components/icon'

import TablePagination from '@mui/material/TablePagination'

import CustomChip from 'src/@core/components/mui/chip'
import { useAppDispatch } from '../../../hooks'
import NoData from '../../../@core/components/emptyData/NoData'
import CustomSpinner from '../../../@core/components/custom-spinner'
import { formatDateToYYYYMM, formatFirstLetter } from '../../../@core/utils/format'
import DeleteDialog from '../../../@core/components/delete-dialog'
import { useDeductions } from '../../../hooks/useDeductions'
import { deleteDeduction, fetchDeductions } from '../../../store/apps/deductions/asyncthunk'
import CreateDeduction from './CreateDeduction'
import PageHeader from '../component/PageHeader'
import { de } from 'date-fns/locale'

const DeductionsTable = () => {
  // Hooks
  const dispatch = useAppDispatch()
  const [deductionsData, loading] = useDeductions()


  // States

  const [deduction, setDeduction] = useState(null)
  const [addDeductionOpen, setDeductionOpen] = useState(false)
  const [refetch, setFetch] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedDeduction, setSelectedDeduction] = useState(null)

  const defaultPeriod = formatDateToYYYYMM(new Date())

  const doDelete = value => {
    setDeleteModal(true)
    setSelectedDeduction(value?.id)
  }

  const doCancelDelete = () => {
    setDeleteModal(false)
    setSelectedDeduction(null)
  }

  const updateFetch = () => setFetch(!refetch)

  const onDeleteClick = () => {
    dispatch(deleteDeduction(selectedDeduction))
    updateFetch()
    doCancelDelete()
  }

  const toggleDeductionDrawer = () => setDeductionOpen(!addDeductionOpen)

  useEffect(() => {
    dispatch(fetchDeductions(defaultPeriod))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch])

  return (
    <div>
      <PageHeader action='Create Deduction' toggle={toggleDeductionDrawer} />
      <TableContainer component={Paper} sx={{ maxHeight: 840 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                S/N
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                STAFF
              </TableCell>
              <TableCell align='center' sx={{ minWidth: 100 }}>
                DEDUCTION AMOUNT
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                REASON
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                ACTIONS
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
                {deductionsData?.map((deduction, i) => {
                  // const deductionCategoryId = deduction?.categoryId
                  // const matchingDeductionCategory = findDeductionCategory(deductioncategoryData, deductionCategoryId)
                  // const deductionCategoryName = formatFirstLetter(matchingDeductionCategory?.name)

                  return (
                    <TableRow hover role='checkbox' key={deduction.id}>
                      <TableCell align='left'>{i + 1}</TableCell>
                      <TableCell align='left' sx={{textTransform: 'uppercase'}}>{`${deduction?.staff?.firstName} ${deduction?.staff?.lastName}`}</TableCell>
                      <TableCell align='center'>{deduction?.amount?.toLocaleString()}</TableCell>
                      <TableCell align='left'>{deduction?.note}</TableCell>

                      <TableCell align='left' sx={{ display: 'flex' }}>
                        <IconButton size='small' onClick={() => doDelete(deduction)}>
                          <Icon icon='tabler:trash' />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                })}

                {deductionsData?.length === 0 && (
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

      <DeleteDialog open={deleteModal} handleClose={doCancelDelete} handleDelete={onDeleteClick} />

      {addDeductionOpen && (
        <CreateDeduction
          openDialog={addDeductionOpen}
          closeDialog={toggleDeductionDrawer}
          refetchDeduction={updateFetch}
        />
      )}
    </div>
  )
}

export default DeductionsTable
