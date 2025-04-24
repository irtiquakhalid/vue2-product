<template>
  <div class="payment">
    <loadercomponent :loader="loader" />
    <div class="d-flex justify-end"></div>
    <v-row class="tabs-container align-start" style="position: relative">
      <v-col
        cols="1"
        :class="$vuetify.breakpoint.width <= 1460 ? 'mt-n3' : 'mt-n7'"
      >
        <v-img
          src="/images/onboardingscreen/newLogooo.png"
          width="120"
          contain
        ></v-img>
      </v-col>

      <v-col
        cols="12"
        xl="3"
        md="3"
        :class="[
          isActive === 'personal-details'
            ? 'personal-details-not-active'
            : 'personal-details',
          { 'gradiant-background': isActive === 'personal-details' },
        ]"
        @click="isActive = 'personal-details'"
        class="mt-2"
      >
        <v-img
          :src="
            isActive === 'personal-details'
              ? '/images/profile/white-personal.svg'
              : '/images/profile/cyan-personal.svg'
          "
        ></v-img>
        <h3 class="ml-2">Real Estate Broker</h3>
      </v-col>
      <v-col
        cols="12"
        xl="3"
        md="3"
        :class="[
          isActive === 'subscription-plan'
            ? 'subscription-plan-not-active'
            : 'subscription-plan',
          { 'gradiant-background': isActive === 'subscription-plan' },
        ]"
        @click="isActive = 'subscription-plan'"
        class="mt-2"
      >
        <v-img
          :src="
            isActive === 'subscription-plan'
              ? '/images/profile/white-personal.svg'
              : '/images/profile/cyan-personal.svg'
          "
        ></v-img>
        <h3 class="ml-2">Real Estate Agent</h3>
      </v-col>
      <v-col
        cols="12"
        xl="3"
        md="3"
        :class="
          isActive === 'others'
            ? 'subscription-plan-not-active'
            : 'subscription-plan'
        "
        @click="skipPayment()"
        class="d-flex align-center mt-2"
      >
        <v-icon
          v-if="isActive === 'others'"
          color="white"
          style="font-size: 45px"
        >
          mdi-dots-horizontal-circle
        </v-icon>
        <v-icon v-else color="#1ba8bb" style="font-size: 45px">
          mdi-dots-horizontal-circle
        </v-icon>
        <h3 class="ml-2">Others</h3>
      </v-col>

      <!-- <router-link
        to="/payment/paymenttype"
        style="right: -1rem; position: absolute"
      >
        <v-icon style="color: #1ba8bb; font-size: 42px"
          >mdi-close-circle</v-icon
        >
      </router-link> -->
    </v-row>

    <div
      class="d-flex justify-center align-center"
      v-if="isActive === 'personal-details' || isActive === 'subscription-plan'"
    >
      <h2 class="black-text-400 font-weight-500">
        Access Your Real Estate Checklist
      </h2>
      <div></div>
    </div>

    <v-row class="mt-3 mb-3" v-if="isActive === 'personal-details'">
      <v-col cols="12">
        <v-card class="radius-21 v-card-offers" flat>
          <v-row>
            <v-col
              v-for="(item, index) in paymentDetails.plan === 'Monthly'
                ? monthlyChips
                : yearlyChips"
              :key="index"
              cols="12"
              md="4"
              lg="3"
            >
              <v-chip
                :style="
                  item === 'FREE 1 Month trial'
                    ? 'border: 2px solid green;'
                    : ''
                "
                color="#FFFFFF"
                class="px-8 py-6 w-100"
                label
              >
                <span class="grey-text-700 font-20">{{ item }}</span>
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
    </v-row>
    <v-row justify="center" v-if="isActive === 'personal-details'">
      <v-col cols="12" class="mt-2 pb-0">
        <div
          class="gradiant-background px-8 py-7"
          style="border-radius: 50px 50px 0 0"
        >
          <v-row no-gutters v-for="(item, index) in plans" :key="index">
            <v-col
              cols="12"
              :class="
                activePlan === 'Yearly' && item.plan === 'Yearly'
                  ? 'yearly-plan'
                  : activePlan === 'Monthly' && item.plan === 'Monthly'
                  ? 'yearly-plan'
                  : 'plans'
              "
              class="plans px-6 py-3 position-relative cursor-pointer"
              @click="subscriptionPlanButton(item, 'selectedPlan')"
            >
              <div>
                <h3 class="white-text font-weight-500">{{ item.plan }}</h3>
                <div
                  style="
                    background-color: rgba(34, 132, 162, 0.41);
                    display: inline-flex !important;
                  "
                >
                  <span
                    v-if="item.price && item.plan === 'Yearly'"
                    class="d-inline-block font-20 white-text"
                    >${{ item.price }}/yr</span
                  >
                  <span
                    style="background-color: #1e98af !important"
                    v-if="item.price && item.plan === 'Monthly'"
                    class="d-inline-block font-20 white-text"
                    >${{ item.price }}/mon.</span
                  >
                  <span class="white-text" v-if="item.plan === 'Yearly'">
                    &nbsp; - &nbsp;
                  </span>
                  <span
                    v-if="item.special_price"
                    class="d-inline-block white-text font-20"
                    >{{ item.special_price }}</span
                  >
                </div>
              </div>
              <v-chip
                v-if="item.advantage"
                class="chip-plan"
                color="yellow"
                label
                >{{ item.advantage }}</v-chip
              >
              <div class="d-flex align-center justify-end">
                <!-- <div v-if="item.per_month" class="mr-3 white-text font-20">
                  ${{ item.per_month }}.
                </div> -->
                <v-btn
                  depressed
                  class="py-2 white-background radius-25"
                  @click="subscriptionPlanButton(item, 'payment')"
                >
                  <span
                    class="text-transform font-weight-600 font-20 black-text-500"
                    >Subscribe</span
                  ></v-btn
                >
              </div>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col>
              <v-btn
                depressed
                class="py-7 white-background mt-2 w-100 radius-25"
                @click="subscriptionPlanBlockButton()"
              >
                <span
                  class="text-transform font-weight-600 font-20 black-text-500"
                  >Subscribe
                </span></v-btn
              >
            </v-col>
          </v-row>
          <div class="white-text font-20 mt-2 text-center">
            By placing your order, you agree to the Real Estate Checklist App
            <a
              target="_blank"
              href="https://docs.google.com/document/d/1BX8kRqr_ymLkXjhRRSmVQ0SRv7j7WzirvdNnisO8LaE/edit?tab=t.0#heading=h.bss271r3vtys"
              style="color: white !important"
              >Terms of Use</a
            >
            and
            <a
              target="_blank"
              href="https://www.realestateclapp.com/privacy-policy"
              style="color: white !important"
              >Privacy Policy</a
            >. You can manage your subscription in the app settings.
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row class="mt-3 mb-3" v-if="isActive === 'subscription-plan'">
      <v-col cols="12">
        <v-card class="radius-21 v-card-offers" flat>
          <v-row>
            <v-col
              v-for="(item, index) in yearlyChips"
              :key="index"
              cols="12"
              md="4"
              lg="3"
            >
              <v-chip color="#FFFFFF" class="px-8 py-6 w-100" label>
                <span class="grey-text-700 font-20">{{ item }}</span>
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
    </v-row>
    <v-row justify="center" v-if="isActive === 'subscription-plan'">
      <v-col cols="12" class="mt-2 pb-0">
        <div
          class="gradiant-background px-8 py-7"
          style="border-radius: 50px 50px 0 0"
        >
          <v-row no-gutters v-for="(item, index) in plans" :key="index">
            <v-col
              cols="12"
              :class="
                activePlan === 'Yearly' && item.plan === 'Yearly'
                  ? 'yearly-plan'
                  : activePlan === 'Monthly' && item.plan === 'Monthly'
                  ? 'yearly-plan'
                  : 'plans'
              "
              class="plans px-6 py-3 position-relative cursor-pointer"
              @click="subscriptionPlanButton(item, 'selectedPlan')"
            >
              <div>
                <h3 class="white-text font-weight-500">{{ item.plan }}</h3>
                <div
                  style="
                    background-color: rgba(34, 132, 162, 0.41);
                    display: inline-flex !important;
                  "
                >
                  <span
                    v-if="item.price && item.plan === 'Yearly'"
                    class="d-inline-block font-20 white-text"
                    >${{ item.price }}/yr</span
                  >
                  <span
                    style="background-color: #1e98af !important"
                    v-if="item.price && item.plan === 'Monthly'"
                    class="d-inline-block font-20 white-text"
                    >${{ item.price }}/mon.</span
                  >
                  <span
                    v-if="item.special_price"
                    class="d-inline-block white-text font-20"
                    >{{ item.special_price }}</span
                  >
                </div>
              </div>
              <v-chip
                v-if="item.advantage"
                class="chip-plan"
                color="yellow"
                label
                >{{ item.advantage }}</v-chip
              >
              <div class="d-flex align-center justify-end">
                <div v-if="item.per_month" class="mr-3 white-text font-20">
                  ${{ item.per_month }}.
                </div>
                <v-btn
                  depressed
                  class="py-2 white-background radius-25"
                  @click="subscriptionPlanButton(item, 'payment')"
                >
                  <span
                    class="text-transform font-weight-600 font-20 black-text-500"
                    >Subscribe</span
                  ></v-btn
                >
              </div>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col>
              <v-btn
                depressed
                class="py-9 white-background mt-5 w-100 radius-25"
                @click="subscriptionPlanBlockButton()"
              >
                <span
                  class="text-transform font-weight-600 font-20 black-text-500"
                  >Subscribe
                </span></v-btn
              >
            </v-col>
          </v-row>
          <div class="white-text font-20 mt-2 text-center">
            By placing your order, you agree to the Real Estate Checklist App
            <a
              target="_blank"
              href="https://docs.google.com/document/d/1BX8kRqr_ymLkXjhRRSmVQ0SRv7j7WzirvdNnisO8LaE/edit?tab=t.0#heading=h.bss271r3vtys"
              style="color: white !important"
              >Terms of Use</a
            >
            and
            <a
              target="_blank"
              href="https://www.realestateclapp.com/privacy-policy"
              style="color: white !important"
              >Privacy Policy</a
            >. You can manage your subscription in the app settings.
          </div>
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
import paymentComponent from "@/components/Onboardingscreen/Payment/payment.component.vue";
import { mapGetters } from "vuex";
export default {
  components: { paymentComponent },
  data() {
    return {
      isActive: "personal-details",
      customize: "",
      loader: false,
      paymentDialog: false,
      paymentDetails: {},
      yearlyChips: [
        "FREE 1 Month trial",
        "Free Client Access",
        "Tailored Checklist",
        "Efficient Solution",
        "Team Coordination",
        "Analytics",
        "Progress Tracking",
        "Upload Files",
      ],
      monthlyChips: [
        "Free Client Access",
        "Tailored Checklist",
        "Efficient Solution",
        "Team Coordination",
        "Analytics",
        "Progress Tracking",
        "Upload Files",
      ],
      plans: [
        {
          id: "1",
          plan: "Yearly",
          price: "119.99",
          special_price:
            "Completely FREE for 1 month, then $9.99/month, billed annually at $119.99/year. Cancel anytime.",
          per_month: "9.99/mon",
          advantage: "1 month free trial",
        },
        {
          id: "2",
          plan: "Monthly",
          per_month: "14.99/mon",
          price: "14.99",
        },
      ],
      activePlan: "Yearly",
      form: {
        Id: null,
        subcriprtionId: null,
        RoleId: null,
        subcriptionStartDate: "",
        subcriptionEndDate: "",
        amount: "",
      },
    };
  },
  computed: {
    ...mapGetters(["getUserId", "getUserData", "getOrganizationId"]),
  },
  mounted() {
    window.addEventListener("beforeunload", this.handleBeforeUnload);
  },
  beforeDestroy() {
    window.removeEventListener("beforeunload", this.handleBeforeUnload);
  },
  methods: {
    skipPayment() {
      this.loader = true;
      const payload = {
        id: this.getUserId,
        isSkipSub: true,
      };
      this.$store.dispatch("skipSubscription", payload).then((response) => {
        if (response.data.succeeded === true) {
          this.loader = false;
          this.$swal.fire({
            position: "top-end",
            icon: "success",
            title: "Package skipped successfully",
            showConfirmButton: false,
            timer: 2000,
            toast: true,
          });
          if (response.data.data.isSkipSub && this.getOrganizationId) {
            // localStorage.setItem("alreadyExist", "yes");
            localStorage.setItem("skipPayment", response.data.data.isSkipSub);
            this.$store.dispatch("getOrganizationId", null);
            this.$store.dispatch("getRolePermissions", "");
            localStorage.removeItem("organizationId");
            localStorage.removeItem("permissions");
            this.$router.push({ path: "/checklist" });
          } else {
            // localStorage.setItem("alreadyExist", "yes");
            localStorage.setItem("skipPayment", response.data.data.isSkipSub);
            this.$store.dispatch("getOrganizationId", null);
            this.$store.dispatch("getRolePermissions", "");
            localStorage.removeItem("organizationId");
            localStorage.removeItem("permissions");
            this.$router.push({ path: "/profile" });
          }
        } else {
          this.loader = false;
          this.$swal.fire({
            position: "top-end",
            icon: "error",
            title: response.data.message,
            showConfirmButton: false,
            timer: 2000,
            toast: true,
          });
        }
      });
    },
    calculateMonthly() {
      const date = new Date();
      this.form.subcriptionStartDate = date;
      const monthlyEnd = new Date(date);
      monthlyEnd.setMonth(date.getMonth() + 1);
      this.form.subcriptionEndDate = monthlyEnd;
    },
    calculateYearly() {
      const date = new Date();
      this.form.subcriptionStartDate = date;
      const yearlyEnd = new Date(date);
      yearlyEnd.setFullYear(date.getFullYear() + 1);
      this.form.subcriptionEndDate = yearlyEnd;
    },
    subscriptionPlanBlockButton() {
      if (this.activePlan === "Monthly") {
        this.activePlan = "Monthly";
        this.paymentDetails = { ...this.plans[1], paymentType: this.isActive };
      } else {
        this.activePlan = "Yearly";
        this.paymentDetails = { ...this.plans[0], paymentType: this.isActive };
      }
      this.paymentDialog = true;
    },
    subscriptionPlanButton(item, type) {
      if (type === "payment") {
        this.paymentDialog = true;

        this.activePlan = item.plan;
        this.paymentDetails = { ...item, paymentType: this.isActive };
      } else {
        this.activePlan = item.plan;
        this.paymentDetails = { ...item, paymentType: this.isActive };
      }

      // this.activePlan = item.plan;
      // this.form.subcriprtionId = item.id;
      // this.form.amount = item.price;
      // if (this.isActive === "personal-details") {
      //   this.form.RoleId = 1;
      //   this.subscribePackage();
      // } else if (this.isActive === "subscription-plan") {
      //   this.form.RoleId = 2;
      //   this.subscribePackage();
      // }
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
        if (this.form.subcriprtionId === 1) {
          this.calculateYearly();
        } else {
          this.calculateMonthly();
        }
        const payload = {
          id: this.getUserId,
          subcriprtionId: this.form.subcriprtionId,
          roleId: this.form.RoleId,
          subcriptionStartDate: this.form.subcriptionStartDate,
          subcriptionEndDate: this.form.subcriptionEndDate,
          amount: this.form.amount,
        };
        this.loader = true;
        this.$store.dispatch("subscriptionPlan", payload).then((response) => {
          if (response.data.succeeded === true) {
            this.loader = false;
            this.$swal.fire({
              position: "top-end",
              icon: "success",
              title: "Package selected successfully",
              showConfirmButton: false,
              timer: 2000,
              toast: true,
            });
            localStorage.setItem("alreadyExist", "yes");
            this.$store.dispatch(
              "getOrganizationId",
              response.data.data.organizationId
            );
            localStorage.removeItem("skipPayment"); // it's a broker
            this.$store.dispatch("getRolePermissions", "own");
            this.$router.push({ path: "uploadimage" });
          } else {
            this.loader = false;
            this.$swal.fire({
              position: "top-end",
              icon: "error",
              title: response.data.message,
              showConfirmButton: false,
              timer: 2000,
              toast: true,
            });
          }
        });
      }
    },
    handleBeforeUnload(event) {
      event.preventDefault();
      event.returnValue = "";
    },
    close() {
      this.paymentDialog = false;
    },
  },
};
</script>

<style scoped>
.v-card-offers {
  background: transparent;
}
</style>
