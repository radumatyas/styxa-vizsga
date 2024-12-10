<template>
  <div id="app" class="p-4">
    <Header />
    <router-view
      :cities="cities"
      @add-city="addCity"
      @edit-city="updateCity"
      @add-poi="addPoi"
      @edit-poi="updatePoi"
    />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import { fetchCities, addCity, updateCity } from "./services/cityService";

export default {
  name: "App",
  components: {
    Header,
  },
  data() {
    return {
      cities: [],
    };
  },
  created() {
    this.loadCities();
  },
  methods: {
    async loadCities() {
      try {
        this.cities = await fetchCities();
      } catch (error) {
        console.error("Failed to load cities:", error);
      }
    },
    async addCity(newCity) {
      try {
        const addedCity = await addCity(newCity);
        this.cities.push(addedCity);
      } catch (error) {
        console.error("Failed to add city:", error);
      }
    },
    async updateCity(updatedCity) {
      try {
        const updated = await updateCity(updatedCity);
        const index = this.cities.findIndex((city) => city.id === updated.id);
        if (index !== -1) {
          this.$set(this.cities, index, updated);
        }
      } catch (error) {
        console.error("Failed to update city:", error);
      }
    },
    async addPoi(newPoi) {
      try {
        const response = await fetch(`/api/cities/${newPoi.cityId}/pois`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPoi),
        });
        const addedPoi = await response.json();
        const city = this.cities.find((city) => city.id === newPoi.cityId);
        if (city) {
          city.pois.push(addedPoi);
        }
      } catch (error) {
        console.error("Failed to add POI:", error);
      }
    },
    async updatePoi(updatedPoi) {
      try {
        const response = await fetch(
          `/api/cities/${updatedPoi.cityId}/pois/${updatedPoi.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedPoi),
          }
        );
        const updated = await response.json();
        const city = this.cities.find((city) => city.id === updated.cityId);
        if (city) {
          const index = city.pois.findIndex((poi) => poi.id === updated.id);
          if (index !== -1) {
            this.$set(city.pois, index, updated);
          }
        }
      } catch (error) {
        console.error("Failed to update POI:", error);
      }
    },
  },
};
</script>

<style>
/* Globális stílusok ide jöhetnek */
</style>
