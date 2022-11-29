import { Ref, ref } from 'vue'
import { defineStore } from 'pinia'
import { Product } from '@/store/products'
import { Order, OrderItem } from '~~/src/types/order'
const sharkStoreUrl = 'http://localhost:8055'

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
    deleteCartItem(cartItem) {
    // pick and filter orders than sent picked order as current order from CartsDisplay Components
      if (cartItem) {
        fetch(`${sharkStoreUrl}/items/order_items/${cartItem.id}`, { method: 'DELETE' })
          .then(async (response) => {
            const isJson = response.headers.get('content-type')?.includes('application/json')
            const data = isJson && await response.json()

            // check for error response
            if (!response.ok) {
            // get error message from body or default to response status
              const error = (data && data.message) || response.status
              return Promise.reject(error)
            }
            // console.log('delete success')
          })
          .catch((error) => {
            const errorMessage = `Error: ${error}`
            // console.log('There was an error!', errorMessage)
          })
      }
    },
  },
  getters: {
    cartTotal: state =>
      state.cartItems.map(item => item.price).reduce((a, c) => a + c, 0),
  },
})
