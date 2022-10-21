<script setup lang="ts">
import { computed, ref } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import ProductCardSkeleton from '@/components/ProductCardSkeleton.vue'
import { useProductStore } from '@/store/products'

import { userCart } from '@/store/cart'

// composable
const { t } = useLang()

// compiler macro
definePageMeta({
  layout: 'page',
})
useHead(() => ({
  title: 'SHOP',
  meta: [
    {
      name: 'SHOP',
      content: 'buy a goods',
    },
  ],
}))

const productStore = useProductStore()

productStore.fetchAll()

const cart = userCart()
const products = computed(() => productStore.list)
</script>

<template>
  <CartsDisplay />

  <div class="p-4 max-w-7xl mx-auto">
    <p>{{ cart.cartItems }}</p>
    <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <ProductCardSkeleton
        v-for="n in 15"
        v-show="!productStore.loaded"
        :key="n"
      />
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>
