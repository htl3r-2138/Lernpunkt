<template>
  <div>
    <div class="wrapper">
      <input
        v-model="inputText"
        type="text"
        placeholder="Search for tutors..."
      />
      <span class="icon">
        <img style="width: 1.5rem;" :src="Magnifier">
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import Magnifier from "@/assets/Magnifier.svg";

const props = defineProps({
  modelValue: {
    type: String,
    default: ""
  }
});

const emit = defineEmits(["update:modelValue"]);

const inputText = computed({
  get: () => props.modelValue,
  set: value => emit("update:modelValue", value)
});
</script>

<style scoped>
input {
  width: 20rem;
  padding: 1em 1em;
  padding-left: 3rem;
  border: 1px solid #000;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.3s;
  background-color: white;
  color: black;
}
input::placeholder {
  color: #888;
  font-size: small;
}
.wrapper {
  position: relative;
  display: inline-block;
}
.icon {
  position: absolute;
  left: 15px;
  top: 55%;
  transform: translateY(-50%);
  user-select: none;
}
</style>
