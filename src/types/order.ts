export interface OrderItem {
  id?: number | string
  order_id: number | string
  product_id: number | string
  product_name: string
  price: number
  quantity: number
  spec: string
  sku: string
  delivery_option: string
}

export interface Order {
  id?: string | number
  subtotal: number
  shipping: number
  total: string
  delivery_option: string
  hide: false
  items: OrderItem[]
}
