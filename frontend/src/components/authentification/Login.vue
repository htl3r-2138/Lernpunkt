<template>
  <button
    class="login-btn"
    @click="handleLogin"
    @mouseenter="hoverEnter"
    @mouseleave="hoverLeave"
  >
    {{ text }}
  </button>
</template>

<script setup>
import { defineProps } from "vue";
import { gsap } from "gsap";
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  login: {
    type: Boolean,
    required: true,
  },
});

function handleLogin() {
  if (props.login) {
    console.log("logging in cuh");
  } else {
    console.log("registering in cuh");
  }
}

function hoverEnter(event) {
  gsap.to(event.target, { scale: 1.1, duration: 0.2, ease: "power1.in" });
}

function hoverLeave(event) {
  gsap.to(event.target, { scale: 1, duration: 0.2, ease: "power1.out" });
}
</script>

<style scoped>
.login-btn {
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
