// ** MUI Imports
import { Stack, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useStaff } from '../../../hooks/useStaff'

const PageHeader = ({ month, toggle, toggleSend, action1, action2 }) => {

  const [StaffsData] = useStaff()

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
        justifyContent: 'space-between'
      }}
    >
      <Box sx={{}}>
        <Typography>{month}</Typography>
      </Box>

      <Stack direction='row' justifyContent='space-between' spacing={4}>
        <Button onClick={toggleSend} variant='outlined' disabled={StaffsData?.result?.length == 0} sx={{ '& svg': { mr: 2 } }}>
          <Icon fontSize='1.125rem' icon='prime:send' />
          {action1}
        </Button>

        <Button onClick={toggle} variant='contained' disabled={StaffsData?.result?.length == 0} sx={{ '& svg': { mr: 2 } }}>
          <Icon fontSize='1.125rem' icon='tabler:plus' />
          {action2}
        </Button>
      </Stack>
    </Box>
  )
}

export default PageHeader
