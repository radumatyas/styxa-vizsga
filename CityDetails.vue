<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold">Város adatai</h2>
      <button
        @click="showEditCityModal = true"
        class="bg-yellow-500 text-white px-4 py-2 rounded flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828zM4 12v4h4v-1H5v-3H4z"
          />
        </svg>
        Edit City
      </button>
    </div>
    <p><strong>ID:</strong> {{ city.id }}</p>
    <p><strong>Név:</strong> {{ city.name }}</p>
    <p><strong>Leírás:</strong> {{ city.description }}</p>
    <p><strong>Lakosság:</strong> {{ city.population }}</p>
    <p>
      <strong>Google Maps URL:</strong>
      <a
        :href="city.googleMapsUrl"
        target="_blank"
        class="text-blue-500 hover:underline"
        >{{ city.googleMapsUrl }}</a
      >
    </p>

    <h3 class="text-xl font-bold mt-6">Érdekes helyek</h3>
    <button
      @click="showAddPoiModal = true"
      class="bg-green-500 text-white px-4 py-2 rounded flex items-center mb-4"
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
      Add point of interest
    </button>
    <table
      class="min-w-full bg-white shadow-md rounded-lg overflow-hidden mt-4"
    >
      <thead class="bg-gray-800 text-white">
        <tr>
          <th class="py-2 px-4 border-b">Név</th>
          <th class="py-2 px-4 border-b">Leírás</th>
          <th class="py-2 px-4 border-b">Műveletek</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="poi in city.pois" :key="poi.id" class="hover:bg-gray-100">
          <td class="py-2 px-4 border-b">{{ poi.name }}</td>
          <td class="py-2 px-4 border-b">{{ poi.description }}</td>
          <td class="py-2 px-4 border-b">
            <button
              @click="editPoi(poi)"
              class="bg-yellow-500 text-white px-4 py-2 rounded flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828zM4 12v4h4v-1H5v-3H4z"
                />
              </svg>
              Edit
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <EditCityModal
      v-if="showEditCityModal"
      :city="city"
      @close="showEditCityModal = false"
      @edit-city="updateCity"
    />
    <AddPoiModal
      v-if="showAddPoiModal"
      @close="showAddPoiModal = false"
      @add-poi="addPoi"
    />
    <EditPoiModal
      v-if="showEditPoiModal"
      :poi="selectedPoi"
      @close="showEditPoiModal = false"
      @edit-poi="updatePoi"
    />
  </div>
</template>

<script>
import EditCityModal from "./EditCityModal.vue";
import AddPoiModal from "./AddPoiModal.vue";
import EditPoiModal from "./EditPoiModal.vue";

export default {
  name: "CityDetails",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      city: null,
      showEditCityModal: false,
      showAddPoiModal: false,
      showEditPoiModal: false,
      selectedPoi: null,
    };
  },
  created() {
    this.loadCity();
  },
  methods: {
    async loadCity() {
      // Itt töltsd be a város adatait az API-ból
      const response = await fetch(`/api/cities/${this.id}`);
      this.city = await response.json();
    },
    async updateCity(updatedCity) {
      try {
        const response = await fetch(`/api/cities/${updatedCity.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCity),
        });
        const updated = await response.json();
        this.city = updated;
        this.showEditCityModal = false;
      } catch (error) {
        console.error("Failed to update city:", error);
      }
    },
    async addPoi(newPoi) {
      try {
        const response = await fetch(`/api/cities/${this.city.id}/pois`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPoi),
        });
        const addedPoi = await response.json();
        this.city.pois.push(addedPoi);
        this.showAddPoiModal = false;
      } catch (error) {
        console.error("Failed to add POI:", error);
      }
    },
    editPoi(poi) {
      this.selectedPoi = { ...poi };
      this.showEditPoiModal = true;
    },
    async updatePoi(updatedPoi) {
      try {
        const response = await fetch(
          `/api/cities/${this.city.id}/pois/${updatedPoi.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedPoi),
          }
        );
        const updated = await response.json();
        const index = this.city.pois.findIndex((poi) => poi.id === updated.id);
        if (index !== -1) {
          this.$set(this.city.pois, index, updated);
        }
        this.showEditPoiModal = false;
      } catch (error) {
        console.error("Failed to update POI:", error);
      }
    },
  },
};
</script>

<style scoped>
/* További stílusok ide jöhetnek */
</style>
