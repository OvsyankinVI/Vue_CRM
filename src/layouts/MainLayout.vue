<template>
    <div class="app-main-layout">

      <navbar @click-on="isopen = !isopen" />

      <sidebar :opened="isopen" />

      <main class="app-content" :class="{full: !isopen}">
        <div class="app-page">
            <router-view/>
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/record">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
</template>

<script>
import navbar from '../components/app/NavBar.vue'
import sidebar from '../components/SideBar.vue'

export default {
  name: 'mail-layout',
  data () {
    return {
      isopen: true
    }
  },
  async mounted () {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
  },
  components: {
    navbar, sidebar
  }
}
</script>

<style lang="scss">

</style>
