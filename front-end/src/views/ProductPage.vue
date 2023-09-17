<script setup>
import { products } from '../temp-data'
import ProductList from '../components/ProductList.vue';

</script>

<template>
  <h1>Products</h1>
  <ProductList :products="products"></ProductList>
</template>