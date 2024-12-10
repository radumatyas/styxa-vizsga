<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
  >
    <div class="bg-white p-6 rounded shadow-lg w-1/3">
      <span class="close float-right cursor-pointer" @click="$emit('close')"
        >&times;</span
      >
      <h2 class="text-2xl font-bold mb-4">Új érdekes hely hozzáadása</h2>
      <form @submit.prevent="submitForm">
        <label for="poiName" class="block text-sm font-medium text-gray-700"
          >Név:</label
        >
        <input
          type="text"
          id="poiName"
          v-model="poi.name"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <label
          for="poiDescription"
          class="block text-sm font-medium text-gray-700 mt-4"
          >Leírás:</label
        >
        <input
          type="text"
          id="poiDescription"
          v-model="poi.description"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <button
          type="submit"
          class="mt-4 bg-blue-500 text-white px-4 py-2 rounded flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clip-rule="evenodd"
            />
          </svg>
          Hozzáadás
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddPoiModal",
  data() {
    return {
      poi: {
        name: "",
        description: "",
      },
    };
  },
  methods: {
    submitForm() {
      this.$emit("add-poi", { ...this.poi, id: Date.now() });
      this.poi.name = "";
      this.poi.description = "";
    },
  },
};
</script>

<style scoped>
.close {
  float: right;
  cursor: pointer;
}
</style>
