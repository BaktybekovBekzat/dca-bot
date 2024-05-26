<template>
  <form class="form" @submit.prevent="submit">
    <h5 class="text-xl mb-5 text-center">Войти в аккаунт</h5>
    <p class="text-right">
      <RouterLink class="text-primary" to="/auth/registration">Нет аккаунт?</RouterLink>
    </p>
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
    <Button class="w-full mt-2" label="Войти" type="submit" :loading="isLoading" />
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import Password from 'primevue/password'
import type { ILoginForm } from '@/stores/auth/types'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import Notify from '@/plugins/notify'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { storeToRefs } from 'pinia'
import axios from 'axios'

export default defineComponent({
  components: { Password },
  setup() {
    const formData = reactive<ILoginForm>({
      email: '',
      password: ''
    })
    const v$ = useVuelidate(
      {
        email: { required, email },
        password: { required }
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

        await authStore.login(formData)
        Notify.success(toast, 'Вы успешно вошли в систему')
        router.push('/')
      } catch (error) {
        if (error instanceof axios.AxiosError) {
          const messages = {
            'Cannot find user': `Пользователь ${formData.email} не существует`,
            'Incorrect password': 'Неверный пароль',
            'Password is too short': 'Неверный пароль'
          }

          const errorMsg = error.response?.data as string

          switch (errorMsg) {
            case 'Cannot find user':
              Notify.error(toast, messages[errorMsg])
              break
            case 'Incorrect password':
              Notify.error(toast, messages[errorMsg])
              break
            case 'Password is too short':
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
