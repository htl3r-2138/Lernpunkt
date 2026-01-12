<template>
    <div class="tutor-card">
        <div class="tutor">
            <div class="content">
                <h3 class="name">{{ name }}</h3>
            </div>

            <div class="rating">
                <span v-for="i in 5" :key="i" class="star" :class="{ active: i <= rating }">
                    ★
                </span>
                <span class="count">({{ reviews }})</span>
            </div>

            <p class="grade">{{ grade }} · {{ price }}€/h</p>
            <p class="location">{{ location }}</p>
            <p class="next">next session on {{ nextSess }}</p>
        </div>

        <div class="badge">{{ subject }}</div>

        <div class="actions">
            <button class="icon-btn">
                <img :src="chatbtn" alt="chat">
            </button>
            <button class="icon-btn">
                <img :src="morebtn" alt="more">
            </button>
        </div>
    </div>
</template>

<script setup>
import chatbtn from '@/assets/chat-btn.svg';
import morebtn from '@/assets/more-btn.svg';

defineProps({
    name: String,
    rating: Number,
    reviews: Number,
    grade: String,
    price: Number,
    location: String,
    nextSess: String,
    subject: String
});
</script>

<style scoped>
.tutor-card {
    position: relative;
    width: 400px;
    padding: 1.5rem;
    border-radius: 24px;
    background: white;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.content {
    text-align: center;
}

.name {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: .5rem;
}

.rating {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    margin-bottom: .5rem;
}

.star {
    color: #ccc;
    font-size: 1.2rem;
}

.star.active {
    color: #7CFF00;
}

.count {
    font-size: .9rem;
    color: #666;
    margin-left: 6px;
}

.grade {
    font-weight: 500;
    text-align: center;
}

.location,
.next {
    color: #666;
    font-size: .9rem;
    text-align: center;
}

.badge {
    position: absolute;
    bottom: 1.2rem;
    left: 1.2rem;
    width: 56px;
    height: 56px;
    border-radius: 12px;
    background: #ff5c5c;
    color: white;
    font-weight: bold;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.actions {
    position: absolute;
    right: 1.2rem;
    bottom: 1.2rem;
    display: flex;
    flex-direction: column;
    gap: .6rem;
}

.icon-btn {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: none;
    background: #7b4dff;
    color: white;
    font-size: 1.1rem;
    cursor: pointer;
}
</style>
