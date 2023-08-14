<template>
  <form class="card auth-card" @submit.prevent='submitHandler'>
    <div class="card-content">
      <span class="card-title center">Home finance</span>
      <div class='input-field'>
        <input
          id='email'
          type='text'
          v-model.trim='email'
          :class='{
            invalid:
              (v$.email.$dirty && !v$.email.required) ||
              (v$.email.$dirty && !v$.email.email),
          }'
        />
        <label for='email'>Email</label>
        <small
          class='helper-text invalid'
          v-for='error of v$.email.$errors'
          :key='error.$uid'
        >
          {{ error.$message }}
        </small>
      </div>
      <div class='input-field'>
        <input
          id='password'
          type='password'
          v-model.trim='password'
          :class='{
            invalid:
              (v$.password.$dirty && !v$.password.required) ||
              (v$.password.$dirty && !v$.password.minLength),
          }'
        />
        <label for='password'>Password</label>
        <small
          class='helper-text invalid'
          v-for='error of v$.password.$errors'
          :key='error.$uid'
        >
          {{ error.$message }}
        </small>
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim='name'
          :class='{
            invalid:
              (v$.name.$dirty && !v$.name.required)
          }'
          />
        <label for="name">Name</label>
        <small
          class='helper-text invalid'
          v-for='error of v$.name.$errors'
          :key='error.$uid'
        >
          {{ error.$message }}
        </small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree"/>
          <span>I agree with the rules</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Sign up
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Already have an account?
        <router-link to="/login">Sign in!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { email, required, minLength, helpers } from '@vuelidate/validators'

export default {
  name: 'app-register',
  setup: () => {
    return { v$: useVuelidate() }
  },
  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: false
  }),
  validations: {
    email: {
      email: helpers.withMessage('Enter correct Email', email),
      required: helpers.withMessage(
        'The Email field should not be empty',
        required
      )
    },
    password: {
      required: helpers.withMessage('Enter password', required),
      minLength: helpers.withMessage(
        ({ $params, $model }) =>
        `The password must be ${$params.min} symbols. Now it's  ${$model.length}`,
        minLength(6)
      )
    },
    name: {
      required: helpers.withMessage('Enter name', required)
    },
    agree: { checked: v => v }
  },
  methods: {
    async submitHandler () {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }

      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
      } catch (e) {}
    }
  }
}
</script>

<style>
</style>
