import React, { useState } from 'react'
import PaymentTable from './Paymentmethod/PaymentTable'
import PaymentHeader from './Paymentmethod/PaymentHeader'
import ManagePayment from './Paymentmethod/ManagePayment'

const PaymentDashboard = () => {
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
      <PaymentTable OpenPayment={OpenPayment} DoSetSelectedPayment={DoSetSelectedPayment} />

      {isAddPayment && <ManagePayment open={isAddPayment} toggle={OpenPayment} paymentToEdit={selectedPayment} />}
    </div>
  )
}

export default PaymentDashboard
