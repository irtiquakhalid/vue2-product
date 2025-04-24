<template>
  <div class="detail">
    <loadercomponent :loader="loader" />
    <v-row no-gutters class="white-background radius-21 mt-14 py-13 px-16">
      <v-col cols="12" md="4" class="d-flex align-center flex-column">
        <div class="image-container">
          <v-avatar size="100%" v-if="form.userProfile">
            <v-img
              :src="`${imageURL}${form.userProfile}`"
              class="image"
              max-width="100%"
            ></v-img>
          </v-avatar>
          <div v-else>
            <v-img
              class="image"
              src="/images/singleuser.png"
              max-width="100px"
              contain
            >
            </v-img>
          </div>
          <div class="edit-image">
            <v-icon
              class="cursor-pointer"
              @click="uploadImageDialog = true"
              style="font-size: 32px"
              color="var(--primary-color)"
              >mdi-square-edit-outline</v-icon
            >
          </div>
        </div>
        <div>
          <h4
            style="color: var(--primary-color)"
            class="mt-4 font-weight-500 text-center"
          >
            Profile Image
          </h4>
        </div>
      </v-col>
      <v-col cols="12" md="8">
        <v-row>
          <v-col cols="12" md="6">
            <small
              style="color: var(--primary-color)"
              class="font-18 font-weight-500"
              >Name</small
            >
            <v-text-field
              solo
              hide-details
              flat
              background-color="var(--secondary-color)"
              class="radius-7 mt-2"
              v-model="form.name"
            >
              <template v-slot:append>
                <v-icon
                  style="font-size: 28px"
                  class="px-3 cursor-pointer"
                  color="var(--primary-color)"
                  >mdi-square-edit-outline</v-icon
                >
              </template>
            </v-text-field>
            <div class="red--text" v-if="$v.form.name.$error">
              Name is required
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <small
              style="color: var(--primary-color)"
              class="font-18 font-weight-500"
              >Email</small
            >
            <v-text-field
              solo
              hide-details
              flat
              background-color="var(--secondary-color)"
              class="radius-7 mt-2"
              v-model="form.email"
              disabled
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <small
              style="color: var(--primary-color)"
              class="font-18 font-weight-500"
              >Phone</small
            >
            <v-text-field
              solo
              hide-details
              flat
              background-color="var(--secondary-color)"
              class="radius-7 mt-2"
              v-model="form.phone"
              type="number"
            >
              <template v-slot:append>
                <v-icon
                  style="font-size: 28px"
                  class="px-3 cursor-pointer"
                  color="var(--primary-color)"
                  >mdi-square-edit-outline</v-icon
                >
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <small
              style="color: var(--primary-color)"
              class="font-18 font-weight-500"
              >Address</small
            >
            <v-text-field
              solo
              hide-details
              flat
              background-color="var(--secondary-color)"
              class="radius-7 mt-2"
              v-model="form.address"
            >
              <template v-slot:append>
                <v-icon
                  style="font-size: 28px"
                  class="px-3 cursor-pointer"
                  color="var(--primary-color)"
                  >mdi-square-edit-outline</v-icon
                >
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row v-if="!skipPayment && getOrganizationId">
          <v-col cols="12" md="6">
            <small
              style="color: var(--primary-color)"
              class="font-18 font-weight-500"
              >Organization name</small
            >
            <v-text-field
              solo
              hide-details
              flat
              background-color="var(--secondary-color)"
              class="radius-7 mt-2"
              v-model="form.OrganizationName"
              :disabled="getRolePermissions != 'own'"
            >
              <template v-slot:append>
                <v-icon
                  style="font-size: 28px"
                  class="px-3 cursor-pointer"
                  color="var(--primary-color)"
                  v-if="getRolePermissions == 'own'"
                  >mdi-square-edit-outline</v-icon
                >
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="mt-8">
            <v-btn
              depressed
              color="red"
              class="radius-25 py-6 w-100"
              @click="
                () => {
                  deleteAccountDialog = true;
                }
              "
            >
              <v-icon class="white--text">mdi-delete</v-icon>
              <span class="font-20 white--text text-transform ml-2">
                Delete Account</span
              >
            </v-btn>
          </v-col>
          <v-col cols="12" md="6" class="mt-8">
            <v-btn
              depressed
              color="var(--primary-color)"
              class="radius-25 py-6 w-100"
              @click="saveChanges"
            >
              <span class="font-20 white--text text-transform">Save</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-dialog v-model="uploadImageDialog" persistent max-width="500">
      <v-card class="pa-6 radius-21">
        <uploadcomponent
          @close="close"
          :formData="form.id"
          @fetchList="fetchdata"
        />
      </v-card>
    </v-dialog>
    <!---------------- CHANGE PASSWORD --------------------->
    <v-dialog v-model="changePasswordDialog" max-width="550" persistent>
      <v-card class="pa-6 radius-21">
        <div class="d-flex justify-space-between mb-8">
          <h3 class="cyan-text">Change Password</h3>
          <v-img
            src="/images/close-icon.svg"
            contain
            class="cursor-pointer"
            @click="changePasswordDialog = false"
            max-width="50"
          ></v-img>
        </div>

        <v-row>
          <v-col cols="12">
            <small class="cyan-text font-18 font-weight-500">Password</small>
            <v-text-field
              solo
              flat
              background-color="#E1F2FF"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              class="radius-7"
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <small class="cyan-text font-18 font-weight-500"
              >New Password</small
            >
            <v-text-field
              solo
              flat
              background-color="#E1F2FF"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show2 ? 'text' : 'password'"
              name="input-10-1"
              class="radius-7"
              @click:append="show2 = !show2"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn class="py-6 my-4 cyan-background w-100 radius-25"
          ><span class="text-transform font-18 white--text">Save</span></v-btn
        >
      </v-card>
    </v-dialog>
    <!---------------- DELETE ACCOUNT  --------------------->
    <v-dialog v-model="deleteAccountDialog" max-width="400">
      <v-card class="pa-6 radius-21">
        <div class="d-flex justify-end">
          <v-icon
            @click="deleteAccountDialog = false"
            color="var(--primary-color)"
            style="font-size: 33px"
            >mdi-close-circle</v-icon
          >
        </div>
        <div class="d-flex justify-center">
          <deletesvgcomponent />
        </div>
        <h3
          class="font-weight-500 text-center my-5"
          style="color: var(--primary-color)"
        >
          Are you sure?
        </h3>
        <h6
          class="text-center font-weight-500"
          style="color: var(--primary-color)"
        >
          Are you sure you want to delete your account? This action is
          irreversible and all your data will be permanently removed.
        </h6>
        <v-row class="mt-4 mb-1">
          <v-col cols="12" md="6">
            <v-btn
              class="py-6 w-100 radius-25"
              color="var(--primary-color)"
              @click="
                () => {
                  deleteAccountDialog = false;
                }
              "
              ><span class="text-transform font-18 white--text">Cancel</span>
            </v-btn>
          </v-col>
          <v-col cols="12" md="6">
            <v-btn
              class="py-6 w-100 radius-25"
              color="red"
              @click="deleteAccount()"
              ><span class="text-transform font-18 white--text">Delete</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import uploadcomponent from "./upload.component.vue";
