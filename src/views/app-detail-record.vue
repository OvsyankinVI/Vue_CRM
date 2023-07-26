<template>
  <div>
    <PreLoader v-if="loading"/>
    <div v-else>
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="black-text">
          <a class="breadcrumb">История</a>
        </router-link>
        <a class="breadcrumb">
          {{ record.type === 'income' ? ' Доход' : 'Расход' }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            class="card"
            :class="{
              'red': record.type === 'outcome',
              'green': record.type === 'income'
            }"
          >
            <div class="card-content white-text">
              <p>Описание: {{ record.description }}</p>
              <p>Сумма: {{ record.amount + ' ' + '₽' }}</p>
              <p>Категория: {{ record.categoryName }}</p>

              <small>{{ record.date.slice(0, 10) }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PreLoader from '@/components/app/PreLoader.vue'

export default {
  name: 'app-detail',
  data: () => ({
    record: null,
    loading: true
  }),
  async mounted () {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', id)
    const category = await this.$store.dispatch('fetchCategoriesById', record.categoryId)
    this.record = {
      ...record,
      categoryName: category.title
    }
    this.loading = false
  },
  components: {
    PreLoader
  }
}
</script>

<style>
</style>
