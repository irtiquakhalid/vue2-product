<template>
  <div
    style="
      background-color: rgb(231 226 226 / 49%);
      padding: 0.5rem 1.5rem 0.5rem 4rem;
      border-bottom: 1px solid var(--primary-color);
    "
  >
    <v-row>
      <v-col cols="12" md="5">
        <v-autocomplete
          hide-details
          flat
          solo
          background-color="var(--secondary-color)"
          class="radius-7 custom-select"
          :items="organizations"
          item-text="organizationName"
          item-value="organizationId"
          append-icon="mdi-chevron-down"
          v-model="currentOrg"
          v-if="!skipPayment && getOrganizationId"
        >
          <template v-slot:selection="data">
            <div
              v-bind="data.attrs"
              :input-value="data.selected"
              close
              @click="data.select"
            >
              <v-list-item-content>
                <v-list-item-title class="d-flex align-center">
                  <v-img
                    src="/images/header/box.svg"
                    class="mr-3"
                    max-width="25"
                  ></v-img>
                  <span style="color: #9e9e9e">{{
                    data.item.organizationName
                  }}</span>
                  <span
                    v-if="
                      matchOrganization[0]?.organizationId ==
                      data.item.organizationId
                    "
                    style="color: #9e9e9e"
                    >&nbsp;(Own)</span
                  ></v-list-item-title
                >
              </v-list-item-content>
            </div>
          </template>
          <template v-slot:item="data">
            <template>
              <v-list-item-content>
                <v-list-item-title class="d-flex align-center">
                  <v-img
                    src="/images/header/box.svg"
                    max-width="25"
                    class="mr-3"
                  ></v-img>
                  <span style="color: #9e9e9e">{{
                    data.item.organizationName
                  }}</span>
                  <span
                    style="color: #9e9e9e"
                    v-if="
                      matchOrganization[0]?.organizationId ==
                      data.item.organizationId
                    "
                    >&nbsp;(Own)</span
                  ></v-list-item-title
                >
              </v-list-item-content>
            </template>
          </template>
        </v-autocomplete>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" md="6" class="d-flex align-center justify-end">
        <span class="mr-5">
          <div @click="dialog = true" class="d-flex align-center">
            <v-icon
              :style="{
                color: color ? color : '#1ba8bb',
              }"
              class="mr-1"
              >mdi-web</v-icon
            >
            <span class="cursor-pointer"> Language </span>
          </div>
          <v-dialog v-model="dialog" max-width="350" persistent>
            <v-card>
              <v-card-title
                class="text-h5 pr-1 pl-4 d-flex align-center justify-space-between"
              >
                Select Language
                <v-icon
                  @click="dialog = false"
                  color="var(--primary-color)"
                  style="font-size: 30px"
                  >mdi-close-circle</v-icon
                >
              </v-card-title>
              <div class="d-flex align-center pl-4">
                <Translator :countries="arrayOfCountries" />
              </div>
            </v-card>
          </v-dialog>
        </span>
        <v-icon
          class="mr-5"
          :style="{
            color: '#1ba8bb',
          }"
          v-if="
            !skipPayment && getOrganizationId && getRolePermissions == 'own'
          "
          @click="settingDialog = true"
          >mdi-brush-variant</v-icon
        >
        <v-badge
          class="mr-5"
          bordered
          color="var(--primary-color)"
          overlap
          :content="notificationCount()"
        >
          <router-link to="/notification">
            <v-icon
              :style="{
                color: color ? color : '#1ba8bb',
              }"
              class="cursor-pointer"
              >mdi-bell-outline</v-icon
            >
          </router-link>
        </v-badge>
        <div class="mr-5">
          <v-badge
            class="mr-5"
            bordered
            color="var(--primary-color)"
            overlap
            :content="brokerBadgeContent"
          >
            <v-icon
              :style="{
                color: color ? color : '#1ba8bb',
                fontSize: '30px',
              }"
              class="cursor-pointer"
              @click.stop="drawer = !drawer"
            >
              mdi-account-multiple-outline
            </v-icon>
          </v-badge>
        </div>
        
        <v-menu offset-y v-if="form.email">
          <template v-slot:activator="{ on, attrs }">
            <div class="d-flex align-center" v-bind="attrs" v-on="on">
              <div
                style="width: 35px; height: 35px"
                :style="{
                  borderColor: color ? color : '#1ba8bb',
                }"
                class="border d-flex align-center"
                v-bind="attrs"
                v-on="on"
              >
                <v-avatar size="100%" v-if="form?.userProfile">
                  <v-img :src="`${imageURL}${form?.userProfile}`"></v-img>
                </v-avatar>
                <v-avatar min-width="22" max-width="22" v-else>
                  <v-img
                    src="/images/singleuser.png"
                    width="22"
                    class="ml-2"
                    contain
                  ></v-img>
                </v-avatar>
              </div>
              <span class="ml-2" v-bind="attrs" v-on="on">{{
                form.name && form.name.length > 10
                  ? `${form.name.slice(0, 10)}...`
                  : form.name || "\u00A0"
              }}</span>
              <v-icon
                :style="{
                  color: color ? color : '#1ba8bb',
                }"
                v-bind="attrs"
                v-on="on"
                style="font-size: 27px"
                >mdi-chevron-down</v-icon
              >
            </div>
          </template>
          <v-list>
            <router-link to="/profile" class="text-decoration-none">
              <v-list-item>
                <v-icon
                  :style="{
                    color: color ? color : '#1ba8bb',
                  }"
                  >mdi-account-wrench</v-icon
                >
                <v-list-item-title
                  style="color: #404040 !important"
                  class="pl-2"
                  >Profile Settings</v-list-item-title
                >
              </v-list-item>
            </router-link>
            <v-list-item class="cursor-pointer" @click="logout">
              <v-icon
                :style="{
                  color: color ? color : '#1ba8bb',
                }"
                >mdi-logout</v-icon
              >
              <v-list-item-title style="color: #404040 !important" class="pl-2"
                >Logout Account</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <!-- Drawer component -->
    <v-navigation-drawer
      v-model="drawer"
      style="z-index: 201 !important"
      right
      width="400"
      absolute
    >
      <v-list-item>
        <div class="d-flex justify-space-between py-5 w-100 align-center">
          <v-list-item-title class="text-h6">
            Pending requests
          </v-list-item-title>
          <div class="d-flex justify-space-between">
            <v-btn
              to="/sendrequests"
              outlined
              depressed
              color="var(--primary-color)"
              rounded
              class="mr-5"
            >
              <span class="text-transform">Add Broker</span>
            </v-btn>
            <v-icon @click.stop="drawer = !drawer"> mdi-close </v-icon>
          </div>
        </div>
      </v-list-item>

      <v-divider></v-divider>

      <div class="pa-4">
        <v-card
          style="border: 2px solid var(--primary-color); border-radius: 21px"
          class="my-3 pa-4 d-flex align-center justify-space-between"
          v-for="request in resquestList"
          :key="request.id"
        >
          <div class="d-flex align-center">
            <v-avatar small v-if="!request.image">
              <v-img src="../../../public/images/person.png"></v-img>
            </v-avatar>
            <v-avatar small v-else>
              <v-img :src="`${imageURL}${request.image}`"></v-img>
            </v-avatar>
            <span class="font-18 ml-4">{{ request.name }}</span>
          </div>

          <div>
            <v-icon size="27" color="green" @click="sendRequest(request, true)">
              mdi-check-circle
            </v-icon>

            <v-icon
              size="27"
              color="red"
              class="ml-4"
              @click="sendRequest(request, false)"
            >
              mdi-close-circle
            </v-icon>
          </div>
        </v-card>
      </div>
    </v-navigation-drawer>

    <v-dialog v-model="settingDialog" persistent max-width="450">
      <v-card class="pa-6 radius-21">
        <settingcomponent
          @close="close"
          @fetchdata="fetchList"
          :color="color"
        />
      </v-card>
    </v-dialog>
    <v-dialog v-model="changeOrganizationDialog" persistent max-width="550">
      <v-card class="pa-6 radius-21">
        <div>
          <div class="d-flex justify-end mb-4">
            <v-icon
              @click="closeSwitchDiaog()"
              color="var(--primary-color)"
              style="font-size: 33px"
              >mdi-close-circle</v-icon
            >
          </div>
          <h4 class="text-center font-weight-500 px-4 my-8">
            Are you sure you want to switch organization?
          </h4>
          <div class="px-8 mb-6">
            <v-btn
              depressed
              color="var(--primary-color)"
              class="py-6 radius-25 mt-5 w-100"
              @click="switchOrganization"
            >
              <span class="text-transform font-18 white--text"
                >Switch Organization</span
              >
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import settingcomponent from "../Profile/settings.component.vue";

