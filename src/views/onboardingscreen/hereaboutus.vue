<template>
  <div class="here-about-us">
    <loadercomponent :loader="loader" />
    <v-row align="start" class="h-100">
      <v-col cols="12" md="3" class="d-flex align-center">
        <router-link to="/peopleyouknow">
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
          How did you hear about us?
        </h2>
        <div class="d-flex flex-column justify-space-between h-100">
          <v-card
            color="#FFFFFF"
            flat
            max-width="500"
            class="d-flex flex-column align-center radius-21"
          >
            <v-row class="px-6 mt-3">
              <v-col
                cols="12"
                md="6"
                v-for="item in hereAbout"
                :key="item.name"
              >
                <v-checkbox
                  :label="item.name"
                  class="font-weight-600"
                  color="#1BA8BB"
                  hide-details
                  v-model="item.status"
                ></v-checkbox>
              </v-col>
            </v-row>
            <div class="red--text text-center mt-1" v-if="error">
              At least one is required
            </div>
          </v-card>
          <div class="d-flex flex-column align-center mt-6">
            <v-btn
              depressed
              class="gradiant-background py-8 mt-10 radius-40"
              width="100%"
              @click="saveHAU"
              ><span
                class="text-transform font-22 cyan-text-100 font-weight-600"
                >Continue</span
              ></v-btn
            >
            <v-btn text class="my-5 d-inline-block" to="/team"
              ><h5
                class="font-weight-500 text-transform text-decoration-underline"
              >
                Skip
              </h5></v-btn
            >
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      hereAbout: [
        { name: "Reddit", status: false },
        { name: "Twitter (X)", status: false },
        { name: "App Store", status: false },
        { name: "Youtube", status: false },
        { name: "Instagram", status: false },
        { name: "TV", status: false },
        { name: "Facebook", status: false },
        { name: "Google", status: false },
        { name: "Others", status: false },
      ],
      loader: false,
      error: false,
      payload: null,
    };
  },
  watch: {
    hereAbout: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        if (
          this.hereAbout[0].status ||
          this.hereAbout[1].status ||
          this.hereAbout[2].status ||
          this.hereAbout[3].status ||
          this.hereAbout[4].status ||
          this.hereAbout[5].status ||
          this.hereAbout[6].status ||
          this.hereAbout[7].status ||
          this.hereAbout[8].status
        ) {
          this.error = false;
        }
      },
    },
  },
  computed: {
    ...mapGetters(["getUserId"]),
  },
  methods: {
    saveHAU() {
      this.payload = {
        userId: this.getUserId.toString(),
        reddit: this.hereAbout[0].status,
        appStore: this.hereAbout[2].status,
        insta: this.hereAbout[4].status,
        twitter: this.hereAbout[1].status,
        youtube: this.hereAbout[3].status,
        tv: this.hereAbout[5].status,
        google: this.hereAbout[7].status,
        facebook: this.hereAbout[6].status,
        other: this.hereAbout[8].status,
      };
      if (
        this.payload.reddit ||
        this.payload.appStore ||
        this.payload.insta ||
        this.payload.twitter ||
        this.payload.youtube ||
        this.payload.tv ||
        this.payload.google ||
        this.payload.facebook ||
        this.payload.other
      ) {
        this.loader = true;
        this.$store.dispatch("hereAboutUs", this.payload).then((response) => {
          if (response.data.succeeded === true) {
            this.loader = false;
            this.$swal.fire({
              position: "top-end",
              icon: "success",
              title: "Option selected successfully",
              showConfirmButton: false,
              timer: 2000,
              toast: true,
            });
            this.$router.push({ path: "/team" });
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
      } else {
        this.error = true;
      }
    },
  },
};
</script>

<style scoped>
.v-card {
  background: transparent !important;
}
::v-deep .v-label {
  font-size: 20px;
  color: #868686;
}
</style>
