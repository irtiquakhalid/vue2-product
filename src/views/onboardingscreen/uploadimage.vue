<template>
  <div class="uploadimage">
    <loadercomponent :loader="loader" />
    <v-row align="start" class="h-100">
      <v-col cols="12" sm="3" md="4" lg="3">
        <div class="d-flex justify-space-between align-center">
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
        <h2 class="black-text-400 font-weight-500 text-center mb-8">
          Welcome to your Real Estate checklist
        </h2>
        <div class="px-16">
          <v-img src="/images/onboardingscreen/line.png"></v-img>
        </div>
        <v-card
          color="#FFFFFF"
          flat
          width="500"
          class="d-flex flex-column align-center justify-space-between radius-21 h-100"
        >
          <div>
            <h3
              style="text-align: center"
              class="black-text-400 font-weight-500 mt-8 font-28"
            >
              Let’s personalize your app. You can change your information at
              anytime.
            </h3>
            <div class="upload-image-input d-flex align-center">
              <v-img
                :src="
                  image || form.userProfile ? image || `${imageURL}${form.userProfile}`  : '/images/onboardingscreen/upload-image.png'
                "
                :style="{width: image || form.userProfile ? '400px' : '500px'}"
                max-height="300px"
                :class="image || form.userProfile ? 'radius-30' : ''"
                contain
              ></v-img>
              <div class="select-input">
                <input type="file" @change="handleImage" accept="image/png, image/jpeg, image/bmp" />
              </div>
            </div>
            <div class="red--text text-center mt-1" v-if="$v.form.userProfile.$error">
              Picture is required
            </div>
          </div>
          <div class="w-100 d-flex align-center flex-column">
            <v-btn
              depressed
              class="gradiant-background py-8 mt-10 radius-40"
              width="100%"
              @click="confirmPicture"
              ><span
                class="text-transform font-22 cyan-text-100 font-weight-600"
                >Confirm picture</span
              ></v-btn
            >
            <v-btn text class="my-5" to="/color"
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

    <div class="d-flex justify-center"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      image: "",
      form: {
        id: null,
        userProfile: null,
      },
      userData: null,
      loader: false,
      imageURL : process.env.VUE_APP_IMG_API
    };
  },
  validations: {
    form: {
      userProfile: {
        required,
      },
    },
  },
  computed: {
    ...mapGetters(["getUserId", "getUserData","getOrganizationId"]),
  },
  mounted(){
    this.fetchdata();
  },
  methods: {
    fetchdata(){
      this.loader = true;
      let payload = {
        id: this.getUserId,
        isPagination: false,
        orgId: this.getOrganizationId
      }
      this.$store.dispatch('getUserData', payload).then(() => {
        this.loader = false;
        this.form = this.getUserData?.userList[0]
      })
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
    confirmPicture() {
      if (this.form.userProfile) {
        this.loader = true;
        const payload = {
          Id: this.getUserId,
          UserProfile: this.form.userProfile,
        };
        this.$store.dispatch("uploadImage", payload).then((response) => {
          if (response.data.succeeded === true) {
            this.loader = false;
            this.$swal.fire({
              position: "top-end",
              icon: "success",
              title: "Image uploaded successfully",
              showConfirmButton: false,
              timer: 2000,
              toast: true,
            });
            this.$router.push({ path: "/color" });
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
      }else{
        this.$v.$touch();
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
