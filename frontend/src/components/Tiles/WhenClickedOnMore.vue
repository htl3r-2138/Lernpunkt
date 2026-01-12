<template>
  <div class="tutor-card">
    <div class="top-wrapper">
      <div class="date-wrapper">
        <label for="date">
          <img src="@/assets/Tiles/Calendar.svg" alt="Calender Symbol" />
        </label>
        <p id="date">{{ date }}</p>
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
            src="@/assets/Tiles/Fast Forward.svg"
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
      <button class="button">Back</button>
      <!--FIX: add termination of booking functionality (with confirmation pop-up :)-->
      <button class="button">Cancel Booking</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  date: String,
  startTime: String,
  endTime: String,
  location: String,
  subject: String,
  topic: String,
});
</script>

<style scoped>
.tutor-card {
  position: relative;
  width: 300px;
  padding: 1.5rem;
  border-radius: 24px;
  background: white;
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
  margin-top: 2rem;
  justify-content: space-between;
}

.class-wrapper {
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
  margin-top: 2rem;
}
.button {
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  background: none;
  color: black;
  border: 1px black solid;
  font-size: 0.9rem;
  cursor: pointer;
}

button:hover {
  background: #f0f0f0;
}
</style>
