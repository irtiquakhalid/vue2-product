<template>
  <div class="payment">
    <!-- <div class="d-flex align-start">
      <div class="tabs-container">
        <div
          :class="[
            customize === 'broker'
              ? 'personal-details-not-active'
              : 'personal-details',
            { 'gradiant-background': customize === 'broker' },
          ]"
          @click="customize = 'broker'"
        >
          <v-img
            :src="
              customize === 'broker'
                ? '/images/profile/white-personal.svg'
                : '/images/profile/cyan-personal.svg'
            "
          ></v-img>
          <h3 class="ml-5">Real Estate Broker</h3>
        </div>
        <div
          :class="[
            customize === 'retailor'
              ? 'subscription-plan-not-active'
              : 'subscription-plan',
            { 'gradiant-background': customize === 'retailor' },
          ]"
          @click="customize = 'retailor'"
        >
          <v-img
            :src="
              customize === 'retailor'
                ? '/images/profile/white-personal.svg'
                : '/images/profile/cyan-personal.svg'
            "
          ></v-img>
          <h3 class="ml-5">Real Estate Agent</h3>
        </div>
      </div>
    </div> -->

    <v-row class="tabs-container align-start" style="position: relative">
      <v-col
        cols="1"
        :class="$vuetify.breakpoint.width <= 1460 ? 'mt-n1' : 'mt-n7'"
      >
        <v-img
          src="/images/onboardingscreen/newLogooo.png"
          width="120"
          contain class="ml-8"
        ></v-img>
      </v-col>

      <v-col cols="12" xl="5" md="5">
        <div
          style="width: 100%;margin:0 0"
          :class="[
            customize === 'broker'
              ? 'personal-details-not-active'
              : 'personal-details',
            { 'gradiant-background': customize === 'broker' },
          ]"
          @click="customize = 'broker'"
        >
          <v-img
            :src="
              customize === 'broker'
                ? '/images/profile/white-personal.svg'
                : '/images/profile/cyan-personal.svg'
            "
          ></v-img>
          <h3 class="ml-5">Real Estate Broker</h3>
        </div>
      </v-col>
      <v-col cols="12" xl="5" md="5">
        <div
          style="width: 100%;margin:0 0"
          :class="[
            customize === 'retailor'
              ? 'subscription-plan-not-active'
              : 'subscription-plan',
            { 'gradiant-background': customize === 'retailor' },
          ]"
          @click="customize = 'retailor'"
        >
          <v-img
            :src="
              customize === 'retailor'
                ? '/images/profile/white-personal.svg'
                : '/images/profile/cyan-personal.svg'
            "
          ></v-img>
          <h3 class="ml-5">Real Estate Agent</h3>
        </div>
      </v-col>

      <router-link to="/payment" style="left: 0; position: absolute">
        <v-icon style="color: #1ba8bb; font-size: 45px" class="mt-3"
          >mdi-arrow-left-box</v-icon
        >
      </router-link>
    </v-row>

    <div class="d-flex justify-center align-center">
      <h2 class="black-text-400 font-weight-500">
        Access Your Real Estate Checklist
      </h2>
      <div></div>
    </div>

    <div v-if="customize === 'retailor'">
      <customizeretailercomponent />
    </div>
    <div v-if="customize === 'broker'">
      <customizebrokercomponent />
    </div>
  </div>
</template>

<script>
import customizeretailercomponent from "@/components/Onboardingscreen/Payment/retailorcustomize.component.vue";
import customizebrokercomponent from "@/components/Onboardingscreen/Payment/brokercustomize.component.vue";
export default {
  components: { customizeretailercomponent, customizebrokercomponent },
  data() {
    return {
      customize: "broker",
    };
  },
  methods: {},
};
</script>

<style></style>
