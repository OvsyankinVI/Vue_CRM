<template>
  <div>
    <div class="page-title">
      <h3>New record</h3>
    </div>
    <section>
    <PreLoader v-if="loading"/>

    <p class="center" v-else-if="!categories.length">No recordings yet. <router-link to="/categories">Add</router-link></p>

    <div v-else>
      <form class="form" @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="category">
            <option
              v-for="c in categories"
              :key="c.id"
              :value="c.id"
            >
            {{ c.title }}
            </option>
          </select>
          <label>Select a category</label>
        </div>

        <p>
          <label>
            <input class="with-gap" name="type" type="radio" value="income" v-model="type"/>
            <span>Income</span>
          </label>
        </p>

        <p>
          <label>
            <input class="with-gap" name="type" type="radio" value="outcome" v-model="type"/>
            <span>Outcome</span>
          </label>
        </p>

        <div class="input-field">
          <input id="amount" type="number" v-model.number="amount"/>
          <label for="amount">Amount</label>
          <small
            class='helper-text invalid'
            v-for='error of v$.amount.$errors'
            :key='error.$uid'
          >
            {{ error.$message }}
          </small>
        </div>

        <div class="input-field">
          <input id="description" type="text" v-model="description"/>
          <label for="description">Description</label>
          <small
            class='helper-text invalid'
            v-for='error of v$.description.$errors'
            :key='error.$uid'
          >
            {{ error.$message }}
          </small>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Create
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
    </section>
  </div>
</template>

<script>
import PreLoader from '@/components/app/PreLoader.vue'
import { required, minValue, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { mapGetters } from 'vuex'

export default {
  name: 'app-record',
  setup: () => {
    return { v$: useVuelidate() }
  },
  data: () => ({
    loading: true,
    select: null,
    categories: [],
    category: null,
    type: 'outcome',
    amount: 100,
    description: ''
  }),
  validations: {
    description: {
      required: helpers.withMessage('Enter description', required)
    },
    amount: {
      minValue: helpers.withMessage(
        ({ $params }) =>
      `Minimal value ${$params.min}`, minValue(100)
      )
    }
  },
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false

    setTimeout(() => {
      this.select = window.M.FormSelect.init(this.$refs.select)
      window.M.updateTextFields()
    }, 0)
    if (this.categories.length) {
      this.category = this.categories[0].id
    }
  },
  unmounted () {
    if (this.select) {
      this.select.destroy()
    }
  },
  components: {
    PreLoader
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord () {
      if (this.type === 'income') {
        return true
      } else if (this.description === '') {
        return
      } return this.info.bill >= this.amount
    }
  },
  methods: {
    async submitHandler () {
      if (this.v$.$invalid) {
        this.v$.$touch()
      }
      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          })
          const bill = this.type === 'income'
            ? this.info.bill + this.amount
            : this.info.bill - this.amount
          await this.$store.dispatch('updateInfo', { bill })
          this.$mess('The record was successfully created')
          this.v$.$reset()
          this.amount = 1
          this.description = ''
        } catch (e) {}
      } else if (this.description === '') {
        this.$mess('Enter the name of the operation')
      } else {
        this.$mess(`There are not enough ${this.amount - this.info.bill} rubles on the account for this operation`)
      }
    }
  }
}
</script>

<style>
</style>
