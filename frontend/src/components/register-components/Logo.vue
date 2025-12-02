<template>
    <div class="flex">
        <img class="logo" src="../assets/logo.svg" alt="Logo"/>
        <p class="text" v-if="visible">Lernpunkt</p>
    </div>
</template>

<script setup>
  import { defineProps } from 'vue';
  const props = defineProps({
    visible: {
      type: Boolean,
      default: false
    }
  });
</script>
  
<style scoped>

  .flex {
    display: flex;
    justify-content: center;
    margin-right: auto;
    margin-left: auto;
    gap: 1rem;
  }

  .logo {
    display: block;
    user-select: none;
    width: 3rem;
  }

  .text {
    display: block;
    color: #26006A;
    font-size: 2.5rem;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-weight: 600;
    margin: 0;
    padding: 0.5em 0;
    user-select: none;
  }
</style>
