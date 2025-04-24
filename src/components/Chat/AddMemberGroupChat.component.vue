<template>
  <div class="add-team">
    <loadercomponent :loader="loader" />
    <div class="d-flex justify-end">
      <v-icon
        @click="close()"
        color="var(--primary-color)"
        style="font-size: 33px"
        >mdi-close-circle</v-icon
      >
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
          fill="var(--primary-color)"
        />
        <path
          d="M11.3976 37.6801C5.15476 37.6801 0.0942491 42.741 0.0942491 48.9836V54.6353C0.0942491 57.7569 2.62469 60.287 5.74593 60.287H11.3976V52.7506C11.3976 46.5884 14.3561 41.1175 18.9302 37.6801H11.3976ZM15.1654 11.3047C8.92255 11.3047 3.86203 16.3654 3.86203 22.6081C3.86203 28.851 8.92255 33.9116 15.1654 33.9116C21.4082 33.9116 26.4688 28.851 26.4688 22.6081C26.4688 16.3654 21.4082 11.3047 15.1654 11.3047Z"
          fill="var(--primary-color)"
        />
        <path
          d="M82.9891 37.6801C89.232 37.6801 94.2925 42.741 94.2925 48.9836V54.6353C94.2925 57.7569 91.762 60.287 88.6408 60.287H82.9891V52.7506C82.9891 46.5884 80.0306 41.1175 75.4566 37.6801H82.9891ZM79.2213 11.3047C85.4642 11.3047 90.5247 16.3654 90.5247 22.6081C90.5247 28.851 85.4642 33.9116 79.2213 33.9116C72.9785 33.9116 67.918 28.851 67.918 22.6081C67.918 16.3654 72.9785 11.3047 79.2213 11.3047Z"
          fill="var(--primary-color)"
        />
      </svg>
    </div>
    <div class="d-flex justify-center">
      <h4 style="color: var(--primary-color)">
        Add Member in {{ selectedChat.groupName }}
      </h4>
    </div>
    <div class="px-8 mt-6">
      <div
        class="d-flex justify-center red--text"
        v-if="this.GetUsers.length === 0"
      >
        There are no more users left to add. Everyone is already in the group.
      </div>
      <v-autocomplete
        v-else
        solo
        flat
        background-color="var(--secondary-color)"
        class="radius-7"
        :items="GetUsers"
        item-value="id"
        small-chips
        :item-text="formattedEmail"
        placeholder="Member Name"
        multiple
        v-model="form.groupMemberChatName"
        hide-details
      >
      </v-autocomplete>

      <div class="red--text" v-if="$v.form.groupMemberChatName.$error">
        <div class="red--text" v-if="!$v.form.groupMemberChatName.required">
          Member name is required
        </div>
      </div>

      <v-row class="mt-4">
        <v-col>
          <v-btn
            class="w-100 py-6 radius-25 mb-5"
            color="var(--primary-color)"
            depressed
            @click="addChatGroup()"
          >
            <span class="text-transform white--text font-18">Add Member</span>
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
  props: ["selectedChat", "groupMembersList"],
  data() {
    return {
      image: "",
      GetUsers: [],
      form: {
        groupMemberChatName: [],
        CreatedById: null,
        OrgId: null,
      },
      loader: false,
      imageURL: process.env.VUE_APP_IMG_API,
    };
  },
  validations: {
    form: {
      groupMemberChatName: {
        required,
      },
    },
  },
  watch: {
    groupMembersList: {
      handler() {
        this.fetchUsers();
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters(["getUsersForChat", "getOrganizationId"]),
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    formattedEmail(item) {
      return `${item.name} (${item.email})`;
    },

    fetchUsers() {
      this.loader = true;

      const userId = parseInt(localStorage.getItem("userId"), 10);
      const obj = {
        isPagination: false,
        orgId: this.getOrganizationId,
      };

      this.$store
        .dispatch("getUserData", obj)
        .then((response) => {
          const userList = response.data.data.userList || [];
          const groupMemberIds = new Set(
            this.groupMembersList.map((member) => member.id)
          );

          // Filter out current user and group members
          this.GetUsers = userList.filter(
            (user) => user.id !== userId && !groupMemberIds.has(user.id)
          );

          // Ensure selected group members are still in GetUsers
          this.form.groupMemberChatName = this.groupMembersList.filter(
            (member) => this.GetUsers.some((user) => user.id === member.id)
          );

          this.loader = false;
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          this.loader = false;
        });
    },
    resetForm() {
      this.form = {
        groupMemberChatName: "",
        TeamLogoPath: "",
        CreatedById: null,
        OrgId: null,
      };
      this.image = "";
    },

    close() {
      this.$emit("close");
    },
    handleImage(event) {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.image = fileReader.result;
      };
      fileReader.readAsDataURL(file);
      this.form.TeamLogoPath = file;
    },
    addChatGroup() {
      if (this.$v.$invalid) {
        this.$v.$touch();
      } else {
        const payload = {
          groupId: +this.selectedChat.id,
          userId: this.form.groupMemberChatName,
        };

        this.loader = true;
        this.$store
          .dispatch("createChatMemberGroup", payload)
          .then((response) => {
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
              this.form = {
                groupMemberChatName: "",
                TeamLogoPath: "",
                BrokerId: null,
                CreatedById: null,
              };
              this.image = "";
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

<style></style>