import { required } from "vuelidate/lib/validators";
import deletesvgcomponent from "@/components/Deletesvg/delete.component.vue";
export default {
  components: { uploadcomponent, deletesvgcomponent },
  data() {
    return {
      uploadImageDialog: false,
      deleteAccountDialog: false,
      changePasswordDialog: false,
      show1: false,
      show2: false,
      form: {
        name: "",
        address: "",
        phone: "",
        OrganizationName: "",
      },
      imageURL: process.env.VUE_APP_IMG_API,
      loader: false,
      skipPayment: "",
    };
  },
  validations: {
    form: {
      name: {
        required,
      },
    },
  },
  computed: {
    ...mapGetters([
      "getUserId",
      "getUserData",
      "getOrganizationId",
      "getRolePermissions",

    ]),
  },
  mounted() {
    this.fetchdata();
    if (this.getOrganizationId) {
      this.skipPayment = localStorage.getItem("skipPayment");
    }
  },
  methods: {
    deleteAccount() {
      this.loader = true;
      const payload = {
        userId: this.form.id,
      };
      this.$store.dispatch("deleteUser", payload).then((response) => {
        if (response.data.succeeded === true) {
          this.loader = false;
          this.$swal.fire({
            position: "top-end",
            icon: "success",
            title: response.data.message,
            showConfirmButton: false,
            timer: 2000,
            toast: true,
          });
          this.close();
          this.$router.push("/");
          location.reload();
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
    fetchList() {
      this.$emit("fetchList");
    },
    fetchdata() {
      this.loader = true;
      const payload = {
        id: this.getUserId,
        isPagination: false,
      };
      this.$store.dispatch("getUserData", payload).then(() => {
        this.loader = false;
        this.form = this.getUserData.userList[0];
        if (this.getOrganizationId) {
          let findSelectedOrg = this.getUserData.userList[0].organizations.find(
            (value) => {
              return value.organizationId == this.getOrganizationId;
            }
          ); //get selected organization to display in v-model
          // this.form.OrganizationName = findSelectedOrg.organizationName;
          this.form.OrganizationName =
            this.form.organizations[0].organizationName;
        }
      });
    },
    saveChanges() {
      if (this.$v.$invalid) {
        this.$v.$touch();
      } else {
        const payload = {
          Id: this.form.id,
          Name: this.form.name,
          Address: this.form.address,
          Phone: this.form.phone,
        };
        let ownOrganization = this.form.ownOrganization;
        let ownOrganizationData = this.form.organizations.find((value) => {
          return value.organizationId == ownOrganization;
        });
        if (this.getRolePermissions == "own") {
          payload.OrganizationName = this.form?.OrganizationName;
        } else {
          payload.OrganizationName = ownOrganizationData?.organizationName;
        }
        this.loader = true;
        this.$store.dispatch("updateUser", payload).then((response) => {
          if (response.data.succeeded === true) {
            this.loader = false;
            this.$swal.fire({
              position: "top-end",
              icon: "success",
              title: "Profile updated successfully",
              showConfirmButton: false,
              timer: 2000,
              toast: true,
            });
            this.fetchdata();
            this.fetchList(); // fetch organization in dropdown
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
    close() {
      this.uploadImageDialog = false;
    },
  },
};
</script>

<style></style>
