import { makeApiCall } from "../apiRequest";

export default {
  state: {
    brokers: [],
  },
  getters: {
    getBrokers: (state) => state.brokers,
  },
  actions: {
    async getBrokers({ commit }, payload) {
      let url = `User/GetAllBrokers`;
      const response = await makeApiCall(url, "POST", payload);

      if (!response.error) {
        commit("setBrokers", response);
      }
      return response;
    },
    async sendAddRequest({ commit }, payload) {
      let url = `User/SendJoinRequest?brokerUserId=${payload.brokerUserId}&OrganizationId=${payload.OrganizationId}`;
      const response = await makeApiCall(url, "POST",);
      return response;
    },
    async acceptJoinRequest({ commit }, payload) {
      let url = `User/AcceptJoinRequest?requestId=${payload.requestId}&IsRequestAccept=${payload.IsRequestAccept}`;
      const response = await makeApiCall(url, "POST",);
      return response;
    },
    async getJoinRequest({ commit }, payload) {
      let url = `User/GetJoinRequest?OrganizationId=${payload}`;
      const response = await makeApiCall(url, "GET",);
      return response;
    },
  },
  mutations: {
    setBrokers: (state, payload) => (state.brokers = payload),
  },
};
