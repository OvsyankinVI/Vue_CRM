<template>
  <div>
    <div class="page-title">
      <h3>Planning</h3>
      <h4>{{ info.bill + ' ' + '₽' }}</h4>
    </div>
    <PreLoader v-if="loading"/>

    <p class="center" v-else-if="!categories.length">No recordings yet. <router-link to="/categories">Add</router-link></p>

    <section v-else>
      <div
        v-for="cat of categories"
        :key="cat.id"
      >
        <p>
          <strong>{{ cat.title }}</strong>
          {{ cat.spend }}₽ of {{ cat.limit }}₽
        </p>
        <div class="progress">
          <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{width: cat.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import PreLoader from '@/components/app/PreLoader.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'app-planing',
  data: () => ({
    loading: true,
    categories: []
  }),
  async mounted () {
    const records = await this.$store.dispatch('fetchRecord')
    const categories = await this.$store.dispatch('fetchCategories')
    this.categories = categories.map(cat => {
      const spend = records
        .filter(r => r.categoryId === cat.id)
        .filter(r => r.type === 'outcome')
        .reduce((total, record) => {
          return (total + record.amount)
        }, 0)
      const percent = 100 * spend / cat.limit
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor = percent < 60
        ? 'green'
        : percent < 100
          ? 'yellow'
          : 'red'
      return { ...cat, spend, progressPercent, progressColor }
    })
    this.loading = false
  },
  computed: {
    ...mapGetters(['info'])
  },
  components: {
    PreLoader
  }
}
</script>

<style>
</style>
