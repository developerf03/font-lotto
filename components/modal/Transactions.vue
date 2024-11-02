<script setup>
import { nextTick } from 'vue'
import dataNotFound from '~/assets/icons/2d/data-not-found.png'
// import { Vue3Lottie } from 'vue3-lottie'

// Composables
const { transactionsModal } = useModals()
const { transactionsList, transactionsLoading, fetchTransactions, cancelTransactionPayment } =
  usePayment()
// Stores

// State
const items = computed(() => [
  {
    id: 'deposit',
    label: t('depositHistory'),
  },
  {
    id: 'withdraw',
    label: t('withdrawalHistory'),
  },
])
const pagination = reactive({
  page: 1,
  pageSize: 5,
})
const transactionsViewModal = reactive({
  active: false,
  item: null,
})
const loadingCancelTransaction = ref(false)

// Computed

// computed

const tabPayment = computed(() => {
  return items.value?.findIndex((item) => item.id === transactionsModal.value?.tab)
})

const status = computed(() => {
  return {
    failed: { label: t('cancel') },
    success: { label: t('success') },
    pending: { label: t('inProgress') },
  }
})

const statusTransactions = computed(
  () =>
    transactionsList.value?.transactionList.find(
      (o) => o?.status === transactionsViewModal?.item?.status,
    )?.status,
)

// Watch
watch(transactionsViewModal, (val) => {
  if (!val?.active) {
    loadingCancelTransaction.value = false
    transactionsViewModal.item = null
  }
})

watch(transactionsModal.value, (val) => {
  if (val) {
    fetchApiTransactions()
  }
})

// Functions
const onChange = (val) => {
  transactionsModal.value.tab = items.value?.[val]?.id
  pagination.page = 1
  pagination.pageSize = 5
  fetchApiTransactions()
}

const fetchApiTransactions = async () => {
  await fetchTransactions({
    sDate: '1970-01-01 00:00:00',
    eDate: $format.getLocalDate(),
    page: pagination?.page,
    pageSize: pagination?.pageSize,
    type: transactionsModal.value.tab === 'deposit' ? ['add'] : ['reduce'],
  })
}

const updateCurrPagePrev = () => {
  if (pagination.page === 1) return

  pagination.page--
  fetchApiTransactions()
}

const updateCurrPageNext = () => {
  if (transactionsList.value?.pageTotal === pagination.page) return
  pagination.page++
  fetchApiTransactions()
}

const onViewTransactions = (item) => {
  transactionsViewModal.active = true
  transactionsViewModal.item = item
}

const onCancelTransaction = () => {
  loadingCancelTransaction.value = true
  useAlert({
    confirmButtonText: t('ok'),
    cancelButtonText: t('cancel'),
    // title: 'แจ้งเตือน',
    text: t('warningCancelItem'),
    confirmCallback: async () => {
      try {
        await cancelTransactionPayment()
        loadingCancelTransaction.value = false
        useAlert({
          success: true,
          title: t('success'),
        })
        fetchApiTransactions()
      } catch {
        loadingCancelTransaction.value = false
        useAlert({
          warning: true,
          title: t('alert'),
          text: t('pendingTransaction'),
        })
      }
    },
    cancelCallback: () => {
      loadingCancelTransaction.value = false
    },
  })
}

const closedModal = () => {
  pagination.page = 1
  pagination.pageSize = 5
}
// onMounted
onMounted(() => {
  nextTick(() => {})
})
</script>

