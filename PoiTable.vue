<template>
  <div>
    <h2>Érdekes helyek</h2>
    <table>
      <thead>
        <tr>
          <th>Név</th>
          <th>Leírás</th>
          <th>Műveletek</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="poi in pois" :key="poi.id">
          <td>{{ poi.name }}</td>
          <td>{{ poi.description }}</td>
          <td>
            <button @click="$emit('edit-poi', poi)">Szerkesztés</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "PoiTable",
  props: {
    pois: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid black;
  padding: 8px;
  text-align: left;
}
</style>
