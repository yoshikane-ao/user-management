import { defineStore } from "pinia";
import { useTodoStore } from "./todoStore";

export const useUiStore = defineStore("ui", {
  state: () => ({
    filter: "all" as Filter,
  }),

  getters: {
    filteredUis(state) {
        const store = useTodoStore();
      if (state.filter === "active") return store.todos.filter((t) => !t.done);
      if (state.filter === "done") return store.todos.filter((t) => t.done);
      return store.todos;
    },
  },

  actions: {
    setFilter(filter: "all" | "active" | "done") {
      this.filter = filter;
    },
  },
});