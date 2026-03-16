<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const loggedIn = ref(localStorage.getItem("loggedIn") === "true");

function login() {
  localStorage.setItem("loggedIn", "true");
  loggedIn.value = true;
}

function logout() {
  localStorage.setItem("loggedIn", "false");
  loggedIn.value = false;
}

function goTodo() {
  router.push("/todo");
}

const users = [
    { id: 1, name: "太郎"},
    { id: 2, name: "次郎"},
];
</script>

<template>
  <div>
    <h1>Home</h1>

    <p>ログイン状態: {{ loggedIn ? "ON" : "OFF" }}</p>

    <button v-if="!loggedIn" @click="login">ログイン</button>
    <button v-else @click="logout">ログアウト</button>

    <button @click="goTodo">Todoへ移動（ガード確認）</button>
  </div>

  <h2>ユーザー一覧（仮）</h2>
  <!-- <ul>
    <li v-for="u in users" v-bind:key="u.id">
        <router-link v-bind:to="`/users/${u.id}`">
            {{ u.name }}
        </router-link>
    </li>
  </ul> -->
  <router-link
    v-for="id in 200"
    :key="id"
    :to="`/users/${id}`"
    >
    ユーザー {{ id }}
    </router-link>
</template>