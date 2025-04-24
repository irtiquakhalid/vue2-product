<template>
  <div>
    <loadercomponent :loader="loader" />
    <div class="d-flex justify-space-between">
      <h3 class="dynamic-color">Add Member</h3>
      <v-icon
        @click="close()"
        color="var(--primary-color)"
        style="font-size: 33px"
        >mdi-close-circle</v-icon
      >
    </div>

    <div>
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
    <div class="d-flex justify-center mb-8 mt-2">
      <div class="upload-image-input-members">
        <v-avatar size="150" class="border-circle">
          <v-img
            :src="image"
            class="radius-50"
            max-width="100%"
            v-if="image"
          ></v-img>
          <v-img
            src="/images/singleuser.png"
            max-width="60px"
            contain
            v-else
          ></v-img>
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

    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          placeholder="Name"
          hide-details
          solo
          flat
          background-color="var(--secondary-color)"
          v-model="form.name"
        >
          <template v-slot:prepend-inner>
            <v-icon class="px-3" contain color="var(--primary-color)"
              >mdi-account</v-icon
            >
          </template>
        </v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          placeholder="Email"
          hide-details
          solo
          flat
          background-color="var(--secondary-color)"
          v-model="form.email"
        >
          <template v-slot:prepend-inner>
            <v-icon class="px-3" contain color="var(--primary-color)"
              >mdi-email</v-icon
            >
          </template>
        </v-text-field>
        <div class="red--text" v-if="$v.form.email.$error">
          <div v-if="!$v.form.email.required">Email is required</div>
          <div v-if="!$v.form.email.email">Invalid Email</div>
        </div>
      </v-col>
    </v-row>
    <!-- <v-row>
      <v-col cols="12" md="6">
        <v-select
          placeholder="Add A Buyer"
          hide-details
          solo
          flat
          class="radius-7"
          :items="subRoles"
          background-color="#E1F2FF"
          item-text="rolename"
          item-value="id"
          v-model="form.SubRoleId"
        >
          <template v-slot:prepend-inner>
            <v-img src="/images/teams/user.svg" class="px-3" contain></v-img>
          </template>
        </v-select>
      </v-col>
    </v-row> -->

    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          placeholder="Phone"
          hide-details
          solo
          flat
          background-color="var(--secondary-color)"
          v-model="form.phone"
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
          v-model="form.address"
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
      <v-col cols="12" md="6">
        <v-btn
          depressed
          class="radius-25 w-100 py-6"
          color="var(--primary-color)"
          @click="addMember"
        >
          <span class="text-transform font-18 white--text">Save</span></v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { email } from "vuelidate/lib/validators";
import { required } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      chip2: false,
      form: {
        createdById: null,
        name: "",
        address: "",
        phone: "",
        email: "",
        roleId: "2",
        teamId: null,
        organizationId: null,
        userProfile: "",
      },
      subRoles: [],
      loader: false,
      image: "",
    };
  },
  validations: {
    form: {
      email: {
        required,
        email,
      },
    },
  },
  computed: {
    ...mapGetters(["getSubRoles", "getUserId", "getOrganizationId"]),
  },
  methods: {
    addMember() {
      if (this.$v.$invalid) {
        this.$v.$touch();
      } else {
        this.loader = true;
        this.form.createdById = this.getUserId.toString();
        this.form.organizationId = this.getOrganizationId.toString();
        this.form.teamId = this.$route.query.teamId;
        this.$store.dispatch("saveTeamMember", this.form).then((response) => {
          if (response.data.succeeded === true) {
            this.loader = false;
            this.$swal.fire({
              position: "top-end",
              icon: "success",
              title: "Member added successfully",
              showConfirmButton: false,
              timer: 2000,
              toast: true,
            });
            this.close();
            this.fetchList();
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
    fetchList() {
      this.$emit("fetchList");
    },
    resetForm() {
      this.form = {
        createdById: null,
        name: "",
        address: "",
        phone: "",
        email: "",
        roleId: "2",
        teamId: null,
        organizationId: null,
        userProfile: "",
      };
      this.image = "";
    },
    close() {
      this.$emit("close");
      this.resetForm();
      this.$v.$reset();
    },
    handleImage(event) {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.image = fileReader.result;
      };
      fileReader.readAsDataURL(file);
      this.form.userProfile = file;
    },
  },
};
</script>

<style scoped>
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
