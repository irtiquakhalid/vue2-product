<template>
  <div>
    <loadercomponent :loader="loader" />
    <div class="d-flex justify-space-between mb-6">
      <h3 style="color: var(--primary-color);">Edit Member</h3>
      <v-icon
        @click="close()"
        color="var(--primary-color)"
        style="font-size: 33px"
        >mdi-close-circle</v-icon
      >
    </div>

    <div class="d-flex justify-center mb-8 mt-2">
      <div class="upload-image-input-members">
        <v-avatar size="150" class="border-circle">
          <v-img
            :src="image || (form.userProfile ? `${imageURL}${form.userProfile}` : image)"
            class="radius-50"
            max-width="100%"
            v-if="image || form.userProfile"
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
          disabled
        >
        <template v-slot:prepend-inner>
            <v-icon class="px-3" contain color="var(--primary-color)"
              >mdi-email</v-icon
            >
          </template>
        </v-text-field>
        <div class="red--text" v-if="$v.form.email.$error">
          <div v-if="!$v.form.email.required">Email is required</div>
          <div v-if="!$v.form.email.email">Invalid email</div>
        </div>
      </v-col>
    </v-row>

    <!-- <v-row>
      <v-col cols="12" md="6">
              <v-select
              placeholder="Add A Buyer"
              hide-details
              solo
              class="radius-7"
              flat
              :items="[
                'Seller',
                'Escrow agent',
                'Realtor',
                'Attorney',
              ]"
              background-color="#E1F2FF">
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

    <v-row class="mt-9 mb-2 d-flex justify-end">
      <v-col cols="12" md="6">
        <v-btn
          depressed
          class="radius-25 w-100 py-6"
          color="var(--primary-color)"
          @click="updateUser"
        >
          <span class="text-transform font-18 white--text">Save</span></v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { email } from "vuelidate/lib/validators";
import { required } from "vuelidate/lib/validators";
export default {
  props: ["editId"],
  data() {
    return {
      form: {
        name: "",
        email: "",
      },
      loader: false,
      image: "",
      imageURL: process.env.VUE_APP_IMG_API
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
    ...mapGetters(["getUserId", "getUserData", "getOrganizationId"]),
  },
  mounted() {
    this.fetchdata();
  },
  watch: {
    editId: {
      immediate: true,
      handler() {
        if (this.form.id) {
          this.fetchdata();
        }
      },
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
      this.form.userProfile = file;
    },
    updateUser() {
      this.loader = true;
      const payload = {
        id: this.form.id.toString(),
        name: this.form.name,
        email: this.form.email,
        roleId: "2",
        phone: this.form.phone,
        address: this.form.address,
        createdById: this.getUserId,
        teamId: this.$route.query.teamId,
        organizationId: this.getOrganizationId,
        userProfile: this.form.userProfile
      };
      this.$store.dispatch("saveTeamMember", payload).then((response) => {
        if (response.data.succeeded === true) {
          this.loader = false;
          this.$swal.fire({
            position: "top-end",
            icon: "success",
            title: "Member updated successfully",
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
    },
    fetchdata() {
      this.loader = true;
      const payload = {
        id: this.editId,
        orgId: this.getOrganizationId,
      };
      this.$store.dispatch("getUserData", payload).then(() => {
        this.loader = false;
        this.form = this.getUserData.userList[0];
      });
    },
    close() {
      this.$emit("close");
      this.image = "";
      this.fetchdata();
      this.$v.$reset();
    },
    fetchList() {
      this.$emit("fetchList");
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

