<script setup>
import { itemsCart } from '../temp-data';
import ShoppingList from "../components/ShoppingList.vue";
</script>

<template>
  <h1>Shopping Cart</h1>
  <ShoppingList :itemsCart="itemsCart" />
</template>
