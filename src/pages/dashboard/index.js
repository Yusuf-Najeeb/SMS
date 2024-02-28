import { Grid } from '@mui/material'
import React from 'react'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import EcommerceEarningReports from 'src/views/dashboards/ecommerce/EcommerceEarningReports'
import EcommercePopularProducts from 'src/views/dashboards/ecommerce/EcommercePopularProducts'
import AnalyticsWebsiteAnalyticsSlider from '../../views/dashboards/analytics/AnalyticsWebsiteAnalyticsSlider'
import CurrentSession from './Session'
import Statistics from './Statistics'
import UsercardInDasboard from './Student/UserCard'
import GetUserData from '../../@core/utils/getUserData'
import GuardianCardInDasboard from './Guardian/UserCard'
import GuardianStatistics from './Guardian/Statistics'
import WardTable from './Guardian/WardTable'
import NonTeachingStaffCardInDasboard from './NonTeachingStaff/StaffCard'
import TeacherCardInDasboard from './Teacher/TeacherCard'
import TeacherStatistics from './Teacher/TeacherStatistics'
import TeacherSubjects from './Teacher/Subjects'
import GuardianTable from './Student/GuardianTable'
import StudentSubjects from './Student/Subjects'

// import StoreStatistics from 'src/views/users/dashboard/StoreStatistics'
// import TopPopularCustomers from 'src/views/users/dashboard/TopPopularCustomers'

// import TopPopularProducts from 'src/views/users/dashboard/TopPopularProducts'

// import UsercardInDasboard from 'src/views/users/dashboard/UsercardInDasboard'

const UsersDashboard = () => {

 

    const userData = GetUserData() 
  

  console.log(userData, 'userData')

  if(userData?.role?.name == 'student') {
    return  (
      <ApexChartWrapper>
      <Grid container spacing={6}>

      <Grid item xs={12} md={4}>
          <UsercardInDasboard user={userData} />
        </Grid>

        <Grid item xs={12} md={4}>
          <CurrentSession />
        </Grid>

        <Grid item xs={12} md={8}>
          <GuardianTable user={userData} />
        </Grid>

        <Grid item xs={12} md={4}>
            <StudentSubjects user={userData} />
          </Grid>

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

  if(userData?.role?.name == 'parent') {
    return  (
      <ApexChartWrapper>
      <Grid container spacing={6}>

      <Grid item xs={12} md={4}>
          <GuardianCardInDasboard user={userData} />
        </Grid>

        <Grid item xs={12} md={4}>
          <CurrentSession />
        </Grid>

        <Grid item xs={12} md={4}>
          <GuardianStatistics user={userData} />
        </Grid>

        <Grid item xs={12} md={6} lg={8}>
          <WardTable user={userData} />
        </Grid>

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

  if(userData?.role?.name == 'teacher') {
    return (
      <ApexChartWrapper>
        <Grid container spacing={6}>

        

        <Grid item xs={12} md={4}>
            <TeacherCardInDasboard user={userData}  />
          </Grid>
  
        <Grid item xs={12} md={4}>
            <CurrentSession />
          </Grid>
  
          <Grid item xs={12} md={4}>
            <TeacherStatistics user={userData} />
          </Grid>
  
          <Grid item xs={12} md={4}>
            <TeacherSubjects user={userData} />
          </Grid>
  
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

  if(userData?.role?.name == 'super-admin') {
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

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>

      <Grid item xs={12} md={4}>
          <NonTeachingStaffCardInDasboard user={userData} />
        </Grid>

      <Grid item xs={12} md={4}>
          <CurrentSession />
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
