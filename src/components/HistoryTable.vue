<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Сумма</th>
        <th>Дата</th>
        <th>Категория</th>
        <th>Тип</th>
        <th>Открыть</th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="(records, idx) of records"
        :key="records.id"
      >
        <td>{{ idx + 1 }}</td>
        <td>{{ records.amount + ' ' + '₽' }}</td>
        <td>{{ records.date.slice(0, 10) }}</td>
        <td>{{ records.categoryName }}</td>
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
            class="btn-small btn"
            @click="$router.push('/detail/' + records.id)"
          >
            <i class="material-icons">open_in_new</i>
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
  }
}
</script>
