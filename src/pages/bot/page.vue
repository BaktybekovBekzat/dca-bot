<template>
  <div class="page">
    <h1 class="text-3xl mb-5 flex align-items-center gap-2">
      <RouterLink to="/bot">
        <Button severity="secondary" rounded icon="pi pi-arrow-left" />
      </RouterLink>
      Создание бота
    </h1>
    <form class="form" @submit.prevent="handleSubmit">
      <div class="form-item">
        <label class="text-lg" for="name">Название бота</label>
        <InputText
          v-model="formData.name"
          class="w-full"
          placeholder="Bot 475"
          :invalid="v$.name.$invalid"
          id="name"
        />
      </div>
      <div class="form-item" v-show="formData.name.length >= 5">
        <label class="text-lg" for="exchange">
          Биржа
          <i class="pi pi-info-circle" v-tooltip.top="'Биржа, на которой будет работать бот'" />
        </label>
        <Dropdown
          v-model="formData.exchange"
          :options="exchangeOptions"
          option-label="label"
          option-value="value"
          filter
          class="w-full"
          show-clear
          :invalid="v$.exchange.$invalid"
          id="exchange"
        />
      </div>
      <div class="form-item" v-show="formData.exchange">
        <label class="text-lg" for="exchange_key_id">
          API-ключ
          <i class="pi pi-info-circle" v-tooltip.top="'Введите API-ключ'" />
        </label>
        <InputText
          v-model="formData.exchange_key_id"
          class="w-full"
          :invalid="v$.exchange_key_id.$invalid"
          id="exchange_key_id"
        />
      </div>
      <div class="form-item" v-show="formData.exchange_key_id">
        <label class="text-lg" for="symbol">
          Торговая пара
          <i class="pi pi-info-circle" v-tooltip.top="'Выберите торговую пару'" />
        </label>
        <Dropdown
          v-model="formData.symbol"
          :options="symbolOptions"
          option-label="label"
          option-value="value"
          filter
          class="w-full"
          show-clear
          :invalid="v$.symbol.$invalid"
          id="symbol"
        />
      </div>
      <div class="form-item" v-show="formData.symbol">
        <label class="text-lg" for="amount"> Сумма для торговли </label>
        <InputNumber
          v-model="formData.amount"
          class="w-full"
          placeholder="7 500"
          :invalid="v$.amount.$invalid"
          inputId="amount"
        />
      </div>
      <template v-if="formData.amount">
        <div class="form-item">
          <label class="text-lg" for="grid_length"> Длина сетки страховочных ордеров (%) </label>
          <InputNumber
            v-model="formData.grid_length"
            class="w-full"
            :invalid="v$.grid_length.$invalid"
            inputId="grid_length"
            :min="0"
            :max="100"
          />
        </div>
        <div class="form-item">
          <label class="text-lg" for="first_order_offset"> Отступ первого ордера (%) </label>
          <InputNumber
            v-model="formData.first_order_offset"
            class="w-full"
            :invalid="v$.first_order_offset.$invalid"
            inputId="first_order_offset"
            :min="0"
            :max="100"
          />
        </div>
        <div class="form-item">
          <label class="text-lg" for="num_orders">
            Количество страховочных ордеров на покупку
          </label>
          <InputNumber
            v-model="formData.num_orders"
            class="w-full"
            :invalid="v$.num_orders.$invalid"
            inputId="num_orders"
          />
        </div>
        <div class="form-item">
          <label class="text-lg" for="partial_num_orders">
            Количество частично выставленных ордеров
          </label>
          <InputNumber
            v-model="formData.partial_num_orders"
            class="w-full"
            :invalid="v$.partial_num_orders.$invalid"
            inputId="partial_num_orders"
          />
        </div>
        <div class="form-item">
          <label class="text-lg" for="next_order_volume">
            Мартингейл
            <i
              class="pi pi-info-circle"
              v-tooltip.top="'Процент увеличения суммы каждого последующего страховочного ордера'"
            />
          </label>
          <InputNumber
            v-model="formData.next_order_volume"
            class="w-full"
            :invalid="v$.next_order_volume.$invalid"
            inputId="next_order_volume"
            :min="0"
            :max="100"
          />
        </div>
        <div class="form-item">
          <label class="text-lg" for="profit_percentage"> Желаемый процент прибыли </label>
          <InputNumber
            v-model="formData.profit_percentage"
            class="w-full"
            :invalid="v$.profit_percentage.$invalid"
            inputId="profit_percentage"
            :min="0"
          />
        </div>
        <div class="form-item">
          <label class="text-lg" for="price_change_percentage">
            Процент изменения цены для обновления сетки
          </label>
          <InputNumber
            v-model="formData.price_change_percentage"
            class="w-full"
            :invalid="v$.price_change_percentage.$invalid"
            inputId="price_change_percentage"
            :min="0"
          />
        </div>
        <div class="form-item">
          <label class="text-lg" for="log_coefficient">
            Коэффициент для расчета логарифмической сетки
          </label>
          <InputNumber
            v-model="formData.log_coefficient"
            class="w-full"
            :invalid="v$.log_coefficient.$invalid"
            inputId="log_coefficient"
          />
        </div>
        <div class="form-item">
          <label class="text-lg" for="profit_capitalization"> Капитализация прибыли </label>
          <InputNumber
            v-model="formData.profit_capitalization"
            class="w-full"
            :invalid="v$.profit_capitalization.$invalid"
            inputId="profit_capitalization"
          />
        </div>
        <div class="form-item">
          <label class="text-lg" for="upper_price_limit"> Верхняя граница цены </label>
          <InputNumber
            v-model="formData.upper_price_limit"
            class="w-full"
            :invalid="v$.upper_price_limit.$invalid"
            inputId="upper_price_limit"
          />
        </div>
        <div class="form-item">
          <label class="text-lg" for="is_active">Активен</label>
          <Checkbox inputId="is_active" v-model="formData.is_active" binary />
        </div>
        <div class="form-item" v-if="!isCreateMode">
          <label class="text-lg" for="status">Статус бота</label>
          <Dropdown
            v-model="formData.status"
            :options="statusOptions"
            option-label="label"
            option-value="value"
            class="w-full"
            inputId="status"
          />
        </div>
        <Button :label="isCreateMode ? 'Создать' : 'Редактировать'" @click="handleSubmit" />
      </template>
    </form>
  </div>
