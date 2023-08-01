<template>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Open</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Type</th>
          <th>Delete</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(records, idx) of records"
          :key="records.id"
        >
          <td>{{ idx + 1 }}</td>
          <td>
            <button
              class="btn-small btn"
              @click="$router.push('/detail/' + records.id)"
            >
              <i class="material-icons">open_in_new</i>
            </button>
          </td>
          <td>{{ records.amount + ' ' + '₽' }}</td>
          <td>{{ records.date.slice(0, 10) }}</td>
          <td>
            <span
              class="white-text badge"
              :class="records.typeClass"
            >
            {{ records.typeText }}
          </span>
          </td>
          <td>
            <button
              type="submit"
              class="btn-small btn grey"
              @click="submitHandler(records.id)"
            >
              <i class="material-icons">close</i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
</template>

<script>
export default {
  props: {
    records: {
      required: true,
      type: Array
    }
  },
  methods: {
    async submitHandler (id) {
      try {
        await this.$store.dispatch('deleteRecord', id)
        this.$mess('Record deleted')
        this.$router.push('/planning')
      } catch (e) {}
    }
  }
}
</script>
