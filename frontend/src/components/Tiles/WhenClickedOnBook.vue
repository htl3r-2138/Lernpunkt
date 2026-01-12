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
                <!--FIX ME (only subjects a tutor has selected in their settings can be selected here)-->
                <div class="class-wrapper">
                    <select @submit.prevent="submitForm">
                        <option selected disabled value="">Class ⬇</option>
                        <option value="AM">AM</option>
                        <option value="DE">DE</option>
                        <option value="E">E</option>
                    </select>
                </div>
                <div class="topic-wrapper">
                    <textarea class="topic" placeholder="Type your topic here..." v-model="form.topic"></textarea>
                </div>
            </div>
            <div class="bottom-wrapper">
                <button class="button" @click="onCancel">Cancel</button>
                <button class="button" type="submit" @click="onSubmit">Book</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";
const form = ref({
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    topic: "",
});

const emit = defineEmits(["cancel", "submit"]);
function onCancel() {
    console.log("Cancelled")
    emit("cancel");
}
function onSubmit() {
    console.log("Submitted")
    emit("submit", form.value);
}
</script>

<style scoped>
.tutor-card {
    position: relative;
    width: 470px;
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

.class-wrapper select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 0.8rem;
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
