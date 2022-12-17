import { createWebHistory, createRouter } from "vue-router";
import { isUsersLogged } from "./services/UserAuthenticationService";
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("./views/Home.vue")
  },
  {
    path: "/user/:id",
    name: "userhome",
    component: () => import("./views/UserHomeScreen.vue"),
    props: true
  },
  {
    path: "/album/:id",
    name: "album",
    component: () => import("./views/TrackList.vue"),
    props: true
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./views/LoginScreen.vue"),
    props: true
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("./views/SignupScreen.vue"),
    props: true
  },
  {
    path: "/create",
    name: "create",
    component: () => import("./views/CreateView.vue")
  },
  {
    path: "/createAlbum",
    name: "createAlbum",
    component: () => import("./views/CreateAlbum.vue")
  },
  {
    path: "/createTrack",
    name: "createTrack",
    component: () => import("./views/CreateTrack.vue")
  },
  {
    path: "/createArtist",
    name: "createArtist",
    component: () => import("./views/CreateArtist.vue")
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("./views/Profile.vue")
  },
  {
    path: "/favourite",
    name: "favourite",
    component: () => import("./views/Favourite.vue")
  },
  {
    path: "/forgotPassword",
    name: "forgotPassword",
    component: () => import("./views/ForgotPassword.vue")
  },
  {
    path: "/purchaseAlbums",
    name: "purchaseAlbums",
    component: () => import("./views/PurchaseAlbum.vue")
  }
];
const router = createRouter({
  base: process.env.NODE_ENV === 'development' ? '/' : '/tutorial-frontend-1/',
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from) => {
  console.log(to.name);
  if (isUsersLogged() && (to.name == "home" || to.name == "login" || to.name == "signup")) {
    console.log("redirecting")
    const userId = localStorage.userId
    return "/user/" + userId; 
  }
  return true
})

export default router;