<script setup lang="ts">
import { computed, ref } from "vue";
type Task = { id: number; title: string; done: boolean };

const tasks = ref<Task[]>([]);
const newTitle = ref("");
let nextId = 1;

function addTask() {
  // 入力がなければ処理終了
  if (!newTitle.value.trim()) return;
  //タスクpushして、前回のidに+1して、
  tasks.value.push({ id: nextId++, title: newTitle.value.trim(), done: false });
  //newタイトルバリューを初期化する
  newTitle.value = "";
}

// const doneCount = computed(() => tasks.value.length);
const doneCount = computed(() =>
// console.log(tasks.value.done);
tasks.value.filter(t => t.done).length

);
</script>

<template>
  <input v-model="newTitle" placeholder="task title" />
  <button @click="addTask">追加</button>

  <ul>
    <li v-for="t in tasks" :key="t.id">
      <label>
        <div class="donecheck">
        <input type="checkbox" v-model="t.done" />
        {{ t.title }}
        </div>
      </label>
    </li>
  </ul>
  <p>{{ doneCount }}</p>
</template>