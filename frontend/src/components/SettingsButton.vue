<template>
  <div @click="goToSettings">
    <img :src="SettingsButton">
  </div>
</template>

<script setup>
import SettingsButton from '@/assets/SettingsButton.svg'
import { useRouter } from "vue-router";

const router = useRouter();

const goToSettings = () => {
  router.push("/settings");
};
</script>

<style scoped>
img {
  width: 2.5rem;
  transition: 0.3s ease-in-out;
  transform: rotate(0);

}

img:hover {
  width: 2.5rem;
  transition: 0.3s ease-in-out;
  transform: rotate(-180deg);
  scale: 1.1;
}
img:active{
  scale: 1.2;
}
</style>