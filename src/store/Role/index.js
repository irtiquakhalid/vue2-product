import { makeApiCall } from "../apiRequest";

export default {
  state: {
    subRoles: [],
    roles: [],
  },
  getters: {
    getSubRoles: (state) => state.subRoles,
    getRoles: (state) => state.roles,
  },
  actions: {
    async getSubRoles({ commit }) {
      let url = "Role/GetSubRoles";
      const response = await makeApiCall(url, "GET");
      if (!response.error) {
        commit("setSubRoles", response.data.data);
      }
    },
    async getRoles({ commit }) {
      const url = "Role/GetRoles";
      const response = await makeApiCall(url, "GET");
      if (!response.error) {
        commit("setRoles", response.data.data.roleData);
      }
    },
  },
  mutations: {
    setSubRoles: (state, payload) => (state.subRoles = payload),
    setRoles: (state, payload) => (state.roles = payload),
  },
};
