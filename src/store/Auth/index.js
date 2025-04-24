import { makeApiCall } from "../apiRequest";

export default {
  actions: {
    async signUpPassKey({ commit }, payload) {
      const response = await makeApiCall(
        `User/LoginWithPassKey?PassKey=${payload}`,
        "POST"
      );
      return response;
    },
  },
};
