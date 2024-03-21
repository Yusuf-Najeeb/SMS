import React, { Fragment } from 'react'
import Drawer from '@mui/material/Drawer'

import IconButton from '@mui/material/IconButton'

import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import Divider from '@mui/material/Divider'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import TableContainer from '@mui/material/TableContainer'
import TableCell, { TableCellBaseProps } from '@mui/material/TableCell'

import CustomChip from 'src/@core/components/mui/chip'

import Icon from 'src/@core/components/icon'
import { Alert, Stack } from '@mui/material'
import { formatCurrency, formatDate } from 'src/@core/utils/format'
import { formatDateToReadableFormat } from '../../../@core/utils/format'


const CalcWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(2)
  }
}))

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const ViewIncome = ({ open, closeCanvas, income }) => {

  console.log(income, 'income')


  const theme = useTheme()

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 800, sm: 800 } } }}
    >
      <Header>
        <Typography variant='h5'>View Income</Typography>
        <IconButton
          size='small'
          onClick={closeCanvas}
          sx={{
            // p: '0.438rem',
            borderRadius: 1,
            color: 'text.primary',
            backgroundColor: 'action.selected',
            '&:hover': {
              backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.16)`
            }
          }}
        >
          <Icon icon='tabler:x' fontSize='1.125rem' />
        </IconButton>
      </Header>

      {/* body */}

      <Box sx={{ p: theme => theme.spacing(0, 3, 3) }}>
      
          <Fragment>
            {income !== null && income !== undefined ? (
              <Fragment>
                <CardContent>
                  <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: { xs: 'flex-start', sm: 'flex-end' },
                        gap: 3,
                        alignSelf: 'center'
                      }}
                    >
                      {/* <Typography variant='h5'>{`#${income.code}`}</Typography> */}

                      {/* {income.transactions[0].transactionStatus === 0 ? (
                        <CustomChip
                          rounded
                          skin='light'
                          size='small'
                          label='Paid'
                          color='success'
                          sx={{ textTransform: 'capitalize' }}
                        />
                      ) : (
                        <CustomChip
                          rounded
                          skin='light'
                          size='small'
                          label='Unpaid'
                          color='error'
                          sx={{ textTransform: 'capitalize' }}
                        />
                      )} */}
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                      <Icon icon='healthicons:money-bag-outline' fontSize={40} />
                      <Typography variant='h5' sx={{ alignSelf: 'center' }}>
                        {formatCurrency(income.transactions[0].amount, true)}
                      </Typography>
                    </Box>
                  </Grid>
                </CardContent>

                <Divider>Transaction Details</Divider>

                <CardContent sx={{ p: [`${theme.spacing(6)} !important`, `${theme.spacing(10)} !important`] }}>
                  <Stack spacing={4} sx={{ py: `${theme.spacing(0)} !important` }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ color: 'text.secondary' }}>Category:</Typography>

                      <CustomChip
                        rounded
                        skin='light'
                        size='small'
                        label={income.category.name}
                        color='info'
                        sx={{ textTransform: 'capitalize' }}
                      />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ color: 'text.secondary' }}>Transaction Date:</Typography>

                      <Typography sx={{ color: 'text.secondary' }}>
                        {formatDateToReadableFormat(income.createdAt)}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ color: 'text.secondary' }}> Session:</Typography>

                      <Typography sx={{ color: 'text.secondary' }}>
                        {`${income?.year}`}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ color: 'text.secondary', textTransform: 'uppercase' }}> Term:</Typography>

                      <Typography sx={{ color: 'text.secondary' }}>
                        {` ${income?.term} term`}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ color: 'text.secondary' }}>Status:</Typography>

                      {income?.transactions[0].transactionStatus === 0 ? (
                      <CustomChip
                        rounded
                        skin='light'
                        size='small'
                        label='Partly Paid'
                        color='info'
                        sx={{ textTransform: 'capitalize' }}
                      />
                    ) : (income?.transactions[0].transactionStatus === -1) ? (
                      <CustomChip
                        rounded
                        skin='light'
                        size='small'
                        label='Unpaid'
                        color='error'
                        sx={{ textTransform: 'capitalize' }}
                      />
                    )
                    : (
                    <CustomChip
                        rounded
                        skin='light'
                        size='small'
                        label='Fully Paid'
                        color='success'
                        sx={{ textTransform: 'capitalize' }}
                      />)
                    }
                    </Box>
                  </Stack>
                </CardContent>

                <Divider sx={{mt: '10px', mb: '10px'}}>Transaction History</Divider>

                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>S/N</TableCell>
                        <TableCell>AMOUNT</TableCell>
                        <TableCell>AMOUNT PAID</TableCell>
                        <TableCell>DESCRIPTION</TableCell>
                        <TableCell>DATE</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody
                      sx={{
                        '& .MuiTableCell-root': {
                          py: `${theme.spacing(2.5)} !important`,
                          fontSize: theme.typography.body1.fontSize
                        }
                      }}
                    >
                      {income.transactions.map((item, i) => (
                        <TableRow key={item.id}>
                            <TableCell>{i + 1}</TableCell>


                          <TableCell>{formatCurrency(item?.amount, true) || '--'}</TableCell>

                          <TableCell>{formatCurrency(item.amountPaid, true)}</TableCell>
                          <TableCell>{item?.description}</TableCell>
                          <TableCell>
                            {formatDateToReadableFormat(item.createdAt)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <CardContent sx={{ p: [`${theme.spacing(6)} !important`, `${theme.spacing(10)} !important`] }}>
                  <Grid container>
                    <Grid item xs={12} sm={7} lg={9} sx={{ order: { sm: 1, xs: 2 } }}>
                      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Source:</Typography>
                        {income.staff && <Typography sx={{ color: 'text.secondary' }}>{ `${income?.staff?.firstName?.toUpperCase()} ${income?.staff?.lastName?.toUpperCase()}`}</Typography>}
                        {income.parent && <Typography sx={{ color: 'text.secondary' }}>{ `${income?.parent?.firstName?.toUpperCase()} ${income?.parent?.lastName?.toUpperCase()}`}</Typography>}
                        {income.student && <Typography sx={{ color: 'text.secondary' }}>{ `${income?.student?.firstName?.toUpperCase()} ${income?.student?.lastName?.toUpperCase()}`}</Typography>}
                      </Box>
                      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Source Type:</Typography>
                        {income.staff &&  <CustomChip
                        rounded
                        skin='light'
                        size='small'
                        label={'Staff'}
                        color='info'
                        sx={{ textTransform: 'capitalize' }}
                      />}
                        {income.parent &&  <CustomChip
                        rounded
                        skin='light'
                        size='small'
                        label={'Parent'}
                        color='info'
                        sx={{ textTransform: 'capitalize' }}
                      />}
                        {income.student &&  <CustomChip
                        rounded
                        skin='light'
                        size='small'
                        label={'Student'}
                        color='info'
                        sx={{ textTransform: 'capitalize' }}
                      />}
                      </Box>

                      {/* <Typography sx={{ color: 'text.secondary' }}></Typography> */}
                    </Grid>
                    <Grid item xs={12} sm={5} lg={3} sx={{ mb: { sm: 0, xs: 4 }, order: { sm: 2, xs: 1 } }}>
                      <CalcWrapper>
                        <Typography sx={{ color: 'text.secondary' }}>Amount:</Typography>
                        <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
                          {formatCurrency(income?.amount, true)}
                        </Typography>
                      </CalcWrapper>
                      <CalcWrapper>
                        <Typography sx={{ color: 'text.secondary' }}>Amount Paid:</Typography>
                        <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
                          {formatCurrency(income?.amountPaid, true)}
                        </Typography>
                      </CalcWrapper>

                      <CalcWrapper>
                        <Typography sx={{ color: 'text.secondary' }}>Outstanding Amount:</Typography>
                        <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
                          {formatCurrency((Number(income?.amount) - Number(income?.amountPaid)), true)}
                        </Typography>
                      </CalcWrapper>
                      {/* <CalcWrapper sx={{ mb: '0 !important' }}>
                        <Typography sx={{ color: 'text.secondary' }}>Tax:</Typography>
                        <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>21%</Typography>
                      </CalcWrapper> */}
                      <Divider sx={{ my: `${theme.spacing(2)} !important` }} />
                      {/* <CalcWrapper>
                        <Typography sx={{ color: 'text.secondary' }}>Total:</Typography>
                        <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
                          {formatCurrency(Math.abs(income.transactions[0].amount), true)}
                        </Typography>
                      </CalcWrapper> */}
                    </Grid>
                  </Grid>
                </CardContent>

                <Divider />

                <CardContent sx={{ px: [6, 10] }}>
                  <Typography sx={{ color: 'text.secondary' }}>
                    <Typography component='span' sx={{ mr: 1.5, fontWeight: 500, color: 'inherit' }}>
                      Title:
                    </Typography>
                    {income.title || 'No available note'}
                  </Typography>
                </CardContent>
              </Fragment>
            ) : (
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <Alert severity='error'>Income does not exist. Please check the list of income </Alert>
                </Grid>
              </Grid>
            )}
          </Fragment>
      </Box>
    </Drawer>
  )
}

export default ViewIncome
