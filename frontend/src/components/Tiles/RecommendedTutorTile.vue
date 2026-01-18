<template>
  <div class="tutor-card">
    <div class="tutor">
      <div class="content">
        <h3 class="name">{{ name }}</h3>
      </div>

      <div class="rating">
        <span
          v-for="i in 5"
          :key="i"
          class="star"
          :class="{ active: i <= rating }"
        >
          ★
        </span>
        <span class="count">({{ reviews }})</span>
      </div>

      <p class="grade">{{ grade }} · {{ price }}€/h</p>
    </div>
    teaches
    <div class="footer">
      <div class="badges">
        <span v-for="s in subjects" :key="s" class="badge">
          {{ s.description }}
        </span>
      </div>

      <button class="book" @click="onBook">Book Tutor</button>
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
  subjects: Array, // ✅ statt subject
});

const emit = defineEmits(["book"]);

function onBook() {
  console.log("BOOK WAS CLICKED");
  emit("book");
}
</script>

<style scoped>
.tutor-card {
  width: 420px;
  min-height: 280px;       /* ❗ nicht height */
  padding: 1.5rem;
  border-radius: 24px;
  background: rgb(255, 255, 255, 0.5);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);

  display: flex;
  flex-direction: column;
}

.content {
  text-align: center;
}

.name {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.rating {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin-bottom: 0.5rem;
}

.star {
  color: #ccc;
  font-size: 1.2rem;
}

.star.active {
  color: #7cff00;
}

.count {
  font-size: 0.9rem;
  color: #666;
  margin-left: 6px;
}

.grade {
  font-weight: 500;
  text-align: center;
}

.location,
.next {
  color: #666;
  font-size: 0.9rem;
  text-align: center;
}

.footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 12px;
  align-items: flex-end;
}

.badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-width: 70%;
}

.badge {
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

.book {
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  height: 50px;
  border-radius: 25px;
  background: #7e52fc;
  box-shadow: 4px 4px 4.5px 0 rgba(0, 0, 0, 0.1);
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  white-space: nowrap;
  text-align: center;
  border: none;
}

.book:hover {
  transform: scale(1.05);
  transition: all 0.3s ease-in-out;
}
</style>
