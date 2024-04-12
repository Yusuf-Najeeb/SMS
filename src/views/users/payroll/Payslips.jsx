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

import TablePagination from '@mui/material/TablePagination'

import { useAppDispatch } from '../../../hooks'
import NoData from '../../../@core/components/emptyData/NoData'
import CustomSpinner from '../../../@core/components/custom-spinner'
import { formatDateToYYYYMM, formatFirstLetter, formatMonthYear } from '../../../@core/utils/format'
import { usePayslip } from '../../../hooks/usePayslip'
import { fetchPayslips, printPayslip } from '../../../store/apps/payslip/asyncthunk'
import GeneratePayslip from './GeneratePayslip'
import PageHeader from './PayslipPageHeader'
import { Card, CardContent, CardHeader, CircularProgress, Grid, MenuItem, Tooltip } from '@mui/material'
import SendPayslip from './SendPayslipToEmail'
import { useStaff } from '../../../hooks/useStaff'
import { fetchStaffs } from '../../../store/apps/staff/asyncthunk'

const PayslipTable = () => {
  // Hooks
  const dispatch = useAppDispatch()
  const [PayslipData, loading] = usePayslip()
  const [StaffData] = useStaff()

  // States

  const [key, setKey] = useState('')
  const [generateModalOpen, setPayslipOpen] = useState(false)
  const [sendModalOpen, setSendModalOpen] = useState(false)
  const [refetch, setFetch] = useState(false)
  const [defaultStaffId, setDefaultStaffId] = useState('')
  const [isPrinting, setIsPrinting] = useState(false)
  const [isPayslipDownloadLinkAvailable, setIsPayslipAvailable] = useState(false)
  const [payslipDownloadLink, setPayslipDownloadLink] = useState()
  const [printingPayslipId, setPrintingPayslipId] = useState(null);
  const [staffId, setStaffId] = useState('')


  const defaultPeriod = formatDateToYYYYMM(new Date())

  const month = formatMonthYear(new Date())

  const handleChangeStaff = e => {
    Number(setStaffId(e.target.value))
  }

  const printPayslipItem = (selectedId, period) => {
    setIsPrinting(true)
    setPrintingPayslipId(selectedId)
    printPayslip(selectedId, period).then(res => {
        setIsPayslipAvailable(true)
        setPayslipDownloadLink(res?.data?.url)
      setIsPrinting(false)
    }).catch(()=>{
        setIsPrinting(false)
    })
  }

  const updateFetch = () => setFetch(!refetch)


  const toggleGeneratePayslipDrawer = () => setPayslipOpen(!generateModalOpen)
  const toggleSendPayslipModal = () => setSendModalOpen(!sendModalOpen)

  useEffect(() => {
    dispatch(fetchPayslips({ period: defaultPeriod, staffId: staffId ? staffId : defaultStaffId }))


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch, staffId, defaultStaffId])

  useEffect(() => {

      dispatch(fetchStaffs({ page: 1, limit: 300, key }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch, staffId, defaultStaffId, key])

  useEffect(()=>{
    if ( isPayslipDownloadLinkAvailable) {

    //   window.location.href = payslipDownloadLink  
    window.open(payslipDownloadLink, '_blank');
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPayslipDownloadLinkAvailable])

  return (
    <div>
       <Card>
        <CardHeader title='Filter' />
        <CardContent>
          <Grid container spacing={12}>
            <Grid item xs={12} sm={4}>
              <CustomTextField
                select
                fullWidth
                label='Staff'

                SelectProps={{ value: staffId, onChange: e => handleChangeStaff(e) }}
              >
                {/* <CustomTextField fullWidth placeholder='Search Staff' onChange={(e)=>setKey(e.target.value)} /> */}

                <MenuItem value=''>{ staffId ? `All Staff` : `Select Staff`}</MenuItem>
                {StaffData?.result?.map(staff => (
                  <MenuItem key={staff?.id} value={staff?.id} sx={{textTransform: 'uppercase'}}>
                    {`${staff?.firstName} ${staff?.lastName}` }
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card> 

      <PageHeader
        action1='Send Payslips to Staffs Email'
        toggleSend={toggleSendPayslipModal}
        month={month}
        action2='Generate Payslip'
        toggle={toggleGeneratePayslipDrawer}
      />
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
              {/* <TableCell align='left' sx={{ minWidth: 100 }}>
                DEPARTMENT NAME
              </TableCell> */}
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
                {PayslipData?.map((payslip, i) => {

                  // const staffDepartmentId = payslip?.user?.departmentId
                  // const matchingDepartment = findDepartment(DepartmentsData, staffDepartmentId)
                  // const departmentName = matchingDepartment?.name

                  return (
                    <TableRow hover role='checkbox' key={payslip?.id}>
                      <TableCell align='left'>{i + 1}</TableCell>
                      <TableCell align='left' sx={{textTransform: 'uppercase'}}>{`${formatFirstLetter(payslip?.staff?.firstName)} ${formatFirstLetter(payslip?.staff?.lastName)}`}</TableCell>

                      {/* <TableCell align='left'>{departmentName ? formatFirstLetter(departmentName) : ''}</TableCell> */}
                      <TableCell align='left'>{ Number(payslip?.totalAllowance)?.toLocaleString() || '--'}</TableCell>

                      {/* <TableCell align='left'>{payslip?.totalAllowance?.toLocaleString() || '--'}</TableCell> */}
                      <TableCell align='center'>{Number(payslip?.totalDeduction)?.toLocaleString() || '--'}</TableCell>
                      <TableCell align='left'>{Number(payslip?.amount)?.toLocaleString() || '--'}</TableCell>
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

                {PayslipData?.length === 0 && (
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

      {/* <TablePagination
        page={page}
        component='div'
        count={Paging?.totalItems}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 20]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}

      {/* 

       */}

      {generateModalOpen && (
        <GeneratePayslip
          open={generateModalOpen}
          closeModal={toggleGeneratePayslipDrawer}
          refetchPayslip={updateFetch}
        />
      )}

      {sendModalOpen && (
        <SendPayslip open={sendModalOpen} closeModal={toggleSendPayslipModal} refetchPayslip={updateFetch} />
      )}
    </div>
  )
}

export default PayslipTable
