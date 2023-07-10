<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import emptylayout from './layouts/EmptyLayouts.vue'
import mainlayout from './layouts/MainLayout.vue'
export default {
  computed: {
    layout () {
      return (this.$route.meta.layout || 'main') + 'layout'
    }
  },
  components: {
    mainlayout, emptylayout
  }
}
</script>

<style lang="scss">
@import '~materialize-css/dist/css/materialize.min.css';
@import './assets/index.css';
</style>
