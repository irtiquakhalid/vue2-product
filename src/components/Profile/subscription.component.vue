<template>
  <div class="subscription" v-if="!skipPayment">
    <loadercomponent :loader="loader" />
    <h5 class="white-text" v-if="!skipPayment">Current Subscription Plan</h5>
    <v-card
      class="py-4 px-8 my-5 radius-7"
      style="
        border: 2px solid white;
        background-color: transparent;
        border-radius: 15px !important;
      "
      flat
      v-if="!skipPayment && currentPlan.plan"
    >
      <div class="d-flex justify-space-between align-center">
        <div class="d-flex align-center">
          <h3 class="white--text font-weight-500">{{ currentPlan.plan }}</h3>
        </div>
        <div :class="currentPlan.plan == 'Yearly' ? 'ml-4' : 'mr-3'">
          <v-chip
            label
            class="mx-md-5 mt-1 mx-sm-1"
            color="white"
            style="padding: 1.5rem 4.5rem"
          >
            <div class="d-flex flex-column">
              <div class="text-center font-16" style="color: #00a01d">
                Start Date
              </div>
              <div class="text-center font-12" style="color: #00a01d">
                {{ formatDate(new Date(currentPlan.subcriptionStartDate)) }}
              </div>
            </div>
          </v-chip>
          <v-chip
            label
            class="mx-md-5 mt-1 mx-sm-1"
            color="white"
            style="padding: 1.5rem 4.7rem"
          >
            <div class="d-flex flex-column">
              <div class="text-center font-16" style="color: #f43939">
                End Date
              </div>
              <div class="text-center font-12" style="color: #f43939">
                {{ formatDate(new Date(currentPlan.subcriptionEndDate)) }}
              </div>
            </div>
          </v-chip>
        </div>
        <div>
          <h4
            class="ml-8 font-weight-300 white--text"
            v-if="currentPlan.plan == 'Yearly'"
          >
            ${{ currentPlan.amount }}/yr.
          </h4>
          <h4 class="ml-8 font-weight-300 white--text" v-else>
            ${{ currentPlan.amount }}/mon.
          </h4>
        </div>
      </div>
    </v-card>
    <h5 v-if="previousPlans.length > 0" class="white-text mt-7 mb-5">
      <span v-if="!skipPayment">Previous</span> Subscription Plans
    </h5>
    <div v-if="previousPlans.length > 0" class="subc-scroller">
      <v-card
        v-for="(item, index) in previousPlans"
        style="
          border: 2px solid white;
          background-color: transparent;
          border-radius: 15px !important;
        "
        :key="index"
        class="py-4 px-8 mb-4 mr-2 radius-7"
        flat
      >
        <div class="d-flex justify-space-between position-relative">
          <div class="d-flex align-center">
            <h3 class="white--text font-weight-500">{{ item.plan }}</h3>
          </div>
          <div
            :class="
              item.plan == 'Yearly' && item.amount != '83.99' ? 'ml-5' : 'ml-0'
            "
          >
            <v-chip
              label
              class="mx-md-5 mt-1 mx-sm-1"
              color="white"
              style="padding: 1.5rem 4.5rem"
            >
              <div class="d-flex flex-column">
                <div class="text-center font-16" style="color: #00a01d">
                  Start Date
                </div>
                <div class="text-center font-12" style="color: #00a01d">
                  {{ formatDate(new Date(item.subcriptionStartDate)) }}
                </div>
              </div>
            </v-chip>
            <v-chip
              label
              class="mx-md-5 mt-1 mx-sm-1"
              color="white"
              style="padding: 1.5rem 4.7rem"
            >
              <div class="d-flex flex-column">
                <div class="text-center font-16" style="color: #f43939">
                  End Date
                </div>
                <div class="text-center font-12" style="color: #f43939">
                  {{ formatDate(new Date(item.subcriptionEndDate)) }}
                </div>
              </div>
            </v-chip>
          </div>
          <div>
            <h4
              class="ml-8 font-weight-300 white--text"
              v-if="item.plan == 'Yearly'"
            >
              ${{ item.amount }}/yr.
            </h4>
            <h4
              class="ml-8 font-weight-300 white--text"
              v-if="item.plan != 'Yearly'"
            >
              ${{ item.amount }}/mon.
            </h4>
          </div>
        </div>
      </v-card>
    </div>
    <v-row class="d-flex justify-center mt-11 pb-7">
      <v-col cols="12" md="4">
        <v-btn
          depressed
          color="red"
          class="radius-25 py-7 w-100"
          @click="
            () => {
              deleteSubscriptionDialog = true;
            }
          "
        >
          <v-icon class="white--text">mdi-delete</v-icon>
          <span class="font-20 white--text text-transform ml-2">
            Delete Subscription</span
          >
        </v-btn>
      </v-col>
      <v-col cols="12" md="4">
        <v-btn
          v-if="getRolePermissions == 'own'"
          depressed
          class="radius-25 py-7 w-100"
          to="/profile/changeplan"
        >
          <span
            style="color: var(--primary-color)"
            class="text-transform font-20 font-weight-600"
            >Change Plan</span
          >
        </v-btn>
      </v-col>
    </v-row>
    <!---------------- DELETE ACCOUNT  --------------------->
    <v-dialog v-model="deleteSubscriptionDialog" max-width="400">
      <v-card class="pa-6 radius-21">
        <div class="d-flex justify-end">
          <v-icon
            @click="
              () => {
                deleteSubscriptionDialog = false;
              }
            "
            color="var(--primary-color)"
            style="font-size: 33px"
            >mdi-close-circle</v-icon
          >
        </div>
        <div class="d-flex justify-center">
          <deletesvgcomponent />
        </div>
        <h3
          class="font-weight-500 text-center my-5"
          style="color: var(--primary-color)"
        >
          Are you sure?
        </h3>
        <h6
          class="text-center font-weight-500"
          style="color: var(--primary-color)"
        >
          Are you sure you want to delete your payment plan? This action is
          irreversible.
        </h6>
        <v-row class="mt-4 mb-1">
          <v-col cols="12" md="6">
            <v-btn
              class="py-6 w-100 radius-25"
              color="var(--primary-color)"
              @click="
                () => {
                  deleteSubscriptionDialog = false;
                }
              "
              ><span class="text-transform font-18 white--text">Cancel</span>
            </v-btn>
          </v-col>
          <v-col cols="12" md="6">
            <v-btn
              class="py-6 w-100 radius-25"
              color="red"
              @click="endSubscription()"
              ><span class="text-transform font-18 white--text">Delete</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import deletesvgcomponent from "@/components/Deletesvg/delete.component.vue";
