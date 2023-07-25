<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
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

export default {
  name: 'app-history',
  data: () => ({
    loading: true,
    records: [],
    categories: []
  }),
  async mounted () {
    /* this.records = await this.$store.dispatch('fetchRecord') */
    const records = await this.$store.dispatch('fetchRecord')
    this.categories = await this.$store.dispatch('fetchCategories')
    this.records = records.map(record => {
      return {
        ...record,
        categoryName: this.categories.find(c => c.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход'
      }
    })
    this.loading = false
  },
  components: {
    HistoryTable, PreLoader
  }
}
</script>

<style>

</style>
