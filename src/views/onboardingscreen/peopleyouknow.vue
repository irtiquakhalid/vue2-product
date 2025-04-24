<template>
  <div class="people-you-know">
    <v-row align="start" class="h-100">
      <v-col cols="12" md="3" class="d-flex align-center">
        <router-link to="/pushnotification">
        <v-icon style="color: #1ba8bb;font-size: 45px" class="mt-6"
          >mdi-arrow-left-box</v-icon
        >
      </router-link>
        <div class="d-flex justify-space-between align-center ml-5">
          <div>
            <v-img
              src="/images/onboardingscreen/newLogooo.png"
              max-width="120"
              contain
            >
            </v-img>
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        md="5"
        lg="7"
        class="d-flex flex-column align-center h-100"
      >
        <h2 class="black-text-400 font-weight-500 px-10 text-center mb-8">
          Let's find people you know
        </h2>
        <div class="px-16">
          <v-img src="/images/onboardingscreen/line.png"></v-img>
        </div>
        <v-card
          flat
          max-width="500"
          class="d-flex flex-column justify-space-between align-center radius-21 h-100"
        >
          <div>
            <h3
              style="text-align: center"
              class="black-text-400 font-weight-500 mt-8 font-28"
            >
              Join your brokerage, team, or just connect with other Agents.
            </h3>
            <v-img
              src="/images/onboardingscreen/peopleyouknow.png"
              class="my-8"
              max-width="400"
              contain
            ></v-img>
          </div>
          <div class="w-100 d-flex align-center flex-column">
            <v-btn
              depressed
              class="gradiant-background py-8 mt-10 radius-40"
              width="100%"
              to="/sendrequests"
              ><span
                class="text-transform font-22 cyan-text-100 font-weight-600"
                >Continue</span
              ></v-btn
            >
            <v-btn text class="my-5" to="/hereaboutus"
              ><h5
                class="font-weight-500 text-transform text-decoration-underline"
              >
                Skip
              </h5></v-btn
            >
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.v-card {
  background: transparent;
}
</style>
