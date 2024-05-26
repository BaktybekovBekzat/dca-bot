<template>
  <div class="page">
    <h1 class="text-3xl mb-5">Сделки</h1>
    <DataTable :loading='isLoading' :value="cycles" showGridlines>
      <Column field="exchange" header="Биржа" sortable>
        <template #body="slotProps">{{ slotProps.data.exchange }}</template>
      </Column>
      <Column field="status" header="Статус" sortable>
        <template #body="slotProps">
          <Chip
            :class="statusClasses(slotProps.data.status)"
            :label="cycleStatusOptions.find((i) => i.value === slotProps.data.status)?.label"
          />
        </template>
      </Column>
      <Column field="symbol" header="Торговая пара" sortable>
        <template #body="slotProps">{{ slotProps.data.symbol }}</template>
      </Column>
      <Column field="amount" header="Сумма" sortable>
        <template #body="slotProps">{{ slotProps.data.amount }}</template>
      </Column>
      <Column field="price" header="Цена" sortable>
        <template #body="slotProps">{{ slotProps.data.price }}</template>
      </Column>
      <Column field="created_at" header="Дата" sortable>
        <template #body="slotProps">{{ formatDate(slotProps.data.created_at) }}</template>
      </Column>
      <Column body="actionTemplate">
        <template #body="slotProps">
          <RouterLink :to="`/cycle/page/${slotProps.data.id}`">
            <Button class="surface-0 text-color" rounded icon="pi pi-angle-right" />
          </RouterLink>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useCycleStore } from '@/stores/cycle'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { formatDate } from '@/lib/date'
import Chip from 'primevue/chip'
import { CycleStatusType } from '@/lib/types'
import { cycleStatusOptions } from '@/lib/data'

export default defineComponent({
  components: { DataTable, Column, Chip },
  setup() {
    const cycleStore = useCycleStore()
    const { cycles, isLoading } = storeToRefs(cycleStore)

    const statusClasses = (status: CycleStatusType) => ({
      'bg-green-400': CycleStatusType.ACTIVE === status,
      'bg-blue-400': CycleStatusType.FINISHED === status,
      'bg-red-400': CycleStatusType.ERROR === status
    })

    onMounted(async () => {
      await cycleStore.get()
    })

    return {
      cycles,
      formatDate,
      statusClasses,
      cycleStatusOptions,
      isLoading
    }
  }
})
</script>

<style scoped></style>
