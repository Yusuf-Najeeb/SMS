// ** MUI Imports
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'

import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { Grid } from '@mui/material'

// ** Custom Components Imports
import CardSnippet from 'src/@core/components/card-snippet'

// ** Source code imports
import * as source from 'src/views/components/list/ListSourceCode'

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL

const renderClient = row => {
  const initials = `${row.firstName} ${row.lastName}`
  if (row?.profilePicture !== null && row?.profilePicture?.length) {
    return (
      <CustomAvatar
        src={`${backendURL?.replace('api', '')}/${row?.profilePicture}`}
        sx={{ mr: 2.5, width: 38, height: 38 }}
      />
    )
  } else {
    return (
      <CustomAvatar
        skin='light'

        // color={row?.title.length > 2 ? 'primary' : 'secondary'}
        color='info'
        sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: theme => theme.typography.body1.fontSize }}
      >
        {`${row?.firstName[0]} ${row.lastName[0]}`}
      </CustomAvatar>
    )
  }
}

const StyledList = styled(List)(({ theme }) => ({
  '& .MuiListItem-container': {
    border: `1px solid ${theme.palette.divider}`,
    '&:first-of-type': {
      borderTopLeftRadius: theme.shape.borderRadius,
      borderTopRightRadius: theme.shape.borderRadius
    },
    '&:last-child': {
      borderBottomLeftRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius
    },
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '& .MuiListItem-root': {
      paddingRight: theme.spacing(24)
    },
    '& .MuiListItemText-root': {
      marginTop: 0,
      '& .MuiTypography-root': {
        fontWeight: 500
      }
    }
  }
}))

const ListStudents = ({Users, ClassList}) => {
  return (

    <Grid container spacing={6}>
    <Grid item xs={12} md={12}>

    <Typography sx={{mt: 3, mb: 3, fontWeight: 700}}>Students</Typography>

    {/* <CardSnippet
      title={CardSnippetTitle}
      code={{
        tsx: null,
        jsx: source.ListUsersJSXCode
      }}
    >
        </CardSnippet> */}
    <StyledList disablePadding>
        {Users.map((user, i)=>{
            
            const classRoom =  ClassList.find((classs)=> classs.id == user.id)

           return (

      <ListItem key={i}>
        <ListItemAvatar>
          {/* <Avatar src='/images/avatars/2.png' alt='Caroline Black' /> */}

          {renderClient(user)}

        </ListItemAvatar>
        <div>
          <ListItemText primary={`${user.firstName} ${user.lastName}`} />
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            <Box sx={{ mr: 3, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'success.main' } }}>
              <Icon icon='mdi:google-classroom' fontSize='0.625rem' />
              <Typography variant='caption'>{`${classRoom?.name} ${classRoom?.type}`}</Typography>
            </Box>

            {/* <Typography variant='caption' sx={{ color: 'text.disabled' }}>
              {user?.religion}
            </Typography> */}
          </Box>
        </div>
        <ListItemSecondaryAction>
           {user.status ? (
                              <CustomChip
                                rounded
                                skin='light'
                                size='small'
                                label={'Active'}
                                color='success'
                                sx={{ textTransform: 'capitalize' }}
                              />
                            ) : (
                              <CustomChip
                                rounded
                                skin='light'
                                size='small'
                                label={'Inactive'}
                                color='error'
                                sx={{ textTransform: 'capitalize' }}
                              />
                            )}
        </ListItemSecondaryAction>
      </ListItem>
        )})}
     
    </StyledList>

</Grid>
    </Grid>
  )
}

export default ListStudents