<template>
  <!-- <div> -->
  <baseModal
    id="transactions-modal-wrapper"
    v-model="transactionsModal.active"
    :disable-click-out="true"
    :hide-icon-close="true"
    @closed="closedModal"
  >
    <!-- <div class="w-full"><div class="text-base cursor-pointer">ย้อนกลับ</div></div> -->
    <UTabs v-model="tabPayment" :items="items" @change="onChange" />
    <div v-if="transactionsList?.transactionList.length" class="text-xs text-tertiary">
      (ทั้งหมด {{ transactionsList?.total }} รายการ)
    </div>
    <div class="w-full min-h-[350px]">
      <div
        v-if="!transactionsList?.transactionList.length && transactionsLoading"
        class="min-h-[350px] w-full"
      >
        <div v-for="(item, index) in 5" :key="index" class="w-full flex flex-col gap-2">
          <div class="w-full flex justify-between items-center">
            <div class="flex flex-col justify-center gap-2">
              <USkeleton class="h-4 w-[50px]" />
              <USkeleton class="h-3 w-[100px]" />
            </div>
            <div class="flex flex-col justify-center items-center gap-2">
              <USkeleton class="h-[30px] w-[30px]" />
              <USkeleton class="h-3 w-[100px]" />
            </div>
          </div>
          <hr class="mb-2" >
        </div>
      </div>
      <div
        v-if="transactionsList?.transactionList.length"
        class="flex justify-between items-center flex-col w-full h-full min-h-[350px]"
      >
        <div class="w-full h-full">
          <div
            v-for="(item, index) in transactionsList?.transactionList"
            :key="index"
            class="w-full flex flex-col gap-2"
          >
            <div class="w-full flex justify-between items-center">
              <div class="flex flex-col justify-center">
                <div class="text-base">
                  {{ $format.currency(item?.amount) }} {{ item?.currencyCode }}
                </div>
                <div class="text-sm text-tertiary">
                  {{ $format.dateOnly(item?.createdAt) }}
                  {{ $format.formatTime(item?.createdAt) }}
                </div>
              </div>
              <div class="flex flex-col justify-center items-end">
                <nuxt-icon
                  class="icon-eye cursor-pointer"
                  name="svg/eye"
                  @click="onViewTransactions(item)"
                />
                <div
                  class="text-sm"
                  :class="[
                    { 'text-danger': item?.status === 'failed' },
                    { 'text-success': item?.status === 'success' },
                    { 'text-warning': item?.status === 'pending' },
                  ]"
                >
                  {{ status[item?.status].label }}
                </div>
              </div>
            </div>
            <hr class="mb-2" >
          </div>
        </div>
        <BasePagination
          :curr-page="transactionsList?.page"
          :total-page="transactionsList?.pageTotal"
          action-update
          @prev="updateCurrPagePrev"
          @next="updateCurrPageNext"
        />
      </div>
      <div
        v-if="!transactionsList?.transactionList.length && !transactionsLoading"
        class="min-h-[350px] w-full flex justify-center items-center"
      >
        <BaseNoItem :image="dataNotFound" />
      </div>
    </div>
  </baseModal>

  <baseModal
    id="transactions-view-modal-wrapper"
    v-model="transactionsViewModal.active"
    title="รายละเอียดการเติมเงิน"
    :overlay="true"
    :disable-click-out="true"
    :hide-icon-close="true"
  >
    <div class="flex justify-between items-center gap-2 w-full">
      <div>
        <div class="text-base whitespace-nowrap">Transaction ID</div>
        <div class="text-base whitespace-nowrap">สกุลเงิน</div>
        <div class="text-base whitespace-nowrap">จำนวนเงิน</div>
      </div>
      <div class="">
        <div class="relative text-right text-base flex gap-1">
          <div class="relative base-truncate-1">
            {{ transactionsViewModal?.item?.id }}
          </div>
          <UIcon
            name="i-tabler:copy"
            class="w-5 h-5 cursor-pointer pointer-events-auto text-[var(--icon-default)]"
            @click="useCopyClipboard(transactionsViewModal?.item?.id)"
          />
        </div>
        <div class="text-right text-base">{{ transactionsViewModal?.item?.currencyCode }}</div>
        <div class="text-right text-base">
          {{ $format.currency(transactionsViewModal?.item?.amount) }}
        </div>
      </div>
    </div>
    <UButton
      v-if="statusTransactions === 'pending' && transactionsModal?.tab === 'deposit'"
      :label="t('cancelTransaction')"
      type="submit"
      class="!w-full mt-6"
      :ui="{ rounded: 'rounded-full' }"
      size="md"
      variant="cancel"
      :loading="loadingCancelTransaction"
      @click="onCancelTransaction"
    />
  </baseModal>
  <!-- </div> -->
</template>

<style lang="scss" scoped></style>
