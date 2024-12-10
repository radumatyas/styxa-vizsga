<template>
  <header class="bg-gray-800 text-white p-4">
    <nav>
      <ul class="flex justify-center space-x-4">
        <li>
          <a href="#" @click.prevent="navigate('home')" class="hover:underline"
            >Home</a
          >
        </li>
        <li>
          <a
            href="#"
            @click.prevent="navigate('cities')"
            class="hover:underline"
            >City</a
          >
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
  methods: {
    navigate(view) {
      this.$emit("navigate", view);
    },
  },
};
</script>

<style scoped>
/* További stílusok ide jöhetnek */
</style>
