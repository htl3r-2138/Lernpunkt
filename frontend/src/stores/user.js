import { defineStore } from "pinia";

const API_BASE = "http://localhost:3000/api";

export const useUserStore = defineStore("user", {
  state: () => ({
    id: null,
    role: null,          // "student" | "tutor"
    name: null,
    surname: null,
    email: null,
    grade: null,
    pricePerHour: null,  // nur tutor
  }),

  getters: {
    isLoggedIn: (state) => !!state.id,
    isTutor: (state) => state.role === "tutor",
    isStudent: (state) => state.role === "student",
  },

  actions: {
    /* ---------------------------------
     * LOAD USER (SOURCE OF TRUTH)
     * --------------------------------- */
    async load() {
      const res = await fetch(`${API_BASE}/auth/me`, {
        credentials: "include",
      });

      if (!res.ok) {
        this.$reset();
        throw new Error("Not authenticated");
      }

      const data = await res.json();

      // 1:1 Spiegel von /me
      this.id = data.id;
      this.role = data.role;
      this.name = data.Name ?? data.name;
      this.surname = data.Surname ?? data.surname;
      this.email = data.Email ?? data.email;
      this.grade = data.Grade ?? data.grade;
      this.pricePerHour =
        data.role === "tutor" ? data.PricePerHour ?? data.pricePerHour ?? null : null;
    },

    /* ---------------------------------
     * SETTINGS ACTIONS
     * --------------------------------- */

    async updateHourlyRate(rate) {
      if (this.role !== "tutor") {
        throw new Error("Only tutors can update hourly rate");
      }

      const res = await fetch(`${API_BASE}/user/hourly-rate`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pricePerHour: rate }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to update hourly rate");
      }

      await this.load();
    },

    async updateEmail(newEmail) {
      const res = await fetch(`${API_BASE}/user/email`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newEmail }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to update email");
      }

      await this.load();
    },

    async updatePassword(currentPassword, newPassword) {
      const res = await fetch(`${API_BASE}/user/password`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to update password");
      }
    },

    async deleteAccount() {
      const res = await fetch(`${API_BASE}/user`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to delete account");
      }

      this.$reset();
    },

    /* ---------------------------------
     * LOCAL
     * --------------------------------- */
    logout() {
      this.$reset();
    },
  },
});