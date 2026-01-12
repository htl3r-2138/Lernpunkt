<template>
  <div class="wrapper">
    <label>{{ label }}</label>
    <input
      :type="isVisible ? 'text' : 'password'"
      :value="modelValue"
      placeholder = "*********"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: ""
  },
  label: String,
  isVisible: Boolean
});

defineEmits(["update:modelValue"]);
</script>

<style scoped>
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

.password-wrapper {
  position: relative;
  display: inline-block;
}

.toggle {
  position: absolute;
  right: 15px;
  top: 55%;
  transform: translateY(-50%);
  cursor: pointer;
  user-select: none;
}
</style>
