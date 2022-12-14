<script setup lang="ts">
import { computed, defineExpose, onBeforeMount, ref } from 'vue'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/24/solid'
import type { OrderItem } from '@/types/order'
import { userCart } from '@/store/cart'
const props = defineProps({
  options: Array,
  modelValue: [String, Number, Array],
  placeholder: {
    type: String,
    default: 'Select option',
  },
  qty: Object,
  cartItem: Object,
  multiple: Boolean,
  error: String,
})

const emit = defineEmits(['update:modelValue', 'quantityChanged'])

const cart = userCart()

const { updateItem } = useDirectusItems()
const updatedOrderItem = ref(null)
const updateOrderItemById: OrderItem = async (orderItem, qty) => {
  const orderItemId = orderItem.id
  const newItem: OrderItem[] = {
    id: orderItemId,
    order_id: orderItem.order_id,
    product_id: orderItem.product_id,
    product_name: orderItem.name,
    price: orderItem.price,
    quantity: qty,
    spec: orderItem.specs,
    sku: orderItem.sku,
    delivery_option: orderItem.delivery_option,
  }
  try {
    const filters = { id: 'orderItemId' }
    updatedOrderItem.value = await updateItem<OrderItem>({
      collection: 'order_items',
      id: orderItemId,
      item: newItem,
    })
  }
  catch (e) {
  }
}

watch(
  () => props.modelValue,
  (first, second) => {
    const cart = userCart()

    console.log('Query Order Item from Directus:', first, second)

    const newQty = first
    if (newQty > 0)
      updateOrderItemById(toRaw(props.cartItem), newQty)
  },
)

onBeforeMount(() => {
  // console.log(props.qty)
  // return props.modelValue.value === props.qty
})

const label = computed(() => {
  // console.log(`${props.modelValue}is selected`)
  // update the order item
  // https://www.youtube.com/watch?v=MxmhjBDAa0k
  // https://tallpad.com/series/headlessui/lessons/building-a-menu-tree-vue-component-with-tailwindcss-and-headlessui
  // https://tallpad.com/series/headlessui/lessons/headless-ui-listbox-reusable-vue-component

  return props.options
    .filter((option) => {
      if (Array.isArray(props.modelValue))
        return props.modelValue.includes(option.value)

      return props.modelValue === option.value
    })
    .map(option => option.label)
    .join(', ')
})

const emitFunction = function (changedQtyValue) {
  emit('quantityChanged', changedQtyValue)
}
</script>

<template>
  <p>{{ props.cartItemId }}</p>
  <Listbox
    :model-value="props.modelValue"
    :multiple="props.multiple"
    @update:modelValue="(value) => emit('update:modelValue', value)"
    @click="emitFunction(modelValue)"
  >
    <div class="relative mt-1 float-right">
      <ListboxButton
        class="relative py-2 pr-10 pl-3 w-200 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
      >
        <span v-if="label" class="block truncate">{{ label }}</span>
        <span v-else class="text-gray-500">{{ props.qty.label }}</span>
        <span
          class="flex absolute inset-y-0 right-0 items-center pr-2 pointer-events-none"
        >
          <ChevronUpDownIcon aria-hidden="true" class="w-5 h-5 text-gray-400" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="overflow-auto absolute z-10 py-1 mt-1 w-full max-h-60 text-base bg-white rounded-md ring-1 ring-black ring-opacity-5 shadow-lg focus:outline-none sm:text-sm"
        >
          <ListboxOption
            v-for="option in props.options"
            :key="option.label"
            v-slot="{ active, selected }"
            :value="option.value"
            as="template"
          >
            <li
              class="relative cursor-default select-none py-2 pl-10 pr-4"
              :class="[active ? 'bg-amber-100 text-amber-900' : 'text-gray-900']"
            >
              <span
                class="block truncate"
                :class="[selected ? 'font-medium' : 'font-normal']"
              >{{ option.label }}</span>
              <span
                v-if="selected"
                class="flex absolute inset-y-0 left-0 items-center pl-3 text-amber-600"
              >
                <CheckIcon aria-hidden="true" class="w-5 h-5" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
      <div v-if="props.error" class="text-xs text-red-400 mt-1">
        {{ props.error }}
      </div>
    </div>
  </Listbox>
</template>
