<template>
  <div class="wrapper">
    <!-- Exit-Button -->
    <div class="exit-btn" @click="exitSettings">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        stroke="#383838"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </div>
    <!-- Animated Headline -->
    <nav>
      <h1>Settings</h1>
      <transition name="flip-word" mode="out-in">
        <h2 :key="activeSection" class="headline">
          {{ sectionHeadline }}
        </h2>
      </transition>
    </nav>

    <div class="settings-layout">
      <!-- LEFT SIDEBAR -->
      <aside class="sidebar">
        <button
          :class="{ active: activeSection === 'account' }"
          @click="activeSection = 'account'"
        >
          Account
        </button>

        <button
          :class="{ active: activeSection === 'security' }"
          @click="activeSection = 'security'"
        >
          Security
        </button>

        <button
          :class="{ active: activeSection === 'subjects' }"
          @click="activeSection = 'subjects'"
        >
          Subjects & Pay
        </button>
      </aside>

      <!-- RIGHT CONTENT -->
      <section class="content">
        <!-- ACCOUNT -->
        <div v-if="activeSection === 'account'" class="section">
          <form class="vertical-form" @submit.prevent="changeEmail">
            <TextField label="Current Email" required />
            <TextField label="New Email" required />

            <div class="delete-and-logout">
              <div class="deleteAcc" @click="deleteAccount">
                <img src="@/assets/settings/delete_account.svg" />
                <span>Delete Account</span>
              </div>

              <div class="logout" @click="requestLogout">
                <img src="@/assets/settings/logout.svg" />
                <span>Logout</span>
              </div>
            </div>
          </form>
          <ConfirmModal
            v-if="showConfirm"
            title="Confirm logout"
            message="Are you sure you want to log out?"
            @confirm="confirmLogout"
            @cancel="cancelLogout"
          />
        </div>

        <!-- SECURITY -->
        <div v-if="activeSection === 'security'" class="section">
          <form class="vertical-form">
            <PasswordField label="Current Password" required />
            <PasswordField label="New Password" required />
            <PasswordField label="Repeat New Password" required />
          </form>
        </div>

        <!-- SUBJECTS & PAY -->
        <div v-if="activeSection === 'subjects'" class="section">
          <form
            v-if="userStore.role === 'tutor'"
            class="vertical-form"
            @submit.prevent="handleHRateChange"
          >
            <TextField label="Hourly Rate" v-model="userStore.pricePerHour" />
            <p v-if="priceError" class="error">{{ priceError }}</p>
          </form>

          <div class="subject-grid">
            <button
              v-for="s in subjectsStore.allSubjects"
              :key="s.PK_Subject_ID"
              :class="{
                active: subjectsStore.mySubjectIds.includes(s.PK_Subject_ID),
              }"
              @click="subjectsStore.toggleSubject(s)"
            >
              {{ s.Description }}
            </button>
          </div>
        </div>
      </section>
    </div>
    <ConfirmModal
      v-if="showExitConfirm"
      title="Save changes?"
      message="Do you want to save your changes before leaving the settings?"
      @confirm="confirmExitSave"
      @cancel="confirmExitDiscard"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useSubjectsStore } from "@/stores/subject";
import { useUserStore } from "@/stores/user";
import { logout } from "@/services/auth";

import TextField from "@/components/authentification/TextField.vue";
import PasswordField from "@/components/authentification/PasswordField.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";

const subjectsStore = useSubjectsStore();
const userStore = useUserStore();
const router = useRouter();
// Active Section
const activeSection = ref("account");

// Dynamic Headline
const sectionHeadline = computed(() => {
  switch (activeSection.value) {
    case "account":
      return "Account";
    case "security":
      return "Security";
    case "subjects":
      return "Subjects & Pay";
    default:
      return "Settings";
  }
});
//Exit Settings
const showExitConfirm = ref(false);
const exitSettings = () => {
  showExitConfirm.value = true;
};

const confirmExitSave = async () => {
  let ok = true;

  if (userStore.isTutor === true) {
    const rateSaved = await handleHRateChange();
    if (!rateSaved) ok = false;
  }

  if (ok) {
    await handleSubjectChange();
    showExitConfirm.value = false;
    router.back();
  }
};

