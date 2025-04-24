import { makeApiCall } from "../apiRequest";

export default {
    state: {
     notifications:[]
    },
    getters:{
     getNotifications: (state) => state.notifications
    },
    actions:{
     async getNotifications({commit}, payload){
      let url = `Notification/GetNotifications`;
      const response = await makeApiCall(url,'POST',payload);
      if(!response.error){
        commit('setNotifications', response)
      }
      return response;
     },
     async deleteNotification({commit},id){
      let url = `Notification/DeleteNotification?notificationId=${id}`
      const response = await makeApiCall(url,'DELETE');
      return response;
     },
     async deleteAllNotification({commit},id){
      let url = `Notification/DeleteAllNotification?UserId=${id}`
      const response = await makeApiCall(url,'DELETE');
      return response;
     },
    },
    mutations:{
        setNotifications: (state,payload) => state.notifications = payload
    }
}