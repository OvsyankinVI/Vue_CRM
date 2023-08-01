<template>
  <form class="card auth-card" @submit.prevent='submitHandler'>
    <div class="card-content">
      <span class="card-title center">Домашняя бухгалтерия</span>
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
        <label for='password'>Пароль</label>
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
        <label for="name">Имя</label>
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
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
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
      email: helpers.withMessage('Введите корректный Email', email),
      required: helpers.withMessage(
        'Поле Email не должно быть пустым',
        required
      )
    },
    password: {
      required: helpers.withMessage('Введите пароль', required),
      minLength: helpers.withMessage(
        ({ $params, $model }) =>
        `Пароль должен быть ${$params.min} символов. Сейчас он  ${$model.length}`,
        minLength(6)
      )
    },
    name: {
      required: helpers.withMessage('Введите имя', required)
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
