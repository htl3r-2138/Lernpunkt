<template>
    <div class="page">

        <div class="glass-tile">
            <h2>Which subjects do you need help with?</h2>

            <div class="subjects-grid">
                <div class="subject-tile"
                    v-for="subject in ['SEW', 'WEBT', 'NWT', 'INSI', 'GETE', 'ITP', 'GINF', 'BS', 'AM', 'DE', 'E', 'PH', 'CH', 'GGP']"
                    :key="subject"
                    :class="{ selected: selectedSubjects.includes(subject) }"
                    :style="selectedSubjects.includes(subject)
                    ? { backgroundColor: subjectColors[subject] || '#4cafef', color: '#fff' }
                    : {}"
                    @click="toggleSubject(subject)">
                    {{ subject }}
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
    import {ref} from 'vue';
    
    const selectedSubjects = ref([]);

    const subjectColors = {
        AM: '#FF6666',
        E: '#6697FF',
        DE: '#4DF366',
        PH: '#16C3E2',
        CH: '#FFC466',
        GGP: '#FF66FC',
        SEW: '#B066FF',
        WEBT: '#FF8F66',
        NWT: '#989898',
        INSI: '#FCC652',
        ITP: '#FF8340',
        GETE: '#AA541D',
        GINF: '#FF6666',
        BS: '#5B00FF'
    }

    function toggleSubject (subject) {
        const index = selectedSubjects.value.indexOf(subject);
        if (index > -1) {
            selectedSubjects.value.splice(index, 1);
        } else {
            selectedSubjects.value.push(subject);
        }
    }
</script>

<style scoped>
* {
    color: black;
}

.page {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.glass-tile {
    backdrop-filter: blur(15px);
    background: rgba(255, 255, 255, 0.15);
    border-radius: 20px;
    padding: 2rem 3rem;
    width: 500px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
    text-align: center;
    color: white;
}

.glass-tile h2 {
    margin-bottom: 2rem;
    font-weight: 600;
}

.subjects-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;  
}

.subject-tile {
    padding: 1.2rem;
    border-radius: 12px;
    border: 2px solid #000;
    background: rgba(255, 255, 255, 0.2);
    cursor: pointer;
    font-weight: bold;
    transition: all 0.2s ease;
    user-select: none;
}

.subject-tile:hover {
    background: rgba(255, 255, 255, 0.35);
}

.subject-tile.selected {
    background: #4cafef;
    color: #fff;
    box-shadow: 0 0 12px rgba(76, 175, 239, 0.8);
}
</style>