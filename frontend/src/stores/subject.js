import { defineStore } from "pinia";

export const useSubjectsStore = defineStore("subjects", {
  state: () => ({
    allSubjects: [],
    mySubjects: [],
    loaded: false,
  }),

  getters: {
    mySubjectIds: (state) => state.mySubjects.map((s) => s.PK_Subject_ID),
  },

  actions: {
    async load() {
      if (this.loaded) return;

      const [all, mine] = await Promise.all([
        fetch("http://localhost:3000/api/subjects", {
          credentials: "include",
        }).then((r) => r.json()),

        fetch("http://localhost:3000/api/user/subjects", {
          credentials: "include",
        }).then((r) => r.json()),
      ]);

      this.allSubjects = all;
      this.mySubjects = mine;
      this.loaded = true;
    },

    toggleSubject(subject) {
      const exists = this.mySubjects.find(
        (s) => s.PK_Subject_ID === subject.PK_Subject_ID
      );

      if (exists) {
        this.mySubjects = this.mySubjects.filter(
          (s) => s.PK_Subject_ID !== subject.PK_Subject_ID
        );
      } else {
        this.mySubjects.push(subject);
      }
    },

    async save() {
      await fetch("http://localhost:3000/api/user/subjects", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subjectIds: this.mySubjectIds,
        }),
      });
    },
  },
});
