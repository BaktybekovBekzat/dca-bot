<template>
  <form class="form" @submit.prevent="submit">
    <h5 class="text-xl mb-5 text-center">Создать аккаунт</h5>
    <p class="text-right">
      <RouterLink class="text-primary" to="/auth/login">Уже есть аккаунт?</RouterLink>
    </p>
    <div class="field">
      <label for="fullname">ФИО</label>
      <InputText
        class="w-full"
        v-model="formData.fullname"
        id="fullname"
        :invalid="v$.fullname.$invalid"
        placeholder="Бекзат Бактыбеков"
      />
    </div>
    <div class="field">
      <label for="email">Почта</label>
      <InputText
        class="w-full"
        v-model="formData.email"
        id="email"
        :invalid="v$.email.$invalid"
        placeholder="example@gmail.com"
      />
    </div>
    <div class="field">
      <label for="password">Пароль</label>
      <Password
        class="w-full"
        v-model="formData.password"
        inputId="password"
        toggleMask
        :feedback="false"
        :inputStyle="{ width: '100%' }"
        :invalid="v$.password.$invalid"
      />
    </div>
    <Button class="w-full mt-2" label="Создать" type="submit" :loading="isLoading" />
  </form>
</template>

<script lang="ts">
import { reactive, defineComponent } from 'vue'
import Password from 'primevue/password'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import Notify from '@/plugins/notify'
import { useAuthStore } from '@/stores/auth'
import type { IRegisterForm } from '@/stores/auth/types'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { storeToRefs } from 'pinia'
import axios from 'axios'

export default defineComponent({
  components: { Password },
  setup() {
    const formData = reactive<IRegisterForm>({
      fullname: '',
      email: '',
      password: ''
    })
    const v$ = useVuelidate(
      {
        fullname: { required },
        email: { required, email },
        password: { required, minLengthValue: minLength(6) }
      },
      formData,
      { $lazy: true }
    )
    const authStore = useAuthStore()
    const { isLoading } = storeToRefs(authStore)
    const router = useRouter()
    const toast = useToast()

    async function submit() {
      try {
        const isValid = await v$.value.$validate()
        if (!isValid) {
          Notify.error(toast, 'Форма заполнена неверно')

          return
        }

        await authStore.register(formData)
        Notify.success(toast, 'Вы успешно вошли в систему')
        router.push('/')
      } catch (error) {
        if (error instanceof axios.AxiosError) {
          const messages = {
            'Email already exists': `Пользователь ${formData.email} уже существует`
          }

          const errorMsg = error.response?.data as string

          switch (errorMsg) {
            case 'Email already exists':
              Notify.error(toast, messages[errorMsg])
              break
          }
        } else {
          Notify.error(toast, 'Произошла ошибка при попытке авторизации')
        }
      }
    }

    return {
      formData,
      v$,
      submit,
      isLoading
    }
  }
})
</script>

<style scoped>
.form {
  width: 570px;
  padding: 20px;
  border: 1px solid var(--surface-border);
  border-radius: 8px;
  background: var(--surface-overlay);
}
</style>
