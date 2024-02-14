// ** React Imports
import { useState, useEffect, forwardRef, Fragment } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import format from 'date-fns/format'

// ** Store & Actions Imports
import { useDispatch } from 'react-redux'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomTextField from 'src/@core/components/mui/text-field'
import CustomChip from 'src/@core/components/mui/chip'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import PageHeader from './StaffPageHeader'
import { formatDateToReadableFormat } from '../../../@core/utils/format'
import DeleteDialog from '../../../@core/components/delete-dialog'


import { useStaff } from '../../../hooks/useStaff'
import { deleteStaff, fetchStaffs } from '../../../store/apps/staff/asyncthunk'
import AddStaff from './AddStaff'
import UpdateStaff from './UpdateStaff'
import ViewStaff from './ViewStaff'
import Stats from '../component/Stats'
import { Menu, MenuItem, Tooltip } from '@mui/material'


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

const userRoleObj = {
    "super-admin": { icon: 'grommet-icons:user-admin', color: 'info' },
    "admin": { icon: 'tabler:device-laptop', color: 'secondary' },
    "teacher": { icon: 'tabler:circle-check', color: 'success' },
    "librarian": { icon: 'tabler:edit', color: 'info' },
    "accountant": { icon: 'tabler:chart-pie-2', color: 'primary' },
    "house-master" : { icon: 'tabler:user', color: 'warning' }
  }

  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL


// ** renders client column
const renderClient = row => {
    const initials = `${row.firstName} ${row.lastName}`
  if (row.profilePicture?.length) {
    return <CustomAvatar src={`${backendURL?.replace('api', '')}/${row.profilePicture}`} sx={{ mr: 2.5, width: 38, height: 38 }} />
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
    flex: 0.25,
    field: 'firstName',
    minWidth: 280,
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
    minWidth: 165,
    field: 'role',
    headerName: 'Role',
    renderCell: ({ row }) => {
        // Typography variant='body2'  sx={{ color: 'text.secondary' }}>{row.role.roleName || '--'}</Typography>
        return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomAvatar
                skin='light'
                sx={{ mr: 4, width: 30, height: 30 }}
                color={(userRoleObj[row?.role?.name].color ) || 'primary'}
              >
                <Icon icon={userRoleObj[row?.role?.name].icon} />
              </CustomAvatar>
              <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                {row?.role?.name}
              </Typography>
            </Box>
          )
    
    }
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
    minWidth: 165,
    field: 'phone',
    headerName: 'Phone ',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.phone || '--'}</Typography>
  },
 
  {
    flex: 0.15,
    minWidth: 165,
    field: 'dateOfEmployment',
    headerName: 'Employment Date',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{formatDateToReadableFormat(row.dateOfEmployment)}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 120,
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
    flex: 0.1,
    field: 'id',
    minWidth: 140,
    headerName: 'User ID',

    renderCell: ({ row }) => (
      <Typography component={TypographyStyled} sx={{fontSize: '13px'}}>{`${row.identificationNumber}`}</Typography>
    )
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
  const [page, setPage] = useState(0)
  const [key, setKey] = useState('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [showModal, setShowModal] = useState(false)
  const [refetch, setFetch] = useState(false)
  const [openEditDrawer, setEditDrawer] = useState(false)
  const [openDeleteModal, setDeleteModal] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState()
  const [staffToUpdate, setStaffToUpdate] = useState(null)
  const [openViewDrawer, setViewDrawer] = useState(false)
  const [staffInView, setStaffInView] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)

    // ** Hooks
    const dispatch = useDispatch()

  const [StaffData, loading, paging] = useStaff()

  const rowOptionsOpen = (anchorEl)

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
    handleRowOptionsClose()
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
          dispatch(fetchStaffs({page: 1, key}))
          doCancelDelete()
        }
    })
   
  }

  const setStaffToEdit = (value) => {
    handleRowOptionsClose()
    setEditDrawer(true)
    setStaffToUpdate(value)
  }

  const closeEditModal = ()=> setEditDrawer(false)

  const setStaffToView = (value) => {
    handleRowOptionsClose()
    setViewDrawer(true)
    setStaffInView(value)
  }

  const closeViewModal = ()=> setViewDrawer(false)

  useEffect(() => {
    dispatch(fetchStaffs({page: page + 1, key}))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, key, refetch])


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

          <Tooltip title='View Staff'>
            <IconButton size='small' onClick={() => setStaffToView(row)}>
              <Icon icon='tabler:eye' />
            </IconButton>
          </Tooltip>

          <Tooltip title='Delete Staff'>
           <IconButton size='small' onClick={() => doDelete(row)}>
                          <Icon icon='tabler:trash' />
                        </IconButton>
          </Tooltip>
          

        </Box>

      )
    }
  ]

  return (
    <Fragment>
    <DatePickerWrapper>

        <Stats data={StaffData} statTitle={'Staff'}/>

        <PageHeader  action="Add Staff" toggle={toggleModal} handleFilter={setKey}/>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <DataGrid
              autoHeight
              pagination
              rowHeight={62}
              rows={StaffData?.result?.length ? StaffData?.result : []}
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
    {openEditDrawer && 
    <UpdateStaff
          open={openEditDrawer}
          closeModal={closeEditModal}
          refetchStaffs={updateFetch}
          selectedStaff={staffToUpdate}
        />}
        {openViewDrawer && 
    <ViewStaff
          open={openViewDrawer}
          closeCanvas={closeViewModal}
          staffUser={staffInView}
        />}

    <AddStaff open={showModal} closeModal={toggleModal} refetchStaffs={updateFetch}/>
    <DeleteDialog open={openDeleteModal} handleClose={doCancelDelete} handleDelete={ondeleteClick} />
    </Fragment>
  )
}

export default Staffs
