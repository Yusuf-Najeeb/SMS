import { Box, Stack, Typography } from '@mui/material'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { formatDate, formatFirstLetter } from '../../../@core/utils/format'

const StudentReportCardDetails = ({activeStudent,profilePictureUrl, classRoom, CurrentSessionData , nextAcadmeicSession}) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Stack spacing={2} sx={{width: '30%', }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between',  }}>
              <Typography sx={{  fontWeight: 700, color: '#666' }}>Name:</Typography>

              <Typography sx={{ color: '#666', textTransform: 'uppercase' }}>
                {`${activeStudent?.firstName} ${activeStudent?.lastName}`}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography sx={{ color: '#666', fontWeight: 700 }}>Gender:</Typography>

              <Typography sx={{ color: '#666', textTransform: 'uppercase' }}>
                {`${activeStudent?.gender} `}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography sx={{ color: '#666', fontWeight: 700 }}>Class:</Typography>

              <Typography sx={{ color: '#666', textTransform: 'uppercase' }}>
                {`${classRoom?.name} ${classRoom?.type} `}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography sx={{ color: '#666', fontWeight: 700 }}>Session:</Typography>

              <Typography sx={{ color: '#666', textTransform: 'uppercase' }}>
                {`${CurrentSessionData?.name} `}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography sx={{ color: '#666', fontWeight: 700 }}>Term:</Typography>

              <Typography sx={{ color: '#666', textTransform: 'uppercase' }}>
                {`${CurrentSessionData?.term} `}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography sx={{ color: '#666', fontWeight: 700 }}>Next Term Begins:</Typography>

              <Typography sx={{ color: '#666', textTransform: 'uppercase' }}>
                {formatDate(nextAcadmeicSession?.startDate) || '--'}
              </Typography>
            </Box>
          </Stack>
          <Box sx={{width: '20%', display: 'flex', justifyContent:"flex-end"}}>
          {(profilePictureUrl.includes('uploads')) ? (
                <CustomAvatar
                  src={profilePictureUrl}
                  variant='square'
                  alt={`${formatFirstLetter(activeStudent?.firstname)} ${formatFirstLetter(activeStudent?.lastname)}`}
                  sx={{ width: 120, height: 120, mb: 4 }}
                />
              ) : (
                <CustomAvatar
                  skin='light'
                  color='info'
                  variant='rounded'
                  sx={{
                    mr: 2.5,
                    width: 100,
                    height: 100,
                    fontWeight: 500,
                    fontSize: theme => theme.typography.h2.fontSize
                  }}
                >
                  {`${activeStudent?.firstName[0]} ${activeStudent?.lastName[0]}`}
                </CustomAvatar>
              )}
          </Box>
        </Box>
  )
}

export default StudentReportCardDetails