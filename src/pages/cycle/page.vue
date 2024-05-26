<template>
  <div class="page">
    <h1 class="text-3xl mb-5 flex align-items-center gap-2">
      <RouterLink to="/cycle">
        <Button severity="secondary" rounded icon="pi pi-arrow-left" />
      </RouterLink>
      Сделка - {{ cycle?.id }}
    </h1>
    <h2 class="text-2xl mb-4">Ордера</h2>
    <DataTable :loading="isLoading" :value="orders" showGridlines>
      <Column field="number" header="№" sortable>
        <template #body="slotProps">{{ slotProps.data.number }}</template>
      </Column>
      <Column field="side" header="Действие">
        <template #body="slotProps">
          <i
            v-if="slotProps.data.side === SideType.BUY"
            class="pi pi-arrow-down"
            style="color: red"
          ></i>
          <i v-else class="pi pi-arrow-up" style="color: green"></i>
        </template>
      </Column>
      <Column field="amount" header="Сумма" sortable>
        <template #body="slotProps">{{ slotProps.data.amount }}</template>
      </Column>
      <Column field="price" header="Цена" sortable>
        <template #body="slotProps">{{ slotProps.data.price }}</template>
      </Column>
      <Column field="status" header="Статус" sortable>
        <template #body="slotProps">
          <Chip
            :class="statusClasses(slotProps.data.status)"
            :label="orderStatusOptions.find((i) => i.value === slotProps.data.status)?.label"
          />
        </template>
      </Column>
      <Column field="type" header="Тип" sortable>
        <template #body="slotProps">{{ slotProps.data.type }}</template>
      </Column>
    </DataTable>
  </div>
</template>

<script lang="ts">
import type { ID } from '@/lib/types'
import { OrderStatusType, SideType } from '@/lib/types'
import Notify from '@/plugins/notify'
import { useCycleStore } from '@/stores/cycle'
import { useOrderStore } from '@/stores/order'
import { onMounted, defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useToast } from 'primevue/usetoast'
import { useRoute } from 'vue-router'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Chip from 'primevue/chip'
import { orderStatusOptions } from '@/lib/data'

export default defineComponent({
  components: { DataTable, Column, Chip },
  setup() {
    const cycleStore = useCycleStore()
    const orderStore = useOrderStore()
    const { cycle } = storeToRefs(cycleStore)
    const { orders, isLoading } = storeToRefs(orderStore)
    const toast = useToast()
    const route = useRoute()

    async function get(id: ID) {
      try {
        await cycleStore.getById(id)
      } catch (error) {
        Notify.error(toast, 'Произошла ошибка')
      }
    }

    async function getOrders(cycleId: ID) {
      try {
        await orderStore.get(cycleId)
      } catch (error) {
        Notify.error(toast, 'Произошла ошибка')
      }
    }

    const statusClasses = (status: OrderStatusType) => ({
      'bg-green-400': OrderStatusType.NEW === status,
      'bg-blue-400': OrderStatusType.FILLED === status,
      'bg-red-400': OrderStatusType.CANCELED === status
    })

    onMounted(async () => {
      const cycleId = route.params.id as ID
      await get(cycleId)
      await getOrders(cycleId)
    })

    return {
      cycle,
      orders,
      statusClasses,
      orderStatusOptions,
      SideType,
      isLoading
    }
  }
})
</script>

<style scoped></style>
