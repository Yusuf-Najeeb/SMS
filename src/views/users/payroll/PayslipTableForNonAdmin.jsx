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

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'


import { useAppDispatch } from '../../../hooks'
import NoData from '../../../@core/components/emptyData/NoData'
import CustomSpinner from '../../../@core/components/custom-spinner'
import {  formatFirstLetter, formatMonthYear,  } from '../../../@core/utils/format'
import { fetchPayslipForOneStaff, printPayslip } from '../../../store/apps/payslip/asyncthunk'
import {  CircularProgress, Tooltip } from '@mui/material'
import GetUserData from '../../../@core/utils/getUserData'

const PayslipTableForNonAdmin = () => {
  // Hooks

  // States
  const [activeUserPayslips, setActiveUserPayslips] = useState([])
  const [loading, setLoading] = useState(true)
  const [refetch, setFetch] = useState(false)
  const [isPrinting, setIsPrinting] = useState(false)
  const [isPayslipDownloadLinkAvailable, setIsPayslipAvailable] = useState(false)
  const [payslipDownloadLink, setPayslipDownloadLink] = useState()
  const [printingPayslipId, setPrintingPayslipId] = useState(null);

  const userData = GetUserData()

  const printPayslipItem = (selectedId, period) => {
    setIsPrinting(true)
    setPrintingPayslipId(selectedId)
    printPayslip(selectedId, period).then(res => {
        setIsPayslipAvailable(true)
        setPayslipDownloadLink(res.data.url)
      setIsPrinting(false)
    }).catch(()=>{
        setIsPrinting(false)
    })
  }

  useEffect(()=>{
    if(userData){

  
    fetchPayslipForOneStaff(userData?.id).then((res)=>{

        setActiveUserPayslips([...res])
        setLoading(false)
    }).catch(()=>{
        setLoading(false)
    })

  }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[userData])


  return (
    <div>
      
      <TableContainer component={Paper} sx={{ maxHeight: 840 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                S/N
              </TableCell>
              {/* <TableCell align='left' sx={{ minWidth: 100 }}>
                STAFF NAME
              </TableCell> */}
              <TableCell align='left' sx={{ minWidth: 100 }}>
                MONTH
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                GROSS SALARY
              </TableCell>
              {/* <TableCell align='left' sx={{ minWidth: 100 }}>
                TOTAL ALLOWANCE
              </TableCell>  */}
              <TableCell align='center' sx={{ minWidth: 100 }}>
                TOTAL DEDUCTION
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                NET PAY
              </TableCell>
              <TableCell align='center' sx={{ minWidth: 100 }}>
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
                {activeUserPayslips?.map((payslip, i) => {

                  const formattedMonth = formatMonthYear(payslip?.period)

                  return (
                    <TableRow hover role='checkbox' key={payslip?.id}>
                      <TableCell align='left'>{i + 1}</TableCell>

                      {/* <TableCell align='left'>{`${formatFirstLetter(payslip?.staff?.firstName)} ${formatFirstLetter(payslip?.staff?.lastName)}`}</TableCell> */}
                      <TableCell align='left'>{formattedMonth ? formattedMonth : ''}</TableCell>
                      <TableCell align='left'>{payslip?.user?.grossSalary?.toLocaleString() || '--'}</TableCell>

                      {/* <TableCell align='left'>{payslip?.totalAllowance?.toLocaleString() || '--'}</TableCell> */}
                      <TableCell align='center'>{payslip?.totalDeduction?.toLocaleString() || '--'}</TableCell>
                      <TableCell align='left'>{payslip?.amount?.toLocaleString() || '--'}</TableCell>
                      <TableCell align='center' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        

                        {printingPayslipId === payslip?.staff?.id && isPrinting  ? <CircularProgress size={20} color='secondary' sx={{ ml: 3 }} /> : 
                        <Tooltip title='Print Payslip' placement='top'>
                          <IconButton size='small' onClick={() => printPayslipItem(payslip?.staff?.id, payslip?.period)}>
                            <Icon icon='material-symbols:print-outline' />
                          </IconButton>
                        </Tooltip>}
                      </TableCell>
                    </TableRow>
                  )
                })}

                {activeUserPayslips?.length === 0 && (
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

    </div>
  )
}

export default PayslipTableForNonAdmin
