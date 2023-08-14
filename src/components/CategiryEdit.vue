<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Edit</h4>
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

        <div class="input-field">
          <input id="name"
            type="text"
            v-model="title"
            :class='{
            invalid :
              (v$.title.$dirty && !v$.title.required)
            }'
          />
          <label for="name">Title</label>
          <small
            class='helper-text invalid'
            v-for='error of v$.title.$errors'
            :key='error.$uid'
          >
            {{ error.$message }}
          </small>
        </div>

        <div class="input-field">
          <input id="limit"
            type="number"
            v-model.number="limit"
            :class='{
            invalid :
              (v$.limit.$dirty && !v$.limit.minValue)
          }'
          />
          <label for="limit">Limit</label>
          <small
            class='helper-text invalid'
            v-for='error of v$.limit.$errors'
            :key='error.$uid'
          >
            {{ error.$message }}
          </small>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Update
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>

import { required, minValue, helpers } from '@vuelidate/validators'
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
    title: '',
    limit: 100,
    current: null
  }),
  validations: {
    title: {
      required: helpers.withMessage('Enter title', required)
    },
    limit: {
      minValue: helpers.withMessage(
        ({ $params }) =>
      `Minimal value ${$params.min}`, minValue(100)
      )
    }
  },
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
    const { id, title, limit } = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit
  },
  watch: {
    current (catId) {
      const { title, limit } = this.categories.find(c => c.id === catId)
      this.title = title
      this.limit = limit
    }
  },
  methods: {
    async submitHandler () {
      if (this.v$.$invalid) {
        this.v$.$touch()
      }
      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        }
        await this.$store.dispatch('updateCategory', categoryData)
        this.title = ''
        this.limit = 100
        this.v$.$reset()
        this.$mess('Category updated')
        this.$emit('updated', categoryData)
      } catch (e) {}
    }
  }
}
</script>
