import { useAppSelector } from '.'
import { useMemo } from 'react'

export const usePaymentMethods = () => {
  const PaymentMethodsList = useAppSelector(store => store.settings.PaymentMethodsList)
  const loading = useAppSelector(store => store.settings.loading)

  const paging = useAppSelector(store => store.settings.paging)

  return useMemo(() => [PaymentMethodsList, loading, paging], [PaymentMethodsList, loading, paging])
}
