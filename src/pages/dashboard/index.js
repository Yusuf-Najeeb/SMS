import { Grid } from '@mui/material'
import React from 'react'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import EcommerceEarningReports from 'src/views/dashboards/ecommerce/EcommerceEarningReports'
import EcommercePopularProducts from 'src/views/dashboards/ecommerce/EcommercePopularProducts'
import AnalyticsWebsiteAnalyticsSlider from '../../views/dashboards/analytics/AnalyticsWebsiteAnalyticsSlider'
import CurrentSession from './Session'
import Statistics from './Statistics'

// import StoreStatistics from 'src/views/users/dashboard/StoreStatistics'
// import TopPopularCustomers from 'src/views/users/dashboard/TopPopularCustomers'

// import TopPopularProducts from 'src/views/users/dashboard/TopPopularProducts'

// import UsercardInDasboard from 'src/views/users/dashboard/UsercardInDasboard'

const UsersDashboard = () => {


  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>

      <Grid item xs={12} md={4}>
          <CurrentSession />
        </Grid>

        <Grid item xs={12} md={8}>
          <Statistics />
        </Grid>

        {/* <Grid item xs={12} md={7}>
          <StoreStatistics />
        </Grid> */}

        {/* <Grid item xs={12} md={6} lg={4}>
          <EcommerceEarningReports />
        </Grid> */}

        {/* <Grid item xs={12} md={6} lg={4}>
          <TopPopularProducts />
        </Grid> */}

        {/* <Grid item xs={12} md={6} lg={4}>
          <TopPopularCustomers />
        </Grid> */}

      </Grid>
    </ApexChartWrapper>
  )
}

export default UsersDashboard