const confirmExitDiscard = () => {
  showExitConfirm.value = false;
  router.back();
};

// Confirm Modal for Logout
const showConfirm = ref(false);
const requestLogout = () => (showConfirm.value = true);
const confirmLogout = async () => {
  await logout();
  router.push("/login");
};
const cancelLogout = () => (showConfirm.value = false);

// Load user & subjects
onMounted(async () => {
  await userStore.load();
  await subjectsStore.load();
});

// Actions
const priceError = ref(""); // Fehlermeldung für das TextField

const handleHRateChange = async () => {
  const price = Number(userStore.pricePerHour);

  if (price > 99.99) {
    priceError.value = "The maximum hourly Rate is 99.99€";
    return false; // wichtig: NICHT speichern, Fehler signalisieren
  } else {
    priceError.value = "";
  }

  try {
    await userStore.updateHourlyRate(price);
    return true; // Speichern ok
  } catch (err) {
    alert(err.message || "Failed to save hourly rate");
    return false;
  }
};

const handleSubjectChange = async () => {
  try {
    await subjectsStore.save();
  } catch (err) {
    alert(err.message || "Failed to save subjects");
  }
};

const changeEmail = () => {
  alert("Email changed");
};
const deleteAccount = () => {
  alert("Account deleted");
};
</script>

<style scoped>
.error {
  color: rgb(255, 0, 0);
  font-size: 12px;
  margin-top: 0;
}

.exit-btn {
  position: fixed;
  right: 30px;
  top: 30px;
}

.wrapper {
  background: linear-gradient(white, #e2d8ff);
  height: 100dvh;
  color: #383838;
}

nav {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  align-items: center;
}

/* Headline */
.headline {
  font-size: 32px;
  margin: none;
}

h1 {
  font-size: 48px;
  margin-bottom: 0;
}

h2 {
  margin-top: 0;
}

/* Flip-Word Transition */
.flip-word-enter-active,
.flip-word-leave-active {
  transition: all 0.25s ease;
}

.flip-word-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.flip-word-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Layout */
.settings-layout {
  display: flex;
}

/* Sidebar */
.sidebar {
  position: absolute;
  left: 0;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 18rem;
}

.sidebar button {
  background: transparent;
  border: none;
  padding: 1rem;
  border-radius: 14px;
  font-size: 16px;
  text-align: left;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}

.sidebar button.active {
  background: #7e52fc;
  color: white;
  transition: 0.3s ease-in-out;
}

/* Content */
.content {
  flex: 1;
  padding: 3rem;
  display: flex;
  justify-content: center;
}

/* Sections */
.section {
  max-width: 520px;
}

/* Vertical forms */
.vertical-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

/* Subjects */
.subject-grid {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(5, auto);
  gap: 0.5rem;
  justify-content: center;
}

.subject-grid button {
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  border: 1px solid #383838;
  background: transparent;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}

.subject-grid button.active {
  background: #7e52fc;
  color: white;
  border: none;
  transform: scale(1);
  transition: 0.3s ease-in-out;
}

.subject-grid button:active {
  transition: 0.3s ease-in-out;
  transform: scale(0.9);
}

.subject-grid button:hover {
  transition: 0.3s ease-in-out;
  transform: scale(1.05);
}

/* Delete & Logout */
.delete-and-logout {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.deleteAcc,
.logout {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 12px;
  cursor: pointer;
  gap: 0.3rem;
  transition: 0.3s ease-in-out;
}

.deleteAcc img,
.logout img {
  width: 24px;
  height: 24px;
}

.deleteAcc span,
.logout span {
  font-size: 12px;
}

.deleteAcc:hover {
  background: red;
  color: white;
  transition: 0.3s ease-in-out;
  transform: scale(1.05);
}

.logout:hover {
  background: #26006a;
  color: white;
  transition: 0.3s ease-in-out;
  transform: scale(1.05);
}

/* Section H2 */
.content .section h2 {
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  font-size: 32px;
  font-weight: 600;
}

.section {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
</style>
