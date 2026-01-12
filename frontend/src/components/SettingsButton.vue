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
 img{
  width: 2.5rem;
 }
</style>