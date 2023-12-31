import LoginView from "../../src/components/LoginView.vue";
import RegisterView from "../../src/components/RegisterView.vue";

const routes = [
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
];

export default routes;
