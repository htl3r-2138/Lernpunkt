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
    <h1>Booked Students</h1>
    <div v-for="b in store.acceptedBookings" :key="b.id">
      {{ b.studentName }} – {{ b.Date }}
    </div>

    <h1>Requested Bookings</h1>
    <div v-for="b in store.requestedBookings" :key="b.id">
      {{ b.studentName }} – {{ b.Date }}
      <button @click="store.acceptBooking(b.id)">Accept</button>
    </div>
  </main>
  </div>
</template>

<script setup>
import Logo from "@/components/Logo.vue";
import SettingsButton from "@/components/SettingsButton.vue";

import { onMounted } from "vue";
import { useTutorBookingsStore } from "@/stores/tutorBookings";

const store = useTutorBookingsStore();

onMounted(() => {
  store.load();
});
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
