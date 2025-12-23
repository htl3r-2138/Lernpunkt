<template>
    <div class="register-page">
        <section class="left">
            <div class="tile">
                <h1>Welcome back</h1>
                <p>Good to see you again — let’s reach new heights.</p>

                <form @submit.prevent="submitForm">
                    <TextField name="email" label="Email Address" placeholder="i.e. max.mustermann@example.com"
                        type="email" v-model="form.email" required />

                    <PasswordField name="password" label="Password" :isVisible="false" v-model="form.password"
                        required />
                    <div class="fgyp-wrapper">
                        <a class="fgyp" href="http://google.com">Forgot your password?</a>
                    </div>
                    <Login text="Login" :login="true" />
                </form>
                <p>Don't have an account? <a class="su" href="/register">Sign up</a></p>
            </div>
        </section>

        <section class="right">
            <Logo :visible="true" />
            <img :src="loginIMG" alt="illustration of happy business people" class="illustration" />
        </section>
    </div>
</template>

<script setup>
import Logo from "@/components/register-components/Logo.vue";
import TextField from "@/components/register-components/TextField.vue";
import PasswordField from "@/components/register-components/PasswordField.vue";
import Login from "@/components/register-components/Login.vue";
import loginIMG from "@/assets/login-assets/login.jpg";
import { ref } from "vue";
const form = ref({
    email: "",
    password: ""
});
</script>

<style scoped>
.fgyp-wrapper {
    padding-top: 1rem;
    display: flex;
    align-items: center;
    gap: 10px;
}

.fgyp{
    margin-bottom: 2rem;
}

.register-page {
    display: flex;
    height: 100vh;
    width: 100vw;
    flex-direction: row;
}

.right {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
}

.left {
    color: #000;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
}

.tile {
    background-color: #fff;
    padding: 0rem 2rem 0rem 2rem;
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

a{
    color: #6b4eff;
    text-decoration: none;
}
</style>
