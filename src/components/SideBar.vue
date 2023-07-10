<template>
  <ul class="sidenav app-sidenav" :class="{open: opened}">
    <router-link
    active-class="active"
    v-for="link in links"
    :key="link.url"
    :to="link.url"
    >
      <li>
          <a href="#" class="waves-effect waves-orange pointer">{{ link.title }}</a>
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
        { title: 'Счет', url: '/' },
        { title: 'История', url: '/history' },
        { title: 'Планирование', url: '/planning' },
        { title: 'Новая запись', url: '/record' },
        { title: 'Категории', url: '/categories' }
      ],
      active: false
    }
  }
}
</script>
