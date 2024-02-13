import React, { Fragment, SyntheticEvent, useState } from 'react'
import SettingsMain from '../../../views/users/settings/SettingsMain'


const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('payment-method')

  const handleChange = (event, newValue) => {
    setActiveTab(newValue)
  }
  
return (
    <Fragment>
      <SettingsMain activeTab={activeTab} handleChange={handleChange} />
    </Fragment>
  )
}

export default SettingsPage