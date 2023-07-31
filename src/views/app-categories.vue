<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <PreLoader v-if="loading"/>

      <div class="row" v-else>

        <CategiryCreate @created="addNewCategory" />

        <CategiryEdit
        v-if="categories.length"
        :categories="categories"
        :key="categories.length + updateCount"
        @updated="updateCategories"
        />

        <CategiryDelit
        v-if="categories.length"
        :categories="categories"
        :key="categories.length + updateCount"
        @updated="updateCategories"
        />
      </div>
    </section>
  </div>
</template>

<style>

</style>

<script>
import CategiryCreate from '@/components/CategiryCreate'
import CategiryEdit from '@/components/CategiryEdit'
import CategiryDelit from '@/components/CategiryDelit'
import PreLoader from '@/components/app/PreLoader.vue'

export default {
  name: 'app-categiry',
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  components: {
    CategiryCreate, CategiryEdit, PreLoader, CategiryDelit
  },
  methods: {
    addNewCategory (category) {
      this.categories.push(category)
    },
    updateCategories (category) {
      const idx = this.categories.findIndex(c => c.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      this.updateCount++
    }
  }
}
</script>
