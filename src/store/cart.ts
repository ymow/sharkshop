import { Ref, ref } from 'vue'
import { defineStore } from 'pinia'
import { Product } from '@/store/products'
import { Order } from '~~/src/types/order'

interface CartState {
  cartItems: Ref<Array<Product>>
  currentCart: Ref<Array<Order>>
}

export const userCart = defineStore('cart', {
  state: (): CartState => ({
    cartItems: ref([]),
    currentCart: ref([]),
  }),
  actions: {
    addToCart(item: Product) {
      this.cartItems.push(item)
    },
    upadteCart(order) {
      // pick and filter orders than sent picked order as current order from CartsDisplay Components
      if (order) {
        this.currentCart = order
        this.cartItems = order.items
      }
    },
  },
  getters: {
    cartTotal: state =>
      state.cartItems.map(item => item.price).reduce((a, c) => a + c, 0),
  },
})
