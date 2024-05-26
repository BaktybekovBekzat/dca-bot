<template>
  <main>
    <Sidebar :visible="isSidebarVisible" @close="toggleSidebar" />
    <div
      class="wrapper"
      :class="{
        wrapper__full: !isSidebarVisible
      }"
    >
      <Toolbar class="header">
        <div class="flex align-items-center">
          <Button class="mr-3" icon="pi pi-bars" @click="toggleSidebar" />
          <Logo />
        </div>
        <RouterLink class="flex flex-column align-items-center gap-1" to="/profile">
          <i class="pi pi-user text-3xl text-primary" />
          <span class="text-sm text-color">Профиль</span>
        </RouterLink>
      </Toolbar>
      <RouterView class="content-page" />
    </div>
  </main>
</template>

<script lang="ts">
import Logo from '@/components/logo.vue'
import Sidebar from '@/components/sidebar.vue'
import Notify from '@/plugins/notify'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'primevue/usetoast'
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: { Logo, Sidebar },
  setup() {
    const isSidebarVisible = ref(false)
    const authStore = useAuthStore()
    const router = useRouter()
    const toast = useToast()

    function toggleSidebar() {
      isSidebarVisible.value = !isSidebarVisible.value
    }

    onMounted(async () => {
      const res = await authStore.isAuthorized()
      if (!res) {
        Notify.error(toast, 'Текущая сессия истекла')
        router.push('/auth')
      }
    })

    return {
      isSidebarVisible,
      toggleSidebar
    }
  }
})
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  transition: all 0.1s;
  padding-left: calc(220px);
}

.wrapper__full {
  padding-left: calc(100px);
}

.content-page {
  padding: 1rem;
  padding-left: 1.5rem;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: var(--surface-0);
  border-bottom: 1px solid var(--surface-border);
  padding: 1rem;
}

@media (max-width: 768px) {
  .wrapper,
  .wrapper__full {
    padding-left: 0;
  }
}
</style>
