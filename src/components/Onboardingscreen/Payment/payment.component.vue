<template>
  <div>
    <loadercomponent :loader="loader" />
    <div class="d-flex justify-space-between">
      <h4 class="dynamic-color font-28">Payment Details</h4>
      <Googlepaycomponent />
      <v-icon
        @click="close()"
        color="var(--primary-color)"
        style="font-size: 33px"
        >mdi-close-circle</v-icon
      >
    </div>
    <v-row class="mt-4">
      <v-col>
        <v-text-field
          solo
          flat
          background-color="var(--secondary-color)"
          class="radius-7"
          placeholder="First Name"
          v-model="form.firstName"
          hide-details
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          solo
          flat
          background-color="var(--secondary-color)"
          class="radius-7"
          placeholder="Last Name"
          v-model="form.lastName"
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>
    <v-text-field
      solo
      flat
      background-color="var(--secondary-color)"
      class="radius-7 mt-6"
      placeholder="Card Number"
      v-model="form.cardNumber"
      hide-details
      :maxlength="19"
    ></v-text-field>
    <div class="red--text" v-if="$v.form.cardNumber.$error">
      <div v-if="!$v.form.cardNumber.required">Card number is required</div>
      <div v-if="!$v.form.cardNumber.numeric">
        Card number should contain numbers only
      </div>
    </div>
    <v-row class="mt-3">
      <v-col cols="12" md="8">
        <v-text-field
          solo
          flat
          background-color="var(--secondary-color)"
          class="radius-7"
          placeholder="Expiry Date (MM/YY)"
          v-model="form.expiryDate"
          @input="formatExpiryDate"
          :maxlength="5"
          hide-details
        ></v-text-field>
        <div class="red--text" v-if="$v.form.expiryDate.$error">
          <div v-if="!$v.form.expiryDate.required">Expiry date is required</div>
          <div v-if="!$v.form.expiryDate.expiryDateRule">
            Invalid expiry date
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          solo
          flat
          background-color="var(--secondary-color)"
          class="radius-7"
          placeholder="CVV"
          v-model="form.cvv"
          hide-details
          :maxlength="3"
        ></v-text-field>
        <div class="red--text" v-if="$v.form.cvv.$error">
          <div v-if="!$v.form.cvv.required">CCVV is required</div>
          <div v-if="!$v.form.cvv.minLength">
            CVV should have at least 3 digiits
          </div>
          <div v-if="!$v.form.cvv.numeric">CVV should contain numbers only</div>
        </div>
      </v-col>
    </v-row>
    <v-row class="mt-8">
      <v-col>
        <v-btn
          class="w-100 py-6 radius-25 mb-3"
          color="var(--primary-color)"
          depressed
          @click="submit()"
        >
          <span class="text-transform white--text font-18">Subscribe</span>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Googlepaycomponent from "@/components/Subscription/googlepaycomponent.vue";
import { minLength } from "vuelidate/lib/validators";
import { numeric } from "vuelidate/lib/validators";
import { helpers } from "vuelidate/lib/validators";
import { required } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";

export default {
  props: ["paymentDetails"],
  components: {
    Googlepaycomponent,
  },
  data() {
    return {
      form: {
        expiryDate: "",
        cvv: "",
        cardNumber: "",
        firstName: "",
        lastName: "",
        id: "",
        subcriprtionId: "",
        roleId: "",
        paymentFrom: "Web",
        amount: "",
      },
      loader: false,
    };
  },
  validations: {
    form: {
      cardNumber: {
        required,
        numeric,
      },
      expiryDate: {
        required,
        expiryDateRule: helpers.regex(
          "expiryDate",
          /^(0[1-9]|1[0-2])\/([0-9]{2})$/
        ),
      },
      cvv: {
        required,
        minLength: minLength(3),
        numeric,
      },
    },
  },
  computed: {
    ...mapGetters(["getUserId", "getOrganizationId"]),
  },
  mounted() {
    this.mapData();
  },
  watch: {
    paymentDetails: {
      immediate: true,
      deep: true,
      handler() {
        this.mapData();
      },
    },
  },
  methods: {
    // Automatically format expiry date
    formatExpiryDate(value) {
      let newValue = value.replace(/[^\d]/g, ""); // Remove all non-digit characters
      if (newValue.length >= 2 && newValue.length <= 4) {
        newValue = `${newValue.substring(0, 2)}/${newValue.substring(2, 4)}`;
      }
      this.form.expiryDate = newValue;
    },
    mapData() {
      this.form.id = String(this.getUserId); // Ensure id is a string
      this.form.subcriprtionId = this.paymentDetails?.id;
      this.form.amount = this.paymentDetails?.price;
      if (this.paymentDetails?.paymentType === "personal-details") {
        this.form.roleId = "1";
      } else if (this.paymentDetails?.paymentType === "subscription-plan") {
        this.form.roleId = "2";
      } else {
        this.form.roleId = this.paymentDetails?.roleId;
      }
    },
    resetForm() {
      this.form = {
        expiryDate: "",
        cvv: "",
        cardNumber: "",
        firstName: "",
        lastName: "",
        id: "",
        subcriprtionId: "",
        roleId: "",
        paymentFrom: "Web",
        amount: "",
      };
    },
    close() {
      this.$emit("close");
      this.resetForm();
      this.$v.$reset();
    },
    submit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
      } else {
        this.subscribePackage();
      }
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
        this.loader = true;
        this.$store
          .dispatch("subscriptionPlan", this.form)
          .then((response) => {
            if (response?.data?.succeeded === true) {
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
                response?.data?.data?.organizationId
              );
              localStorage.removeItem("skipPayment"); // it's a broker
              this.$store.dispatch("getRolePermissions", "own");
              this.$router.push({ path: "uploadimage" });
            } else {
              this.loader = false;
              this.$swal.fire({
                position: "top-end",
                icon: "error",
                title: response.data?.message || "An unexpected error occurred",
                showConfirmButton: false,
                timer: 2000,
                toast: true,
              });
            }
          })
          .catch((error) => {
            this.loader = false;
            this.$swal.fire({
              position: "top-end",
              icon: "error",
              title: error?.message || "An unexpected error occurred",
              showConfirmButton: false,
              timer: 2000,
              toast: true,
            });
          });
      }
    },
    availFreeMonth() {
      this.$store.dispatch("subscriptionFreeMonth", true).then((response) => {
        if (response.succeeded === true) {
          this.loader = false;
          this.$swal.fire({
            position: "top-end",
            icon: "success",
            title: "Package selected and offer avail successfully",
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

<style></style>
