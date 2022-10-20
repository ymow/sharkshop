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
// const { data } = await useFetch<string, Array<Product>>(
//   'https://fakestoreapi.com/products'
// )
// const productStore: Array<Product> = data.value

const cart = userCart()

type Order = 'default' | 'priceAsc' | 'priceDesc'
const order = ref<Order>('default')
const products = computed(() => productStore.list)
// const productsPL = computed(() => {
//   return products.value.sort((a: Product, b: Product) => {
//     return a.price > b.price ? 1 : -1
//   })
// })

// const productsPH = computed(() => {
//   return products.value.sort((a: Product, b: Product) => {
//     return a.price < b.price ? 1 : -1
//   })
// })
const filteredProducts = computed(() => {
  if (order.value === 'priceAsc')
    return productsPL.value
  else if (order.value === 'priceDesc')
    return productsPH.value

  return products.value
})

// function setOrder(val: Order) {
//   order.value = val
// }
</script>

<template>
  <PageWrapper>
    <PageHeader>
      <PageTitle :text="$t('pages.products.title')" class="capitalize" />
    </PageHeader>
    <PageBody>
      <PageSection>
        <PageSectionTitle
          :text="$t('pages.products.list')"
          class="capitalize"
        />
        <div class="p-4 max-w-7xl mx-auto">
          <!-- <div class="text-center lg:text-left">
            <div class="block mb-3 font-bold">Sort by:</div>
            <div class="divide-x-2 inline-flex border-2 h-16 rounded-lg mb-3">
              <button
                class="px-8 py-4 text-gray-500 hover:text-gray-800"
                @click="setOrder('priceAsc')"
              >
                Price &uarr;
              </button>
              <button
                href=""
                class="px-8 py-4 text-gray-500 hover:text-gray-800"
                @click="setOrder('default')"
              >
                What's new
              </button>
              <button
                class="px-8 py-4 text-gray-500 hover:text-gray-800"
                @click="setOrder('priceDesc')"
              >
                Price &darr;
              </button>
            </div>
          </div> -->
          <p>{{ filteredProducts }}</p>
          <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <ProductCardSkeleton
              v-for="n in 15"
              v-show="!productStore.loaded"
              :key="n"
            />
            <ProductCard
              v-for="product in filteredProducts"
              :key="product.id"
              :product="product"
            />
          </div>
        </div>
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>
