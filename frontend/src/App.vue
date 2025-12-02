<template>
  <h1>You did it!</h1>
  <p>
    {{ users }}
  </p>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const users = ref([]);

onMounted(async () => {
  try {
    const res = await axios.get("http://localhost:3000/users");
    users.value = res.data;
    console.log("User:", users.value);
  } catch (err) {
    console.error("Fehler beim Request:", err);
  }
});
</script>
<style scoped></style>
