<template>
  <div class="add-team">
    <loadercomponent :loader="loader" />
    <div class="d-flex justify-end">
      <v-icon
        @click="close()"
        color="var(--primary-color)"
        style="font-size: 33px"
      >
        mdi-close-circle
      </v-icon>
    </div>
    <div class="d-flex justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="95"
        height="65"
        viewBox="0 0 95 65"
        fill="none"
      >
        <path
          d="M60.805 37.6781C69.1285 37.6781 75.8762 44.4259 75.8762 52.7494V58.4011C75.8762 61.5223 73.3457 64.0528 70.2245 64.0528H25.0111C21.8897 64.0528 19.3594 61.5223 19.3594 58.4011V52.7494C19.3594 44.4259 26.107 37.6781 34.4305 37.6781H60.805ZM47.6178 0C56.9819 0 64.5728 7.59109 64.5728 16.9552C64.5728 26.3192 56.9819 33.9103 47.6178 33.9103C38.2538 33.9103 30.6627 26.3192 30.6627 16.9552C30.6627 7.59109 38.2538 0 47.6178 0Z"
          fill="#1BA8BB"
        />
        <path
          d="M11.3976 37.6801C5.15476 37.6801 0.0942491 42.741 0.0942491 48.9836V54.6353C0.0942491 57.7569 2.62469 60.287 5.74593 60.287H11.3976V52.7506C11.3976 46.5884 14.3561 41.1175 18.9302 37.6801H11.3976ZM15.1654 11.3047C8.92255 11.3047 3.86203 16.3654 3.86203 22.6081C3.86203 28.851 8.92255 33.9116 15.1654 33.9116C21.4082 33.9116 26.4688 28.851 26.4688 22.6081C26.4688 16.3654 21.4082 11.3047 15.1654 11.3047Z"
          fill="#1BA8BB"
        />
        <path
          d="M82.9891 37.6801C89.232 37.6801 94.2925 42.741 94.2925 48.9836V54.6353C94.2925 57.7569 91.762 60.287 88.6408 60.287H82.9891V52.7506C82.9891 46.5884 80.0306 41.1175 75.4566 37.6801H82.9891ZM79.2213 11.3047C85.4642 11.3047 90.5247 16.3654 90.5247 22.6081C90.5247 28.851 85.4642 33.9116 79.2213 33.9116C72.9785 33.9116 67.918 28.851 67.918 22.6081C67.918 16.3654 72.9785 11.3047 79.2213 11.3047Z"
          fill="#1BA8BB"
        />
      </svg>
    </div>
    <div class="d-flex justify-center">
      <h4 style="color: var(--primary-color)">
        {{ title }}
      </h4>
    </div>
    <div class="px-8 mt-6">
      <v-text-field
        solo
        flat
        background-color="var(--secondary-color)"
        class="radius-7"
        placeholder="Group Name"
        v-model="form.groupChatName"
        hide-details
      ></v-text-field>
      <div class="red--text" v-if="$v.form.groupChatName.$error">
        <div v-if="!$v.form.groupChatName.required">Group name is required</div>
      </div>
      <h5 style="color: var(--primary-color)" class="font-weight-500 mt-5">
        Group Picture/Logo
      </h5>
      <div class="attach-document">
        <v-img
          v-if="image"
          :src="image"
          max-width="200px"
          max-height="120px"
          contain
        ></v-img>
        <svg
          width="75"
          height="76"
          viewBox="0 0 75 76"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          v-else
        >
          <path
            d="M49.3114 52.0792C47.2157 51.3103 44.1597 49.0647 44.1597 47.6668C44.1597 46.7406 44.1597 45.5836 44.1597 43.9977C45.3708 42.6754 46.2917 39.9908 46.8391 36.9477C48.1157 36.5004 48.8453 35.7846 49.7566 32.6527C50.7254 29.3165 48.2978 29.4299 48.2978 29.4299C50.2613 23.0508 47.6766 17.0555 43.347 17.4957C40.3606 12.3684 30.3581 18.6669 27.2241 18.2279C27.2241 19.9863 27.9702 21.3046 27.9702 21.3046C26.8807 23.3347 27.301 27.3826 27.6069 29.4299C27.43 29.4268 25.2346 29.4493 26.1658 32.6527C27.0773 35.7845 27.8067 36.5004 29.0835 36.9477C29.6298 39.9908 30.5506 42.6754 31.7629 43.9977C31.7629 45.5836 31.7629 46.7406 31.7629 47.6668C31.7629 49.0647 28.5165 51.4196 26.6113 52.0792C22.6749 53.4394 13.0022 57.3514 13.6265 64.6792C13.7762 66.4377 23.6291 72.9999 37.9613 72.9999C52.2926 72.9999 62.1463 66.4377 62.2962 64.6792C62.9204 57.3443 53.2228 53.515 49.3114 52.0792Z"
            fill="var(--primary-color)"
          />
          <circle
            cx="37.2846"
            cy="37.8081"
            r="34.5152"
            stroke="var(--primary-color)"
            stroke-width="5.41414"
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
      <v-row class="mt-4">
        <v-col>
          <v-btn
            class="w-100 py-6 radius-25 mb-5"
            color="var(--primary-color)"
            depressed
            @click="addChatGroup"
          >
            <span class="text-transform white--text font-18">Make Group</span>
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";

