<template>
  <div class="flex">
    <label for="schalter"> only show recommended </label>

    <label class="switch">
      <input
        id="schalter"
        type="checkbox"
        :checked="modelValue"
        @change="emit('update:modelValue', $event.target.checked)"
      />
      <span class="slider"></span>
    </label>
  </div>
</template>

<script setup>
defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(["update:modelValue"]);
</script>

<style scoped>
.flex {
  display: flex;
  flex-direction: row;
  align-items: left;
  gap: 10px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  inset: 0;
  background-color: #ccc;
  transition: 0.3s;
  border-radius: 26px;
}

.slider::before {
  content: "";
  position: absolute;
  height: 20px;
  width: 20px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #42b883;
}

input:checked + .slider::before {
  transform: translateX(24px);
}
</style>
