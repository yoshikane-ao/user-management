import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { persistPlugin } from "./stores/persist";

createApp(App).use(createPinia()).mount("#app");

const pinia = createPinia();
pinia.use(persistPlugin);