export default {
  props: {
    editedGroupInfoData: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      title: "Add New Group",
      image: "",
      form: {
        groupChatName: "",
        TeamLogoPath: "",
        CreatedById: null,
        OrgId: null,
      },
      loader: false,
    };
  },
  validations: {
    form: {
      groupChatName: {
        required,
      },
    },
  },
  computed: {
    ...mapGetters(["getUserId", "getOrganizationId"]),
  },
  watch: {
    editedGroupInfoData: {
      immediate: true,
      handler(newValue) {
        if (newValue && newValue.id) {
          this.mapdata(newValue);
          this.title = "Edit Group";
        } else {
          this.resetForm();
          this.title = "Add New Group";
        }
      },
    },
  },
  methods: {
    mapdata(data) {
      this.form.groupChatName = data.groupName || "";
      this.image = data.groupImage
        ? `${process.env.VUE_APP_IMG_API}/${data.groupImage}`
        : "";

      // this.image = data.groupImage || "";
    },
    resetForm() {
      this.form = {
        groupChatName: "",
        TeamLogoPath: "",
        CreatedById: null,
        OrgId: null,
      };
      this.image = "";
    },
    handleImage(event) {
      const file = event.target.files[0];
      if (file) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          this.image = fileReader.result;
        };
        fileReader.readAsDataURL(file);
        this.form.TeamLogoPath = file;
      } else {
        this.image = "";
        this.form.TeamLogoPath = "";
      }
    },
    close() {
      this.$emit("close");
      this.resetForm();
      this.$v.$reset();
    },
    addChatGroup() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const payload = {
        ...(this.editedGroupInfoData?.id && {
          Id: this.editedGroupInfoData.id,
        }),
        groupName: this.form.groupChatName,
        GroupImage: this.form.TeamLogoPath,
        OrganizationId: this.getOrganizationId,
      };
      this.form.CreatedById = this.getUserId;
      this.form.OrgId = this.getOrganizationId;
      this.loader = true;

      this.$store.dispatch("createChatGroup", payload).then((response) => {
        this.loader = false;
        const { succeeded, message } = response.data;
        const icon = succeeded ? "success" : "error";
        this.$swal.fire({
          position: "top-end",
          icon,
          title: message,
          showConfirmButton: false,
          timer: 2000,
          toast: true,
        });

        if (succeeded) {
          this.close();
          this.fetchList();
        }
      });
    },
    fetchList() {
      this.$emit("fetchList");
    },
  },
};
</script>

<style scoped>
/* Add your scoped styles here */
</style>
