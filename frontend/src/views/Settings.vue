<template>
  <div class="wrapper">
    <nav>
      <div class="return">
        <button>
          
        </button>
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
        <div class="back" @click="exitSettings">
          <img src="@/assets/settings/X.svg" alt="exit settings">
          <span>Exit</span>
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
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { logout } from "@/services/auth";
import ConfirmModal from "@/components/ConfirmModal.vue";

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
  padding: 10px;
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
</style>
