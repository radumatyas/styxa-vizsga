<template>
  <div>
    <button @click="showModal = true">Érdekes hely hozzáadása</button>
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="showModal = false">&times;</span>
        <h2>
          {{ isEdit ? "Érdekes hely szerkesztése" : "Érdekes hely hozzáadása" }}
        </h2>
        <form @submit.prevent="submitForm">
          <label for="poiName">Név:</label>
          <input type="text" id="poiName" v-model="poi.name" required />
          <label for="poiDescription">Leírás:</label>
          <input
            type="text"
            id="poiDescription"
            v-model="poi.description"
            required
          />
          <button type="submit">{{ isEdit ? "Mentés" : "Hozzáadás" }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PoiModal",
  props: {
    poi: {
      type: Object,
      default: () => ({ name: "", description: "" }),
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    submitForm() {
      this.$emit(this.isEdit ? "update-poi" : "add-poi", this.poi);
      this.showModal = false;
    },
  },
};
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
}

.close {
  float: right;
  cursor: pointer;
}
</style>
