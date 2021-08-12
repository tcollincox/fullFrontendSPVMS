import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App.vue'
import Login from "./components/Login.vue"
import Home from "./views/Home.vue"
import Volunteers from './views/Volunteers.vue'
import Opportunities from './views/Opportunities.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueAxios, axios);

const store = new Vuex.Store(
  {
    state: {
      authenticated: false
    },
    mutations:{
      setAuthentication(state, status){
        state.authenticated = status;
      }
    }
  }
);

const router = new VueRouter(
  {
    routes: [
      {
        path:"/",
        redirect:{
          name:"login"
        }
      },
      {
        path:"/login",
        name:"login",
        component: Login
      },
      {
        path: "/home",
        name: "home",
        component: Home,
        beforeEnter:(to,from,next) => {
          if(store.state.authenticated == false){
            next("/login");
          }
          else{
            next();
          }
        }
      },
      {
        path: '/opportunities',
        name: 'Opportunities',
        component: Opportunities
      },
      {
        path: '/volunteers',
        name: 'Volunteers',
        component: Volunteers
      }
    ]
  }
)

new Vue({
  render: h => h(App),
  router: router,
  store : store
}).$mount('#app')
