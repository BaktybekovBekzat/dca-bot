<template>
  <aside
    class="sidebar"
    :class="{
      sidebar__collapsed: !visible
    }"
  >
    <Button class="sidebar-close" icon="pi pi-bars" @click="close" />
    <nav class="navigation flex flex-column">
      <RouterLink
        class="navigation-item"
        v-for="link in links"
        :key="link.label"
        :to="link.to"
        exact-active-class="navigation-item__active"
      >
        <i :class="`pi ${link.icon} text-xl`" />
        <span>{{ link.label }}</span>
      </RouterLink>
    </nav>
  </aside>
</template>

<script lang="ts">
import { ref } from 'vue'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  emits: ['close'],
  setup(props, ctx) {
    const links = ref([
      {
        label: 'Главная',
        icon: 'pi-home',
        to: '/bot'
      },
      {
        label: 'Сделки',
        icon: 'pi-briefcase',
        to: '/cycle'
      },
      {
        label: 'Ссылка 2',
        icon: 'pi-bell',
        to: '/2'
      },
      {
        label: 'Ссылка 3',
        icon: 'pi-user',
        to: '/3'
      }
    ])

    function close() {
      ctx.emit('close')
    }

    return { links, close }
  }
})
</script>

<style scoped>
.sidebar {
  width: 220px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: var(--surface-0);
  border-right: 1px solid var(--surface-border);
  transition: all 0.1s;
  z-index: 9;
}

.sidebar-close {
  display: none;
}

.sidebar__collapsed {
  width: 100px;
}

.navigation {
  margin-top: 1rem;
}

.navigation-item {
  padding: 1rem 2rem;
  color: var(--text-color);
  transition: all 0.25s;
  font-size: 1.05rem;
  display: flex;
  align-items: center;
}

.sidebar__collapsed .navigation-item {
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;
}

.sidebar__collapsed .navigation-item span {
  font-size: 0.8rem;
}

.sidebar__collapsed .navigation-item .pi {
  margin-right: 0;
}

.navigation-item:hover {
  background-color: var(--surface-hover);
}

.navigation-item i {
  margin-right: 5px;
  color: var(--primary-color);
}

.navigation-item__active {
  background-color: var(--surface-hover);
  font-weight: 700;
}

@media (max-width: 768px) {
  .sidebar {
    width: 100px;
    left: 0;
  }

  .sidebar__collapsed {
    left: -100px;
  }

  .navigation-item {
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 5px;
  }

  .navigation-item span {
    font-size: 0.8rem;
  }

  .navigation-item .pi {
    margin-right: 0;
  }

  .sidebar-close {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    margin-top: 20px;
  }
}
</style>
