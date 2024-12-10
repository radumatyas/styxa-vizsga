import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import CityList from "../components/CityList.vue";
import CityDetails from "../components/CityDetails.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/cities", name: "CityList", component: CityList },
  {
    path: "/cities/:id",
    name: "CityDetails",
    component: CityDetails,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
