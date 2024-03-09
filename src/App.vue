<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <RouterLink to="/">Mode local</RouterLink>
    <RouterLink to="/cloud">Mode cloud</RouterLink>
  </header>
  <RouterView />
</template>

<style scoped>
header {
  display: flex;
  justify-content: center;
  gap: 50px;
}
</style>
