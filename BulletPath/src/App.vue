<script>
import { BallisticCalc } from "./utils/calculations.js";
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>

<template>
  <div class="min-h-screen bg-gray-200 flex-col items-center">
    // Navbar component
    <Navbar />
    // Router view
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
