<script setup>
import Logo from './components/Logo.vue';
import PasswordField from './components/PasswordField.vue';
import TextField from './components/TextField.vue';
import Login from './components/Login.vue';
import registerIMG from './assets/register.jpg';
import { ref } from 'vue';
const form = ref({
    name: '',
    email: '',
    password: '',
    isTutor: false
});
</script>

<template>
    <div class="register-page">
        <section class="left">
            <Logo :visible="true"/>
            <img :src="registerIMG" alt="illustration of happy business people" class="illustration">
        </section>

        <section class="right">
            <div class="tile">
                <h1>Join us today!</h1>
                <p>Where knowledge meets connection</p>

                <form @submit.prevent="submitForm">
                    <TextField 
                        name="name" 
                        label="First & Last Name" 
                        placeholder="i.e. Max Mustermann"
                        v-model="form.name" 
                        required/>
                    <TextField
                        name="email" 
                        label="Email Address" 
                        placeholder="i.e. max.mustermann@example.com" 
                        type="email" 
                        v-model="form.email"
                        required/>

                    <PasswordField
                        name="password" 
                        label="Password" 
                        :isVisible="false" 
                        v-model="form.password"
                        required/>
                    <div class="tutor-signup">
                        <input type="checkbox" name="isTutor" id="tutor" v-model="form.isTutor">
                        <label for="tutor">also sign up as a tutor?</label>
                    </div>

                    <Login 
                        text="Register" 
                        :login="false"/>
                </form>
            </div>
        </section>
    </div>
</template>

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
    color: #000;;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
}

.tile {
    background-color: #fff;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.illustration {
    max-width: 100%;
    height: auto;
    margin-top: auto;
}

p{
    margin-bottom: 2rem;
    color: grey;
}

h1 {
    margin-bottom: 0;
}

.tutor-signup {
    display: flex;
    margin: 1rem 0;
    align-items: center;
}

.tutor-signup label {
    flex: 1;
    align-self: center;
    padding-bottom: 0.7em;
}

.tutor-signup input {
    margin-right: 0.5rem;
    width: 10px;
    align-self: center;
}
</style>