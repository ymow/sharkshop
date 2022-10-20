import { ref, Ref } from 'vue'
import { defineStore } from 'pinia'

import { Product } from '@/stores/products'

interface CartState {
  cartItems: Ref<Array<Product>>
}

export const userCart = defineStore('cart', {
  state: (): CartState => ({
    cartItems: ref([]),
  }),
  actions: {
    addToCart(item) {
      this.cartItems.push(item)
    },
  },
  getters: {
    cartTotal: (state) =>
      state.cartItems.map((item) => item.price).reduce((a, c) => a + c, 0),
  },
})
