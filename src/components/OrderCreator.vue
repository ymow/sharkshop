<script setup lang="ts">
import { Product } from '@/store/products'
const { createItems } = useDirectusItems()
const createOrders(item:Product) => async () => {
  try {
    await createItems<Product>({ collection: 'Orders', item })
  }
  catch (e) {}
}
</script>

<template />
