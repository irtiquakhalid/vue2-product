import { makeApiCall, makeApiCallWithImages } from "../apiRequest";

export default {
  state: {
    userId: localStorage.getItem("userId") || null,
    organizationId: localStorage.getItem("organizationId") || null,
    userData: null,
    rolePermissions: localStorage.getItem("permissions") || null,
    subscriptionPlan: [],
    usersForChat: [],
    usersForGroupChat: [],
    userSubcription: [],
    userDeleteFromOrganization: [],
  },
  getters: {
    getUserId: (state) => state.userId,
    getUserData: (state) => state.userData,
    getOrganizationId: (state) => state.organizationId,
    getRolePermissions: (state) => state.rolePermissions,
    getSubscriptionPlan: (state) => state.subscriptionPlan,
    getUsersForChat: (state) => state.usersForChat,
    getUsersForGroupChat: (state) => state.usersForGroupChat,
    getUserSubcription: (state) => state.userSubcription,
    getUserDeleteFromOrganization: (state) => state.userDeleteFromOrganization,
  },
  actions: {
    async getSubscriptionPlan({ commit }, id) {
      let url = `User/GetUserSubcriptionDetail?UserId=${id}`;
      const response = await makeApiCall(url, "POST");
      if (!response.error) {
        commit("setSubscriptionPlan", response);
      }
      return response;
    },
    async getUserData({ commit }, payload) {
      let url = "User/GetUsers";
      const response = await makeApiCall(url, "POST", payload);
      if (!response.error) {
        commit("setUserData", response.data.data);
      }
      return response;
    },
    async createUser({ commit }, payload) {
      let url = "User/CreateUser";
      const response = await makeApiCallWithImages(url, "POST", payload);
      if (!response.error) {
      }
      return response;
    },
    getUserId({ commit }, id) {
      commit("setUserId", id);
    },
    getOrganizationId({ commit }, id) {
      commit("setOrganizationId", id);
    },
    getRolePermissions({ commit }, payload) {
      commit("setRolePermissions", payload);
    },
    async socialLogin({ commit }, payload) {
      let url = "User/SocialLogin";
      const response = await makeApiCall(url, "POST", payload);
      return response;
    },
    async subscriptionPlan({ commit }, payload) {
      let url = "User/Subcription";
      const response = await makeApiCall(url, "POST", payload);
      return response;
    },
    async getUserSubcription({ commit }, payload) {
      let url = `User/GetUserSubcription?UserId=${payload}`;
      const response = await makeApiCall(url, "POST");
      if (!response.error) {
        commit("setUserSubcription", response.data.data);
      }
      return response;
    },
    async subscriptionExpire({ commit }, payload) {
      let url = `User/SubscriptionExpire?UserId=${payload}`;
      const response = await makeApiCall(url, "POST");
      return response;
    },
    async subscriptionFreeMonth({ commit }, payload) {
      let url = `User/SetSubscriptionFreeMonth?isFreeMonthAvail=${payload}`;
      const response = await makeApiCall(url, "POST");
      return response;
    },
    async uploadImage({ commit }, payload) {
      let url = "User/ImageUpload";
      const response = await makeApiCallWithImages(url, "POST", payload);
      return response;
    },
    async userColor({ commit }, payload) {
      let url = "User/UserColor";
      const response = await makeApiCall(url, "POST", payload);
      return response;
    },
    async hereAboutUs({ commit }, payload) {
      let url = "User/UserHearFrom";
      const response = await makeApiCall(url, "POST", payload);
      return response;
    },
    async updateUser({ commit }, payload) {
      let url = "User/UpdateUser";
      const response = await makeApiCallWithImages(url, "POST", payload);
      return response;
    },
    async skipSubscription({ commit }, payload) {
      let url = "User/SkipSubcription";
      const response = await makeApiCall(url, "POST", payload);
      return response;
    },
    async deleteUser({ commit }, payload) {
      let url = `User/DeleteAccount?userId=${payload.userId}`;
      const response = makeApiCall(url, "DELETE");
      return response;
    },
    
    async deleteUserFromOrganization({ commit }, payload) {
      let url = `User/DeleteUserFromOrganization?userId=${payload.userId}&OrganizationId=${payload.organizationId}`;
      const response = makeApiCall(url, "DELETE");
      return response;
    },
    async getUsersForChat({ commit }, payload) {
      let url = `User/GetUsersForChat`;
      const response = await makeApiCall(url, "POST", payload);
      if (!response.error) {
        commit("setUsersForChat", response.data.data);
      }
    },
    async getUsersForGroupChat({ commit }, payload) {
      let url = `GroupChat/GetGroups`;
      const response = await makeApiCall(url, "POST", payload);
      if (!response.error) {
        commit("setUsersForGroupChat", response.data.data);
      }
    },
    async setUserChatStatus({ commit }, payload) {
      const url = `User/SetUserChatStatus?userId=${payload.userId}&OrganizationId=${payload.OrganizationId}&ChatStatus=${payload.ChatStatus}`;
      const response = await makeApiCall(url, "POST");
      return response;
    },
  },
  mutations: {

    setUserId: (state, payload) => {
      state.userId = payload;
      localStorage.setItem("userId", payload);
    },
    setUserData: (state, payload) => (state.userData = payload),
    setOrganizationId: (state, payload) => {
      state.organizationId = payload;
      localStorage.setItem("organizationId", payload);
    },
    setRolePermissions: (state, payload) => {
      state.rolePermissions = payload;
      localStorage.setItem("permissions", payload);
    },
    setSubscriptionPlan: (state, payload) => (state.subscriptionPlan = payload),
    setUsersForChat: (state, payload) => (state.usersForChat = payload),
    setUsersForGroupChat: (state, payload) =>
      (state.usersForGroupChat = payload),
    setUserSubcription: (state, payload) => (state.userSubcription = payload),
    setUserDeleteFromOrganization: (state, payload) =>
      (state.userDeleteFromOrganization = payload),
  },
};
