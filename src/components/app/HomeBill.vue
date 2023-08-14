<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Currency account</span>
        <p class="currency-line"><span>{{ this.$store.getters.info.bill + ' ' + '₽' }}</span></p>
        <p
        class="currency-line"
        v-for="cur of currencies"
        :key="cur"
        >
          <span>{{ getCurr(cur) + ' ' + cur }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rates'],
  data () {
    return {
      currencies: ['USD', 'EUR', 'GEL']

    }
  },
  methods: {
    getCurr (curren) {
      return Math.floor(this.$store.getters.info.bill * this.rates[curren])
    }
  }
}
</script>
