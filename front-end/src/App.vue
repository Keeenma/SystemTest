<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '../src/components/Navbar.vue'

</script>

<template>
  <Navbar />
  <div class="page-wrap">
    <RouterView />
  </div>
</template>

