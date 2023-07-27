<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <PreLoader v-if="loading"/>

    <p class="center" v-else-if="!records.length">Записей пока нет.</p>

    <section v-else>
      <HistoryTable :records="records"/>
    </section>
  </div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable.vue'
import PreLoader from '@/components/app/PreLoader.vue'
import { Bar } from 'vue-chartjs'

export default {
  name: 'app-history',
  extends: Bar,
  data: () => ({
    loading: true,
    records: [],
    categories: [],
    chartData: {
      labels: ['January', 'February', 'March'],
      datasets: [{ data: [40, 20, 12] }]
    },
    chartOptions: {
      responsive: true
    }
  }),
  async mounted () {
    /* this.records = await this.$store.dispatch('fetchRecord') */
    this.records = await this.$store.dispatch('fetchRecord')
    this.categories = await this.$store.dispatch('fetchCategories')
    this.setup()

    this.loading = false
  },
  components: {
    HistoryTable, PreLoader
  },
  methods: {
    setup () {
      this.records = this.records.map(record => {
        return {
          ...record,
          categoryName: this.categories.find(c => c.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Доход' : 'Расход'
        }
      })
      this.renderChart({
        labels: this.categories.map(c => c.title),
        datasets: [{
          label: 'Расходы по категориям',
          data: this.categories.map(c => {
            return this.records.reduce((total, r) => {
              if (r.categoryId === c.id && r.type === 'outcome') {
                return (total + r.amount)
              } return total
            }, 0)
          }),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 11, 235, 0.2)',
            'rgba(54, 162, 35, 0.2)',
            'rgba(4, 16, 5, 0.2)',
            'rgba(54, 621, 511, 0.2)',
            'rgba(4, 162, 235, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(54, 11, 235, 1)',
            'rgba(54, 162, 35, 1)',
            'rgba(4, 16, 5, 1)',
            'rgba(54, 621, 511, 1)',
            'rgba(34, 12, 5, 1)'
          ],
          borderWidth: 1
        }]
      })
    }
  }
}
</script>

<style>

</style>
