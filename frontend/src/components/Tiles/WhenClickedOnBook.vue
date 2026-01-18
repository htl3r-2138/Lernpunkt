<template>
  <div class="tutor-card">
    <form @submit.prevent="onSubmit">
      <div class="top-wrapper">
        <div class="date-wrapper">
          <label for="date">
            <img src="@/assets/Tiles/Calendar.svg" alt="Calender Symbol" />
          </label>
          <input type="date" v-model="form.date" id="date" />
        </div>
        <div class="start-time-wrapper">
          <label for="start-time">
            <img src="@/assets/Tiles/Clock.svg" alt="Clock Symbol" />
          </label>
          <input type="time" v-model="form.startTime" id="start-time" />
        </div>
        <div class="end-time-wrapper">
          <label for="end-time">
            <img src="@/assets/Tiles/Fast_forward.svg" alt="Fast Forward Symbol" />
          </label>
          <input type="time" v-model="form.endTime" id="end-time" />
        </div>
        <div class="location-wrapper">
          <label for="location">
            <img src="@/assets/Tiles/Map pin.svg" alt="Map Pin Symbol" />
          </label>
          <input type="text" v-model="form.location" id="location" placeholder="Location" />
        </div>
      </div>
      <div class="middle-wrapper">
        <div class="class-wrapper">
          <select v-model="form.subjectId" required>
            <option disabled value="">Subject</option>
            <option v-for="s in subjects" :key="s.id" :value="s.id">
              {{ s.description }}
            </option>
          </select>
        </div>
        <div class="topic-wrapper">
          <textarea class="topic" placeholder="What topics do you need help with?" v-model="form.topic"></textarea>
        </div>
      </div>
      <div class="bottom-wrapper">
        <button class="button" id="cancelBooking" @click="onCancel">Cancel</button>
        <button class="button" id="confirmBooking" type="submit">Book</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  id: Number,
  subjects: Array,
});

const emit = defineEmits(["cancel", "submit"]);

const form = ref({
  date: "",
  startTime: "",
  endTime: "",
  location: "",
  topic: "",
  subjectId: "",
});

function onCancel() {
  emit("cancel", props.id);
}

async function onSubmit() {
  console.log("BOOKING PAYLOAD", {
    tutorId: props.id,
    subjectId: form.value.subjectId,
    date: form.value.date,
    startTime: form.value.startTime,
    endTime: form.value.endTime,
    location: form.value.location,
    topic: form.value.topic,
  });
  const res = await fetch("http://localhost:3000/api/bookings", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tutorId: props.id,
      subjectId: form.value.subjectId,
      date: form.value.date,
      startTime: form.value.startTime,
      endTime: form.value.endTime,
      location: form.value.location,
      topic: form.value.topic,
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    alert(err.message || "Booking failed");
    return;
  }

  emit("submit");
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&display=swap");

input[type="date"],
input[type="time"] {
  text-align: center;
  padding-left: 0;
  padding-right: 0;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  display: none;
  -webkit-appearance: none;
  text-align: center;

}

input[type="time"]::-webkit-calendar-picker-indicator {
  display: none;
  -webkit-appearance: none;
  text-align: center;
}

.tutor-card {
  position: relative;
  width: 420px;
  height: 280px;
  padding: 1.5rem;
  box-sizing: border-box;
  border-radius: 24px;
  background: rgb(255, 255, 255, 0.5);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  color: #383838;
}

.top-wrapper {
  display: grid;
  grid-template-columns: 1.4fr 0.8fr 0.8fr 1fr;
  gap: 20px;
  justify-content: space-between;
  align-items: stretch;
}

.top-wrapper label img {
  opacity: 0.7;
}

.date-wrapper,
.start-time-wrapper,
.end-time-wrapper,
.location-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-direction: column;
  color: #383838 !important;
}

.date-wrapper input,
.start-time-wrapper input,
.end-time-wrapper input,
.location-wrapper input {
  font-family: Google Sans;
  padding: 10px;
  border: none;
  font-size: 0.8rem;
  width: 100%;
  box-sizing: border-box;
  background: none;
}

.location-wrapper input {
  width: 100px;
}

.middle-wrapper {
  display: flex;
  gap: 20px;
  margin-top: 2rem;
  justify-content: space-between;
}

.class-wrapper select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 0.8rem;
}

.topic-wrapper .topic {
  font-family: Google Sans;
  background: rgb(255, 255, 255, 0.5);
  box-shadow: 4px 4px 4.5px 0 rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 8px;
  padding: 10px;
  outline: none;
  width: 210px;
  font-size: 0.8rem;
  resize: none;
}

.bottom-wrapper {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 1rem;
}

.button {
  width: 110px;
  height: 50px;
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  background: rgb(255, 255, 255, 0.5);
  box-shadow: 4px 4px 4.5px 0 rgba(0, 0, 0, 0.1);
  color: #383838 !important;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.button:hover {
  background: rgb(255, 255, 255, 1);
  transition: all 0.3s ease-in-out;
  transform: scale(1.05);
}

#confirmBooking:hover {
  background-color: #7e52fc;
  color: white !important;

}

#cancelBooking:hover {
  background-color: red;
  color: white !important;
}
</style>