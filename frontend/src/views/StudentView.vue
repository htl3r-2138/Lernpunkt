<template>
  <div class="wrapper">
    <nav>
      <div>
        <Logo></Logo>
      </div>
      <div>
        <Searchbar></Searchbar>
      </div>
      <div>
        <SettingsButton></SettingsButton>
      </div>
    </nav>
    <main>
      <h1>Booked Tutors</h1>
    </main>
  </div>
</template>

<script setup>
import Logo from "@/components/register-components/Logo.vue";
import Searchbar from "@/components/Searchbar.vue";
import SettingsButton from "@/components/SettingsButton.vue";
</script>

<style scoped>
.wrapper {
  min-height: 100vh;
  width: 100%;
  color: black;
}
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 4rem
}
</style>
