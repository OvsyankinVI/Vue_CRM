<template>
  <ul class="sidenav app-sidenav" :class="{open: opened}">
    <router-link
    active-class="active"
    v-for="link in links"
    :key="link.url"
    :to="link.url"
    >
      <li>
          <a href="#" class="waves-effect waves-orange pointer" @click="$emit('click-on')">{{ link.title }}</a>
      </li>
    </router-link>
  </ul>
</template>

<script>
export default {
  props: ['opened'],
  data () {
    return {
      links: [
        { title: 'Bill', url: '/' },
        { title: 'History', url: '/history' },
        { title: 'Planning', url: '/planning' },
        { title: 'New record', url: '/record' },
        { title: 'Categories', url: '/categories' }
      ],
      active: false
    }
  }
}
</script>
