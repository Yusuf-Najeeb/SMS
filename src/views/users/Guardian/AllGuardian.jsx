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
import { useAppSelector } from '../../../hooks'
import { deleteGuardian, fetchGuardian } from '../../../store/apps/guardian/asyncthunk'
import { formatDate } from '../../../@core/utils/format'
import DeleteDialog from '../../../@core/components/delete-dialog'
import AddGuardian from './AddGuardian'
import Stats from '../component/Stats'
import PageHeaderWithSearch from '../component/PageHeaderWithSearch'
import EditGuardian from './EditGuardian'
import { Menu, MenuItem } from '@mui/material'

// ** Styled component for the link in the dataTable
const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  fontSize: theme.typography.body1.fontSize,
  color: `${theme.palette.primary.main} !important`
}))

const TypographyStyled = styled(Typography)(({theme})=> ({
    // fontSize: `${theme.typography.smallText.fontSize}`,
    fontSize: `8px`,
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

        // color={row?.title.length > 2 ? 'primary' : 'secondary'}
        color='primary'
        sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: theme => theme.typography.body1.fontSize }}
      >
        {getInitials(initials || 'John Doe')}
      </CustomAvatar>
    )
  }
}

const defaultColumns = [



  {
    flex: 0.25,
    field: 'name',
    minWidth: 280,
    headerName: 'Guardian',
    renderCell: ({ row }) => {
      const { firstName, lastName, email, } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
              {`${firstName} ${lastName}`}
            </Typography>
            <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
              {email}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 150,
    field: 'religion',
    headerName: 'Religion',
    renderCell: ({ row }) => <Typography variant='body2'  sx={{ color: 'text.secondary' }}>{row.religion || '--'}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: 'phone',
    headerName: 'Phone',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.phone || '--'}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: 'dateOfBirth',
    headerName: 'Date of Birth',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{formatDate(row.dateOfBirth)}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: 'gender',
    headerName: 'Gender',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.gender}</Typography>
  },


  {
    flex: 0.1,
    field: 'id',
    minWidth: 140,
    headerName: 'User ID',

    renderCell: ({ row }) => (
      <Typography component={TypographyStyled} sx={{fontSize: '13px'}} >{`${row.identificationNumber}`}</Typography>
    )
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
const AllGuardian = () => {
  // ** State
  const [dates, setDates] = useState([])
  const [value, setValue] = useState('')
  const [statusValue, setStatusValue] = useState('')
  const [endDateRange, setEndDateRange] = useState(null)
  const [selectedRows, setSelectedRows] = useState([])
  const [startDateRange, setStartDateRange] = useState(null)
  const [page, setPage] = useState(0)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [showModal, setShowModal] = useState(false)
  const [refetch, setFetch] = useState(false)
  const [openEditDrawer, setEditDrawer] = useState(false)
  const [openDeleteModal, setDeleteModal] = useState(false)
  const [selectedGuardian, setSelectedGuardian] = useState()
  const [guardianToUpdate, setGuardianToUpdate] = useState(null)
  const [key, setKey] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = (anchorEl)

  

  // ** Hooks
  const dispatch = useDispatch()

  const GuardianData = useAppSelector(store => store.guardian.GuardianData)

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }


  const toggleModal = ()=>{
    setShowModal(!showModal)
  }

  const updateFetch = ()=> setFetch(!refetch)

  const doDelete = value => {
    setDeleteModal(true)
    setSelectedGuardian(value?.id)
    handleRowOptionsClose()
  }

  const doCancelDelete = () => {
    setDeleteModal(false)
    setSelectedGuardian(null)
  }

  const ondeleteClick = async () => {
    deleteGuardian(selectedGuardian).then((res)=>{

        if (res.status) {
            dispatch(fetchGuardian({page: 1, key}))
          doCancelDelete()
        }
    })
   
  }

  const setGuardianToEdit = (value) => {
    setEditDrawer(!openEditDrawer)
    setGuardianToUpdate(value)
    handleRowOptionsClose()
  }

  const closeEditModal = ()=> setEditDrawer(!openEditDrawer)


  const handleOnChangeRange = dates => {
    const [start, end] = dates
    if (start !== null && end !== null) {
      setDates(dates)
    }
    setStartDateRange(start)
    setEndDateRange(end)
  }


  useEffect(()=>{
    dispatch(fetchGuardian({page: page +1, key}))

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

        <>
        <IconButton size='small' onClick={handleRowOptionsClick}>
          <Icon icon='tabler:dots-vertical' />
        </IconButton>
        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={rowOptionsOpen}
          onClose={handleRowOptionsClose}
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
          {/* <MenuItem
            sx={{ '& svg': { mr: 2 } }}
            onClick={() => setStaffToView(row)}
          >
            <Icon icon='tabler:eye' fontSize={20} />
            View
          </MenuItem> */}
          <MenuItem onClick={() => setGuardianToEdit(row)} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon='tabler:edit' fontSize={20} />
            Edit
          </MenuItem>
          <MenuItem onClick={() => doDelete(row)} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon='tabler:trash' fontSize={20} />
            Delete
          </MenuItem>
        </Menu>
      </>
      )
    }
  ]

  return (
    <Fragment>
    <DatePickerWrapper>
        <Stats data={GuardianData} statTitle='Guardian'/>

        <PageHeaderWithSearch searchPlaceholder={'Search Guardian'} action="Add Guardian" toggle={toggleModal} handleFilter={setKey}/>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <DataGrid
              autoHeight
              pagination
              rowHeight={62}
              rows={GuardianData?.result?.length ? GuardianData?.result : []}
              columns={columns}
              pageSizeOptions={[10, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              disableRowSelectionOnClick
            />
          </Card>
        </Grid>
      </Grid>

    </DatePickerWrapper>

    <DeleteDialog open={openDeleteModal} handleClose={doCancelDelete} handleDelete={ondeleteClick} />
    <AddGuardian open={showModal} closeModal={toggleModal} refetchData={updateFetch} />
     <EditGuardian open={openEditDrawer} selectedGuardian={guardianToUpdate} fetchData={updateFetch} closeModal={closeEditModal}/>
    </Fragment>
  )
}

export default AllGuardian
