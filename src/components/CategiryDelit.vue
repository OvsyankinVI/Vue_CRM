<template>
<div class="col s12 m6">
    <div>
    <div class="page-subtitle">
        <h4>Delete</h4>
    </div>

    <form @submit.prevent="submitHandler">
        <div class="input-field">
        <select ref="select" v-model="current">
            <option
            v-for="c of categories"
            :key="c.id"
            :value="c.id"
            >
            {{ c.title }}
            </option>
        </select>
        <label>Select a category</label>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
        Delete
        <i class="material-icons right">send</i>
        </button>
    </form>
    </div>
</div>
</template>

<script>

import { useVuelidate } from '@vuelidate/core'

export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  setup: () => {
    return { v$: useVuelidate() }
  },
  data: () => ({
    select: null,
    current: null
  }),
  mounted () {
    this.select = window.M.FormSelect.init(this.$refs.select)
    window.M.updateTextFields()
  },
  unmounted () {
    if (this.select) {
      this.select.destroy()
    }
  },
  created () {
    const { id } = this.categories[0]
    this.current = id
  },
  watch: {
    current (catId) {
      const { title } = this.categories.find(c => c.id === catId)
      this.title = title
    }
  },
  methods: {
    async submitHandler () {
      if (this.v$.$invalid) {
        this.v$.$touch()
      }
      try {
        const categoryData = {
          id: this.current
        }
        await this.$store.dispatch('deleteCategory', categoryData)
        this.v$.$reset()
        this.$mess('Category deleted')
        this.$emit('updated', categoryData)
      } catch (e) {}
    }
  }
}
</script>
