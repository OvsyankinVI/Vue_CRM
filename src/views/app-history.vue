<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <section>
      <HistoryTable />
    </section>
  </div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable.vue'

export default {
  name: 'app-history',
  components: {
    HistoryTable
  }
}

</script>

<style>

</style>
