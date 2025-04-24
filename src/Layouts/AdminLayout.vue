<template>
  <div class="h-100">
    <v-navigation-drawer
      class="admin-dashboard-color"
      app
      :mini-variant="
        $vuetify.breakpoint.sm ||
        $vuetify.breakpoint.xs ||
        $vuetify.breakpoint.md
          ? !mini
          : mini
      "
      permanent
      width="230"
    >
      <div
        class="d-flex justify-end mt-2"
        v-if="
          $vuetify.breakpoint.sm ||
          $vuetify.breakpoint.xs ||
          $vuetify.breakpoint.md
        "
      >
        <v-app-bar-nav-icon
          class="white--text mr-2"
          @click.stop="mini = !mini"
        ></v-app-bar-nav-icon>
      </div>
      <div
        :class="!mini ? 'mx-11 mt-3' : 'mx-11 mb-0'"
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        "
      >
        <v-img
          src="\broker-png.png"
          contain
          style="width: 100px; height: 100px"
        ></v-img>
        <div>
          <span class="white--text font-weight-bold font-size-20 mt-1"
            >Real Estate </span
          >
        </div>
        <div>
          <span class="white--text font-weight-bold font-size-20"
            >Checklist App</span
          >
        </div>
      </div>
      <v-card height="40px" color="transparent" flat></v-card>
      <v-list v-for="(items, i) in navbaritems" :key="i" class="ma-0 pa-0">
        <v-list-group
          :value="isGroupOpen"
          class="my-1 pa-0 mx-0 heading3"
          append-icon=""
        >
          <template v-slot:activator>
            <v-list-item
              active-class="activelink"
              class="white--text d-flex align-center mt-2 mx-0 py-2 px-7"
              :to="items.route"
            >
              <v-img :src="items.imgicon" max-width="22" class="mr-5"></v-img>
              {{ items.name }}</v-list-item
            >
          </template>
          <template #appendIcon v-if="items.childern">
            <div class="mr-2">
              <v-icon class="white--text">mdi-chevron-down</v-icon>
            </div>
          </template>
          <v-list-item
            v-for="(item, i) in items.childern"
            :key="i"
            :to="item.route"
            class="pa-0 ma-0"
            active-class="active"
          >
            <div class="d-flex ml-6 ml-11">
              <v-img :src="item.imgicon"></v-img>
              <v-list-item-title class="ml-3 pa-0 ma-0">
                {{ item.name }}</v-list-item-title
              >
            </div>
            <div class="d-flex ml-6 ml-11">
              {{ item }}
            </div>
          </v-list-item>
        </v-list-group>
      </v-list>

      <template v-slot:append>
        <div class="pb-4 px-6" :class="!mini">
          <v-btn
            v-if="skipPayment"
            outlined
            block
            class="white--text d-flex align-center mb-4 mx-0 py-2 px-1"
            @click="logout"
          >
            <v-img
              src="/images/navbar/logout.svg"
              max-width="22"
              class="mr-5"
            ></v-img>
            <span
              style="font-size: 1.2rem; font-weight: 500; text-transform: none"
            >
              Log out
            </span></v-btn
          >
          <div class="font-16">Version v{{ version }}</div>
          <div class="font-16">
            Developed by
            <a href="https://rootpointers.com/" target="_blank"
              ><span
                style="text-decoration: underline"
                class="cursor-pointer white--text"
                >Rootpointers</span
              >
            </a>
          </div>
        </div>
      </template>
    </v-navigation-drawer>
    <div style="height: 100%">
      <headercomponent @logout="logout" @fetchList="fetchdata" />
      <div class="layout-container">
        <router-view class="main-layout"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from "@/views/auth/firebaseConfig";
