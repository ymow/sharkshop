<script setup lang="ts">
import type { Product } from '@/store/products'
const { createItems } = useDirectusItems()

const createProducts: Product[] = async () => {
  try {
    const items: Product[] = [
      {
        id: 20,
        name: 'awesome',
        price: 1000,
        stock: 100,
        specs: 'wow',
        cover_image_data: 'https://i.imgflip.com/6ywgjq.jpg',
      },
    ]
    await createItems<Product>({ collection: 'products', items })
  }
  catch (e) {}
}
</script>

<template>
  {{ createProducts }}
  <div class="mt-10 flex">
    <n-button
      class="btn btn-primary"
      strong
      secondary
      type="success"
      @click="createOrders"
    >
      Add to Cart
    </n-button>
  </div>
</template>
