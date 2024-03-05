// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Components
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'

import { styled, Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiTabList from '@mui/lab/TabList'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import DeductionsHome from './DeductionsHome'
import PayslipsHome from './PayslipHome'

const TabList = styled(MuiTabList)(({ theme }) => ({
  borderBottom: '0 !important',
  '&, & .MuiTabs-scroller': {
    boxSizing: 'content-box',
    padding: theme.spacing(1.25, 1.25, 2),
    margin: `${theme.spacing(-1.25, -1.25, -2)} !important`
  },
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root': {
    minWidth: 65,
    minHeight: 38,
    lineHeight: 1,
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      color: theme.palette.primary.main
    },
    [theme.breakpoints.up('sm')]: {
      minWidth: 130
    }
  }
}))

const PayrollTab = ({ tab }) => {
  // ** State
  const [activeTab, setActiveTab] = useState(tab)

  // ** Hooks
  const router = useRouter()
  const hideText = useMediaQuery(theme => theme.breakpoints.down('sm'))

  const handleChange = (e, value) => {
    setActiveTab(value)

    // router.push({
    //   pathname: `/users/products/finishedProducts/${value.toLowerCase()}`
    // })
  }

  useEffect(() => {
    if (tab && tab !== activeTab) {
      setActiveTab(tab)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])

  const tabContentList = {
    payroll: <PayslipsHome />,
    deductions: <DeductionsHome />
  }

  return (
    <Grid container spacing={6}>
      {activeTab === undefined ? null : (
        <Grid item xs={12}>
          <TabContext value={activeTab}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <TabList variant='scrollable' scrollButtons='auto' onChange={handleChange} aria-label='payroll tabs'>
                  <Tab
                    value='payroll'
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                        <Icon fontSize='1.125rem' icon='fluent:payment-16-regular' />
                        {!hideText && 'Payroll'}
                      </Box>
                    }
                  />
                  <Tab
                    value='deductions'
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                        <Icon fontSize='1.125rem' icon='ic:twotone-minus' />
                        {!hideText && 'Deductions'}
                      </Box>
                    }
                  />
                </TabList>
              </Grid>
              <Grid item xs={12}>
                <TabPanel sx={{ p: 0 }} value={activeTab}>
                  {tabContentList[activeTab]}
                </TabPanel>
              </Grid>
            </Grid>
          </TabContext>
        </Grid>
      )}
    </Grid>
  )
}

export default PayrollTab