import { signOut } from "firebase/auth";
import { mapGetters } from "vuex";
import headercomponent from "@/components/Header/header.component.vue";
import moment from "moment";
export default {
  components: { headercomponent },
  data() {
    return {
      version: process.env.VUE_APP_VERSION,
      isGroupOpen: null,
      drawer: true,
      mini: false,
      navbaritems: null,
      userData: {
        name: "",
      },
      form: null,
      skipPayment: localStorage.getItem("skipPayment"),
    };
  },
  computed: {
    ...mapGetters([
      "getUserId",
      "getUserData",
      "getOrganizationId",
      "getUserSubcription",
    ]),
  },
  mounted() {
    this.adminLayout();
    this.GetUserSubcription();
    this.fetchdata();
  },
  watch: {
    getOrganizationId: {
      immediate: true,
      handler(newValue, oldValue) {
        if (oldValue && oldValue !== newValue) {
          this.fetchdata();
        }
      },
    },
    $route(to) {
      this.GetUserSubcription();
    },
  },
  methods: {
    adminLayout() {
      const skipPayment = localStorage.getItem("skipPayment");

      if (skipPayment) {
        this.navbaritems = [
          {
            name: "Checklist",
            imgicon: "/images/navbar/checklist.svg",
            route: "/checklist",
          },
          {
            name: "Notification",
            imgicon: "/images/navbar/notification.svg",
            route: "/notification",
          },
        ];
      } else if (skipPayment && this.getOrganizationId) {
        this.navbaritems = null;
      } else {
        this.navbaritems = [
          {
            name: "Teams",
            imgicon: "/images/navbar/team.svg",
            route: "/team",
          },
          {
            name: "Checklist",
            imgicon: "/images/navbar/checklist.svg",
            route: "/checklist",
          },
          {
            name: "Templates",
            imgicon: "/images/navbar/template.svg",
            route: "/template",
          },
          {
            name: "Members",
            imgicon: "/images/navbar/member.svg",
            route: "/member",
          },
          {
            name: "Notification",
            imgicon: "/images/navbar/notification.svg",
            route: "/notification",
          },
          {
            name: "Chats",
            imgicon: "/images/navbar/chat.png",
            route: "/chats",
          },
        ];
      }
    },
    GetUserSubcription() {
      this.$store
        .dispatch("getUserSubcription", this.getUserId)
        .then((response) => {
          if (response.data.succeeded) {
            let subscriptionEndDate =
              this.getUserSubcription?.subcriptionEndDate;
            const formattedEndDate = moment(subscriptionEndDate);
            const currentUTCDate = moment().utc();

            // Compare both dates
            if (currentUTCDate.isAfter(formattedEndDate)) {
              this.endSubscription();
            }
          }
          if (!response.data.succeeded && !this.skipPayment) {
            this.$swal.fire({
              position: "top-end",
              icon: "success",
              title:
                "Your payment plan have been expired. To continue, kindly choose your plan further.",
              showConfirmButton: false,
              timer: 5000,
              toast: true,
            });
            setTimeout(() => {
              this.logout();
            }, 1000);
          }
        });
    },
    fetchdata() {
      if (this.getOrganizationId && !this.skipPayment) {
        this.$store
          .dispatch("getUserData", {
            isPagination: false, // Boolean remains unchanged
            id: parseInt(this.getUserId, 10) || 0, // Convert to int or fallback to 0
            orgId: parseInt(this.getOrganizationId, 10) || 0, // Convert to int or fallback to 0
          })
          .then(() => {
            this.form = this.getUserData;
            this.userData =
              this.getUserData?.userList?.[0]?.organizations?.find((value) => {
                return value.organizationId == this.getOrganizationId;
              });
            if (this.userData?.organizationColor) {
              document.documentElement.style.setProperty(
                "--primary-color",
                this.userData.organizationColor
              );
              document.documentElement.style.setProperty(
                "--secondary-color",
                this.rgbToRgba(this.userData.organizationColor, "16%")
              );
            } else {
              document.documentElement.style.setProperty(
                "--primary-color",
                "#1ba8bb"
              );
              document.documentElement.style.setProperty(
                "--secondary-color",
                "#E1F2FF"
              );
            }
          });
      }
    },
    endSubscription() {
      this.$store
        .dispatch("subscriptionExpire", this.getUserId)
        .then((response) => {
          this.GetUserSubcription();
        });
    },
    rgbToRgba(color, alpha) {
      if (!color || color == "#1ba8bb") {
        // Fallback to a default color if the color is undefined or null
        return `#E1F2FF`; // Default to black with the given alpha
      }
      const match = color.match(/\d+/g);
      if (!match || match.length < 3) {
        // Fallback if the color does not match the expected RGB format
        return `rgba(0, 0, 0, ${alpha})`;
      }

      let [r, g, b] = match.map(Number);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    },
    logout() {
      signOut(auth)
        .then(() => {
          localStorage.clear();
          this.$router.push({ path: "/" });
          window.location.reload();
        })
        .catch((error) => {});
    },
  },
};
</script>

<style scoped>
.v-list-item--link:before {
  background-color: transparent;
}

.v-navigation-drawer--mini-variant {
  width: 71px !important;
}

.active {
  color: #73c6ff !important;
}

.theme--light.v-list-item:not(.v-list-item--active):not(
    .v-list-item--disabled
  ) {
  color: white;
}
</style>
