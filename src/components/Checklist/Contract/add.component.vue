<template>
  <div>
    <loadercomponent :loader="loader" />
    <div class="d-flex justify-space-between">
      <h3 class="dynamic-color">Add {{ listItem.name }}</h3>
      <v-icon
        @click="close()"
        :color="contractColor ? contractColor : 'var(--primary-color)'"
        style="font-size: 33px"
        >mdi-close-circle</v-icon
      >
    </div>
    <div class="d-flex justify-center mb-8 mt-2" v-if="listItem.module">
      <div class="upload-image-input-members">
        <v-avatar size="150" class="border-circle">
          <v-img
            :src="image"
            class="radius-50"
            max-width="100%"
            v-if="image"
          ></v-img>
          <v-img src="/images/singleuser.png" max-width="60px" contain v-else>
          </v-img>
        </v-avatar>
        <div class="select-input">
          <input
            type="file"
            @change="handleImage"
            accept="image/png, image/jpeg, image/bmp"
          />
        </div>
      </div>
    </div>
    <div class="mb-5">
      <v-chip
        v-if="chip2"
        class="ma-2"
        close
        color="#E1F2FF"
        text-color="grey"
        @click:close="chip2 = false"
      >
        Remove
      </v-chip>
    </div>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          placeholder="Name"
          hide-details
          solo
          flat
          background-color="var(--secondary-color)"
          v-model="form.Name"
        >
          <template v-slot:prepend-inner>
            <v-icon class="px-3" contain color="var(--primary-color)"
              >mdi-account</v-icon
            >
          </template>
        </v-text-field>
      </v-col>
      <v-col cols="12" md="6" v-if="!showPassKeyField">
        <v-text-field
          placeholder="Email"
          hide-details
          solo
          flat
          background-color="var(--secondary-color)"
          v-model="form.Email"
        >
          <template v-slot:prepend-inner>
            <v-icon class="px-3" contain color="var(--primary-color)"
              >mdi-email</v-icon
            >
          </template>
        </v-text-field>
        <div class="red--text" v-if="$v.form.Email.$error">
          <div v-if="!$v.form.Email.required">Email is required</div>
          <div v-if="!$v.form.Email.email">Invalid email</div>
        </div>
      </v-col>

      <v-col cols="12" md="6" v-if="showPassKeyField">
        <v-text-field
          placeholder="PassKey"
          hide-details
          solo
          flat
          background-color="var(--secondary-color)"
          v-model="form.passkey"
          readonly
        >
          <template v-slot:prepend-inner>
            <v-icon color="var(--primary-color)" class="px-3" contain
              >mdi-key-variant</v-icon
            >
          </template>
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          placeholder="Phone"
          hide-details
          solo
          accept="number"
          flat
          background-color="var(--secondary-color)"
          v-model="form.Phone"
          type="number"
        >
          <template v-slot:prepend-inner>
            <v-icon class="px-3" contain color="var(--primary-color)"
              >mdi-phone</v-icon
            >
          </template>
        </v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          placeholder="Location"
          hide-details
          solo
          flat
          background-color="var(--secondary-color)"
          v-model="form.Address"
        >
          <template v-slot:prepend-inner>
            <v-icon color="var(--primary-color)" class="px-3" contain
              >mdi-map-marker</v-icon
            >
          </template>
        </v-text-field>
      </v-col>
    </v-row>
    <v-row class="mt-6 mb-2 d-flex justify-end">
      <v-col cols="12" md="12">
        <v-btn
          depressed
          class="radius-25 w-100 py-6"
          :color="contractColor ? contractColor : 'var(--primary-color)'"
          @click="addMember"
        >
          <span class="text-transform font-18 white--text">Save</span></v-btn
        >
      </v-col>
    </v-row>
    <v-row class="mt-3 mb-2 d-flex justify-center" v-if="showGenerateKeyButton">
      <div style="display: flex; justify-content: center">
        <span>Or With</span>
      </div>
      <v-col
        cols="12"
        md="12"
        v-if="this.form.passkey && this.showPassKeyField"
      >
        <v-btn
          depressed
          class="radius-25 w-100 py-6 templates-item"
          @click="
            showPassKeyField = !showPassKeyField;
            if (form.passkey) form.passkey = '';
          "
        >
          <span class="text-transform font-18 white--text">Use Email</span>
        </v-btn>
      </v-col>
      <v-col cols="12" md="12" v-if="!this.showPassKeyField">
        <v-btn
          depressed
          class="radius-25 w-100 py-6 templates-item"
          @click="generateKey"
        >
          <span class="text-transform font-18 white--text"
            >Generate PassKey</span
          >
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { email } from "vuelidate/lib/validators";
import { required } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
export default {
  props: ["listItem", "contractColor"],
  data() {
    return {
      form: {
        organizationId: null,
        Name: "",
        Address: "",
        Phone: "",
        Email: "",
        roleId: "",
        createdById: "",
        passkey: "",
      },
      showPassKeyField: false, // New data property
      subRoles: [],
      generatedKeys: [],
      loader: false,
      image: "",
      userProfile: "",
    };
  },
  mounted() {
    this.mapData();
  },
  watch: {
    listItem: {
      immediate: true,
      handler() {
        this.mapData();
      },
    },
  },
  validations: {
    form: {
      Email: {
        required,
        email,
      },
    },
  },
  computed: {
    ...mapGetters(["getSubRoles", "getUserId", "getOrganizationId"]),
    showGenerateKeyButton() {
      return this.listItem.name === "Buyer" || this.listItem.name === "Seller";
    },
  },
  methods: {
    handleImage(event) {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.image = fileReader.result;
      };
      fileReader.readAsDataURL(file);
      this.userProfile = file;
    },

    mapData() {
      this.form.roleId = this.listItem.id;
    },
    generateKey() {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result;
      do {
        result = "";
        for (let i = 0; i < 14; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * characters.length)
          );
        }
      } while (this.generatedKeys.includes(result));

      this.generatedKeys.push(result);
      this.form.passkey = result;
      this.showPassKeyField = true;
    },
    showToast(type, message) {
      this.$swal.fire({
        position: "top-end",
        icon: type,
        title: message,
        showConfirmButton: false,
        timer: 2000,
        toast: true,
      });
    },
    addMember() {
      // Trigger validations
      this.$v.$touch();

      // Check for email or passkey
      if (
        this.listItem.name === "Escrow Agent" ||
        this.listItem.name === "Realtor" ||
        this.listItem.name === "Attorney"
      ) {
        if (!this.form.Email) {
          this.$swal.fire({
            position: "top-center",
            icon: "warning",
            title: "Please enter Email",
            showConfirmButton: false,
            timer: 2000,
          });
          return; // Stop execution if validation fails
        }
      } else {
        if (!this.form.Email && !this.form.passkey) {
          this.$swal.fire({
            position: "top-center",
            icon: "warning",
            title: "Please enter Email or Passkey",
            showConfirmButton: false,
            timer: 2000,
          });
          return; // Stop execution if validation fails
        }
      }

      // Show loader while processing
      this.loader = true;

      // Assign createdById and organizationId dynamically
      this.form.createdById = this.getUserId.toString();
      this.form.organizationId = this.getOrganizationId.toString();

      // Determine the correct API URL
      const url = this.listItem.module
        ? "saveMember"
        : this.form.passkey
        ? "memberGeneratePassKey"
        : "saveMemberForContractSchedule";

      // Include userProfile if the module condition is true
      if (this.listItem.module) {
        this.form = { ...this.form, userProfile: this.userProfile };
      }

      // Dispatch the Vuex action to send the data
      this.$store
        .dispatch(url, this.form)
        .then((response) => {
          this.loader = false;

          // Check if the API call was successful
          if (response.data.succeeded) {
            this.close();
            this.fetchList(response);

            const successMessage = this.listItem.module
              ? "Member saved successfully"
              : response.data.message;

            this.showToast("success", successMessage);
          } else {
            this.showToast("error", response.data.message);
          }
        })
        .catch((error) => {
          this.loader = false;

          // Handle server errors or network issues
          this.showToast(
            "error",
            error.response?.data?.message || "An unexpected error occurred"
          );
        });
    },
    fetchList(response) {
      this.$emit("fetchList");
      this.$emit("updateDropdownValues", {
        listItem: this.listItem,
        res: response,
      });
    },
    resetForm() {
      this.form = {
        organizationId: null,
        Name: "",
        Address: "",
        Phone: "",
        Email: "",
        roleId: this.listItem.id,
        createdById: "",
      };
      this.image = "";
    },
    close() {
      this.$emit("close");
      this.resetForm();
      this.showPassKeyField = false;
      this.$v.$reset();
    },
  },
};
</script>

<style scoped lang="scss" >
.templates-item {
  border: 1px solid var(--primary-color);
  background-color: var(--secondary-color);
  border-radius: 12px;
  padding: 0.4rem 2rem;
  h5 {
    color: var(--primary-color) !important;
  }
  span {
    color: var(--primary-color) !important;
  }
}
.upload-image-input-members {
  position: relative;
  text-align: center;
}

.border-circle {
  border-radius: 50%;
  border: 4px solid var(--primary-color);
}

.radius-50 {
  border-radius: 50%;
}

.select-input {
  cursor: pointer;
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translateX(-50%);
}

input[type="file"] {
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
}
</style>
