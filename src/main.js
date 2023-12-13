import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { library } from "@fortawesome/fontawesome-svg-core";
import Heroicons from "@heroicons/vue";

import App from "./App.vue";
import router from "./router";
import "ldrs/ring";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
