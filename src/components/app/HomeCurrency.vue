<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Exchange rate</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Currency</th>
              <th>Rate</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            <tr
            v-for="cur of currencies"
            :key="cur"
            >
              <td>{{ cur }}</td>
              <td>{{ fixed(cur).toFixed(2) }}</td>
              <td>{{ date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rates', 'date'],
  data () {
    return {
      currencies: ['USD', 'EUR', 'GEL']
    }
  },
  methods: {
    fixed (cure) {
      const far = this.rates[cure]
      return 1 / far
    }
  }
}
</script>
