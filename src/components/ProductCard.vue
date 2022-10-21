<script setup lang="ts">
import type { Product } from '../store/products'
import { toCurrency } from '../utils/utils'
import { userCart } from '@/store/cart'

defineProps<{
  product: Product
}>()

const cart = userCart()
</script>

<template>
  <n-card :title="product.name">
    <template #cover>
      <NuxtLink class="link link-hover" :to="`/product/${product.id}`">
        <img :src="product.cover_image_data" alt="Card Image" class="object-contain w-full h-64">
      </NuxtLink>
    </template>
    <div class="card-body">
      <p>{{ toCurrency(product.price) }}</p>
      <div class="justify-end card-actions">
        <n-button
          class="btn btn-primary"
          strong
          secondary
          type="success"
          @click="cart.addToCart(product)"
        >
          Add to Cart
        </n-button>
      </div>
    </div>
  </n-card>
</template>

<style scoped>
.n-card {
  max-width: 300px;
}
</style>
