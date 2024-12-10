<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Városok Táblázat</h2>
    <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead class="bg-gray-800 text-white">
        <tr>
          <th class="py-2 px-4 border-b">ID</th>
          <th class="py-2 px-4 border-b">Név</th>
          <th class="py-2 px-4 border-b">Műveletek</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="city in cities" :key="city.id" class="hover:bg-gray-100">
          <td class="py-2 px-4 border-b">{{ city.id }}</td>
          <td class="py-2 px-4 border-b">{{ city.name }}</td>
          <td class="py-2 px-4 border-b">
            <button
              @click="$emit('select-city', city)"
              class="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M10 3a1 1 0 00-.894.553L7.382 7H4a1 1 0 000 2h2.618l1.724 3.447A1 1 0 0010 13h6a1 1 0 100-2h-4.618l-1.724-3.447A1 1 0 0010 3z"
                />
              </svg>
              Részletek
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "CityTable",
  props: {
    cities: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
/* Stílusok ide jöhetnek */
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
