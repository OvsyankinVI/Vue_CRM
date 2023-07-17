<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a  href="#">
          <i class="material-icons black-text" @click="$emit('click-on')">dehaze</i>
        </a>
        <span class="black-text">{{ formatDate (date) }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <router-link
            to="/profile"
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            Пользователь - {{ name }}
          </router-link>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <router-link to="" class="black-text">
                <i class="material-icons">assignment_return</i>Выйти
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      date: '',
      interval: null,
      format: ''
    }
  },
  computed: {
    name() {
      return this.$store.getters.info.name
    }
  },
  mounted () {
    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000)
  },
  beforeUnmount () {
    clearInterval(this.interval)
  },
  methods: {
    formatDate: d => d.toLocaleString('ru-RU').replace(',', ''),
    formatDate1: d => d.toLocaleString('ru-RU').replace(',', '').slice(0, -8)
  }
}
</script>
