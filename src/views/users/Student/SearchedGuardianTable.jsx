import React, { Fragment } from 'react'

import { Alert, Grid, Typography } from '@mui/material'

const SearchedGuardianTable = ({ tableData }) => {
  return (
    
    // <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>

    <Fragment>
      {tableData?.length > 0 && (
        <Grid item sx={{ mt: 5 }} xs={12} sm={12} md={12}>
          <Typography variant='h5'>Selected Guardian</Typography>
          <Alert severity='success'>
            {tableData?.map((guardian, index) => (
              <Fragment key={guardian.id}>
                {index > 0 && ', '}
                <span>{`${index + 1}. ${guardian?.firstName} ${guardian?.lastName}`}</span>
              </Fragment>
            ))}
          </Alert>
        </Grid>
      )}
    </Fragment>
  )
}

export default SearchedGuardianTable
