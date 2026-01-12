<template>
  <div class="wrapper">
    <nav>
      <div class="return">
        <div class="back" @click="exitSettings">
          <img src="@/assets/settings/X.svg" alt="exit settings" />
          <span>Exit</span>
        </div>
      </div>
      <div class="navTitle">
        <h1>Settings</h1>
      </div>
      <div class="accountFeatures">
        <div class="deleteAcc" @click="deleteAccount">
          <img src="@/assets/settings/delete_account.svg" alt="Logout" />
          <span>Delete</span>
        </div>
        <div class="logout" @click="requestLogout">
          <img src="@/assets/settings/logout.svg" alt="Logout" />
          <span>Logout</span>
        </div>

        <ConfirmModal v-if="showConfirm" title="Confirm logout" message="Are you sure you want to log out?"
          @confirm="confirmLogout" @cancel="cancelLogout" />
      </div>
    </nav>
    <main>
      <div class="email">
        <form @submit.prevent="changeEmail">
          <TextField name="currEmail" label="current Email Address" required />
          <TextField name="newEmail" label="new Email Address" required />
          <button class="login-btn" @click="handleLogin" @mouseenter="hoverEnter" @mouseleave="hoverLeave">
            set new Email
          </button>
        </form>
      </div>
      <div class="password">
        <form @submit.prevent>
          <PasswordField name="currentPassword" label="current Password" type="password" required />

          <PasswordField name="newPassword" label="new Password" type="password" required />

          <PasswordField name="repeatNewPassword" label="repeat new Password" type="password" required />

          <button class="login-btn" @mouseenter="hoverEnter" @mouseleave="hoverLeave">
            set new password
          </button>
        </form>
      </div>
      <div class="subjects">
        <h2>Subject you want to teach</h2>
        <div class="subject-grid">
          <button v-for="s in subjectsStore.allSubjects" :key="s.PK_Subject_ID" :class="{
            active: subjectsStore.mySubjectIds.includes(s.PK_Subject_ID),
          }" @click="subjectsStore.toggleSubject(s)">
            {{ s.Description }}
          </button>
        </div>
        <button class="login-btn" @click="subjectsStore.save">
          Save subjects
        </button>
      </div>
      <div class="changeHRate">
        <h2>Change hourly rate</h2>
        <form @submit.prevent="handleHRateChange">
          <TextField name="HRate" label="Set Hourly Rate" v-model="userStore.pricePerHour" />
          <button class="login-btn" @mouseenter="hoverEnter" @mouseleave="hoverLeave">
            Save
          </button>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { gsap } from "gsap";
import { onMounted } from "vue";
import { useSubjectsStore } from "@/stores/subject.js";
import { useUserStore } from "@/stores/user.js";
import { useRouter } from "vue-router";
import { logout } from "@/services/auth";
import ConfirmModal from "@/components/ConfirmModal.vue";
import TextField from "@/components/authentification/TextField.vue";
import PasswordField from "@/components/authentification/PasswordField.vue";

const subjectsStore = useSubjectsStore();
const userStore = useUserStore();

onMounted(() => {
  subjectsStore.load();
});
onMounted(async () => {
  await userStore.load();
});

// Hover-Effekte
function hoverEnter(event) {
  gsap.to(event.target, { scale: 1.1, duration: 0.2, ease: "power1.in" });
}

function hoverLeave(event) {
  gsap.to(event.target, { scale: 1, duration: 0.2, ease: "power1.out" });
}

const router = useRouter();
const showConfirm = ref(false);

const requestLogout = () => {
  showConfirm.value = true;
};

const handleHRateChange = async () => {
  try {
    await userStore.updateHourlyRate(Number(userStore.pricePerHour));
    alert("Hourly rate saved");
  } catch (err) {
    alert(err.message);
  }
};

const confirmLogout = async () => {
  try {
    await logout();
    router.push("/login");
  } catch (err) {
    alert(err.message);
  } finally {
    showConfirm.value = false;
  }
};

const cancelLogout = () => {
  showConfirm.value = false;
};

const exitSettings = () => {
  router.back();
};
</script>

<style scoped>
.wrapper {
  color: black;
}

nav {
  display: flex;
  justify-content: space-between;
  padding: 2rem;
}

.accountFeatures {
  display: flex;
  gap: 1rem;
}

.deleteAcc,
.logout,
.back {
  display: flex;
  flex-direction: column;
  align-items: center;
}

main {
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(2, auto);
  gap: 10%;
}

.login-btn {
  padding: 15px 30px;
  background: #7e52fc;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: box-shadow 0.2s;
  margin-top: 5%;
}

.lower {
  margin-top: 2%;
  display: flex;
  justify-content: center;
  gap: 10%;
}

.subject-grid {
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 0.5rem;
}

.subject-grid button {
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  border: 1px solid #444;
  background-color: transparent;
  color: #444;
  cursor: pointer;
}

.subject-grid button.active {
  background: #7e52fc;
  color: white;
  border-color: #7e52fc;
}

.back,
.deleteAcc,
.logout {
  cursor: pointer;
}
</style>
