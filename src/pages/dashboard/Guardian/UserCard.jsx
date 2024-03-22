import { useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Next Import
import { useRouter } from 'next/router'
import { startCase } from 'lodash'
import { useClasses } from '../../../hooks/useClassess'
import { Box } from '@mui/system'
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CustomAvatar from 'src/@core/components/mui/avatar'
import { formatDateToReadableFormat } from '../../../@core/utils/format'
import { getStudentsUnderGuardian } from '../../../store/apps/guardian/asyncthunk'

const Illustration = styled('img')(({ theme }) => ({
  right: 20,
  bottom: 0,
  position: 'absolute',
  [theme.breakpoints.down('sm')]: {
    right: 5,
    width: 110
  }
}))

const GuardianCardInDasboard = ({user}) => {
  const [hydrated, setHydrated] = useState(false)
  const [classRoom, setClassRoom] = useState('')

  

  const [ClassesList] = useClasses()

  // ** Hooks
  const router = useRouter()

  const handleRedirectToSale = (url) => {
    if (url) {
      router.push(url)
    }
  }

  useEffect(()=>{
    if(user){
        getStudentsUnderGuardian(user?.email)
    }
  },[user])

  useEffect(()=>{
    if(ClassesList && user){
        const name = ClassesList.find(c => c.id === user.classId)

        let nameOfClass = name?.name
        let typeOfClass = name?.type

        setClassRoom(`${nameOfClass} ${typeOfClass}`)
    }

  },[ClassesList, user])

  useEffect(() => {
    // This forces a rerender, so the date is rendered
    // the second time but not the first
    setHydrated(true)
  }, [])

  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null
  }

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant='h5' sx={{ mb: 0.5, textTransform: 'uppercase' }} >
          Welcome  {user?.firstName || 'user'} 🎉
        </Typography>

        {/* <Typography variant='h4' sx={{ mb: 0.75, color: 'primary.main' }}></Typography> */}
        <Typography  sx={{ mb: 2, color: 'text.secondary', textTransform: 'uppercase' }}>User ID: {user?.identificationNumber}</Typography>
        <Typography variant='h5' sx={{ mb: 2, color: 'primary.main', textTransform: 'uppercase' }}>Role: {user?.role.name}</Typography>
        

        <Box sx={{ mr: 8, display: 'flex', alignItems: 'center' }}>
                <CustomAvatar skin='light' variant='rounded' sx={{ mr: 2.5, width: 38, height: 38 }}>
                  <Icon fontSize='1.75rem' icon='mdi:account-payment' />
                </CustomAvatar>
                <div>
                  <Typography variant='body2'>No Outstanding Bills</Typography>
                  {/* <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
                    {formatDateToReadableFormat(user?.registrationDate) || 'No available date'}
                  </Typography> */}
                </div>
              </Box>

        {/* <Button variant='contained' onClick={() => handleRedirectToSale('/users/sales')}>
          View Sales
        </Button> */}

        <Illustration width={116} alt='congratulations john' src='/images/cards/congratulations-john.png' />
      </CardContent>
    </Card>
  )
}

export default GuardianCardInDasboard
