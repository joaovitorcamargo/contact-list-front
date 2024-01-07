import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home/index.vue";
import Create from "../views/Create/index.vue";
import View from "../views/View/index.vue";
import Edit from "../views/Edit/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/create",
      name: "create",
      component: Create,
    },
    {
      path: "/people/:id",
      props: true,
      name: "view",
      component: View,
    },
    {
      path: "/edit/people/:id",
      props: true,
      name: "edit",
      component: Edit,
    },
  ],
});

export default router;
