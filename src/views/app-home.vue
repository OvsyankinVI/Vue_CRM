<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <PreLoader v-if="loading"/>

    <div class="row" v-else>

    <HomeBill
    :rates="this.currency.rates"
    />

    <HomeCurrency
    :rates="this.currency.rates"
    :date="this.currency.date"
    />

    </div>
  </div>
</template>

<script>
import HomeBill from '@/components/app/HomeBill.vue'
import HomeCurrency from '@/components/app/HomeCurrency.vue'
import PreLoader from '@/components/app/PreLoader.vue'
import axios from 'axios'

export default {
  data () {
    return {
      loading: true,
      currency: {},
      data: new Date(),
      key: process.env.VUE_APP_FIXER
    }
  },
  async mounted () {
    this.currency = await axios.get('https://www.cbr-xml-daily.ru/latest.js').then(response => { return response.data })
    this.loading = false
  },
  methods: {
    async refresh () {
      this.loading = true
      this.currency = await axios.get('https://www.cbr-xml-daily.ru/latest.js').then(response => { return response.data })
      this.loading = false
    }
  },
  components: {
    HomeBill, HomeCurrency, PreLoader
  }
}
</script>

<style>
</style>
