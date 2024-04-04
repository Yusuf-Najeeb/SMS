// ** React Imports
import { useState, Fragment } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'

import { styled } from '@mui/material/styles'
import { useAppDispatch } from 'src/hooks'
import SearchSpinner from 'src/@core/components/custom-spinner/SearchSpinner'
import { searchParent } from '../../../store/apps/guardian/asyncthunk'
import { Drawer, IconButton, Input, TableHead } from '@mui/material'
import { Header } from '../staff/ViewStaff'
import { CustomCloseIcon, CustomSearchIcon } from '../component/CustomIcons'

const CustomCloseButton = styled(IconButton)(({ theme }) => ({
  top: 0,
  right: 0,
  color: 'grey.500',
  position: 'absolute',
  zIndex: 50,
  boxShadow: theme.shadows[2],
  transform: 'translate(10px, -10px)',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${theme.palette.background.paper} !important`,
  transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
  '&:hover': {
    transform: 'translate(7px, -5px)'
  }
}))

const SearchParent = ({ openModal, closeModal, itemsArray, setItemsArray }) => {
  const dispatch = useAppDispatch()

  const [queryParents, setQueryParents] = useState([])
  const [isFocus, setIsFocus] = useState(false)

  //   const [value, setValue] = useState<string>('')
  const [searching, setSearching] = useState(false)

  //   const [itemsArray, setItemsArray] = useState([])
  const handleFocus = () => {
    setIsFocus(true)
  }

  const handleSearchChange = async value => {
    setSearching(true)

    searchParent(value).then(res => {
      // Check if response is not empty before setting it
      if (res && res.length > 0) {
        setQueryParents(res)
        setSearching(false)
      } else {
        setQueryParents([])
        setSearching(false)
      }
    })
  }

  const handleAddParent = value => {
    const firstName = value.firstName
    const lastName = value.lastName
    const id = value.id
    const gender = value.gender

    if (firstName && lastName && id && gender) {
      const newItem = {
        firstName,
        lastName,
        gender,
        id
      }

      setItemsArray(prevItems => [...prevItems, newItem])
    }
  }

  const removeitem = parentId => {
    const filteredItems = itemsArray.filter(item => item.id !== parentId)

    setItemsArray(filteredItems)
  }

  const scrollToBottom = () => {
    window.scrollTo({ behavior: 'smooth', top: 1000 })
  }

  return (
    <Drawer
      open={openModal}
      anchor='right'
      variant='temporary'
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 800, sm: 800 } } }}
    >
      <Header>
        <div className='iconBtnWrapper'>
          <IconButton
            className='iconBtn'
            size='small'
            onClick={closeModal}
            sx={{
              borderRadius: 1,
              color: 'text.primary',
              backgroundColor: 'action.selected',
              '&:hover': {
                backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.16)`
              }
            }}
          >
            <CustomCloseIcon />
          </IconButton>
        </div>
      </Header>

      <Card>
        <Box sx={{ mx: 4, my: 4 }}>
          <FormControl variant='standard' sx={{ width: '100%' }}>
            <Input
              sx={{ padding: '2px', maxWidth: '100%' }}
              onBlur={e => {
                handleSearchChange(e.target.value)
                setIsFocus(false)
              }}
              onFocus={handleFocus}
              placeholder='Search Guardian'
              id='input-with-icon-adornment'
              endAdornment={
                <InputAdornment position='start' sx={{ cursor: 'pointer' }}>
                  <CustomSearchIcon />
                </InputAdornment>
              }
            />
            {isFocus ? <Typography variant='caption'>Search by First name, Last name Guardian ID</Typography> : null}
          </FormControl>
        </Box>

        <TableContainer component={Paper} sx={{ maxHeight: 840 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableBody>
              {searching ? (
                <TableRow className='text-center'>
                  <TableCell colSpan={6}>
                    <SearchSpinner />
                  </TableCell>
                </TableRow>
              ) : (
                <Fragment>
                  {queryParents.map(prods => (
                    <Fragment key={prods.id}>
                      <TableRow
                        hover
                        sx={{ cursor: 'pointer' }}
                        onClick={() => {
                          scrollToBottom()
                          handleAddParent(prods)
                        }}
                      >
                        <TableCell>
                          <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
                            {prods.firstName}
                          </Typography>
                          {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          </Box> */}
                        </TableCell>

                        <TableCell>
                          <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
                            {prods.lastName}
                          </Typography>
                          {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>

                          </Box> */}
                        </TableCell>
                      </TableRow>
                    </Fragment>
                  ))}

                  {queryParents.length === 0 && !searching && (
                    <tr className='text-center'>
                      <td colSpan={6}>
                        <Typography
                          sx={{
                            my: 6,
                            color: 'text.secondary',
                            textAlign: 'center',
                            display: 'flex',
                            justifyContent: 'center'
                          }}
                        >
                          Oops! 😖 No Guardian Available.
                        </Typography>
                      </td>
                    </tr>
                  )}
                </Fragment>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mx: 4, my: 4 }}>
          <Card>
            <TableContainer component={Paper} sx={{ maxHeight: 840 }}>
              <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                  <TableRow>
                    <TableCell align='center' sx={{ minWidth: 100 }}>
                      First Name
                    </TableCell>
                    <TableCell align='center' sx={{ minWidth: 80, maxWidth: 80 }}>
                      Last Name
                    </TableCell>
                    <TableCell align='center' sx={{ minWidth: 100 }}>
                      Gender
                    </TableCell>
                    <TableCell align='center' sx={{ minWidth: 100 }}>
                      ACTIONS
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {itemsArray.map(item => (
                    <TableRow hover key={item.id}>
                      <TableCell align='center'>{item.firstName}</TableCell>
                      <TableCell align='center'>{item.lastName}</TableCell>
                      <TableCell align='center'>{item.gender}</TableCell>
                      <TableCell align='center'>
                        <div
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            removeitem(item.id)
                          }}
                        >
                          🗑️
                        </div>
                        {/* <IconButton
                    size='small'
                    onClick={() => {
                        removeitem(item.id)
                    }}
                  >
                    <Icon icon='tabler:trash' />
                  </IconButton> */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Box>
      </Card>
    </Drawer>
  )
}

export default SearchParent
