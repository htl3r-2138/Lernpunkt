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

        <ConfirmModal
          v-if="showConfirm"
          title="Confirm logout"
          message="Are you sure you want to log out?"
          @confirm="confirmLogout"
          @cancel="cancelLogout"
        />
      </div>
    </nav>
    <main>
      <div class="email">
        <form @submit.prevent="changeEmail">
          <TextField name="currEmail" label="current Email Address" required />
          <TextField name="newEmail" label="new Email Address" required />
          <button
            class="login-btn"
            @click="handleLogin"
            @mouseenter="hoverEnter"
            @mouseleave="hoverLeave"
          >
            set new Email
          </button>
        </form>
      </div>
      <div class="password">
        <form @submit.prevent>
          <PasswordField
            name="currentPassword"
            label="current Password"
            type="password"
            required
          />

          <PasswordField
            name="newPassword"
            label="new Password"
            type="password"
            required
          />

          <PasswordField
            name="repeatNewPassword"
            label="repeat new Password"
            type="password"
            required
          />

          <button
            class="login-btn"
            @mouseenter="hoverEnter"
            @mouseleave="hoverLeave"
          >
            set new password
          </button>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { gsap } from "gsap";
import { useRouter } from "vue-router";
import { logout } from "@/services/auth";
import ConfirmModal from "@/components/ConfirmModal.vue";
import TextField from "@/components/authentification/TextField.vue";
import PasswordField from "@/components/authentification/PasswordField.vue";

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

main{
  display: flex;
  justify-content: center;
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
</style>
