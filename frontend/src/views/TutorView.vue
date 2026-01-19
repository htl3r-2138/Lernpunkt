<template>
  <div class="wrapper">
    <nav>
      <div>
        <Logo />
      </div>
      <div>
        <p class="text">Lernpunkt</p>
      </div>
      <div>
        <SettingsButton />
      </div>
    </nav>
    <Banner v-if="showBanner" />
    <main>
      <h1>Booked Students</h1>
      <div v-if="bookedStudents.length === 0" class="empty-state">
        Here your booked students will be displayed.
      </div>

      <div v-else>
        <div v-for="student in bookedStudents" :key="student.id">
          <Transition name="card" mode="out-in">
            <component
              :is="
                bookedStudentsId === student.id
                  ? WhenClickedOnMore
                  : BookedStudentTile
              "
              v-bind="student"
              @more="bookedStudentsId = student.id"
              @back="bookedStudentsId = null"
              @cancel="handleCancel"
            />
          </Transition>
        </div>
      </div>
      <h1>Requested Bookings</h1>
      <div
        v-if="!requestedStudents || requestedStudents.length === 0"
        class="empty-state"
      >
        Here the students that have requested a booking will be displayed.
      </div>

      <div v-else>
        <div v-for="student in requestedStudents" :key="student.id">
          <Transition name="card" mode="out-in">
            <component
              :is="
                requestedStudentsId === student.id
                  ? WhenClickedOnMore
                  : RequestedStudentTile
              "
              v-bind="student"
              @accept="handleAccept(student.id)"
              @decline="handleDecline(student.id)"
            />
          </Transition>
        </div>
      </div>
    </main>
    <Footer></Footer>
  </div>
</template>

<script setup>
import RequestedStudentTile from "@/components/Tiles/RequestedStudentTile.vue";
import Footer from "@/components/Footer.vue";
import WhenClickedOnMore from "@/components/Tiles/WhenClickedOnMore.vue";
import BookedStudentTile from "@/components/Tiles/BookedStudentTile.vue";
import Logo from "@/components/Logo.vue";
import SettingsButton from "@/components/SettingsButton.vue";
import Banner from "@/components/Banner.vue";

import { onMounted, computed } from "vue";
import { ref } from "vue";
import { useTutorBookingsStore } from "@/stores/tutorBookings";
import { useUserStore } from "@/stores/user";
import { useSubjectsStore } from "@/stores/subject";

const userStore = useUserStore();
const subjectsStore = useSubjectsStore();
const store = useTutorBookingsStore();

onMounted(async () => {
  await userStore.load();
  await subjectsStore.load();
  await store.load();
});

const showBanner = computed(() => {
  if (userStore.isTutor) {
    return (
      subjectsStore.mySubjects?.length === 0 || userStore.pricePerHour == null
    );
  }

  if (userStore.isStudent) {
    return subjectsStore.mySubjects?.length === 0;
  }

  return false;
});

const bookedStudentsId = ref(null);
const bookedStudents = computed(() =>
  store.acceptedBookings.map((b) => ({
    id: b.id,

    // Student
    name: b.studentName,
    email: b.studentEmail ?? "",

    // UI
    rating: 0,
    reviews: 0,

    // Booking
    grade: "—",
    price: userStore.pricePerHour,
    location: String(b.MeetUp),

    nextSess: new Date(b.Date).toLocaleDateString("de-AT"),
    startTime: b.Start?.slice(0, 5),
    endTime: b.End?.slice(0, 5),

    // ✅ jetzt korrekt
    subject: b.subject, // Badge (z.B. NWT)
    topic: b.topic, // Text ("Firewalls")
  }))
);

const requestedStudentsId = ref(null);
const requestedStudents = computed(() =>
  store.requestedBookings.map((b) => ({
    id: b.id,

    // Student
    name: b.studentName,
    email: b.studentEmail ?? "",

    // UI Defaults
    rating: 0,
    reviews: 0,

    // Booking
    grade: "—",
    price: userStore.pricePerHour,
    location: String(b.MeetUp),

    nextSess: new Date(b.Date).toLocaleDateString("de-AT"),
    startTime: b.Start?.slice(0, 5),
    endTime: b.End?.slice(0, 5),

    subject: b.subject,
    topic: b.topic,
  }))
);

async function handleCancel(bookingId) {
  try {
    await store.cancelBooking(bookingId);
    bookedStudentsId.value = null;
  } catch (err) {
    console.error("Tutor cancel booking failed", err);
  }
}

async function handleAccept(id) {
  await store.acceptBooking(id);
  requestedStudentsId.value = null;
}

async function handleDecline(bookingId) {
  try {
    await store.declineBooking(bookingId);
    requestedStudentsId.value = null;
  } catch (err) {
    console.error("Decline booking failed", err);
  }
}
</script>

<style scoped>
.empty-state {
  text-align: left;
  color: #999;
  padding-top: 2rem;
  padding-bottom: 2rem;
  font-style: italic;
}
.wrapper {
  min-height: 100vh;
  width: 100%;
  color: black;
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
