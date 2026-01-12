import { defineStore } from "pinia";

const API_BASE = "http://localhost:3000/api";

export const useTutorsStore = defineStore("tutors", {
  state: () => ({
    tutors: [],
    searchText: "",
    loaded: false,
  }),

  getters: {
    filteredTutors(state) {
      if (!state.searchText) return state.tutors;

      const q = state.searchText.toLowerCase();

      return state.tutors.filter((t) =>
        `${t.name} ${t.surname}`.toLowerCase().includes(q)
      );
    },
    tutorsForUI(state) {
      return state.tutors.map((t) => ({
        id: t.id,
        name: `${t.name} ${t.surname}`, // ✅ voller Name
        grade: `${t.grade}. Grade`, // ✅ UI-Format
        price: Number(t.pricePerHour), // ✅ umbenannt
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

    setSearchText(text) {
      this.searchText = text;
    },

    clearSearch() {
      this.searchText = "";
    },

    removeTutor(tutorId) {
      this.tutors = this.tutors.filter((t) => t.id !== tutorId);
    },
  },
});
