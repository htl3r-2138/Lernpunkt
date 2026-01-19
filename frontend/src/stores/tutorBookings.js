import { defineStore } from "pinia";

const API = "http://localhost:3000/api";

export const useTutorBookingsStore = defineStore("tutorBookings", {
  state: () => ({
    bookings: [],
  }),

  getters: {
    requestedBookings: (state) =>
      state.bookings.filter((b) => b.isAccepted !== 1),

    acceptedBookings: (state) =>
      state.bookings.filter((b) => b.isAccepted === 1),
  },

  actions: {
    async load() {
      const res = await fetch(`${API}/tutor/bookings`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to load tutor bookings");
      this.bookings = await res.json();
    },

    async cancelBooking(id) {
      const res = await fetch(`${API}/tutor/bookings/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to cancel booking as tutor");
      }

      this.bookings = this.bookings.filter((b) => b.id !== id);
    },

    async acceptBooking(id) {
      await fetch(`${API}/bookings/${id}/accept`, {
        method: "PATCH",
        credentials: "include",
      });

      const booking = this.bookings.find((b) => b.id === id);
      if (booking) booking.isAccepted = 1;
    },

    async declineBooking(id) {
      const res = await fetch(`${API}/bookings/tutor/bookings/${id}/decline`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to decline booking");
      }

      this.bookings = this.bookings.filter((b) => b.id !== id);
    },
  },
});
