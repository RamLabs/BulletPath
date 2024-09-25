<template>
  <nav class="bg-gray-600 w-3/5 p-4 shadow-lg rounded-t-lg mx-auto">
    // Adds router-link to the BulletPath logo
    <router-link to="/">
      <img
        src="/BulletPath-logo-darkmode.png"
        alt="BulletPath logo"
        height="80"
        width="80"
      />
    </router-link>
    <ul class="flex space-x-8 justify-center text-white text-center">
      <li>
        <router-link to="/trajectory-calculator" class="hover:underline"
          >Trajectory calculator</router-link
        >
      </li>
      <li>
        <router-link to="/MPBR" class="hover:underline"
          >Maximum Point Blank Range Calculator</router-link
        >
      </li>
      <li>
        <router-link to="/about" class="hover:underline">About</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped></style>
