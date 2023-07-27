<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form class="form" @submit.prevent='submitHandler'>
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
        />
        <label for="description">Имя</label>
        <small
          class='helper-text invalid'
          v-for='error of v$.name.$errors'
          :key='error.$uid'
        >
          {{ error.$message }}
        </small>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
      <br><br>
    </form>
    <router-link @click="logout" to="/login" class="btn waves-effect waves-light" type="submit">
        Выйти
      </router-link>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { required, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

export default {
  name: 'app-profile',
  data: () => ({
    name: '',
    isRuLocale: true
  }),
  setup: () => {
    return { v$: useVuelidate() }
  },
  validations: {
    name: {
      required: helpers.withMessage('Введите имя', required)
    }
  },
  mounted () {
    this.name = this.info.name
    this.isRuLocale = this.info.locale === 'ru-RU'
    setTimeout(() => {
      window.M.updateTextFields()
    }, 0)
  },
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    ...mapActions(['updateInfo']),
    async logout () {
      await this.$router.push('/login?message=1logout')
      this.$store.dispatch('logout')
    },
    async submitHandler () {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }

      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US'
        })
      } catch (e) {

      }
    }
  }
}
</script>

<style>
.switch {
  margin-bottom: 2rem;
}
</style>
