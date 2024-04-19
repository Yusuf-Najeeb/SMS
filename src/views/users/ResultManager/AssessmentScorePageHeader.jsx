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

const PageHeader = ({ toggle1, toggle2  }) => {
  const [isFocus, setIsFocus] = React.useState(false)

  const handleFocus = () => {
    setIsFocus(true)
  }

  return (
    <Box
      sx={{
        py: 4,
        px: 6,
        mt: 5,
        mb:5,
        rowGap: 2,
        columnGap: 4,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-end'

        // justifyContent: 'flex-end',
      }}
    >
       <Button onClick={toggle1} variant='contained' sx={{ '& svg': { mr: 2 }, backgroundColor: 'info.light'  }}>
        <Icon fontSize='1.125rem' icon='material-symbols-light:cloud-download' />
        Download Scoresheet Template
      </Button>

      <Button onClick={toggle2} variant='contained' sx={{ '& svg': { mr: 2 }, backgroundColor: 'success.light' }}>
        <Icon fontSize='1.125rem' icon='gridicons:cloud-upload' />
        Upload Scoresheet
      </Button>
    </Box>
  )
}

export default PageHeader
