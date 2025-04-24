<template>
  <div class="change-plan">
    <loadercomponent :loader="loader" />
    <div class="d-flex align-start">
      <router-link to="/profile">
        <v-icon style="color: white; font-size: 45px" class="mt-6"
          >mdi-arrow-left-box</v-icon
        >
      </router-link>
      <div class="ml-10">
        <h1 class="white--text">Change Plan</h1>
        <h3 class="white--text font-weight-500" style="line-height: 0.6">
          Select Subscription Plan
        </h3>
      </div>
    </div>
    <h5 class="white-text mt-10 mb-11">Select Subscription Plan</h5>
    <v-row>
      <v-col cols="12" md="6" lg="6">
        <v-card color="#FFFFFF" class="radius-21 pa-10">
          <v-row>
            <v-col
              v-for="(item, index) in chips"
              :key="index"
              cols="12"
              md="12"
              lg="6"
            >
              <v-chip
                color="var(--secondary-color)"
                class="grey-text-700 font-20 px-8 py-6 w-100"
                label
                >{{ item }}
                <v-img
                  src="/images/profile/tick-icon.svg"
                  contain
                  class="ml-3"
                  max-width="25"
                ></v-img>
              </v-chip>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" md="6" lg="5">
        <v-row no-gutters v-for="(item, index) in plans" :key="index">
          <v-col
            @click="activePlanData(item)"
            :class="
              (activePlan == 'Yearly' && item.plan == 'Yearly') ||
              (activePlan == 'Monthly' && item.plan == 'Monthly')
                ? 'active-plan'
                : ''
            "
            cols="12"
            class="plans px-6 py-3 position-relative"
          >
            <div>
              <h3 class="white-text font-weight-500">{{ item.plan }}</h3>
              <span
                v-if="item.price"
                class="d-inline-block text-decoration-line font-20 white-text"
                >${{ item.price }}</span
              >
              <span
                v-if="item.special_price"
                class="d-inline-block ml-3 white-text font-20"
                >${{ item.special_price }}</span
              >
            </div>
            <v-chip
              v-if="item.advantage"
              class="chip-plan"
              color="white"
              style="border-radius: 8px !important"
              label
              >{{ item.advantage }}</v-chip
            >
            <div>
              <span
                v-if="item.per_month"
                class="d-inline-block mr-3 white-text font-20"
                >${{ item.per_month }}</span
              >
            </div>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col>
            <v-btn
              @click="subscribePackage"
              depressed
              class="py-9 white-background mt-4 w-100"
              style="border-radius: 100px"
            >
              <span
                class="text-transform font-weight-600 font-20"
                style="color: var(--primary-color)"
                >Subscribe Plan</span
              ></v-btn
            >
          </v-col>
        </v-row>
        <div
          class="black--text font-20 mt-4 text-center"
          v-if="activePlan == 'Yearly'"
        >
          Completely FREE for 1 month, then $9.99/month, billed annually at
          $119.99/year. Cancel anytime
        </div>
        <div
          class="black-text font-20 mt-4 text-center"
          v-if="activePlan == 'Monthly'"
        >
          Billed at $14.99/month. Cancel anytime
        </div>
      </v-col>
    </v-row>
    <v-dialog v-model="paymentDialog" max-width="600" persistent>
      <v-card class="pa-6 radius-21">
        <paymentComponent @close="close" :paymentDetails="paymentDetails" />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import paymentComponent from "@/components/Onboardingscreen/Payment/payment.component.vue";

export default {
  components: { paymentComponent },
  data() {
    return {
      chips: [
        "FREE 1 Month Trial",
        "Client Satisfaction",
        "Tailored Checklist",
        "Efficient Solution",
        "Team Coordination",
        "Analytics",
        "Progress Tracking",
        "Upload Files",
      ],
      plans: [
        {
          subcriprtionId: 1,
          plan: "Yearly",
          price: "119.99",
          special_price: "119.99/yr.",
          per_month: "9.99/mon",
          advantage: "1 month free trial",
          amount: "119.99",
        },
        {
          subcriprtionId: 2,
          plan: "Monthly",
          per_month: "14.99/mon",
          amount: "14.99",
        },
      ],
      activePlan: "",
      form: {
        Id: null,
        subcriprtionId: null,
        RoleId: null,
        subcriptionStartDate: "",
        subcriptionEndDate: "",
        amount: "",
      },
      loader: false,
      userData: null,
      roleIdData: {},
      paymentDialog: false,
      paymentDetails: {},
    };
  },
  computed: {
    ...mapGetters(["getUserId", "getOrganizationId", "getUserData"]),
  },
  mounted() {
    this.fetchdata();
  },
  methods: {
    close() {
      this.paymentDialog = false;
    },
    fetchdata() {
      this.loader = true;
      const payload = {
        isPagination: false,
        id: this.getUserId,
        orgId: this.getOrganizationId,
      };
      this.$store.dispatch("getUserData", payload).then(() => {
        this.loader = false;
        this.userData = this.getUserData?.userList[0];
        this.roleIdData = this.userData?.organizations[0]?.roles.find(
          (value) => {
            return value.roleId == 1 || value.roleId == 2;
          }
        );
        if (this.userData.organizations[0]) {
          document.documentElement.style.setProperty(
            "--primary-color",
            this.userData.organizations[0].organizationColor
          );
          document.documentElement.style.setProperty(
            "--secondary-color",
            this.rgbToRgba(
              this.userData.organizations[0].organizationColor,
              "16%"
            )
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
    activePlanData(item) {
      this.activePlan = item.plan;
      this.form = item;
    },
    subscribePackage() {
      if (!this.form.subcriprtionId) {
        this.$swal.fire({
          position: "top-end",
          icon: "error",
          title: "Package is required",
          showConfirmButton: false,
          timer: 2000,
          toast: true,
        });
      } else {
        this.paymentDialog = true;
        let itemData = {
          id: this.form.subcriprtionId.toString(),
          roleId: this.roleIdData.roleId.toString(),
          price: this.form.amount,
        };
        this.paymentDetails = itemData;
      }
    },
  },
};
</script>

<style>
.v-chip .v-chip__content {
  width: 100% !important;
  display: flex !important;
  justify-content: space-between !important;
}
</style>
