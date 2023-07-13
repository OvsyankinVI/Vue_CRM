<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form class="form">
      <div class="input-field">
        <input id="description" type="text" />
        <label for="description">Имя</label>
        <span class="helper-text invalid">name</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
      <br><br>
      <router-link @click="logout" to="/login" class="btn waves-effect waves-light" type="submit">
        Выйти
      </router-link>
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    async logout () {
      await this.$router.push('/login?message=1logout')
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style>
</style>
