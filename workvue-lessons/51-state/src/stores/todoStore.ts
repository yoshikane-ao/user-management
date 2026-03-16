import { defineStore } from "pinia";

export type Todo = {
  id: number;
  title: string;
  done: boolean;
};

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [] as Todo[],
  }),

  getters: {
    remainingCount(state) {
      return state.todos.filter((t) => !t.done).length;
    },

    doneCount(state) {
      return state.todos.filter((t) => t.done).length;
    },
  },

  actions: {
    add(title: string) {
      const t = title.trim();
      if (!t) return;
      if (t.length >= 20) {
      alert('タイトルが20文字を超えています。');
      } else {
        this.todos.push({ id: Date.now(), title: t, done: false });
      }

    },
    toggle(id: number) {
      const todo = this.todos.find((t) => t.id === id);
      if (todo) todo.done = !todo.done;
    },
    remove(id: number) {
      this.todos = this.todos.filter((t) => t.id !== id);
    },
  },
});