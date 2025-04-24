<template>
  <div class="h-100">
    <loadercomponent :loader="loader" />
    <v-card
      class="gradiant-background px-10 py-7 mt-16 position-relative"
      style="border-radius: 50px 50px 0 0"
    >
      <div style="position: absolute; top: -10%">
        <v-btn class="py-8 px-9 radius-12 mt-6" depressed color="#FFD600">
          <span class="text-transform font-20 font-weight-600"
            >Limited Time Offer</span
          >
        </v-btn>
      </div>
      <h4 class="white-text mt-14">
        30% OFF
        <span class="font-weight-400 white-text"
          >the Real Estate Checklist App</span
        >
      </h4>
      <h5 class="white-text font-weight-500">
        For a limited time only, enjoy one year for a major discounted rate of
        $83.99 <span class="text-decoration-line">$119.99</span>
      </h5>
      <v-row class="mt-12">
        <v-col v-for="chip in chips" :key="chip" cols="12" md="3">
          <v-card
            color="#FFFFFF"
            flat
            class="px-5 py-3 d-flex justify-space-between"
          >
            <h4 class="font-weight-400">{{ chip }}</h4>
            <v-img
              src="/images/profile/tick-icon.svg"
              contain
              class="ml-3"
              max-width="25"
            ></v-img>
          </v-card>
        </v-col>
      </v-row>

      <div class="d-flex flex-column align-center mt-9">
        <v-btn
          depressed
          class="py-6 mt-2 radius-25"
          @click="subscribePackage"
          style="width: 100%"
          ><span class="font-18 font-weight-600"
            >Get 30% off</span
          ></v-btn
        >
        <div class="white-text font-20 mt-2 text-center">
          Completely FREE for 1 month, then $6.99/month, billed annually at
          $83.99/year for one year. Cancel anytime.
        </div>
      </div>
    </v-card>
    <v-dialog v-model="paymentDialog" max-width="600" persistent>
      <v-card class="pa-6 radius-21">
        <paymentComponent @close="close" :paymentDetails="paymentDetails" />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import paymentComponent from "@/components/Onboardingscreen/Payment/payment.component.vue";

export default {
  components: { paymentComponent },
  data() {
    return {
      chips: [
        "FREE 1 Month trial",
        "Free Client Access",
        "Tailored Checklist",
        "Efficient Solution",
        "Team Coordination",
        "Analytics",
        "Progress Tracking",
        "Upload Files",
      ],
      loader: false,
      paymentDialog: false,
      paymentDetails: {},
    };
  },
  methods: {
    close() {
      this.paymentDialog = false;
    },
    subscribePackage() {
      let itemData = {
        id: "1",
        roleId: "1",
        price: "83.99",
      };
      this.paymentDialog = true;
      this.paymentDetails = itemData;
    },
  },
};
</script>

<style scoped></style>
