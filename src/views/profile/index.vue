<template>
  <div class="profile">
    <div class="d-flex align-start">
      <router-link to="/team">
        <v-icon style="color: white;font-size: 45px" class="mt-6"
          >mdi-arrow-left-box</v-icon
        >
      </router-link>
      <v-row class="d-flex justify-space-between align-center w-100">
        <v-col cols="12" lg="4" class="ml-10">
          <h1 class="white--text">Your Profile</h1>
          <h3 class="white--text font-weight-500" style="line-height: 0.6">
            Create Your Profile
          </h3>
        </v-col>
        <v-col
          cols="12"
          lg="7"
          xl="5"
          class="d-flex align-center"
          v-if="isActive === 'personal-details'"
        >
        </v-col>
      </v-row>
    </div>
    <div class="tabs-container mt-14">
      <div
        :class="
          isActive === 'personal-details'
            ? 'personal-details'
            : 'personal-details-not-active'
        "
        class="d-flex align-center"
        @click="isActive = 'personal-details'"
      >
        <v-icon
          style="font-size: 36px"
          :style="{
            color:
              isActive === 'personal-details'
                ? 'var(--primary-color)'
                : 'white',
          }"
          >mdi-account-box</v-icon
        >
        <h3 class="ml-5">Personal Details</h3>
      </div>
      <div
        :class="
          isActive === 'subscription-plan'
            ? 'subscription-plan'
            : 'subscription-plan-not-active'
        "
        class="d-flex align-center"
        @click="handleSubscription"
      >
        <v-icon
          style="font-size: 34px"
          :style="{
            color:
              isActive === 'subscription-plan'
                ? 'var(--primary-color)'
                : 'white',
          }"
          >mdi-credit-card</v-icon
        >
        <h3 class="ml-5">Subscription Plan</h3>
      </div>
    </div>
    <div v-if="isActive === 'personal-details'">
      <detailcomponent @fetchList="fetchdata" />
    </div>

    <div v-else-if="isActive === 'subscription-plan'">
      <subscriptioncomponent />
    </div>

    <!-- <h6 class="grey-text-400 text-end mt-4">
      Privacy Policy. Terms & Conditions
    </h6> -->
    <v-dialog v-model="settingDialog" persistent max-width="600">
      <v-card class="pa-6 radius-21">
        <settingcomponent @close="close" />
      </v-card>
    </v-dialog>
    <v-dialog v-model="changeOrganizationDialog" persistent max-width="550">
      <v-card class="pa-6 radius-21">
        <div>
          <div class="d-flex justify-end mb-4">
            <v-img
              src="/images/close-icon.svg"
              contain
              class="cursor-pointer"
              @click="closeSwitchDiaog()"
              max-width="50"
            ></v-img>
          </div>
          <h4 class="cyan-text text-center font-weight-500 px-4 my-8">
            Are you sure you want to switch organization?
          </h4>
          <div class="px-8 mb-6">
            <v-btn
              depressed
              class="cyan-background py-6 radius-25 mt-5 w-100"
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
import detailcomponent from "@/components/Profile/detail.component.vue";
import subscriptioncomponent from "@/components/Profile/subscription.component.vue";
import settingcomponent from "@/components/Profile/settings.component.vue";
import { mapGetters } from "vuex";
import moment from "moment";
import { auth } from "@/views/auth/firebaseConfig";
import { signOut } from "firebase/auth";

export default {
  components: { detailcomponent, subscriptioncomponent, settingcomponent },
  data() {
    return {
      isActive: "personal-details",
      settingDialog: false,
      alreadyActive: null,
      currentOrg: "",
      skipPayment: null,
      organizations: [],
      selectedOrganization: "",
      changeOrganizationDialog: false,
      match: null,
      form: "", //remove later
      payload: {},
      ownOrganization: "",
    };
  },
  computed: {
    ...mapGetters(["getOrganizationId", "getUserId", "getUserData","getUserSubcription"]),
  },
  mounted() {
    this.GetUserSubcription();
    this.fetchdata();
    this.alreadyActive = localStorage.getItem("alreadyActive");
    this.skipPayment = localStorage.getItem("skipPayment");
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
  },
  methods: {
    GetUserSubcription() {
      this.$store
        .dispatch("getUserSubcription", this.getUserId)
        .then((response) => {
          if(response.data.succeeded){
            let subscriptionEndDate = this.getUserSubcription?.subcriptionEndDate;
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
    endSubscription(){
      this.$store.dispatch('subscriptionExpire',this.getUserId).then((response) => {
        this.GetUserSubcription();
      })
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
    handleSubscription(){
      this.isActive = 'subscription-plan'
      if(this.skipPayment){
        this.$router.push('/payment');
      }
    },
    switchOrganization() {
      this.$store.dispatch("getOrganizationId", this.currentOrg);
      localStorage.removeItem("skipPayment"); // it's a broker
      this.$router.push("/team");
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
        this.ownOrganization = this.getUserData?.userList[0].ownOrganization;
        if (this.ownOrganization) {
          this.organizations =
            this.getUserData?.userList[0].organizations.filter(
              (organization) => {
                return organization.organizationId == this.ownOrganization;
              }
              // (organization) => {
              //   return organization.roles.some((role) => {
              //     return role.roleId == 1 || role.roleId == 2;
              //   });
              // }
            );
        }
        let currentActiveOrg;
        if(this.form.organizations?.length > 0){
          currentActiveOrg = this.form.organizations.find((value) => {
            return value.organizationId == this.getOrganizationId
          })
        }
        if (this.organizations) {
          this.currentOrg = this.getOrganizationId
            ? +this.getOrganizationId
            : "";
        }
          if (currentActiveOrg) {
              document.documentElement.style.setProperty(
                "--primary-color",
                currentActiveOrg.organizationColor
              );
              document.documentElement.style.setProperty(
                "--secondary-color",
                this.rgbToRgba(currentActiveOrg.organizationColor,'16%')
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
        this.selectedOrganization = +this.getOrganizationId; // Store this to compare ids later
      });
    },
    rgbToRgba(color, alpha) {
      if (!color || color == '#1ba8bb') {
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
    close() {
      this.settingDialog = false;
    },
    closeSwitchDiaog() {
      this.changeOrganizationDialog = false;
      this.fetchdata();
    },
    checkRole(data) {
      let returnRoles = data.item.roles.filter((value) => {
        return value.roleId == 1 || value.roleId == 2;
      });
      if (returnRoles.length !== 0) {
        return `${data.item.organizationName} (Realtor)`;
      }
    },
  },
};
</script>

<style></style>
