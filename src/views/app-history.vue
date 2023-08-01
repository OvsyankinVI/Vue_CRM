<template>
  <div>
    <div class="page-title">
      <h3>История расходов</h3>
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
import { Pie } from 'vue-chartjs'

export default {
  name: 'app-history',
  extends: Pie,
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
            'rgba(168, 150, 50, 0.2)',
            'rgba(122, 225, 245, 0.2)',
            'rgba(245, 2, 9, 0.2)',
            'rgba(245, 73, 14, 0.2)',
            'rgba(109, 173, 92, 0.2)',
            'rgba(136, 171, 169, 0.2)',
            'rgba(242, 201, 235, 0.2)',
            'rgba(98, 245, 237, 0.2)',
            'rgba(245, 214, 73, 0.2)',
            'rgba(173, 159, 92, 0.2)',
            'rgba(242, 15, 59, 0.2)'
          ],
          borderColor: [
            'rgba(168, 150, 50, 1)',
            'rgba(122, 225, 245, 1)',
            'rgba(245, 2, 9, 1)',
            'rgba(245, 73, 14, 1)',
            'rgba(109, 173, 92, 1)',
            'rgba(136, 171, 169, 1)',
            'rgba(242, 201, 235, 1)',
            'rgba(98, 245, 237, 1)',
            'rgba(245, 214, 73, 1)',
            'rgba(173, 159, 92, 1)',
            'rgba(242, 15, 59, 1)'
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
