import React, { SyntheticEvent } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import MuiTabList from '@mui/lab/TabList'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import PaymentDashboard from './PaymentDashboard'
import CategoriesTable from './Categories/CategoriesTable'
import SubjectsTable from './Subjects/SubjectsTable'

// import StaffDashboard from './staffSettings/StaffDashboard'

// import DesignationTable from './Designations/DesignationTable'
// import DesignationDashboard from './Designations/DesignationDashboard'
// import RolesDashboard from './roles/RolesDashboard'
// import BrandDashboard from './productbrandSettings/BrandDashboard'
// import UnitDashboard from './unitsettings/UnitDashboard'
// import CurrencyDashboard from './currency/CurrencyDashboard'
// import TaxDashboard from './taxes/TaxDashboard'
// import StoreForm from './store-settings/StoreForm'


// Styled TabList component
const MuiBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  marginTop: theme.spacing(6),
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column'
  }
}))

const TabList = styled(MuiTabList)(({ theme }) => ({
  borderRight: 0,
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
    minWidth: 280,
    lineHeight: 1,
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    color: theme.palette.text.primary,
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      color: theme.palette.primary.main
    },
    '& svg': {
      marginBottom: 0,
      marginRight: theme.spacing(2)
    },
    [theme.breakpoints.down('md')]: {
      maxWidth: '100%'
    }
  }
}))

const TabSettings = [
  {
    id: 'payment-method',
    title: 'Manage Payment Methods',
    subtitle: 'Manage and view all payment methods',
    icon: 'fxemoji:creditcard',
    item: <PaymentDashboard />
  },

    {
    id: 'desc-settings',
    title: 'Manage Categories',
    subtitle: 'Create/Edit categories',
    icon: 'material-symbols:category-outline',
    item: <CategoriesTable />
  },

  {
    id: 'users-settings',
    title: 'Manage Subjects',
    subtitle: 'Create/Edit subjects',
    icon: 'emojione-monotone:books',
    item: <SubjectsTable />
  },

//   {
//     id: 'roles-settings',
//     title: 'Manage Roles',
//     subtitle: 'Create/edit store roles',
//     icon: 'la:user-tag',
//     item: <RolesDashboard />
//   },
//   {
//     id: 'brands-settings',
//     title: 'Brands',
//     subtitle: 'Manage Brands settings',
//     icon: 'tabler:align-box-center-middle-filled',
//     item: <BrandDashboard />
//   },
//   {
//     id: 'unit-settings',
//     title: 'Manage Units',
//     subtitle: 'Manage Product Units settings',
//     icon: 'vaadin:scale',
//     item: <UnitDashboard />
//   },
//   {
//     id: 'currency-settings',
//     title: 'Manage Currencies',
//     subtitle: 'Manage store currency settings',
//     icon: 'ri:currency-line',
//     item: <CurrencyDashboard />
//   },
//   {
//     id: 'tax-settings',
//     title: 'Manage Tax',
//     subtitle: 'Manage Store Tax',
//     icon: 'mdi:hand-coin-outline',
//     item: <TaxDashboard />
//   },
//   {
//     id: 'store-settings',
//     title: 'Manage Store',
//     subtitle: 'Manage Store Details',
//     icon: 'iconamoon:store',
//     item: <StoreForm />
//   }
]

const SettingsMain = ({ activeTab, handleChange }) => {
  const renderTabContent = () => {
    return TabSettings.map(tab => {
      return (
        <TabPanel key={tab.id} value={tab.id} sx={{ p: 6.5, pt: 0, width: '100%' }}>
          <Box key={tab.id}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomAvatar skin='light' variant='rounded' sx={{ height: 48, width: 48 }}>
                <Icon icon={tab.icon} fontSize='2.25rem' />
              </CustomAvatar>
              <Box sx={{ ml: 4 }}>
                <Typography variant='h4'>{tab.title}</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{tab.subtitle}</Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 6 }}>{tab.item}</Box>
          </Box>
        </TabPanel>
      )
    })
  }

  const renderTabs = () => {
    return TabSettings.map(tab => {
      return <Tab key={tab.id} value={tab.id} label={tab.title} icon={<Icon icon={tab.icon} />} />
    })
  }

  return (
    <MuiBox>
      <TabContext value={activeTab}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <TabList orientation='vertical' onChange={handleChange}>
            {renderTabs()}
          </TabList>
          <Box
            sx={{
              mt: 5.5,
              display: 'flex',
              justifyContent: 'center',
              '& img': { maxWidth: '100%', display: { xs: 'none', md: 'block' } }
            }}
          >
            <img src='/images/pages/faq-illustration.png' alt='illustration' width='230' />
          </Box>
        </Box>
        {renderTabContent()}
      </TabContext>
    </MuiBox>
  )
}

export default SettingsMain
