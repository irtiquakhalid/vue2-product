import { makeApiCall, makeApiCallWithImages } from "../apiRequest";

export default {
  state: {
    groupMemberById: [],
  },
  getters: {
    getGroupMemberById: (state) => state.groupMemberById,
  },
  actions: {
    async createChatGroup({ commit }, payload) {
      let url = "GroupChat/Save";
      const response = await makeApiCallWithImages(url, "POST", payload);
      return response;
    },
    async createChatMemberGroup({ commit }, payload) {
      let url = "GroupChat/AddMemberInGroup";
      const response = await makeApiCall(url, "POST", payload);
      return response;
    },
    async pushNotificationFirebase({ commit }, payload) {
      let url = "firebase/sendNotification";
      const response = await makeApiCall(url, "POST", payload);
      return response;
    },
    async setUserChatStatus({ commit }, payload) {
      let url = `User/SetUserChatStatus?userId=${payload.userId}&OrganizationId=${payload.OrganizationId}&ChatStatus=${payload.ChatStatus}`;
      const response = await makeApiCall(url, "POST", payload);
      return response;
    },
    async deleteGroupMessages({ commit }, id) {
      const url = `GroupChat/DeleteGroups?GroupId=${id}`;
      const response = await makeApiCall(url, "DELETE");
      return response;
    },
    async removeGroupMember({ commit }, payload) {
      const url = `GroupChat/DeleteMemberFromGroups?UserId=${payload.UserId}&GroupId=${payload.GroupId}`;
      const response = await makeApiCall(url, "DELETE");
      return response;
    },
    async getGroupMemberById({ commit }, id) {
      let url = `GroupChat/GetGroupMembers?GroupId=${id}`;
      const response = await makeApiCall(url, "GET", id);
      if (!response.error) {
        commit("setGroupMemberById", response.data.data);
      }
      return response;
    },
    async createURLforFile({ commit }, payload) {
      let url = "GroupChat/ImageUploadInChat";
      const response = await makeApiCall(url, "POST", payload);
      return response;
    },
  },
  mutations: {
    setGroupMemberById(state, data) {
      state.groupMemberById = data;
    },
  },
};
