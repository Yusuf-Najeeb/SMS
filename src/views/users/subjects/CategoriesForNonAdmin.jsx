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
import CustomChip from 'src/@core/components/mui/chip'
import NoData from 'src/@core/components/emptydata/NoData'

import CustomSpinner from 'src/@core/components/custom-spinner'
import { useCategories } from '../../../hooks/useCategories'
import { fetchCategories } from '../../../store/apps/categories/asyncthunk'



const SubjectCategoriesTableForNonAdmin = () => {
  const dispatch = useAppDispatch()


  const [CategoriesData, loading, paging] = useCategories()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [type, setType] = useState('')


  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }


  useEffect(() => {
    dispatch(fetchCategories({ page: page + 1, limit: 10, type: 'subject' }))

     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, type])

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
                Name
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
                {CategoriesData?.map((item, i) => (
                  <TableRow hover role='checkbox' key={item.id}>
                    <TableCell align='left'>{i + 1}</TableCell>
                    <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                      {item?.name || '--'}
                    </TableCell>
                    <TableCell align='center' sx={{ textTransform: 'capitalize' }}>
                      {item?.type || '--'}
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

    </Fragment>
  )
}

export default SubjectCategoriesTableForNonAdmin
