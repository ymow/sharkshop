<script setup lang="ts">
import type { Product } from '@/store/products'
const { createItems } = useDirectusItems()
// const currentOrderId = 0
interface OrderItem {
  id?: number
  order_id: number
  product_id: number
  product_name: string
  price: number
  quantity: number
  spec: string
  SKU: string
  delivery_option: string
}

interface Order {
  id?: string | number
  subtotal: number
  shipping: number
  total: string
  delivery_option: string
  hide: false
  items: OrderItem[]
}

const createOrder: Order[] = async (item) => {
  const orderItems: OrderItem[] = [
    {
      product_name: item,
      price: 30,
      quantity: 2,
      spec: 'def1234',
      sku: 'abc1234',
      delivery_option: 'pick_up',
    },
  ]

  try {
    const items: Order[] = [
      {
        subtotal: 789,
        shipping: 456,
        total: '$ 2502',
        delivery_option: 'express',
        hide: false,
        items: orderItems,
      },
    ]
    const currentOrder = await createItems<Order>({ collection: 'orders', items })
    // currentOrderId = currentOrder.id
  }
  catch (e) {}
}
// }

// function createOrderItem(item) {
//   console.log(item)
// const createOrderItem: OrderItem[] = async (item) => {
//   try {
//     const items: OrderItem[] = [
//       {
//         // order_id: 30,
//         // product_id: 3,
//         product_name: item,
//         price: 30,
//         quantity: 2,
//         spec: 'def1234',
//         sku: 'abc1234',
//         delivery_option: 'pick_up',
//       },
//     ]
//     const currentItem = await createItems<OrderItem>({ collection: 'order_items', items })
//     console.log(currentItem)
//   }
//   catch (e) {
//     console.log(e)
//   }
// }
// }
</script>

<template>
  {{ createOrders }}
  <div class="mt-10 flex">
    <n-button
      class="btn btn-primary"
      strong
      secondary
      type="success"
      @click="createOrder('aa')"
    >
      create an order
    </n-button>
  </div>

  <!-- <div class="mt-10 flex">
    <n-button
      class="btn btn-primary"
      strong
      secondary
      type="success"
      @click="createOrderItem('bb')"
    >
      create an order item
    </n-button>
  </div> -->
</template>
