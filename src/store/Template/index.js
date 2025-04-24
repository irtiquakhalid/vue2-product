import { makeApiCall } from "../apiRequest";

export default {
  state: {
    templates: [],
  },
  getters: {
    getTemplates: (state) => state.templates,
  },
  actions: {
    async createTemplate({ commit }, payload) {
      let url = "template/SaveTemplate";
      const response = await makeApiCall(url, "POST", payload);
      return response;
    },
    async getTemplates({ commit }, payload) {
      let url = "template/GetTemplate";
      const response = await makeApiCall(url, "POST", payload);
      if (!response.error) {
        commit("setTemplates", response.data);
      }
      return response;
    },
    async deleteTemplate({ commit }, id) {
      let url = `template/DeleteTemplate?templateId=${id}`;
      const response = await makeApiCall(url, "DELETE");
      return response;
    },
    async dragdroptemplate({ commit }, payload) {
      let url = `template/DragAndDrop`;
      const response = await makeApiCall(url, "POST", payload);
      return response;
    },
    async duplicatetemplate({ commit }, id) {
      let url = `template/CreateDuplicateTemplateAndTasks?templateId=${id}`;
      const response = await makeApiCall(url, "POST");
      return response;
    },
  },
  mutations: {
    setTemplates: (state, payload) => (state.templates = payload),
  },
};
