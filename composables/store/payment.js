import { storeToRefs } from 'pinia'
import { usePaymentStore } from '@/stores/payment'

export const usePayment = () => {
  // State
  const {
    banks,
    gatewayList,
    gateWayOption,
    dataCreateDeposit,
    transactionsList,
    transactionsLoading,
    bankListByCurrency,
    depositTrigger,
  } = storeToRefs(usePaymentStore())

  // Methodss
  const {
    fetchBankList,
    getBankAccounts,
    getGateWays,
    createDeposit,
    cancelTransactionPayment,
    createWithdraw,
    fetchTransactions,
  } = usePaymentStore()

  return {
    // State
    banks,
    gatewayList,
    gateWayOption,
    dataCreateDeposit,
    transactionsList,
    transactionsLoading,
    bankListByCurrency,
    depositTrigger,
    // Actions
    fetchBankList,
    getBankAccounts,
    getGateWays,
    createDeposit,
    cancelTransactionPayment,
    createWithdraw,
    fetchTransactions,
  }
}
