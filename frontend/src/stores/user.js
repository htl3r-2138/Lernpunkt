import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    id: null,
    role: null,
    email: null,
    pricePerHour: null,
    loaded: false,
  }),

  actions: {
    async load() {
      if (this.loaded) return;

      const res = await fetch("http://localhost:3000/api/auth/me", {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Not authenticated");

      const data = await res.json();

      this.id = data.id;
      this.role = data.role;
      this.email = data.email;
      this.pricePerHour = data.pricePerHour ?? null;
      this.loaded = true;
    },

    async updateHourlyRate(rate) {
      await fetch("http://localhost:3000/api/user/hourly-rate", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pricePerHour: rate }),
      });

      this.pricePerHour = rate;
    },

    logout() {
      this.$reset();
    },
  },
});