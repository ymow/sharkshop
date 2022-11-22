<script>
import { defineComponent, reactive, watch } from 'vue'

const DUMMY_DATA = {
  states: [
    {
      code: 'NY',
      name: 'New York',
    }, {
      code: 'CA',
      name: 'California',
    },
  ],
  provinces: [
    {
      code: 'AB',
      name: 'Alberta',
    }, {
      code: 'BC',
      name: 'British Columbia',
    },
  ],
  countries: [
    {
      code: 'US',
      name: 'United States',
    }, {
      code: 'CA',
      name: 'Canada',
    },
  ],
}

export default defineComponent({
  setup() {
    const data = reactive({
      country: DUMMY_DATA.countries[0].code,
      state: '',
    })

    watch(() => data.country, () => data.state = '')

    return {
      data,
      ...DUMMY_DATA,
    }
  },
})
</script>

<template>
  <div>
    <label v-if="data.country === 'US'">
      State
      <select v-model="data.state">
        <option value="" disabled>state</option>
        <option
          v-for="(state, i) in states"
          :key="i"
          :value="state.code"
        >{{ state.name }}</option>
      </select>
    </label>
    <label v-if="data.country === 'CA'">
      Province
      <select v-model="data.state">
        <option value="" disabled>province</option>
        <option
          v-for="(province, i) in provinces"
          :key="i"
          :value="province.code"
        >{{ province.name }}</option>
      </select>
    </label>
  </div>

  <label>
    Country
    <select v-model="data.country">
      <option disabled>country</option>
      <option
        v-for="(country, i) in countries"
        :key="i"
        :value="country.code"
      >{{ country.name }}</option>
    </select>
  </label>
</template>
