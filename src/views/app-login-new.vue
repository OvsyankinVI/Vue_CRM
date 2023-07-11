<template>
<form class="card auth-card">
    <div class="card-content">
    <span class="card-title">Домашняя бухгалтерия</span>
    <div class="input-field">
        <input
        id="email"
        type="text"
        v-model.trim="email"
        :class="{invalid:
            (v$.email.$dirty && !v$.email.required) ||
            (v$.email.$dirty && !v$.email.email)}"
        />
        <label for="email">Email</label>
        <small class="helper-text invalid">Email</small>
    </div>
    <div class="input-field">
        <input
        id="password"
        type="password"
        v-model.trim='password'
        :class='{
            invalid:
              (v$.password.$dirty && !v$.password.required) ||
              (v$.password.$dirty && !v$.password.minLength),
          }'
           />
        <label for="password">Пароль</label>
        <small class="helper-text invalid">Password</small>
    </div>
    </div>
    <div class="card-action">
    <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
        Войти
        <i class="material-icons right">send</i>
        </button>
    </div>

    <p class="center">
        Нет аккаунта?
        <router-link to="/register" href="/">Зарегистрироваться</router-link>
    </p>
    </div>
</form>
</template>

<script>
/* import { reactive } from 'vue' // or '@vue/composition-api' in Vue 2.x */
import { useVuelidate } from '@vuelidate/core'
import { email, required, minLength } from '@vuelidate/validators'

export default {
  name: 'app-login',
  setup: () => {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) }
  },
  methods: {
    submitHandler () {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      this.$router.push('/')
    }
  }
}
</script>

<style>
</style>
