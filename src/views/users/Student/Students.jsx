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
import MenuItem from '@mui/material/MenuItem'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { DataGrid } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import format from 'date-fns/format'
import DatePicker from 'react-datepicker'

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
import { formatDate,  } from '../../../@core/utils/format'
import DeleteDialog from '../../../@core/components/delete-dialog'
import { fetchStudents } from '../../../store/apps/Student/asyncthunk'
import { useStudent } from '../../../hooks/useStudent'
import AddStudent from './AddStudent'
import Stats from '../component/Stats'
import PageHeaderWithSearch from '../component/PageHeaderWithSearch'
import EditStudent from './EditStudent'
import { Menu } from '@mui/material'

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
    flex: 0.25,
    field: 'email',
    minWidth: 260,
    headerName: 'Student',
    renderCell: ({ row }) => {
      const {  firstName, lastName, email, } = row

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
    headerName: 'religion',
    renderCell: ({ row }) => <Typography variant='body2'  sx={{ color: 'text.secondary' }}>{row.religion || '--'}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: 'ethnicity',
    headerName: 'Tribe',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.ethnicity || '--'}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: 'gender',
    headerName: 'Gender',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.gender}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: 'dateOfBirth',
    headerName: 'Date of Birth',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{formatDate(row.dateOfBirth)}</Typography>
  },

  {
    flex: 0.1,
    field: 'id',
    minWidth: 140,
    headerName: 'USER ID',

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
const AllStudents = () => {
  // ** State
  const [page, setPage] = useState(0)
  const [key, setKey] = useState('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [showModal, setShowModal] = useState(false)
  const [refetch, setFetch] = useState(false)
  const [openEditDrawer, setEditDrawer] = useState(false)
  const [openDeleteModal, setDeleteModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState()
  const [studentToUpdate, setStudentToUpdate] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = (anchorEl)

  

  // ** Hooks
  const dispatch = useDispatch()

  const [StudentData, loading, paging] = useStudent()


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
    setSelectedStudent(value?.id)
    handleRowOptionsClose()
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

  const setStudentToEdit = (value) => {
    setEditDrawer(!openEditDrawer)
    setStudentToUpdate(value)
    handleRowOptionsClose()
  }

  const closeEditModal = ()=> setEditDrawer(!openEditDrawer)


  useEffect(()=>{
    dispatch(fetchStudents({page: page + 1, key}))

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
          <MenuItem onClick={() => setStudentToEdit(row)} sx={{ '& svg': { mr: 2 } }}>
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
    <Stats data={StudentData} statTitle={'Students'}/>

        <PageHeaderWithSearch searchPlaceholder={'Search Student'} action="Add Student" toggle={toggleModal} handleFilter={setKey}/>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <DataGrid
              autoHeight
              pagination
              rowHeight={62}
              rows={StudentData?.result?.length ? StudentData?.result : []}
              columns={columns}

            //   checkboxSelection

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

    <DeleteDialog open={openDeleteModal} handleClose={doCancelDelete} handleDelete={ondeleteClick} />
    <AddStudent open={showModal} closeModal={toggleModal} refetchData={updateFetch}  />
    <EditStudent open={openEditDrawer} selectedStudent={studentToUpdate} fetchData={updateFetch} closeModal={closeEditModal}/>
    </Fragment>
  )
}

export default AllStudents