import { auth } from "@/views/auth/firebaseConfig";
import { signOut } from "firebase/auth";

export default {
  components:{deletesvgcomponent},
  data() {
    return {
      skipPayment: null,
      loader: false,
      currentPlan: {},
      previousPlans: [],
      deleteSubscriptionDialog: false,
    };
  },
  mounted() {
    this.skipPayment = localStorage.getItem("skipPayment");
    this.fetchdata();
  },
  computed: {
    ...mapGetters(["getSubscriptionPlan", "getUserId", "getRolePermissions"]),
  },
  methods: {
    logout() {
      signOut(auth)
        .then(() => {
          localStorage.clear();
          this.$router.push({ path: "/" });
          window.location.reload();
        })
        .catch((error) => {});
    },
    endSubscription(){
      this.$store.dispatch('subscriptionExpire',this.getUserId).then((response) => {
        if(response.data.succeeded){
          this.$swal.fire({
              position: "top-end",
              icon: "success",
              title:
                "Payment plan removed successfully.",
              showConfirmButton: false,
              timer: 5000,
              toast: true,
            });
            this.logout();
        }
      })
    },
    formatDate(date) {
      const day = ("0" + date.getDate()).slice(-2);
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      return `${month}-${day}-${year}`;
    },
    fetchdata() {
      if (!this.skipPayment) {
        let id = this.getUserId;
        this.loader = true;
        this.$store.dispatch("getSubscriptionPlan", id).then((response) => {
          if (response.data.succeeded) {
            this.loader = false;
            this.currentPlan = this.getSubscriptionPlan.data.data.currentPlan;
            this.previousPlans =
              this.getSubscriptionPlan.data.data.previousPlans;
          }
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.subc-scroller {
  max-height: 350px !important;
  overflow-y: scroll !important;
  /* width */
  &::-webkit-scrollbar {
    width: 5px !important;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 2px white !important;
    border-radius: 5px !important;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: white;
    border-radius: 8px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: white;
  }
}
</style>
