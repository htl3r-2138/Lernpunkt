<template>
    <label for="{{ name }}">{{ label }}</label>
    <div class="password-wrapper">

        <input 
        :type="visible ? 'text' : 'password'"  
        v-model="inputText"
        name="{{ name }}"
        placeholder="*******"/>

        <span 
        class="toggle" 
        @click="changeVisibility">
            <img v-if="visible" src="../assets/Eye.svg">
            <img v-else src="../assets/Eye-off.svg">
        </span>
    </div>

</template>

<script setup>
    import { ref } from 'vue';

    const props = defineProps({
        name: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: false
        },
        isVisible: {
            type: Boolean,
            default: false
        }
    });

    const visible = ref(props.isVisible);
    const inputText = ref('');

    function changeVisibility () {
        if (inputText.value.length > 0) {
            visible.value = !visible.value;
        }
    }
</script>

<style>
    input {
        width: 20rem;
        padding: 1em 1em;
        border: 1px solid #000;
        border-radius: 10px;
        font-size: 1rem;
        transition: border-color 0.3s;
    }

    label {
        display: block;
        color: #000;
        font-size: small;
        margin-top: 1rem;;
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