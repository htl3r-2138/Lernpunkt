import { defineStore } from "pinia";

const API_BASE = "http://localhost:3000/api";

export const useTutorsStore = defineStore("tutors", {
  state: () => ({
    tutors: [],
    loaded: false,
  }),

  getters: {
    getTutors(state) {
      return state.tutors.map((t) => ({
        id: t.id,
        name: `${t.name} ${t.surname}`,
        grade: `${t.grade}. Grade`,
        price: Number(t.pricePerHour),
        subjects: t.subjects,
      }));
    },
  },

  actions: {
    async load() {
      if (this.loaded) return;

      const res = await fetch(`${API_BASE}/tutors`, {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to load tutors");
      }

      this.tutors = await res.json();
      this.loaded = true;
    },

    async loadRecommended(studentId) {
      const res = await fetch(
        `${API_BASE}/students/${studentId}/recommended-tutors`,
        {
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to load recommended tutors");
      }

      const recommendedTutors = await res.json();

      return recommendedTutors.map((t) => ({
        id: t.id,
        name: `${t.name} ${t.surname}`,
        grade: `${t.grade}. Grade`,
        price: Number(t.pricePerHour),
        subjects: t.subjects,
      }));
    },

    removeTutor(tutorId) {
      this.tutors = this.tutors.filter((t) => t.id !== tutorId);
    },
  },
});
