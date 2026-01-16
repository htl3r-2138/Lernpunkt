<template>
  <div class="wrapper">
    <nav>
      <div>
        <Logo></Logo>
      </div>
      <div>
        <Searchbar v-model="searchQuery" />
      </div>
      <div>
        <SettingsButton class="settings"></SettingsButton>
      </div>
    </nav>
    <Banner v-if="showBanner" />
    <main>
      <h1>Booked Tutors</h1>
      <div v-if="bookedTutors.length === 0" class="empty-state">
        Here your booked tutors will be displayed.
      </div>
      <div v-else>
        <div class="booked-wrapper">
          <div v-for="tutor in bookedTutors" :key="tutor.id">
            <Transition name="card" mode="out-in">
              <component :is="bookedTutorId === tutor.id ? WhenClickedOnMore : BookedTutorTile
                " v-bind="tutor" @more="bookedTutorId = tutor.id" @back="bookedTutorId = null"
                @cancel="bookedTutorId = null" />
            </Transition>
          </div>
        </div>
      </div>

      <div class="flex-wrapper">  
        <h1 class="title">
          <Transition name="flip-word" mode="out-in">
            <span id="recAllSwitchText" :key="showRecommended ? 'recommended' : 'all'">
              {{ showRecommended ? 'Recommended Tutors' : 'All Tutors' }}
            </span>
          </Transition>
        </h1>
        <div class="switch">
          <RecToAllSwitch v-model="showRecommended" />
        </div>
      </div>
      <div class="tutor-wrapper">
        <div v-for="tutor in filteredAllTutors" :key="tutor.id">
          <Transition name="card" mode="out-in">
            <component :is="recommendedTutorId === tutor.id
              ? WhenClickedOnBook
              : RecommendedTutorTile
              " v-bind="tutor" @book="recommendedTutorId = tutor.id" @cancel="recommendedTutorId = null"
              @submit="handleBooked(tutor.id)" />
          </Transition>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";

import RecToAllSwitch from "@/components/RecToAllSwitch.vue";
import BookedTutorTile from "@/components/Tiles/BookedTutorTile.vue";
import RecommendedTutorTile from "@/components/Tiles/RecommendedTutorTile.vue";
import WhenClickedOnBook from "@/components/Tiles/WhenClickedOnBook.vue";
import WhenClickedOnMore from "@/components/Tiles/WhenClickedOnMore.vue";
import Logo from "@/components/Logo.vue";
import Searchbar from "@/components/Searchbar.vue";
import SettingsButton from "@/components/SettingsButton.vue";
import Banner from "@/components/Banner.vue";

import { useTutorsStore } from "@/stores/tutors.js";
import { useBookingsStore } from "@/stores/bookings.js";
import { useUserStore } from "@/stores/user.js";
import { useSubjectsStore } from "@/stores/subject.js";

const searchQuery = ref("");

/* ---------------- state ---------------- */

const showRecommended = ref(true);
const tutors = ref([]);

const bookedTutorId = ref(null);
const recommendedTutorId = ref(null);

/* ---------------- stores ---------------- */

const tutorsStore = useTutorsStore();
const bookingsStore = useBookingsStore();
const userStore = useUserStore();
const subjectsStore = useSubjectsStore();

/* ---------------- lifecycle ---------------- */

onMounted(async () => {
  await subjectsStore.load();
  await bookingsStore.load();
  await userStore.load();
});

/* ---------------- computed ---------------- */

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

const allTutors = computed(() => tutors.value);

const showBanner = computed(() => {
  if (userStore.isStudent) {
    return subjectsStore.mySubjects.length === 0;
  }
  return false;
});

function matchesSearch(item, query) {
  if (!query) return true;

  const q = query.toLowerCase();

  return Object.values(item).some(value =>
    String(value).toLowerCase().includes(q)
  );
}

const filteredAllTutors = computed(() =>
  allTutors.value.filter(tutor =>
    matchesSearch(tutor, searchQuery.value)
  )
);
/* ---------------- actions ---------------- */

function handleBooked(tutorId) {
  tutorsStore.removeTutor(tutorId);
  tutors.value = tutors.value.filter(t => t.id !== tutorId);
  recommendedTutorId.value = null;
}

/* ---------------- watcher ---------------- */

watch(
  [showRecommended, () => userStore.id],
  async ([recommended, userId]) => {
    if (!userId) return; // ⛔ noch kein User

    try {
      if (recommended) {
        tutors.value = await tutorsStore.loadRecommended(userId);
      } else {
        await tutorsStore.load();
        tutors.value = tutorsStore.getTutors;
      }
    } catch (err) {
      console.error("Failed to load tutors", err);
      tutors.value = [];
    }
  },
  { immediate: true }
);
</script>


<style scoped>
.empty-state {
  text-align: left;
  color: #999;
  padding: 2rem;
  font-style: italic;
}

.title {
  display: flex;
  gap: 0.5rem;
}

.flip-word-enter-active,
.flip-word-leave-active {
  transition: all 0.25s ease;
}

.flip-word-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.flip-word-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.static {
  white-space: nowrap;
  transition: all 0.3s ease;
}


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
.tutor-wrapper {
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

.flex-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-direction: column;
}

.switch {
  margin-right: 2rem;
  justify-content: left;
}
</style>
