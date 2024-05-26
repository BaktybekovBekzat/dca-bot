<template>
  <div class="page">
    <h1 class="text-3xl mb-5">Мои боты</h1>
    <div class="surface-0 border-1 border-round-sm surface-border">
      <Toolbar class="flex justify-content-between align-items-end py-4 px-2 flex-wrap gap-4">
        <div class="flex gap-4 flex-wrap flex-1">
          <IconField iconPosition="left">
            <InputIcon class="pi pi-search" />
            <InputText v-model="filterData.search" placeholder="Поиск по имени" />
          </IconField>
          <Button label="Найти" @click="search" />
          <Button label="Сбросить" @click="reset" severity="secondary" />
        </div>
        <RouterLink to="/bot/page">
          <Button label="Создать бота" icon="pi pi-plus" />
        </RouterLink>
      </Toolbar>
    </div>
    <DataTable :loading="isLoading" :value="filteredBots" showGridlines>
      <Column field="name" header="Название" sortable />
      <Column field="created_at" header="Дата создания" sortable>
        <template #body="slotProps">{{ formatDate(slotProps.data.created_at) }}</template>
      </Column>
      <Column field="exchange" header="Биржа" sortable>
        <template #body="slotProps">{{ slotProps.data.exchange }}</template>
      </Column>
      <Column field="symbol" header="Торговая пара" sortable />
      <Column field="status" header="Статус" sortable>
        <template #body="slotProps">
          <Chip
            :class="statusClasses(slotProps.data.status)"
            :label="statusOptions.find((i) => i.value === slotProps.data.status)?.label"
          />
        </template>
      </Column>
      <Column field="amount" header="Сумма" sortable />
      <Column field="grid_length" header="Длина сетки">
        <template #body="slotProps">{{ slotProps.data.grid_length }}%</template>
      </Column>
      <Column field="first_order_offset" header="Отступ первого ордера">
        <template #body="slotProps">{{ slotProps.data.first_order_offset }}%</template>
      </Column>
      <Column field="num_orders" header="Кол-во страховочных ордеров" />
      <Column field="next_order_volume" header="Мартингейл">
        <template #body="slotProps">{{ slotProps.data.next_order_volume }}%</template>
      </Column>
      <Column body="actionTemplate">
        <template #body="slotProps">
          <RouterLink :to="`/bot/page/${slotProps.data.id}`">
            <Button class="surface-0 text-color" rounded icon="pi pi-angle-right" />
          </RouterLink>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, watch } from 'vue'
import { useBotStore } from '@/stores/bot'
import { storeToRefs } from 'pinia'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Chip from 'primevue/chip'
import { exchangeOptions, statusOptions } from '@/lib/data'
import { BotStatusType } from '@/lib/types'
import { formatDate } from '@/lib/date'
import type { IBot } from '@/stores/bot/types'
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue'

export default defineComponent({
  components: { DataTable, Column, Chip },
  setup() {
    const filterData = reactive({
      search: ''
    })
    const botStore = useBotStore()
    const authStore = useAuthStore()
    const { user } = storeToRefs(authStore)
    const { bots, isLoading } = storeToRefs(botStore)
    const filteredBots = ref<IBot[]>([])

    const statusClasses = (status: BotStatusType) => ({
      'bg-blue-400': BotStatusType.RUNNING === status,
      'bg-yellow-400': BotStatusType.STOPPED === status,
      'bg-red-400': BotStatusType.ERROR === status
    })

    function search() {
      filteredBots.value = bots.value.filter((b) =>
        b.name.toLocaleLowerCase().includes(filterData.search.toLocaleLowerCase())
      )
    }

    function reset() {
      filterData.search = ''
      filteredBots.value = bots.value
    }

    function getUser() {
      if (!user.value) return

      botStore.get(user.value.id)
    }

    watch(
      () => bots.value,
      (bots) => {
        filteredBots.value = bots
      }
    )

    watch(
      () => user.value,
      () => getUser()
    )

    onMounted(() => getUser())

    return {
      filterData,
      filteredBots,
      exchangeOptions,
      statusOptions,
      statusClasses,
      formatDate,
      search,
      reset,
      isLoading
    }
  }
})
</script>

<style scoped></style>
