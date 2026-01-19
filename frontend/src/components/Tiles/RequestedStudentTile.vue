<template>
  <div class="student-card">
    <div class="student">
      <div class="content">
        <h3 class="name">{{ name }}</h3>
        <span class="request">requested for {{ nextSess }}</span>
        <span class="request-time">{{ startTime }} - {{ endTime }}</span>
      </div>
    </div>
    <div class="badge">
      <span>{{ subject }}</span>
    </div>

    <div class="bottom-wrapper">
      <button class="button" id="cancelBooking" @click="onDecline">Decline</button>
      <button class="button" id="confirmBooking" @click="onAccept">Accept</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
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

const emit = defineEmits(["accept", "decline"]);
function onAccept() {
  console.log("ACCEPT WAS CLICKED");
  emit("accept");
}
function onDecline() {
  console.log("DECLINE WAS CLICKED");
  emit("decline");
}
</script>

<style scoped>
.student-card {
  position: relative;
  width: 400px;
  padding: 1.5rem;
  border-radius: 24px;
  background: rgb(255, 255, 255,0.5);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.content {
  text-align: center;
  margin-bottom: 2rem;
}

.name {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.request,
.request-time {
  display: block;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.2rem;
}

.location,
.next,
.topic {
  color: #666;
  font-size: 0.9rem;
  text-align: center;
}

.badge {
  position: absolute;
  bottom: 1.2rem;
  left: 1.2rem;
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: #200863;
  color: white;
  font-weight: bold;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bottom-wrapper {
  display: flex;
  justify-content: center;
  gap: 10px;
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
