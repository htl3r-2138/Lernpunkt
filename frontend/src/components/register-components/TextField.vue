<template>
  <div class="wrapper">
    <label for="{{ name }}">{{ label }}</label>
    <input
      :type="type"
      name="{{ name }}"
      v-model="inputText"
      :placeholder="placeholder"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  type: {
    type: String,
    default: "text",
  },
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: false,
  },
});

const inputText = ref("");
</script>

<style scoped>

.wrapper {
  display: flex;
  flex-direction: column;
}

input {
  width: 20rem;
  padding: 1em 1em;
  border: 1px solid #000;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.3s;
  background-color: white;
  color: black;
}

label {
  display: block;
  color: #000;
  font-size: small;
  margin-top: 1rem;
  margin-bottom: 0.5em;
  text-align: left;
}

input::placeholder {
  color: #888;
  font-size: small;
}
</style>
