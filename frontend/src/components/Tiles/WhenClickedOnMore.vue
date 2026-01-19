<template>
  <div class="tutor-card">
    <div class="top-wrapper">
      <div class="date-wrapper">
        <label for="date">
          <img src="@/assets/Tiles/Calendar.svg" alt="Calender Symbol" />
        </label>
        <p id="date">{{ nextSess }}</p>
      </div>
      <div class="start-time-wrapper">
        <label for="start-time">
          <img src="@/assets/Tiles/Clock.svg" alt="Clock Symbol" />
        </label>
        <p id="start-time">{{ startTime }}</p>
      </div>
      <div class="end-time-wrapper">
        <label for="end-time">
          <img
            src="@/assets/Tiles/Fast_forward.svg"
            alt="Fast Forward Symbol"
          />
        </label>
        <p id="end-time">{{ endTime }}</p>
      </div>
      <div class="location-wrapper">
        <label for="location">
          <img src="@/assets/Tiles/Map pin.svg" alt="Map Pin Symbol" />
        </label>
        <p id="location">{{ location }}</p>
      </div>
    </div>
    <div class="middle-wrapper">
      <!--FIX ME (only subjects a tutor has selected in their settings can be selected here)-->
      <div class="class-wrapper">
        <p>{{ subject }}</p>
      </div>
      <div class="topic-wrapper">
        <p>{{ topic }}</p>
      </div>
    </div>
    <div class="bottom-wrapper">
      <button class="button" id="back" @click="onBack">Back</button>
      <button class="button" id="cancelBooking" @click="requestCancel">Cancel Booking</button>
    </div>
    <ConfirmModal
      v-if="showCancelConfirm"
      title="Cancel booking"
      message="Are you sure you want to cancel this booking?"
      @confirm="confirmCancel"
      @cancel="cancelCancel"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import ConfirmModal from "../ConfirmModal.vue";

const showCancelConfirm = ref(false);
const bookingToCancel = ref(null);

const props = defineProps({
  id: Number,
  name: String,
  rating: Number,
  reviews: Number,
  grade: String,
  price: String,
  location: String,
  nextSess: String,
  startTime: String,
  endTime: String,
  subject: String,
  topic: String,
  email: String,
});

const emit = defineEmits(["back", "cancel"]);

function onBack() {
  emit("back");
}

function requestCancel() {
  bookingToCancel.value = props.id;
  showCancelConfirm.value = true;
}

function confirmCancel() {
  emit("cancel", bookingToCancel.value);
  showCancelConfirm.value = false;
  bookingToCancel.value = null;
}

function cancelCancel() {
  showCancelConfirm.value = false;
  bookingToCancel.value = null;
}

function onCancel() {
  emit("cancel", props.id);
}
</script>

<style scoped>
  
.button {
  width: 110px;
  height: 50px;
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  background: rgb(255, 255, 255, 0.5);
  box-shadow: 4px 4px 4.5px 0 rgba(0, 0, 0, 0.1);
  color: #383838 !important;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.button:hover {
  background: rgb(255, 255, 255, 1);
  transition: all 0.3s ease-in-out;
  transform: scale(1.05);
}

#back:hover {
  background-color: #7e52fc;
  color: white !important;
}

#cancelBooking:hover {
  background-color: red;
  color: white !important;
}
.tutor-card {
  position: relative;
  padding: 1.5rem;
  width: 400px;
  border-radius: 24px;
  background: rgb(255, 255, 255,0.5);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.top-wrapper {
  display: flex;
  gap: 20px;
  justify-content: space-between;
}

.date-wrapper,
.start-time-wrapper,
.end-time-wrapper,
.location-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-direction: column;
}

.date-wrapper input,
.start-time-wrapper input,
.end-time-wrapper input,
.location-wrapper input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 0.8rem;
}

.location-wrapper input {
  width: 100px;
}

.middle-wrapper {
  display: flex;
  gap: 20px;
  margin-top: 4.27px;
  justify-content: space-between;
}

.class-wrapper {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: #200863;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.topic-wrapper .topic {
  border: none;
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
</style>
