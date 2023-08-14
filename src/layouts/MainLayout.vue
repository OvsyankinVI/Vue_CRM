<template>
  <div>
    <PreLoader v-if="loading"/>
    <div v-else class="app-main-layout">

      <navbar @click-on="isopen = !isopen" />

      <sidebar @click-on="isopen = !isopen" :opened="isopen" />

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
  </div>
</template>

<script>
import navbar from '../components/app/NavBar.vue'
import sidebar from '../components/SideBar.vue'
import PreLoader from '@/components/app/PreLoader.vue'

export default {
  name: 'mail-layout',
  data () {
    return {
      isopen: false,
      loading: true
    }
  },
  async mounted () {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
    this.loading = false
  },
  components: {
    navbar, sidebar, PreLoader
  }
}
</script>

<style lang="scss">

</style>
