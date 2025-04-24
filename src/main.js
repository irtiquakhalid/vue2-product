import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./assets/style/main.scss";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import loadercomponent from "./components/Loader/loader.component.vue";
import { Translator } from "vue-google-translate";
import Vuelidate from "vuelidate";
import Carousel3d from 'vue-carousel-3d';

Vue.use(Carousel3d);

Vue.component("loadercomponent", loadercomponent);
Vue.component("Translator",Translator)
Vue.config.productionTip = false;

Vue.use(VueSweetalert2);
Vue.use(Vuelidate);
new Vue({
  router,
  store,
  vuetify,
  render: function (h) {
    return h(App);
  },
}).$mount("#app");
