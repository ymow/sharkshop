<script setup>
import { ref } from 'vue'
import BaseListbox from '@/components/BaseListbox.vue'

const people = [
  { value: 1, label: 'Wade Cooper' },
  { value: 2, label: 'Arlene Mccoy' },
  { value: 3, label: 'Devon Webb' },
  { value: 4, label: 'Tom Cook' },
  { value: 5, label: 'Tanya Fox' },
  { value: 6, label: 'Hellen Schmidt' },
]

const quantities = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
]

const roles = [
  { value: 1, label: 'Marketing' },
  { value: 2, label: 'Front desk' },
  { value: 3, label: 'Support' },
]

const form = ref({
  quantity_id: null,
  person_id: null,
  role_ids: [],
})
</script>

<template>
  <div class="p-4 mx-auto max-w-2xl">
    <form
      action="#"
      class="flex flex-col space-y-6"
    >
      <BaseListbox
        v-model="form.quantity_id"
        placeholder="Select quantity"
        :options="quantities"
      />
      <BaseListbox
        v-model="form.person_id"
        placeholder="Select person"
        :options="people"
      />

      <BaseListbox
        v-model="form.role_ids"
        placeholder="Select roles"
        :options="roles"
        multiple
      />
    </form>
  </div>
</template>
