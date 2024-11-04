import { io } from 'socket.io-client'

import { usePaymentStore } from '@/stores/payment'

let socket = null

export const useSocket = () => {
  const config = useRuntimeConfig()
  const { $i18n } = useNuxtApp()
  const { fetchTransactions } = usePaymentStore()
  const { depositTrigger, depositTransactionDataTable } = storeToRefs(usePaymentStore())
  const signUpSetting = computed(() => useSignUpSetting())
  const { handVerifyOTPModal } = useModals()
  const { fetchUser } = useAuth()
  const pagination = {
    page: 1,
    pageSize: 5,
  }

  const fetchTransactionList = ({ type, currencyType } = {}) => {
    fetchTransactions({
      ...pagination,
      sDate: '1970-01-01 00:00:00',
      eDate: $format.getLocalDate(),
      type: [type], //  add | reduce
      currencyType: [currencyType], // crypto | fiat
    })
  }

  const connectSocket = () => {
    try {
      socket = io(config.public.socketUrl, {
        timeout: 20000,
        reconnectionDelayMax: 10000,
        transports: ['websocket', 'polling'],
        auth: {
          token: useAuth().accessToken.value,
          role: 'frontend-client',
          type: 'lobby',
        },
      })

      // Connect Success
      socket.on('connect', () => {
        console.log('Socket connected successfully!!')
        eventListeners()
      })

      // Connect Error
      socket.on('connect_error', (error) => {
        console.log('Socket connect_error:', error)
      })

      // Disconnect
      socket.on('disconnect', (reason) => {
        console.log('Socket disconnect:', reason)

        if (reason === 'io server disconnect') {
          // the disconnection was initiated by the server, you need to reconnect manually
          socket.connect()
        }
        // else the socket will automatically try to reconnect
      })
    } catch (error) {
      console.log('Init socker error:', error)
    }
  }

  const eventListeners = () => {
    // Deposit
    socket.on('deposit:pending', handleDepositEvent)
    socket.on('deposit:success', handleDepositEvent)
    socket.on('deposit:fail', handleDepositEvent)
    // Withdraw
    socket.on('withdraw:pending', handleWithdrawEvent)
    socket.on('withdraw:success', handleWithdrawEvent)
    socket.on('withdraw:fail', handleWithdrawEvent)
    // Promotion
    socket.on('promotion:freespin', handlePromotionFreeSpinEvent)
    // Notification public
    socket.on('notification:public', handleNotificationPublicEvent)
    // Notification private
    socket.on('notification:private', handleNotificationPrivateEvent)
    // Notification delete
    socket.on('notification:delete', handleNotificationDeleteEvent)
    // coupon create
    socket.on('coupon:create', handleCouponCreateEvent)
    // coupon delete
    socket.on('coupon:delete', handleCouponDeleteEvent)
    // Maintenance
    socket.on('agentsetting:maintenance', handleMaintenance)
  }

  // Events
  const handleMaintenance = () => {
    window.location.reload()
  }

  const handleDepositEvent = async (data) => {
    const status = `${data.status}`.toLocaleLowerCase()
    const isFiat = data.currency_type === 'fiat'
    /**
     *  currency_type
     *  amount
     *  currency_code
     */

    depositTrigger.value = data

    console.log('handleDepositEvent', data.status)

    // Check status
    if (status === 'success') {
      console.log('status', status)
      useAlert({
        success: true,
        title: $i18n.t('depositSuccessful'),
        text: $i18n.t('depositAmountSuccess', {
          amount: $format.currency(data.amount, isFiat ? 2 : 8),
          unit: data.currency_code,
        }),
        confirmButtonText: $i18n.t('close'),
      })
    } else if (status === 'failed') {
      useAlert({
        error: true,
        title: $i18n.t('depositFailed'),
        text: $i18n.t('contactAdmin'),
        confirmButtonText: $i18n.t('close'),
      })
    }

    // Fetch new data
    await Promise.all([
      fetchTransactionList({
        type: data.type,
        currencyType: data.currency_type,
      }),
      fetchUser(),
    ])

    setTimeout(() => {
      // Check verify otp phone
      if (
        depositTransactionDataTable.value?.items.filter((o) => o?.status === 'success')?.length ===
          1 &&
        !signUpSetting.value?.isVerify &&
        signUpSetting.value?.verifyFirstDeposit
      ) {
        handVerifyOTPModal({
          show: true,
          typeSend: 'firsttimedeposit',
          cb: fetchUser,
        })
      }
    }, 200)
  }

  const handleWithdrawEvent = (data) => {
    const status = `${data.status}`.toLocaleLowerCase()
    const isFiat = data.currency_type === 'fiat'

    // Check status
    if (status === 'success') {
      useAlert({
        success: true,
        title: $i18n.t('withdrawalSuccessful'),
        text: $i18n.t('withdrawAmountSuccess', {
          amount: $format.currency(data.amount, isFiat ? 2 : 8),
          unit: data.currency_code,
        }),
        confirmButtonText: $i18n.t('close'),
      })
    } else if (status === 'failed') {
      useAlert({
        error: true,
        title: $i18n.t('withdrawalFailed'),
        text: $i18n.t('contactAdmin'),
        confirmButtonText: $i18n.t('close'),
      })
    }

    // Fetch new data
    Promise.all([
      fetchTransactionList({
        type: data.type,
        currencyType: data.currency_type,
      }),
      fetchUser(),
    ])
  }

  const handlePromotionFreeSpinEvent = (data) => {}

  const handleNotificationPublicEvent = () => {}

  const handleNotificationPrivateEvent = () => {}

  const handleNotificationDeleteEvent = () => {}

  const handleCouponCreateEvent = () => {}

  const handleCouponDeleteEvent = (data) => {}

  const disconnectSocket = () => {
    if (socket) {
      console.log('Socket disconnected!!')
      socket.disconnect()
    }
  }

  return {
    connectSocket,
    disconnectSocket,
  }
}
