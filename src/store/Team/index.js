import { makeApiCall, makeApiCallWithImages } from "../apiRequest";

export default {
  state: {
    teamsListByBroker: [],
    teamMembers: [],
  },
  getters: {
    getTeamsListByBroker: (state) => state.teamsListByBroker,
    getTeamMembers: (state) => state.teamMembers,
  },
  actions: {
    async createTeam({ commit }, payload) {
      let url = "Teams/CreateTeam";
      const response = await makeApiCallWithImages(url, "POST", payload);
      return response;
    },
    // async createChatGroup({ commit }, payload) {
    //   let url = "GroupChat/Save";
    //   const response = await makeApiCallWithImages(url, "POST", payload);
    //   return response;
    // },
    // async deleteGroupMessages({ commit }, id) {
    //   const url = `GroupChat/DeleteGroups?GroupId=${id}`;
    //   const response = await makeApiCall(url, "DELETE");
    //   return response;
    // },
    async getTeamsListByBroker({ commit }, payload) {
      let url = "Teams/GetTeams";
      const response = await makeApiCall(url, "POST", payload);
      commit("setTeamsListByBroker", response);
      if (!response.error) {
      }
      return response;
    },
    async getTeamMembers({ commit }, payload) {
      let url = "Teams/GetTeamMember";
      const response = await makeApiCall(url, "POST", payload);
      if (!response.error) {
        commit("setTeamMembers", response.data);
      }
    },
    async deleteTeam({ commit }, id) {
      const url = `Teams/delete?teamId=${id}`;
      const response = await makeApiCall(url, "DELETE");
      return response;
    },
    async deleteAccount({ commit }, payload) {
      const url = `User/DeleteUser?userId=${payload.userId}&OrganizationId=${payload.OrganizationId}`;
      const response = await makeApiCall(url, "DELETE");
      return response;
    },
    async deleteMember({ commit }, payload) {
      let url = `Teams/DeleteTeamMember?teamId=${payload.teamId}&UserId=${payload.userId}`;
      const response = await makeApiCall(url, "DELETE");
      return response;
    },
    async saveTeamMember({ commit }, payload) {
      const url = `Member/SaveTeamMember`;
      const response = await makeApiCallWithImages(url, "POST", payload);
      return response;
    },
    async saveMember({ commit }, payload) {
      const url = `Member/SaveMember`;
      const response = await makeApiCallWithImages(url, "POST", payload);
      return response;
    },
    async makeTLOrAdmin({ commit }, payload) {
      const url = "Member/AssignAdditionalRole";
      const response = await makeApiCall(url, "POST", payload);
      return response;
    },
  },
  mutations: {
    setTeamsListByBroker: (state, payload) =>
      (state.teamsListByBroker = payload),
    setTeamMembers: (state, payload) => (state.teamMembers = payload),
  },
};
