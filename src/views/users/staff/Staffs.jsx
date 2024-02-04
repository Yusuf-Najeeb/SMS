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
import { fetchData } from 'src/store/apps/invoice'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomTextField from 'src/@core/components/mui/text-field'
import CustomChip from 'src/@core/components/mui/chip'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import PageHeader from '../component/PageHeader'
import { formatDate, formatDateToReadableFormat } from '../../../@core/utils/format'
import DeleteDialog from '../../../@core/components/delete-dialog'


import { useStaff } from '../../../hooks/useStaff'
import { deleteStaff, fetchStaffs } from '../../../store/apps/staff/asyncthunk'
import EditStaff from './EditStaff'
import AddStaff from './AddStaff'
import UpdateStaff from './UpdateStaff'

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
        color={row?.title.length > 2 ? 'primary' : 'secondary'}
        sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: theme => theme.typography.body1.fontSize }}
      >
        {getInitials(initials || 'John Doe')}
      </CustomAvatar>
    )
  }
}

const defaultColumns = [

// {
//     flex: 0.1,
//     minWidth: 100,
//     field: 'address',
//     headerName: 'S/N',
//     renderCell: ({ row }) => <Typography variant='body2'  sx={{ color: 'text.secondary' }}>{index + 1}</Typography>
//   },

{
    flex: 0.1,
    field: 'id',
    minWidth: 100,
    headerName: 'ID',

    renderCell: ({ row }) => (
      <Typography component={TypographyStyled} >{`#${row.identificationNumber}`}</Typography>
    )
  },

  {
    flex: 0.25,
    field: 'firstName',
    minWidth: 320,
    headerName: 'Staff',
    renderCell: ({ row }) => {
      const { title, firstName, lastName, email, } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
              {`${title}. ${firstName} ${lastName}`}
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
    minWidth: 100,
    field: 'staffDescription',
    headerName: 'Staff Description',
    renderCell: ({ row }) => <Typography variant='body2'  sx={{ color: 'text.secondary' }}>{row.staffDescription || '--'}</Typography>
  },

//   {
//     flex: 0.1,
//     minWidth: 100,
//     field: 'gender',
//     headerName: 'Gender',
//     renderCell: ({ row }) => <Typography variant='body2'  sx={{ color: 'text.secondary' }}>{row.gender || '--'}</Typography>
//   },
  {
    flex: 0.15,
    minWidth: 140,
    field: 'phone',
    headerName: 'Phone Number',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.phone || '--'}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 140,
    field: 'status',
    headerName: 'Status',

    // renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.status || '--'}</Typography>
    renderCell: ({ row }) => {
        return row.status ? (
            <CustomChip rounded size='small' skin='light' color='success' label='Active' />
        ) : (
          <CustomChip rounded size='small' skin='light' color='error' label='Inactive' />
        )
      }
  },
  {
    flex: 0.15,
    minWidth: 140,
    field: 'dateOfEmployment',
    headerName: 'Date of Employment',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{formatDateToReadableFormat(row.dateOfEmployment)}</Typography>
  },

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
const Staffs = () => {
  // ** State
  const [dates, setDates] = useState([])
  const [value, setValue] = useState('')
  const [statusValue, setStatusValue] = useState('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [showModal, setShowModal] = useState(false)
  const [refetch, setFetch] = useState(false)
  const [openEditDrawer, setEditDrawer] = useState(false)
  const [openDeleteModal, setDeleteModal] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState()
  const [staffToUpdate, setStaffToUpdate] = useState(null)

  const [StaffData, loading, paging] = useStaff()

  

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.invoice)

  // const GuardianData = useSelector(state => state.guardian)

  console.log(StaffData, 'staff data')


  const toggleModal = ()=>{
    setShowModal(!showModal)
  }

  const updateFetch = ()=> setFetch(!refetch)

  const doDelete = value => {
    setDeleteModal(true)
    setSelectedStaff(value?.email)
  }

  const doCancelDelete = () => {
    setDeleteModal(false)
    setSelectedStaff(null)
  }

  const ondeleteClick = async () => {
    deleteStaff(selectedStaff).then((res)=>{

        if (res.status) {
          dispatch(fetchStaffs())
          doCancelDelete()
        }
    })
   
  }

  const setStaffToEdit = (value) => {
    setEditDrawer(true)
    setStaffToUpdate(value)
  }

  const closeEditModal = ()=> setEditDrawer(false)

  const handleFilter = val => {
    setValue(val)
  }

  const handleStatusValue = e => {
    setStatusValue(e.target.value)
  }

  const handleOnChangeRange = dates => {
    const [start, end] = dates
    if (start !== null && end !== null) {
      setDates(dates)
    }
    setStartDateRange(start)
    setEndDateRange(end)
  }

  useEffect(() => {
    dispatch(
      fetchData({
        dates,
        q: value,
        status: statusValue
      })
    )
  }, [dispatch, statusValue, value, dates])

  useEffect(() => {
    dispatch(fetchStaffs())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch])


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
            <Tooltip title='Edit Staff'>
             <IconButton size='small' onClick={() => setStaffToEdit(row)}>
            <Icon icon='tabler:edit' />
            </IconButton>
            </Tooltip>
          <Tooltip title='Delete Staff'>
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

        <PageHeader  action="Add Staff" toggle={toggleModal}/>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <DataGrid
              autoHeight
              pagination
              rowHeight={62}
              rows={StaffData?.length ? StaffData : []}
              columns={columns}

            //   checkboxSelection

            //   disableRowSelectionOnClick
              pageSizeOptions={[10, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              disableRowSelectionOnClick

            //   onRowSelectionModelChange={rows => setSelectedRows(rows)}
            />
          </Card>
        </Grid>
      </Grid>

    </DatePickerWrapper>
    {openEditDrawer && 
    <UpdateStaff
          open={openEditDrawer}
          closeModal={closeEditModal}
          refetchStaffs={updateFetch}
          selectedStaff={staffToUpdate}
        />}

    <AddStaff open={showModal} closeModal={toggleModal} refetchStaffs={updateFetch}/>
    <DeleteDialog open={openDeleteModal} handleClose={doCancelDelete} handleDelete={ondeleteClick} />
    </Fragment>
  )
}

export default Staffs
