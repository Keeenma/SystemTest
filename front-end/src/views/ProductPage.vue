<template>
  <h1>Products</h1>
  <ProductList :result="result"></ProductList>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProductList from '../components/ProductList.vue';
import axios from 'axios';

const result = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('/api/products');
    result.value = response.data
  }
  catch (error) {
    console.log(error)
  }
})
</script>