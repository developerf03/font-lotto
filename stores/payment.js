import { defineStore } from 'pinia'

export const usePaymentStore = defineStore('payment', () => {
  // state
  const banks = reactive({
    bankList: [],
    bankAccountList: [],
  })
  const gatewayList = ref(null)
  const dataCreateDeposit = ref(null)
  const transactionsList = ref({
    transactionList: [],
    page: 1,
    pageSize: 10,
    pageTotal: 0,
    total: 0,
  })
  // loading
  const bankListLoading = ref(false)
  const bankAccountsLoading = ref(false)
  const gatewayLoading = ref(false)
  const transactionsLoading = ref(false)
  const depositTrigger = ref(null)

  // function
  const getGateWays = async (payload = {}) => {
    gatewayLoading.value = true
    const { data, error } = await useAPI().post('/api/payment/getGateway', payload)

    gatewayLoading.value = false
    if (error.value) return Promise.reject(error.value)
    gatewayList.value = data.value

    return data.value
  }

  const createDeposit = async (payload = {}) => {
    const { data, error } = await useAPI().post('/api/payment/createDeposit', payload)

    if (error.value) return Promise.reject(error.value)
    // dataCreateDeposit.value = data.value.data
    dataCreateDeposit.value = {
      bankType: 'ธนาคาร ไทยพาณิชย์ จำกัด (มหาชน)',
      bankShortName: 'SCB',
      accountName: 'พศวีร์ แซ่ลิ้ม',
      account: '2644433683',
      amount: 14.72,
      promptpayCode:
        '00020101021229370016A000000677010111011300666297080825802TH5303764540514.72630491F0',
    }

    return data.value.data
  }

  const createWithdraw = async (payload = {}) => {
    const { data, error } = await useAPI().post('/api/payment/createWithdraw', payload)

    if (error.value) return Promise.reject(error.value)

    return data.value.data
  }

  const cancelTransactionPayment = async () => {
    const { data, error } = await useAPI().post('/api/payment/auto/fail/byplayer')

    if (error.value) return Promise.reject(error.value)

    return data.value
  }

  const fetchTransactions = async (payload = {}) => {
    transactionsLoading.value = true
    const { data, error } = await useAPI().post('/api/payment/history', payload)

    transactionsLoading.value = false
    if (error.value) return Promise.reject(error.value)
    transactionsList.value = data.value

    return data.value
  }

  //   Bank
  const fetchBankList = async (payload = {}) => {
    bankListLoading.value = true
    const { data, error } = await useAPI().get('/api/payment/getBank', payload)

    bankListLoading.value = false
    if (error.value) return Promise.reject(error.value)
    banks.bankList = data.value?.bankList

    return data.value
  }

  const getBankAccounts = async (payload = {}) => {
    bankAccountsLoading.value = true
    const { data, error } = await useAPI().post('/api/payment/bankAccount', payload)

    bankAccountsLoading.value = false
    if (error.value) return Promise.reject(error.value)

    banks.bankAccountList = data.value?.bankAccountList

    return data.value
  }

  // computed
  const gateWayOption = computed(() => {
    const gateWay = gatewayList.value?.gatewayList?.filter((v) =>
      ['application'].includes(v.channelTag),
    )

    return gateWay?.map((o) => ({
      ...o,
      avatar: { src: o?.image },
    }))
    // return gateWay?.map((o) => ({ ...o, image: useCurrencyUrl(o?.channelCurrencyCode) }))
  })

  const bankListByCurrency = computed(
    () => (currencyCode) => banks?.bankList?.filter((v) => v.currencyCode === currencyCode),
  )

  const depositTransactionDataTable = computed(() => ({
    pageTotal: transactionsList.value?.pageTotal,
    items: transactionsList.value?.transactionList?.map((v) => ({
      createdAt: $format.date(v.createdAt),
      amount: $format.currency(v.amount, v.currencyType === 'fiat' ? 2 : 8),
      promotionAmount: $format.currency(v.promotionAmount, v.currencyType === 'fiat' ? 2 : 8),
      tierAmount: $format.currency(v.tierAmount, v.currencyType === 'fiat' ? 2 : 8),
      afterBalance: $format.currency(v.afterBalance, v.currencyType === 'fiat' ? 2 : 8),
      status: v.status,
      currencyCode: v.currencyCode,
      // img: { key: 'currencyCode', url: useCurrencyUrl(v.currencyCode) },
      action: { view: true },
      detail: v,
    })),
  }))

  return {
    banks,
    gatewayList,
    gateWayOption,
    dataCreateDeposit,
    transactionsList,
    transactionsLoading,
    bankListByCurrency,
    depositTransactionDataTable,
    depositTrigger,
    // function
    fetchBankList,
    getBankAccounts,
    getGateWays,
    createDeposit,
    cancelTransactionPayment,
    createWithdraw,
    fetchTransactions,
  }
})
