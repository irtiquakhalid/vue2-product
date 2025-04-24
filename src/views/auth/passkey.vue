<template>
  <div class="signup">
    <loadercomponent :loader="loader" />
    <v-row align="start" class="h-100">
      <v-col cols="12" md="12" lg="12" class="h-100">
        <div
          class="d-flex flex-column justify-center align-center"
          style="flex-grow: 1"
        >
          <v-img
            src="/images/onboardingscreen/newLogooo.png"
            max-width="15%"
            contain
          ></v-img>
        </div>
        <div class="d-flex flex-column justify-space-between h-100">
          <v-card
            flat
            min-width="500"
            class="d-flex flex-column align-center radius-21"
          >
            <h2 class="black-text-400 font-weight-500 mt-6">Continue with</h2>
            <div style="width: 35%">
              <v-text-field
                style="border-radius: 11px"
                solo
                class="mt-5"
                v-model="passkey"
                hide-details
                label="Enter passkey"
                background-color="white"
              ></v-text-field>
              <div class="red--text" v-if="$v.passkey.$error">
                <div v-if="!$v.passkey.required">Passkey is required</div>
              </div>
            </div>
            <v-btn
              depressed
              class="my-5 py-8 mt-8 gradiant-background radius-40"
              style="width: 30%"
              @click="handlePassKeyLogin"
            >
              <v-img
                src="/images/auth/passkey.svg"
                max-width="40"
                contain
              ></v-img>
              <span class="font-20 ml-3 text-transform white--text"
                >Continue with Passkey</span
              >
            </v-btn>
            <h5
              class="mx-10 mb-10 mt-5 grey-text-200 text-center font-weight-500"
              style="width: 68%"
            >
              By continue to sign in, you agree to our<br />
              <a
                style="text-decoration: underline"
                href="https://docs.google.com/document/d/1BX8kRqr_ymLkXjhRRSmVQ0SRv7j7WzirvdNnisO8LaE/edit?tab=t.0#heading=h.bss271r3vtys"
                >Terms</a
              >
              and
              <a
                href="https://www.realestateclapp.com/privacy-policy"
                style="text-decoration: underline"
                >Privacy policy</a
              >
            </h5>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  name: "App",
  data() {
    return {
      loader: false,
      passkey: "",
    };
  },
  validations: {
    passkey: {
      required,
    },
  },
  methods: {
    async handlePassKeyLogin() {
      if (this.$v.$invalid) {
        this.$v.$touch();
      } else {
        this.loader = true;
        this.$store.dispatch("signUpPassKey", this.passkey).then((response) => {
          if (response.data.succeeded === true) {
            this.loader = false;
            this.$swal.fire({
              position: "top-end",
              icon: "success",
              title: "Login successfully",
              showConfirmButton: false,
              timer: 2000,
              toast: true,
            });
            this.$store.dispatch("getUserId", response.data.data.user.id);
            localStorage.setItem("userToken", response.data.data.token);
            if (!response.data.data.user?.skipSub) {
              if (
                response.data.data?.ownOrganization?.organizationId ||
                response.data.data.user?.orgId?.organizationId
              ) {
                this.$store.dispatch(
                  "getOrganizationId",
                  response.data.data?.ownOrganization?.organizationId ||
                    response.data.data.user.orgId.organizationId
                );
                this.$store.dispatch("getRolePermissions", "own");
              }
            }
            if (response.data.data.user?.skipSub == false) {
              const payload = {
                id: response.data.data.user.id,
                isSkipSub: true,
              };
              this.$store.dispatch("skipSubscription", payload).then(() => {
                localStorage.setItem("skipPayment", "true");
                this.$router.push("/checklist");
              });
            }
            if (response.data.data.user?.skipSub) {
              localStorage.setItem(
                "skipPayment",
                response.data.data.user.skipSub
              );
              const skipPayment = localStorage.getItem("skipPayment");
              if (skipPayment) {
                this.$router.push("/checklist");
              } else {
                this.$router.push("/payment");
              }
            }
            //  else if (response.data.data.user.isProfileComplete) {
            //  localStorage.setItem("alreadyExist", "yes");
            //    this.$router.push("/team");
            //  } else {
            //    localStorage.setItem("alreadyExist", "no");
            //    this.$router.push("/payment");
            //  }
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
  },
};
</script>

<style scoped>
.v-card {
  background: transparent !important;
}
</style>