export default {
  components: { settingcomponent },
  data() {
    return {
      imageURL: process.env.VUE_APP_IMG_API,
      organizations: null,
      dialog: false,
      currentOrg: "",
      skipPayment: localStorage.getItem("skipPayment"),
      userData: null,
      ownOrganization: null,
      changeOrganizationDialog: false,
      selectedOrganization: null,
      requestedUsers: [],
      settingDialog: false,
      drawer: false, // Add drawer visibility state
      color: "",
      form: {
        id: null,
        userProfile: "",
        name: "",
      },
      arrayOfCountries: [
        {
          code: "en|en",
          title: "English",
        },
        {
          code: "en|af",
          title: "Afrikaans",
        },
        {
          code: "en|sq",
          title: "Albanian",
        },
        {
          code: "en|ar",
          title: "Arabic",
        },
        {
          code: "en|hy",
          title: "Armenian",
        },
        {
          code: "en|az",
          title: "Azerbaijani",
        },
        {
          code: "en|eu",
          title: "Basque",
        },
        {
          code: "en|be",
          title: "Belarusian",
        },
        {
          code: "en|bg",
          title: "Bulgarian",
        },
        {
          code: "en|ca",
          title: "Catalan",
        },
        {
          code: "en|zh-CN",
          title: "Chinese (Simplified)",
        },
        {
          code: "en|zh-TW",
          title: "Chinese (Traditional)",
        },
        {
          code: "en|hr",
          title: "Croatian",
        },
        {
          code: "en|cs",
          title: "Czech",
        },

        {
          code: "en|da",
          title: "Danish",
        },
        {
          code: "en|nl",
          title: "Dutch",
        },

        {
          code: "en|et",
          title: "Estonian",
        },
        {
          code: "en|tl",
          title: "Filipino",
        },
        {
          code: "en|fi",
          title: "Finnish",
        },
        {
          code: "en|fr",
          title: "French",
        },

        {
          code: "en|de",
          title: "German",
        },
        {
          code: "en|el",
          title: "Greek",
        },
        {
          code: "en|hu",
          title: "Hungarian",
        },
        {
          code: "en|id",
          title: "Indonesian",
        },
        {
          code: "en|ga",
          title: "Irish",
        },
        {
          code: "en|it",
          title: "Italian",
        },
        {
          code: "en|ja",
          title: "Japanese",
        },
        {
          code: "en|ko",
          title: "Korean",
        },
        {
          code: "en|lt",
          title: "Lithuanian",
        },
        {
          code: "en|ms",
          title: "Malay",
        },
        {
          code: "en|no",
          title: "Norwegian",
        },
        {
          code: "en|pl",
          title: "Polish",
        },
        {
          code: "en|pt",
          title: "Portuguese",
        },

        {
          code: "en|ru",
          title: "Russian",
        },
        {
          code: "en|es",
          title: "Spanish",
        },
        {
          code: "en|sv",
          title: "Swedish",
        },
        {
          code: "en|th",
          title: "Thai",
        },
        {
          code: "en|tr",
          title: "Turkish",
        },
        {
          code: "en|uk",
          title: "Ukrainian",
        },
      ],
      findCurrOrganization: [],
      matchOrganization: [],
      resquestList: [],
    };
  },
  watch: {
    currentOrg: {
      immediate: true,
      handler() {
        if (this.currentOrg !== this.selectedOrganization && this.currentOrg) {
          this.changeOrganizationDialog = true;
        }
      },
    },
    getOrganizationId: {
      immediate: true,
      handler(newValue, oldValue) {
        if (oldValue && oldValue !== newValue) {
          this.fetchdata();
        }
      },
    },
  },
  computed: {
    ...mapGetters([
      "getOrganizationId",
      "getUserId",
      "getUserData",
      "getRolePermissions",
      "getNotifications",
    ]),
    brokerBadgeContent() {
      return this.resquestList.length === 0
        ? "0"
        : this.resquestList.length > 99
        ? "99+"
        : this.resquestList.length;
    },
  },
  mounted() {
    this.fetchdata();
    this.getJoinRequestList();
  },
  methods: {
    getJoinRequestList() {
      var orgId = localStorage.getItem("organizationId");
      this.$store.dispatch("getJoinRequest", orgId).then((res) => {
        if (res) {
          this.resquestList = res.data.data;
        }
      });
    },
    notificationCount() {
      if (this?.getNotifications?.data?.totalCounts >= 0) {
        return this.getNotifications.data.totalCounts == 0
          ? "0"
          : this.getNotifications.data.totalCounts >= 100
          ? "99+"
          : this.getNotifications.data.totalCounts;
      } else {
        return this.form.notificationCount == 0
          ? "0"
          : this.form.notificationCount >= 100
          ? "99+"
          : this.form.notificationCount;
      }
    },
    limitedPermissionOnOrganizationBase() {
      let switchOrganizationId = this.currentOrg;
      let ownOrganization = this.form.ownOrganization;
      let organization = this.form.organizations.find((value) => {
        return value.organizationId == switchOrganizationId;
      });
      if (ownOrganization && ownOrganization == switchOrganizationId) {
        this.$store.dispatch("getRolePermissions", "own");
      } else {
        // Define role priorities
        const rolePriority = {
          9: 1, // Highest priority
          8: 2,
          2: 3, // Lowest priority
        };

        // Sort roles based on the defined priority
        const sortedRoles = organization.roles.sort((a, b) => {
          return (
            (rolePriority[a.roleId] || Infinity) -
            (rolePriority[b.roleId] || Infinity)
          );
        });

        // Find the highest-priority role
        const highestPriorityRole = sortedRoles[0];

        if (highestPriorityRole) {
          if (highestPriorityRole.roleId == "9") {
            this.$store.dispatch("getRolePermissions", "admin");
          } else if (highestPriorityRole.roleId == "8") {
            this.$store.dispatch("getRolePermissions", "teamlead");
          } else if (highestPriorityRole.roleId == "2") {
            this.$store.dispatch("getRolePermissions", "realtor");
          } else {
            this.$store.dispatch("getRolePermissions", "others");
          }
        }
      }
    },
    switchOrganization() {
      this.limitedPermissionOnOrganizationBase();
      this.$store.dispatch("getOrganizationId", this.currentOrg);
      localStorage.removeItem("skipPayment"); // it's a broker
      this.changeOrganizationDialog = false;
    },
    closeSwitchDiaog() {
      this.changeOrganizationDialog = false;
      this.fetchdata();
    },
    fetchdata() {
      this.loader = true;
      this.payload = {
        id: this.getUserId,
        isPagination: false,
      };
      this.$store.dispatch("getUserData", this.payload).then(() => {
        this.loader = false;
        this.form = this.getUserData?.userList[0];
        if (this.getUserData?.userList[0] && this.form.id == this.getUserId) {
          this.ownOrganization = this.getUserData?.userList[0].ownOrganization;
          this.$emit("ownOrganization", this.ownOrganization);
          if (this.ownOrganization) {
            this.organizations = this.getUserData?.userList[0].organizations;
            this.matchOrganization = this.organizations.filter((value) => {
              return value.organizationId == this.ownOrganization;
            });
          }
          if (this.getUserData?.userList[0].organizations) {
            this.findCurrOrganization =
              this.getUserData?.userList[0].organizations.filter(
                (organization) => {
                  return organization.organizationId == this.getOrganizationId;
                }
              );
          }
          if (this.findCurrOrganization) {
            this.color = this.findCurrOrganization[0]?.organizationColor;
          }
          this.currentOrg = this.getOrganizationId
            ? +this.getOrganizationId
            : "";
          this.selectedOrganization = +this.getOrganizationId; // Store this to compare ids later
        } else {
          localStorage.clear();
          this.$router.push("/");
        }
      });
    },
    fetchList() {
      this.fetchdata();
      this.$emit("fetchList");
    },
    logout() {
      this.$emit("logout");
    },
    close() {
      this.settingDialog = false;
    },
    toggleDrawer() {
      this.drawer = !this.drawer; // Toggle the drawer visibility
    },
    sendRequest(item, status) {
      var obj = {
        requestId: item.requestId,
        IsRequestAccept: status,
      };
      this.$store.dispatch("acceptJoinRequest", obj).then((response) => {
        if (response.data.succeeded) {
          this.getJoinRequestList();
        } else {
          this.getJoinRequestList();
        }
      });
    },
  },
};
</script>

<style scoped>
.v-list >>> .v-list-item--active {
  background-color: var(--secondary-color) !important;
  color: var(--secondary-color) !important;
}

.border {
  border: 2px solid transparent;
  border-radius: 50%;
}
</style>