</template>

<script lang="ts">
import useVuelidate from '@vuelidate/core'
import { ref, reactive, defineComponent, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { required } from '@vuelidate/validators'
import Notify from '@/plugins/notify'
import { useToast } from 'primevue/usetoast'
import { ExchangeType } from '@/lib/types'
import { SymbolType } from '@/lib/types'
import { BotStatusType } from '@/lib/types'
import Checkbox from 'primevue/checkbox'
import { useBotStore } from '@/stores/bot'
import type { ICreateBot, IUpdateBot } from '@/stores/bot/types'
import { exchangeOptions, symbolOptions, statusOptions } from '@/lib/data'

export default defineComponent({
  components: { Checkbox },
  setup() {
    const isCreateMode = ref(true)
    const router = useRouter()
    const route = useRoute()
    const formData = reactive({
      id: '',
      name: '',
      exchange: null as null | ExchangeType,
      exchange_key_id: '',
      symbol: null as null | SymbolType,
      amount: 0,
      grid_length: 0,
      first_order_offset: 0,
      num_orders: 0,
      partial_num_orders: 0,
      next_order_volume: 0,
      profit_percentage: 0,
      price_change_percentage: 0,
      log_coefficient: 0,
      profit_capitalization: 0,
      upper_price_limit: 0,
      is_active: true,
      status: null as null | BotStatusType,
      userId: '',
      created_at: null as null | Date
    })
    const v$ = useVuelidate(
      {
        name: { required },
        exchange: { required },
        exchange_key_id: { required },
        symbol: { required },
        amount: { required },
        grid_length: { required },
        first_order_offset: { required },
        num_orders: { required },
        partial_num_orders: { required },
        next_order_volume: { required },
        profit_percentage: { required },
        price_change_percentage: { required },
        log_coefficient: { required },
        profit_capitalization: { required },
        upper_price_limit: { required }
      },
      formData,
      { $lazy: true }
    )
    const toast = useToast()
    const botStore = useBotStore()

    async function create() {
      try {
        const isValid = await v$.value.$validate()
        if (!isValid) {
          Notify.error(toast, 'Форма заполнена неверно')
        }
        const data: ICreateBot = {
          name: formData.name,
          exchange: formData.exchange as ExchangeType,
          exchange_key_id: formData.exchange_key_id,
          symbol: formData.symbol as SymbolType,
          amount: formData.amount,
          grid_length: formData.grid_length,
          first_order_offset: formData.first_order_offset,
          num_orders: formData.num_orders,
          partial_num_orders: formData.partial_num_orders,
          next_order_volume: formData.next_order_volume,
          profit_percentage: formData.profit_percentage,
          price_change_percentage: formData.price_change_percentage,
          log_coefficient: formData.log_coefficient,
          profit_capitalization: formData.profit_capitalization,
          upper_price_limit: formData.upper_price_limit,
          is_active: formData.is_active,
          status: BotStatusType.RUNNING,
          userId: ''
        }
        const res = await botStore.create(data)
        if (!res) throw new Error()

        Notify.success(toast, 'Бот был успешно создан')
        router.push('/')
      } catch (error) {
        Notify.error(toast, 'Произошла ошибка при создании бота')
      }
    }

    async function update() {
      try {
        const isValid = await v$.value.$validate()
        if (!isValid) {
          Notify.error(toast, 'Форма заполнена неверно')
        }
        const data: IUpdateBot = {
          id: formData.id,
          name: formData.name,
          exchange: formData.exchange as ExchangeType,
          exchange_key_id: formData.exchange_key_id,
          symbol: formData.symbol as SymbolType,
          amount: formData.amount,
          grid_length: formData.grid_length,
          first_order_offset: formData.first_order_offset,
          num_orders: formData.num_orders,
          partial_num_orders: formData.partial_num_orders,
          next_order_volume: formData.next_order_volume,
          profit_percentage: formData.profit_percentage,
          price_change_percentage: formData.price_change_percentage,
          log_coefficient: formData.log_coefficient,
          profit_capitalization: formData.profit_capitalization,
          upper_price_limit: formData.upper_price_limit,
          is_active: formData.is_active,
          status: formData.status as BotStatusType,
          userId: formData.userId,
          created_at: formData.created_at as Date
        }
        const res = await botStore.update(data)
        if (!res) throw new Error()

        Notify.success(toast, 'Данные успешно обновились')
        router.push('/')
      } catch (error) {
        Notify.error(toast, 'Произошла ошибка при обновлении бота')
      }
    }

    function handleSubmit() {
      isCreateMode.value ? create() : update()
    }

    async function get(id: string) {
      try {
        const bot = await botStore.getById(id)
        formData.id = bot.id
        formData.name = bot.name
        formData.exchange = bot.exchange
        formData.exchange_key_id = bot.exchange_key_id
        formData.symbol = bot.symbol
        formData.amount = bot.amount
        formData.grid_length = bot.grid_length
        formData.first_order_offset = bot.first_order_offset
        formData.num_orders = bot.num_orders
        formData.partial_num_orders = bot.partial_num_orders
        formData.next_order_volume = bot.next_order_volume
        formData.profit_percentage = bot.profit_percentage
        formData.price_change_percentage = bot.price_change_percentage
        formData.log_coefficient = bot.log_coefficient
        formData.profit_capitalization = bot.profit_capitalization
        formData.upper_price_limit = bot.upper_price_limit
        formData.is_active = bot.is_active
        formData.status = bot.status
        formData.userId = bot.userId
        formData.created_at = bot.created_at
      } catch (error) {
        Notify.error(toast, 'Произошла ошибка')
      }
    }

    onMounted(async () => {
      isCreateMode.value = route.params.id ? false : true

      if (!isCreateMode.value) {
        await get(route.params.id as string)
      }
    })

    return {
      formData,
      handleSubmit,
      v$,
      isCreateMode,
      exchangeOptions,
      symbolOptions,
      statusOptions
    }
  }
})
</script>

<style scoped>
.form {
  max-width: 800px;
  width: 100%;
  background-color: var(--surface-0);
  border: 1px solid var(--surface-border);
  border-radius: 0.5rem;
  margin: 1rem auto;
  padding: 2rem;

  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
