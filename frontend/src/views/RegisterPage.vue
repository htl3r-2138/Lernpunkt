<template>
  <div class="register-page">
    <section class="left">
      <Logo :visible="true" />
      <img :src="registerIMG" alt="illustration of happy business people" class="illustration" />
    </section>

    <section class="right">
      <div class="tile">
        <h1>Join us today!</h1>
        <p>Where knowledge meets connection</p>

        <form @submit.prevent="submitForm">
          <TextField name="firstname" label="First Name" placeholder="i.e. Max" v-model="form.firstname" required />
          <TextField name="lastname" label="Last Name" placeholder="i.e. Mustermann" v-model="form.lastname" required />

          <TextField name="email" label="Email Address" placeholder="i.e. max.mustermann@example.com" type="email"
            v-model="form.email" required />

          <PasswordField name="password" label="Password" :isVisible="false" v-model="form.password" required />
          <div class="tutor-signup">
            <input type="checkbox" name="isTutor" id="tutor" v-model="form.isTutor" />
            <label for="tutor">also sign up as a tutor?</label>
          </div>

          <Login text="Register" :login="false" />
        </form>
        <p>
          Already have an account?
          <a class="lg" href="/login">Login</a>
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import Logo from "@/components/Logo.vue";
import TextField from "@/components/authentification/TextField.vue";
import PasswordField from "@/components/authentification/PasswordField.vue";
import Login from "@/components/authentification/Login.vue";
import registerIMG from "@/assets/authentification/register.jpg";
import { ref } from "vue";
const form = ref({
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  isTutor: false,
});
</script>

<style scoped>
.register-page {
  display: flex;
  height: 100vh;
  width: 100vw;
  flex-direction: row;
}

.left {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.right {
  color: #000;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.tile {
  background-color: #fff;
  padding: 0rem 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.illustration {
  max-width: 100%;
  height: auto;
  margin-top: auto;
}

p {
  margin-bottom: 2rem;
  color: grey;
}

h1 {
  margin-bottom: 0;
}

.tutor-signup {
  padding: 1rem 0;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 2rem;
}

.tutor-signup input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #444;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
}

.tutor-signup input[type="checkbox"]:checked {
  background-color: #6b4eff;
  border-color: #6b4eff;
}

.tutor-signup input[type="checkbox"]:checked::after {
  content: "✓";
  font-size: 16px;
  color: white;
  position: relative;
  left: 2px;
  top: -3px;
}

.lg {
  color: #6b4eff;
  text-decoration: none;
}
</style>
