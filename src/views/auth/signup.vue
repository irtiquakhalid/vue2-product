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
            <h2 class="black-text-400 font-weight-500 mb-8">
              <!-- Continue with -->
            </h2>
            <!-- <v-btn
              depressed
              class="py-8 gradiant-background radius-40"
              style="width: 70%"
            >
              <v-img
                src="/images/auth/facebook.svg"
                max-width="40"
                contain
                class="ml-6"
              ></v-img>
              <span class="font-20 ml-3 text-transform white--text"
                >Continue with Facebook</span
              >
            </v-btn> -->
            <v-btn
              depressed
              class="mt-6 py-8 gradiant-background radius-40"
              style="width: 30%"
              @click="handleAppleLogin"
            >
              <div class="d-flex w-100 justify-center align-center mr-3">
                <v-img
                  src="/images/auth/apple.svg"
                  max-width="40"
                  contain
                ></v-img>
                <span class="font-20 ml-3 text-transform white--text"
                  >Continue with Apple</span
                >
              </div>
            </v-btn>
            <v-btn
              depressed
              class="mt-6 py-8 gradiant-background radius-40"
              style="width: 30%"
              @click="handleGoogleLogin"
            >
              <v-img
                src="/images/auth/google.svg"
                max-width="40"
                contain
              ></v-img>
              <span class="font-20 ml-3 text-transform white--text"
                >Continue with Google</span
              >
            </v-btn>
            <v-btn
              depressed
              class="my-5 py-8 mt-6 gradiant-background radius-40"
              style="width: 30%"
              to="/passkey"
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
          <!-- <div class="d-flex align-end justify-center">
            <h5 class="grey-text-200 mt-8 font-weight-500">
              Already have an account?
              <router-link to="/login"
                ><span
                  class="cyan-text font-weight-600 text-decoration-underline cursor-pointer"
                >
                  Login</span
                ></router-link
              >
            </h5>
          </div> -->
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {
  GoogleAuthProvider,
  signInWithPopup,
  OAuthProvider,
} from "firebase/auth";
import { auth } from "./firebaseConfig";
import { mapGetters } from "vuex";

export default {
  name: "App",
  data() {
    return {
      loader: false,
    };
  },
  computed: {
    ...mapGetters(["getUserId", "getUserData", "getOrganizationId"]),
  },
  methods: {
    async handleGoogleLogin() {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      try {
        const result = await signInWithPopup(auth, provider);
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        if (result.user) {
          const user = result.user;
          const payload = {
            uuid: user.uid,
            email: user.email,
            name: user.displayName,
          };
          this.saveDetails(payload);
        }
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        // console.error("Error:", errorCode, errorMessage, email, credential);
      }
    },
    async handleAppleLogin() {
      const provider = new OAuthProvider("apple.com");
      provider.addScope("email");
      provider.addScope("name");
      try {
        const result = await signInWithPopup(auth, provider);
        const credential = OAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        if (result.user) {
          const user = result.user;
          const payload = {
            uuid: user.uid,
            email: user.email,
            name: user.displayName,
          };
          this.saveDetails(payload);
        }
      } catch (error) {
        console.log("catch Error :", error);
        console.error(
          "Error:",
          error.code,
          error.message,
          error.email,
          error.credential
        );
      }
    },
    saveDetails(payload) {
      this.loader = true;
      this.$store.dispatch("socialLogin", payload).then((response) => {
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
          } else if (response.data.data.user.isProfileComplete) {
            localStorage.setItem("alreadyExist", "yes");
            this.$router.push("/team");
          } else {
            localStorage.setItem("alreadyExist", "no");
            this.$router.push("/payment");
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
  },
};
</script>

<style scoped>
.v-card {
  background: transparent !important;
}
</style>
