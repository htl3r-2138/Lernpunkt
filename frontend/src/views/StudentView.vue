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
        <SettingsButton class="settings"></SettingsButton>
      </div>
    </nav>
    <Banner />
    <main>
      <h1>Booked Tutors</h1>
      <div class="booked-wrapper">
        <div v-for="tutor in bookedTutors" :key="tutor.id">
          <Transition name="card" mode="out-in">
            <component
              :is="
                bookedTutorId === tutor.id ? WhenClickedOnMore : BookedTutorTile
              "
              v-bind="tutor"
              @more="bookedTutorId = tutor.id"
              @back="bookedTutorId = null"
              @cancel="bookedTutorId = null"
            />
          </Transition>
        </div>
      </div>
      <h1>All Tutors</h1>
      <div class="recommended-wrapper">
        <div v-for="tutor in recommendedTutors" :key="tutor.id">
          <Transition name="card" mode="out-in">
            <component
              :is="
                recommendedTutorId === tutor.id
                  ? WhenClickedOnBook
                  : RecommendedTutorTile
              "
              v-bind="tutor"
              @book="recommendedTutorId = tutor.id"
              @cancel="recommendedTutorId = null"
              @submit="handleBooked(tutor.id)"
            />
          </Transition>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

import BookedTutorTile from "@/components/Tiles/BookedTutorTile.vue";
import RecommendedTutorTile from "@/components/Tiles/RecommendedTutorTile.vue";
import WhenClickedOnBook from "@/components/Tiles/WhenClickedOnBook.vue";
import WhenClickedOnMore from "@/components/Tiles/WhenClickedOnMore.vue";
import Logo from "@/components/Logo.vue";
import Searchbar from "@/components/Searchbar.vue";
import SettingsButton from "@/components/SettingsButton.vue";
import Banner from "@/components/Banner.vue";

import { useTutorsStore } from "@/stores/tutors";
import { useBookingsStore } from "@/stores/bookings";

const tutorsStore = useTutorsStore();
const bookingsStore = useBookingsStore();

onMounted(async () => {
  await tutorsStore.load();
  await bookingsStore.load();
});

const bookedTutorId = ref(null);
const bookedTutors = computed(() =>
  bookingsStore.acceptedBookings.map(b => ({
    id: b.id,
    name: `${b.Name} ${b.Surname}`,
    rating: 0,
    reviews: 0,
    grade: `Grade ${b.tutorGrade}`,
    price: Number(b.PricePerHour),
    location: String(b.MeetUp),
    nextSess: new Date(b.Date).toLocaleDateString("de-AT"),
    startTime: b.Start?.slice(0, 5),
    endTime: b.End?.slice(0, 5),
    subject: b.subject,
    topic: b.topic,
    email: "",
  }))
);

const recommendedTutorId = ref(null);
const recommendedTutors = computed(() => tutorsStore.tutorsForUI);

function handleBooked(tutorId) {
  tutorsStore.removeTutor(tutorId);
  recommendedTutorId.value = null;
}
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

.booked-wrapper,
.recommended-wrapper {
  display: flex;
  gap: 5rem;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.settings {
  cursor: pointer;
}

.card-enter-active,
.card-leave-active {
  transition: all 0.25s ease;
}

.card-enter-from {
  opacity: 0;
  transform: scale(0.96) translateY(10px);
}

.card-leave-to {
  opacity: 0;
  transform: scale(0.96) translateY(-10px);
}
</style>
