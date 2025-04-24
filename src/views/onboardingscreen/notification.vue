<template>
  <div class="push-notification">
    <v-row align="start" class="h-100">
      <v-col cols="12" md="3" class="d-flex align-center">
        <router-link to="/color">
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
      <v-col cols="12" md="5" lg="7" class="d-flex flex-column align-center h-100">
        <h2 class="black-text-400 font-weight-500 px-10 text-center mb-8">
          Notifications
        </h2>
        <div class="px-16">
          <v-img src="/images/onboardingscreen/line.png"></v-img>
        </div>
        <v-card
          flat
          max-width="500"
          class="d-flex flex-column justify-space-between align-center radius-21 h-100"
        >
         <div class="w-100">
          <h3
            style="text-align: center"
            class="black-text-400 font-weight-500 mt-8 font-28"
          >
            Fully customize your notifications. Opt in or out entirely, or
            select specific tasks or contracts to receive alerts for.
          </h3>
          <v-img
            src="/images/onboardingscreen/notification.png"
            class="mt-14"
            style="width: 100%"
            contain
          ></v-img>
         </div>
         <div class="d-flex align-center flex-column w-100">
           <v-btn
             depressed
             class="gradiant-background py-8 mt-16 radius-40"
             width="100%"
             to="/peopleyouknow"
             ><span class="text-transform font-22 cyan-text-100 font-weight-600"
               >Allow Notifications</span
             ></v-btn
           >
           <v-btn text class="my-5" to="/peopleyouknow"
             ><h5 class="font-weight-500 text-decoration-underline text-transform">Maybe later</h5></v-btn
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
 .v-card{
   background: transparent;
 }
</style>
