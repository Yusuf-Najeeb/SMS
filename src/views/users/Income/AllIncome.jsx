// ** React Imports
import { useState, useEffect, forwardRef, Fragment } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import format from 'date-fns/format'

// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { deleteStudent } from '../../../store/apps/Student/asyncthunk'
import { formatCurrency, formatDate, formatDateToReadableFormat,  } from '../../../@core/utils/format'
import { fetchStudents } from '../../../store/apps/Student/asyncthunk'
import Stats from '../component/Stats'
import PageHeaderWithSearch from '../component/PageHeaderWithSearch'
import { fetchIncome } from '../../../store/apps/income/asyncthunk'
import { useIncome } from '../../../hooks/useIncome'
import PageHeader from '../component/PageHeader'

// ** Styled component for the link in the dataTable
const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  fontSize: theme.typography.body1.fontSize,
  color: `${theme.palette.primary.main} !important`
}))

const TypographyStyled = styled(Typography)(({theme})=> ({
    fontSize: theme.typography.body1.fontSize,
    color: `${theme.palette.primary.main} !important` 
}))


// ** renders client column
const renderClient = row => {
    const initials = `${row.firstName} ${row.lastName}`
  if (row.profilePicture?.length) {
    return <CustomAvatar src={row.profilePicture} sx={{ mr: 2.5, width: 38, height: 38 }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color='secondary'
        sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: theme => theme.typography.body1.fontSize }}
      >
        {getInitials(initials || 'John Doe')}
      </CustomAvatar>
    )
  }
}

const defaultColumns = [

    {
        field: 'id' , 
        headerName: 'S/N', 
        filterable: false,
        renderCell:(index) => <Typography component={TypographyStyled}> {index.api.getRowIndexRelativeToVisibleRows(index.row.id) + 1} </Typography>
    },

  {
    flex: 0.1,
    minWidth: 100,
    field: 'amount',
    headerName: 'Amount',
    renderCell: ({ row }) => <Typography variant='body2'  sx={{ color: 'text.secondary' }}>{formatCurrency(row.amount) || '--'}</Typography>
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'amountPaid',
    headerName: 'Amount Paid',
    renderCell: ({ row }) => <Typography variant='body2'  sx={{ color: 'text.secondary' }}>{formatCurrency(row.amountPaid) || '--'}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 140,
    field: 'category',
    headerName: 'Category',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.category.name}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 140,
    field: 'createdAt',
    headerName: 'Payment Date',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{formatDateToReadableFormat(row.createdAt)}</Typography>
  },


//   {
//     flex: 0.1,
//     minWidth: 100,
//     field: 'balance',
//     headerName: 'Balance',
//     renderCell: ({ row }) => {
//       return row.balance !== 0 ? (
//         <Typography sx={{ color: 'text.secondary' }}>{row.balance}</Typography>
//       ) : (
//         <CustomChip rounded size='small' skin='light' color='success' label='Paid' />
//       )
//     }
//   },
//   {
//     flex: 0.1,
//     minWidth: 80,
//     field: 'invoiceStatus',
//     renderHeader: () => <Icon icon='tabler:trending-up' />,
//     renderCell: ({ row }) => {
//       const { dueDate, balance, invoiceStatus } = row
//       const color = invoiceStatusObj[invoiceStatus] ? invoiceStatusObj[invoiceStatus].color : 'primary'

//       return (
//         <Tooltip
//           title={
//             <div>
//               <Typography variant='caption' sx={{ color: 'common.white', fontWeight: 600 }}>
//                 {invoiceStatus}
//               </Typography>
//               <br />
//               <Typography variant='caption' sx={{ color: 'common.white', fontWeight: 600 }}>
//                 Balance:
//               </Typography>{' '}
//               {balance}
//               <br />
//               <Typography variant='caption' sx={{ color: 'common.white', fontWeight: 600 }}>
//                 Due Date:
//               </Typography>{' '}
//               {dueDate}
//             </div>
//           }
//         >
//           <CustomAvatar skin='light' color={color} sx={{ width: '1.875rem', height: '1.875rem' }}>
//             <Icon icon={invoiceStatusObj[invoiceStatus].icon} />
//           </CustomAvatar>
//         </Tooltip>
//       )
//     }
//   }
]
/* eslint-disable */
const CustomInput = forwardRef((props, ref) => {
  const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : ''
  const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null
  const value = `${startDate}${endDate !== null ? endDate : ''}`
  props.start === null && props.dates.length && props.setDates ? props.setDates([]) : null
  const updatedProps = { ...props }
  delete updatedProps.setDates
  return <CustomTextField fullWidth inputRef={ref} {...updatedProps} label={props.label || ''} value={value} />
})

