<script setup>

    const props = defineProps({
        itemsCart: Array
    })
</script>

<template>
    <div v-if="itemsCart.length > 0">
        <div class="product-container" v-for="items in itemsCart" :key="items.id">
            <img class="product-image" :src="items.imageName" />
            <div class="details-wrap">
                <h3>{{ items.name }}</h3>
                <p>{{ items.price }}</p>
            </div>
            <button class="remove-button">Remove from Cart</button>
        </div>
        <button class="checkout-button">Proceed to checkout</button>
        <RouterLink class="checkout-button" to="/">Browse more</RouterLink>
    </div>
    <div v-else>
        You current have no items in your cart!
    </div>
</template>

