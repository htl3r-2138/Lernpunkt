import { defineStore } from "pinia";

const API_BASE = "http://localhost:3000/api";

export const useBookingsStore = defineStore("bookings", {
  state: () => ({
    bookings: [],
    loaded: false,
  }),

  getters: {
    // ❌ noch nicht angenommen
    pendingBookings: (state) =>
      state.bookings.filter((b) => b.isAccepted !== 1),

    // ✅ angenommene Bookings
    acceptedBookings: (state) =>
      state.bookings.filter((b) => b.isAccepted === 1),
  },

  actions: {
    async load() {
      const res = await fetch(`${API_BASE}/bookings/me`, {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to load bookings");
      }

      this.bookings = await res.json();
      this.loaded = true;
    },
    async reload() {
      this.loaded = false;
      await this.load();
    },

    addBooking(booking) {
      this.bookings.push(booking);
    },

    removeBooking(id) {
      this.bookings = this.bookings.filter((b) => b.id !== id);
    },
  },
});
