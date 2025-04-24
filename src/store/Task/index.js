import { makeApiCall, makeApiCallWithImages } from "../apiRequest";

export default {
  state: {
    tasksByTemplate: [],
    tasks: null
  },
  getters: {
    getTasksByTemplate: (state) => state.tasksByTemplate,
    getTasks: (state) => state.tasks
  },
  actions: {
    async createTask({ commit }, payload) {
      let url = "task/SaveTask";
      const response = await makeApiCallWithImages(url, "POST", payload);
      return response;
    },
    async getTasksByTemplate({ commit }, payload) {
      let url = `task/GetTaskByTemplateId`;
      const response = await makeApiCall(url, "POST", payload);
      if (!response.error) {
        commit("setTasksByTemplate", response);
        return response;
      }
      return response;
    },
    async deleteTask({ commit }, id) {
      let url = `task/DeleteTask?taskId=${id}`;
      const response = await makeApiCall(url, "DELETE");
      return response;
    },
    async getTasks({commit}, payload){
      let url = `task/GetTask`;
      const response = await makeApiCall(url,'POST',payload);
      if(!response.error){
        commit('setTasks', response?.data?.data[0])
      }
      return response;
    },
    async dragdroptasks({commit}, payload){
      let url = `task/DragAndDrop`
      const response = await makeApiCall(url,'POST',payload);
      return response;
    },
    async saveCustomTask({commit}, payload){
      let url = `task/SaveCustomTask`
      const response = await makeApiCallWithImages(url,'POST',payload);
      return response;
    }
  },
  mutations: {
    setTasksByTemplate: (state, payload) => (state.tasksByTemplate = payload),
    setTasks: (state,payload) => state.tasks = payload
  },
};
