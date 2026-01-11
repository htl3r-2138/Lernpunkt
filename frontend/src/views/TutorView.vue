<template>
  <div class="wrapper">
    <nav>
      <div>
        <Logo/>
      </div>
      <div>
        <p class="text">Lernpunkt</p>
      </div>
      <div>
        <SettingsButton/>
      </div>
    </nav>
    <main>
      <h1>Booked Stundents</h1>
      <h1>Requested Bookings</h1>
    </main>
  </div>
</template>

<script setup>
import Logo from "@/components/Logo.vue";
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
  padding: 2rem 4rem;
}
main {
  padding-left: 60px;
}

.text {
  color: #26006a;
  font-size: 2.5rem;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-weight: 600;
  margin: 0;
  user-select: none;
}
</style>
