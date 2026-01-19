<template>
  <div class="wrapper-textField">
    <label v-if="label">{{ label }}</label>
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: String,
  label: String,
});

defineEmits(["update:modelValue"]);
</script>

<style scoped>
.wrapper-textField {
  display: flex;
  flex-direction: column;
  background: transparent;
}

input {
  width: 15rem;
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
  margin-top: 0;
  margin-bottom: 0;
  text-align: left;
}

input::placeholder {
  color: #888;
  font-size: small;
}
</style>
