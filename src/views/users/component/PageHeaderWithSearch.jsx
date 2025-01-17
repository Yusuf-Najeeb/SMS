// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import * as React from 'react'
import Input from '@mui/material/Input'
import { Typography } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const PageHeaderWithSearch = ({ toggle, action, handleFilter, searchPlaceholder }) => {
  const [isFocus, setIsFocus] = React.useState(false)

  const handleFocus = () => {
    setIsFocus(true)
  }

  return (
    <Box
      sx={{
        py: 4,
        px: 6,
        rowGap: 2,
        columnGap: 4,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-end'

        // justifyContent: 'flex-end',
      }}
    >
      <Box sx={{ '& > :not(style)': { marginTop: null } }}>
        <FormControl variant='standard'>
          <Input
            sx={{ padding: '2px' }}
            onBlur={e => {
              handleFilter(e.target.value)
              setIsFocus(false)
            }}
            onFocus={handleFocus}
            placeholder={searchPlaceholder}
            id='input-with-icon-adornment'
            endAdornment={
              <InputAdornment position='start' sx={{ cursor: 'pointer' }}>
                <Icon icon='el:search-alt' />
              </InputAdornment>
            }
          />
          {isFocus ? <Typography variant='caption'>Search by First name, Last name or ID</Typography> : null}
        </FormControl>
      </Box>

      <Button onClick={toggle} variant='contained' sx={{ '& svg': { mr: 2 } }}>
        <Icon fontSize='1.125rem' icon='tabler:plus' />
        {action}
      </Button>
    </Box>
  )
}

export default PageHeaderWithSearch
