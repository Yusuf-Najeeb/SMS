import React, { useState } from 'react'
import PaymentHeader from './PaymentHeader'
import ManagePayment from './ManagePayment'
import PaymentMethodTable from './PaymentmethodTable'

const PaymentMethodDashboard = () => {
  const [isAddPayment, setIsAddPayment] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState(null)

  const OpenPayment = () => {
    if (isAddPayment) {
      setIsAddPayment(false)
      setSelectedPayment(null)
    } else {
      setIsAddPayment(true)
    }
  }

  const DoSetSelectedPayment = val => {
    setSelectedPayment(val)
  }

  return (
    <div>
      <PaymentHeader OpenPayment={OpenPayment} />
      <PaymentMethodTable OpenPayment={OpenPayment} DoSetSelectedPayment={DoSetSelectedPayment} />

      {isAddPayment && <ManagePayment open={isAddPayment} toggle={OpenPayment} paymentToEdit={selectedPayment} />}
    </div>
  )
}

export default PaymentMethodDashboard