/* eslint-enable */
const AllIncome = () => {
  // ** State
  const [page, setPage] = useState(0)
  const [key, setKey] = useState('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [showModal, setShowModal] = useState(false)
  const [refetch, setFetch] = useState(false)
  const [openEditDrawer, setEditDrawer] = useState(false)
  const [openDeleteModal, setDeleteModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState()
  const [studentToUpdate, setstudentToUpdate] = useState(null)
  const [email, setGuardianEmail] = useState(null)

  

  // ** Hooks
  const dispatch = useDispatch()

  const [IncomeData, loading] = useIncome()



  const toggleModal = ()=>{
    setShowModal(!showModal)
  }

  const updateFetch = ()=> setFetch(!refetch)

  const doDelete = value => {
    setDeleteModal(true)
    setSelectedStudent(value?.id)
  }

  const doCancelDelete = () => {
    setDeleteModal(false)
    setSelectedStudent(null)
  }

  const ondeleteClick = async () => {
    deleteStudent(selectedStudent).then((res)=>{

        if (res.status) {
            dispatch(fetchStudents({page: 1, key}))
          doCancelDelete()
        }
    })
   
  }

  const setGuardianToEdit = (value) => {
    setEditDrawer(true)
    setstudentToUpdate(value)
    setGuardianEmail(value?.email)
  }

  const closeEditModal = ()=> setEditDrawer(false)


  useEffect(()=>{
    dispatch(fetchIncome({page: page + 1, key}))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[refetch, page, key])

  const columns = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 140,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* <Tooltip title='Edit Income'>
             <IconButton size='small' onClick={() => setGuardianToEdit(row)}>
            <Icon icon='tabler:edit' />
            </IconButton>
            </Tooltip> */}
          <Tooltip title='Delete Income'>
            <IconButton size='small' sx={{ color: 'text.secondary' }} onClick={() => doDelete(row)}>
              <Icon icon='tabler:trash' />
            </IconButton>
          </Tooltip>
          {/* <Tooltip title='View'>
            <IconButton
              size='small'
              component={Link}
              sx={{ color: 'text.secondary' }}
              href={`/apps/invoice/preview/${row.id}`}
            >
              <Icon icon='tabler:eye' />
            </IconButton>
          </Tooltip> */}

          {/* <OptionsMenu
            menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
            iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
            options={[
              {
                text: 'Download',
                icon: <Icon icon='tabler:download' fontSize={20} />
              },
              {
                text: 'Edit',
                href: `/apps/invoice/edit/${row.id}`,
                icon: <Icon icon='tabler:edit' fontSize={20} />
              },
              {
                text: 'Duplicate',
                icon: <Icon icon='tabler:copy' fontSize={20} />
              }
            ]}
          /> */}
        </Box>
      )
    }
  ]

  return (
    <Fragment>
    <DatePickerWrapper>

    {/* <Stats data={IncomeData} statTitle={'Students'}/> */}

        <PageHeader action={'Create Income'} toggle={toggleModal} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <DataGrid
              autoHeight
              pagination
              rowHeight={62}
              rows={IncomeData?.length ? IncomeData : []}
              columns={columns}

            //   disableRowSelectionOnClick
              pageSizeOptions={[10, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              disableRowSelectionOnClick
            />
          </Card>
        </Grid>
      </Grid>

    </DatePickerWrapper>

    {/* <DeleteDialog open={openDeleteModal} handleClose={doCancelDelete} handleDelete={ondeleteClick} /> */}
    {/* <AddStudent open={showModal} closeModal={toggleModal} refetchData={updateFetch}  /> */}
   
    </Fragment>
  )
}

export default AllIncome
