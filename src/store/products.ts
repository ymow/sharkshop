import { defineStore } from 'pinia'

const fakeStoreUrl = 'https://fakestoreapi.com'

const sharkStoreUrl = 'http://localhost:8055'

// export interface Product {
//   id: number
//   title: string
//   price: number
//   description: string
//   category: string
//   image: string
// }

export interface Product {
  id: number
  name: string
  price: number
  stock: number
  specs: string
  cover_image_data: string
}

interface ProductState {
  items: Record<string, Product>
  ids: number[]
}

export const useProductStore = defineStore({
  id: 'products',

  state: (): ProductState => ({
    items: {},
    ids: [],
  }),

  getters: {
    list(): Product[] {
      return this.ids.map(i => this.items[i])
    },

    loaded(): boolean {
      return this.ids.length > 0
    },
  },

  actions: {
    async fetchAll() {
      if (this.loaded)
        return

      // const res = await fetch(`${fakeStoreUrl}/products`)
      const res = await fetch(`${sharkStoreUrl}/items/products`)
      const data: Product[] = await res.json()
      console.log(data.data)
      this.ids = data.data.map((product) => {
        this.items[product.id] = product
        console.log(this.items[product.id])
        return product.id
      })
    },
  },
})
