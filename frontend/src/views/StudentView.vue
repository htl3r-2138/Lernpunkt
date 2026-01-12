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
                bookedTutorId === tutor.id
                  ? WhenClickedOnMore
                  : BookedTutorTile
              "
              v-bind="tutor"
              @more="bookedTutorId = tutor.id"
              @back="bookedTutorId = null"
              @cancel="bookedTutorId = null"
            />
          </Transition>
        </div>
      </div>
      <h1>Recommended Tutors for you</h1>
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
              @confirm="removeRecommendedTutors(tutor.id)"
            />
          </Transition>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import BookedTutorTile from "@/components/Tiles/BookedTutorTile.vue";
import RecommendedTutorTile from "@/components/Tiles/RecommendedTutorTile.vue";
import WhenClickedOnBook from "@/components/Tiles/WhenClickedOnBook.vue";
import WhenClickedOnMore from "@/components/Tiles/WhenClickedOnMore.vue";
import Logo from "@/components/Logo.vue";
import Searchbar from "@/components/Searchbar.vue";
import SettingsButton from "@/components/SettingsButton.vue";
import Banner from "@/components/Banner.vue";

const bookedTutorId = ref(null);
const bookedTutors = ref([
  {
    id: 1,
    name: "Maximilian Popek",
    rating: 4,
    reviews: 12,
    grade: "1st Grade",
    price: 25,
    location: "Aula",
    nextSess: "02.11.2025",
    startTime: "14:00",
    endTime: "15:00",
    subject: "AM",
    topic: "Quadratic Equations",
    email: "max.popek@htl.rennweg.at"
  },
  {
    id: 2,
    name: "Oliver Rinner",
    rating: 5,
    reviews: 50,
    grade: "4th Grade",
    price: 25,
    location: "Aula",
    nextSess: "02.11.2025",
    startTime: "15:00",
    endTime: "16:00",
    subject: "E",
    topic: "Grammar",
    email: "oliver.rinner@htl.rennweg.at"
  },
  {
    id: 3,
    name: "Maximilian Popek",
    rating: 4,
    reviews: 12,
    grade: "1st Grade",
    price: 25,
    location: "Aula",
    nextSess: "02.11.2025",
    startTime: "16:00",
    endTime: "17:00",
    subject: "AM",
    topic: "Quadratic Equations",
    email: "max.popek@htl.rennweg.at"
  }
]);

const recommendedTutorId = ref(null);
const recommendedTutors = ref([
  {
    id: 1,
    name: "Anna Schmidt",
    rating: 5,
    reviews: 30,
    grade: "2nd Grade",
    price: 30,
    subject: "AM",
  },
  {
    id: 2,
    name: "Lukas Meyer",
    rating: 4,
    reviews: 20,
    grade: "3rd Grade",
    price: 28,
    subject: "DE",
  },
]);

function removeRecommendedTutors(id) {
  recommendedTutors.value = recommendedTutors.value.filter(
    (tutor) => tutor.id !== id
  );
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
  gap: 20px;
  margin-bottom: 40px;
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
