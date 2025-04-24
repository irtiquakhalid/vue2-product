<template>
  <div class="upload pb-4">
    <loadercomponent :loader="loader" />
    <div class="d-flex justify-end">
      <v-icon
        @click="close()"
        color="var(--primary-color)"
        style="font-size: 33px"
        >mdi-close-circle</v-icon
      >
    </div>
    <h3 style="color: var(--primary-color)" class="text-center font-weight-500">
      Add profile photo
    </h3>

    <div class="attach-document">
      <v-img
        :src="image"
        v-if="image"
        max-width="200px"
        max-height="100%"
        contain
      ></v-img>
      <svg
        width="60"
        height="55"
        viewBox="0 0 88 68"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        v-else
      >
        <rect
          x="0.628571"
          y="0.628571"
          width="86.7429"
          height="66.6286"
          rx="6.91429"
          stroke="var(--primary-color)"
          stroke-width="1.25714"
        />
        <path
          d="M33.3247 36.6303L50.5232 20.5485C50.708 20.3757 52.1822 18.9973 54.5153 18.2511C57.7702 17.2752 61.0881 18.0783 63.7298 20.5485C66.4324 23.0187 67.2304 26.0623 66.1867 29.1059C65.4496 31.2893 63.9145 32.7817 63.7298 32.9545L45.2418 50.2419C42.0478 53.2286 34.0618 57.0772 26.6909 50.2419C19.3811 43.4067 23.5579 35.8823 26.6909 32.9545L46.5312 14.3455C47.2683 13.6563 48.4358 13.6563 49.1729 14.3455C49.91 15.0347 49.91 16.1265 49.1729 16.8157L29.3936 35.4246C29.0869 35.6544 22.8817 41.6846 29.3936 47.7736C35.7207 53.6899 41.924 48.4059 42.6001 47.7736L61.0881 30.4273C61.0881 30.4273 62.1318 29.4514 62.6232 28.0729C63.2384 26.235 62.8079 24.6269 61.0881 23.0187C57.4027 19.5726 53.8391 22.4434 53.1649 23.0187L35.9664 39.0435C35.3512 39.6188 34.9227 40.5947 35.9664 41.5706C37.0101 42.5466 37.9929 42.0871 38.6081 41.5706L50.5252 30.4273C51.2623 29.7951 52.4908 29.7951 53.1669 30.4273C53.904 31.1165 53.904 32.2652 53.1669 32.9545L41.2498 44.039C39.5909 45.5332 36.2121 46.7389 33.3266 44.039C30.3783 41.3391 31.6657 38.1227 33.3247 36.6303Z"
          fill="var(--primary-color)"
        />
      </svg>
    

      <div class="select-input">
        <input
          type="file"
          @change="handleImage"
          accept="image/png, image/jpeg, image/bmp"
        />
      </div>
    </div>
    <div class="red--text mt-1" v-if="$v.image.$error">Image is required</div>
    <v-btn
      class="py-6 mt-15 w-100 radius-25"
      color="var(--primary-color)"
      depressed
      @click="uploadImage"
    >
      <span class="text-transform white-text font-18">Save</span>
    </v-btn>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";

export default {
  name: "uploadcomponent",
  props: ["formData"],
  data() {
    return {
      image: "",
      form: {
        UserProfile: "",
      },
      loader: false,
      organizationName: "",
    };
  },
  validations: {
    image: {
      required,
    },
  },
  watch: {
    formData: {
      deep: true,
      immediate: true,
      handler() {
        this.fetchdata();
      },
    },
  },
  mounted() {
    this.mapData();
    this.fetchdata();
  },
  computed: {
    ...mapGetters(["getUserId", "getUserData", "getOrganizationId"]),
  },
  methods: {
    fetchList() {
      this.$emit("fetchList");
    },
    fetchdata() {
      this.form.Id = this.getUserId;
      if (this.form.Id) {
        this.$store
          .dispatch("getUserData", { Id: this.form.Id, isPagination: false })
          .then(() => {
            this.form = this.getUserData.userList[0];
          });
      }
    },
    uploadImage() {
      if (this.$v.$invalid) {
        this.$v.$touch();
      } else {
        if (this.form.organizations) {
          this.organizationName = this.form.organizations.find((value) => {
            return (value.organizationId = this.getOrganizationId);
          });
        }
        const payload = {
          Id: this.form.id,
          Name: this.form.name,
          UserProfile: this.form.userProfile,
          Address: this.form.address,
          Phone: this.form.phone,
          organizationName: this.organizationName?.organizationName,
        };
        this.loader = true;
        this.$store.dispatch("updateUser", payload).then((response) => {
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
            this.fetchList();
            this.close();
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
    mapData() {
      this.form = { ...this.formData };
    },
    resetForm() {
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

<style></style>
