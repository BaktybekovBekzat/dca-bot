<template>
  <main class="main">
    <RouterView />
  </main>
</template>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 0 1rem;
}

@media (max-width: 768px) {
  .main {
    height: 70vh;
  }
}
</style>
