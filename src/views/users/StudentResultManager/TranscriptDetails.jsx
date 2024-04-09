import { Box, Grid, Stack, Typography } from '@mui/material'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { formatDateToReadableFormat, formatFirstLetter } from '../../../@core/utils/format'

const StudentTranscriptDetails = ({ activeStudent, profilePictureUrl, classRoom, SessionData }) => {
  return (
    <Grid container>
      <Grid item xs={12} sm={3} lg={3}>
        <Stack spacing={2}>
          <Box>
            <Typography sx={{ fontWeight: 700, color: '#666' }}>Name:</Typography>

            <Typography sx={{ color: '#666', textTransform: 'uppercase' }}>
              {`${activeStudent?.firstName} ${activeStudent?.lastName}`}
            </Typography>
          </Box>

          <Box>
            <Typography sx={{ fontWeight: 700, color: '#666' }}>Gender:</Typography>

            <Typography sx={{ color: '#666', textTransform: 'uppercase' }}>{`${activeStudent?.gender} `}</Typography>
          </Box>
        </Stack>
      </Grid>

      <Grid item xs={12} sm={3} lg={3}>
        <Stack spacing={2}>
          <Box>
            <Typography sx={{ fontWeight: 700, color: '#666' }}>Class:</Typography>

            <Typography sx={{ color: '#666', textTransform: 'uppercase' }}>{`${classRoom} `}</Typography>
          </Box>

          <Box>
            <Typography sx={{ fontWeight: 700, color: '#666' }}>Date of Birth:</Typography>

            <Typography sx={{ color: '#666', textTransform: 'uppercase' }}>
              {formatDateToReadableFormat(activeStudent.dateOfBirth)}
            </Typography>
          </Box>
        </Stack>
      </Grid>

      <Grid item xs={12} sm={3} lg={3}>
        <Stack spacing={2}>
          <Box>
            <Typography sx={{ fontWeight: 700, color: '#666' }}>Session:</Typography>

            <Typography sx={{ color: '#666', textTransform: 'uppercase' }}>{`${SessionData?.session} `}</Typography>
          </Box>

          <Box>
            <Typography sx={{ fontWeight: 700, color: '#666' }}>Term:</Typography>

            <Typography sx={{ color: '#666', textTransform: 'uppercase' }}>{`${SessionData?.term} `}</Typography>
          </Box>
        </Stack>
      </Grid>

      <Grid item xs={12} sm={3} lg={3}>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
          {profilePictureUrl.includes('uploads') ? (
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
      </Grid>
    </Grid>
  )
}

export default StudentTranscriptDetails
