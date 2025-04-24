import Vue from "vue";
import Vuex from "vuex";
import User from "./User";
import Team from "./Team";
import Template from "./Template";
import Role from "./Role";
import Task from "./Task";
import Checklist from "./Checklist";
import Notification from "./Notification";
import Auth from "./Auth";
import Chat from "./Chat";
import request from "./Requests";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    User,
    Team,
    Template,
    Role,
    Task,
    Checklist,
    Notification,
    Auth,
    Chat,
    request,
  },
});
