<template>
  <div class="student-card">
    <div class="student">
      <div class="content">
        <h3 class="name">{{ name }}</h3>
        <p class="next">next session on {{ nextSess }} ({{ startTime }} - {{ endTime }})</p>
      </div>
    </div>

    <div class="badge">{{ subject }}</div>

    <div class="actions">
      <a
        class="icon-btn"
        :href="`mailto:${email}?subject=Tutoring%20Session&body=Hi%20${encodeURIComponent(
          name
        )},`"
      >
        <img :src="chatbtn" alt="chat" />
      </a>
      <button class="icon-btn" @click="onMore">
        <img :src="morebtn" alt="more" />
      </button>
    </div>
  </div>
</template>

<script setup>
import chatbtn from "@/assets/chat-btn.svg";
import morebtn from "@/assets/more-btn.svg";

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

const emit = defineEmits(["more"]);

function onMore() {
  console.log("MORE WAS CLICKED");
  emit("more");
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

.location,
.next,
.topic 
{
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
  right: 1.2rem;
  bottom: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.icon-btn {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 12px;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
}

.next {
  color: #666;
  font-size: 0.9rem;
  text-align: center;
}
</style>
