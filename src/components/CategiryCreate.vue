<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Create</h4>
      </div>

      <form @submit.prevent="submitHandler">
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
          Create
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
  setup: () => {
    return { v$: useVuelidate() }
  },
  data: () => ({
    title: '',
    limit: 100
  }),
  validations: {
    title: {
      required: helpers.withMessage('Enter a name', required)
    },
    limit: {
      minValue: helpers.withMessage(
        ({ $params }) =>
      `Minimal value ${$params.min}`, minValue(100)
      )
    }
  },
  mounted () {
    window.M.updateTextFields()
  },
  methods: {
    async submitHandler () {
      if (this.v$.$invalid) {
        this.v$.$touch()
      }
      try {
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit
        })
        this.title = ''
        this.limit = 100
        this.v$.$reset()
        this.$mess('New category created')
        this.$emit('created', category)
      } catch (e) {}
    }
  }
}
</script>
