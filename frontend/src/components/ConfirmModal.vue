<template>
  <div class="overlay">
    <div class="modal">
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>

      <div class="actions">
        <button class="cancel" @click="$emit('cancel')">
          Cancel
        </button>
        <button class="confirm" @click="$emit('confirm')">
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  message: String,
});

defineEmits(["confirm", "cancel"]);
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 320px;
  text-align: center;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
}

button {
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

.cancel {
  background: #e0e0e0;
}

.confirm {
  background: #6b4eff;
  color: white;
}
</style>