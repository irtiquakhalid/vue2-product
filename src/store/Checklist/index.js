import { makeApiCall, makeApiCallWithImages } from "../apiRequest";

export default {
  state: {
    checklistDropdowns: [],
    membersDropdownForContract: [],
    checklistByBroker: [],
    contractByUser: [],
    contractById: [],
    publicLinkData: [],
  },
  getters: {
    getChecklistDropdowns: (state) => state.checklistDropdowns,
    getMembersDropdownForContract: (state) => state.membersDropdownForContract,
    getChecklistByBroker: (state) => state.checklistByBroker,
    getContractByUser: (state) => state.contractByUser,
    getContractById: (state) => state.contractById,
    sharePublicLinkData: (state) => state.publicLinkData,
  },
  actions: {
    async createChecklist({ commit }, payload) {
      const url = "ContractSchedules/SaveContractSchedule";
      const response = await makeApiCall(url, "POST", payload);
      return response;
    },
    async getChecklistDropdowns({ commit }, id) {
      let url = `ContractSchedules/AllDropDownForContractSchedule?organizationId=${id}`;
      const response = await makeApiCall(url, "POST");
      if (!response.error) {
        commit("setChecklistDropdowns", response.data.data);
      }
    },
    async getMembersDropdownForContract({ commit }, id) {
      let url = `ContractSchedules/MembersDropDownForContractSchedule?brokerId=${id}`;
      const response = await makeApiCall(url, "GET");
      if (!response.error) {
        commit("setMembersDropdownForContract", response.data.data.members);
      }
    },
    async saveMemberForContractSchedule({ commit }, payload) {
      let url = `Member/SaveMemberforContractSchedule`;
      const response = await makeApiCallWithImages(url, "POST", payload);
      return response;
    },
    async memberGeneratePassKey({ commit }, payload) {
      const url = "Member/GeneratePassKey";
      const response = await makeApiCall(url, "POST", payload);
      return response;
    },
    async getChecklistByBroker({ commit }, payload) {
      let url = `ContractSchedules/GetContractSchedule`;
      const response = await makeApiCall(url, "POST", payload);
      if (!response.error) {
        commit("setChecklistByBroker", response.data.data);
      }
      return response;
    },
    async getContractByUser({ commit }, payload) {
      let url = `ContractSchedules/GetContractScheduleByUser`;
      const response = await makeApiCall(url, "POST", payload);
      if (!response.error) {
        commit("setContractByUser", response.data.data);
      }
      return response;
    },
    async getContractById({ commit }, payload) {
      let url = `ContractSchedules/GetContractScheduleById`;
      const response = await makeApiCall(url, "POST", payload);
      if (!response.error) {
        commit("setContractById", response.data.data.baseContractScheduleQuery);
      }
      return response;
    },
    async taskDragAndDrop({ commit }, payload) {
      const url = "ContractSchedules/ContractScheduleTaskDragDrop";
      const response = await makeApiCall(url, "POST", payload);
      return response;
    },
    async markTaskAsCompleted({ commit }, payload) {
      let url = `ContractSchedules/ContractScheduleTaskStatusUpdate`;
      const response = await makeApiCall(url, "POST", payload);
      return response;
    },
    async deleteContractScheduled({ commit }, id) {
      let url = `ContractSchedules/DeleteContract?contractScheduleId=${id}`;
      const response = await makeApiCall(url, "DELETE");
      return response;
    },
    async saveAsTemplate({ commit }, payload) {
      let url = "ContractSchedules/SaveAsTemplate";
      const response = await makeApiCall(url, "POST", payload);
      return response;
    },
    async saveChecklistStatus({ commit }, payload) {
      const url = `ContractSchedules/ChecklistStatus?ContractId=${payload.ContractId}&CheckListStatus=${payload.CheckListStatus}`;
      const response = await makeApiCall(url, "POST");
      return response;
    },
    async sendEmail({ commit }, payload) {
      const url = "ContractSchedules/ShareCheckListEmail";
      const response = await makeApiCall(url, "POST", payload);
      return response;
    },
    async sharePublicLinkData({ commit }, payload) {
      const url = `ContractSchedules/PublicLinkShare?token=${payload.token}`;
      const response = await makeApiCall(url, "POST");
      if (!response.error) {
        commit("setSharePublicLinkData", response.data.data);
        return response;
      }
      return response;
    },
  },
  mutations: {
    setChecklistDropdowns: (state, payload) =>
      (state.checklistDropdowns = payload),
    setMembersDropdownForContract: (state, payload) =>
      (state.membersDropdownForContract = payload),
    setChecklistByBroker: (state, payload) =>
      (state.checklistByBroker = payload),
    setContractByUser: (state, payload) => (state.contractByUser = payload),
    setContractById: (state, payload) => (state.contractById = payload),
    setSharePublicLinkData: (state, payload) =>
      (state.publicLinkData = payload),
  },
};
