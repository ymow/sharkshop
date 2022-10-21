<script setup lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { MdAdd, MdRemove } from '@vicons/ionicons4'

import { useProductStore } from '@/store/products'

import { userCart } from '@/store/cart'
const cart = userCart()
</script>

<template>
  <div class="flex flex-row-reverse ml-2 w-full">
    <div class="relative">
      <div
        class="absolute text-xs rounded-full -mt-1 -mr-2 px-1 font-bold top-0 right-0 bg-red-700 text-white"
      >
        {{ cart.cartItems.length }}
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-shopping-cart w-6 h-6 mt-2"
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path
          d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
        />
      </svg>
    </div>
  </div>

  <n-space :size="24" align="center" item-style="display: flex;">
    <n-badge :value="value" :max="15" :show="show">
      <n-avatar />
    </n-badge>
    <!-- <n-badge :value="value" dot :show="show">
      <n-avatar />
    </n-badge> -->
    <!-- <n-button-group>
      <n-button @click="value = Math.min(16, value + 1)">
        <template #icon>
          <n-icon><MdAdd /></n-icon>
        </template>
      </n-button>
      <n-button @click="value = Math.max(0, value - 1)">
        <template #icon>
          <n-icon><MdRemove /></n-icon>
        </template>
      </n-button>
    </n-button-group>
    <n-switch v-model:value="show" /> -->
  </n-space>
</template>
