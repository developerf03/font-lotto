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
    bankAccountsLoading,
    bankListByCurrency,
    depositTrigger,
    bankListLoading,
  } = storeToRefs(usePaymentStore())

  // Methodss
  const {
    fetchBankList,
    getBankAccounts,
    createBank,
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
    bankAccountsLoading,
    bankListByCurrency,
    depositTrigger,
    bankListLoading,
    // Actions
    fetchBankList,
    getBankAccounts,
    createBank,
    getGateWays,
    createDeposit,
    cancelTransactionPayment,
    createWithdraw,
    fetchTransactions,
  }
}
