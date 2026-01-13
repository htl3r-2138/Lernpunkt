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

    <div class="actions">
      <button class="decline" @click="onDecline">Decline</button>
      <button class="accept" @click="onAccept">Accept</button>
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
  price: Number,
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
  background: white;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.content {
  text-align: center;
  margin-bottom: 7rem;
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
  background: #ff5c5c;
  color: white;
  font-weight: bold;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.actions {
  position: absolute;
  left: 8.5rem;
  bottom: 1.2rem;
  display: flex;
  gap: 10px;
}

.accept,
.decline {
  color: black;
  padding: 15px 30px;
  background: none;
  border: 1px solid black;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: box-shadow 0.2s;
}

.decline:hover,
.accept:hover {
  padding: 15px 30px;
  background: #7e52fc;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: box-shadow 0.2s;
}
</style>
