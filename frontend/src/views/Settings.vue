<template>
  <div class="wrapper">
    <nav>

      <h1 class="headline">Settings</h1>
    </nav>
    <main>

      <div class="category-wrapper">
        <h2 style="margin-top: 0;">Account</h2>
        <form class="category" @submit.prevent="changeEmail">
          <TextField name="currEmail" label="current Email Address" required />
          <TextField name="newEmail" label="new Email Address" required />
          <div class="delete-and-logout">
            <div class="deleteAcc" @click="deleteAccount">
              <img src="@/assets/settings/delete_account.svg" alt="Logout" />
              <span style="font-size: 12px;">Delete Account</span>
            </div>
            <div class="logout" @click="requestLogout">
              <img src="@/assets/settings/logout.svg" alt="Logout" />
              <span style="font-size: 12px;">Logout</span>
            </div>

            <ConfirmModal v-if="showConfirm" title="Confirm logout" message="Are you sure you want to log out?"
              @confirm="confirmLogout" @cancel="cancelLogout" />
          </div>

        </form>
      </div>

      <div class="category-wrapper">
        <h2>Security</h2>
        <form class="category" @submit.prevent>
          <PasswordField name="currentPassword" label="current Password" type="password" required />

          <PasswordField name="newPassword" label="new Password" type="password" required />

          <PasswordField name="repeatNewPassword" label="repeat new Password" type="password" required />
        </form>
      </div>
      <div class="category-wrapper">
        <h2>
          {{
            userStore.role === "student"
              ? "Subjects you need help with"
              : "Subjects you want to teach"
          }}
        </h2>

        <div class="subject-grid">
          <button v-for="s in subjectsStore.allSubjects" :key="s.PK_Subject_ID" :class="{
            active: subjectsStore.mySubjectIds.includes(s.PK_Subject_ID),
          }" @click="subjectsStore.toggleSubject(s)">
            {{ s.Description }}
          </button>
        </div>

      </div>
      <div class="changeHRate" v-if="userStore.role === 'tutor'">
        <h2>Change hourly rate</h2>
        <form @submit.prevent="handleHRateChange">
          <TextField name="HRate" label="Set Hourly Rate" v-model="userStore.pricePerHour" />
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

const handleSubjectChange = async () => {
  try {
    await subjectsStore.save();
  } catch (err) {
    alert(err.message || "Failed to save subjects");
  }
};

const handleHRateChange = async () => {
  try {
    await userStore.updateHourlyRate(Number(userStore.pricePerHour));
    alert("Hourly rate saved");
  } catch (err) {
    alert(err.message || "Failed to save hourly rate");
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
  // Einfaches Bestätigungs-Popup
  const save = window.confirm("Willst du die Änderungen speichern?");

  if (save) {
    // Wenn "Ja", dann Änderungen speichern
    if (userStore.isTutor === true) {
      handleHRateChange();
    }
    handleSubjectChange();
  }

  // Egal ob Ja oder Nein → zurück
  router.back();
};
</script>

<style scoped>
label {
  margin-top: 0;
}

h2 {

  font-size: 32px;
}

.headline {
  margin-top: 32px;
  margin-bottom: 0%;
  font-size: 48px;
}

.delete-and-logout {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 17rem;
}

.deleteAcc:hover {
  background: red;
  color: white;
  transition: 0.3s ease-in-out;

}

.logout:hover {
  background: #26006A;
  color: white;
  transition: 0.3s ease-in-out;

}

.deleteAcc,
.logout {
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 155px;
  height: 60px;
  color: #383838;
  background: transparent;
  transition: 0.3s ease-in-out;
}

.category-wrapper {
  margin-left: 2rem;
  margin-right: 2rem;
}

.category {
  display: flex;
  flex-direction: row;
  justify-content: left;
  gap: 50px;
  align-items: end;
}

.wrapper {
  background: linear-gradient(white, #E2D8FF);
  color: #383838;
  height: 100dvh;
}

nav {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
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
  padding-bottom: 5vh;
  width: 500px;
  display: grid;
  grid-template-columns: repeat(5, auto);
  gap: 0.5rem;
}

.subject-grid button {
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  border: 1px solid #383838;
  background-color: transparent;
  color: #383838;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}

.subject-grid button.active {
  background: #7e52fc;
  color: white;
  border-color: #7e52fc;
  transition: 0.3s ease-in-out;
}

.subject-grid button:hover {
  transform: scale(1.05);
  transition: 0.3s ease-in-out;

}

.back,
.deleteAcc,
.logout {
  cursor: pointer;
}
</style>
