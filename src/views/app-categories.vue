<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <PreLoader v-if="loading"/>

      <div class="row" v-else>

        <CategiryCreate @created="addNewCategory" />

        <CategiryEdit />

      </div>
    </section>
  </div>
</template>

<style>

</style>

<script>
import CategiryCreate from '@/components/CategiryCreate'
import CategiryEdit from '@/components/CategiryEdit'
import PreLoader from '@/components/app/PreLoader.vue'

export default {
  name: 'app-categiry',
  data: () => ({
    categories: [],
    loading: true
  }),
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories')
    console.log(this.categories)
    this.loading = false
  },
  components: {
    CategiryCreate, CategiryEdit, PreLoader
  },
  methods: {
    addNewCategory (category) {
      this.categories.push(category)
      console.log(this.categories)
    }
  }
}
</script>
