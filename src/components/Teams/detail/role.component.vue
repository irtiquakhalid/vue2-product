<template>
  <div>
    <loadercomponent :loader="loader" />
    <div class="d-flex justify-end mb-4">
      <v-icon
        @click="close()"
        color="var(--primary-color)"
        style="font-size: 33px"
        >mdi-close-circle</v-icon
      >
    </div>
    <h4
      class="text-center font-weight-500 px-4 my-6"
      v-if="currentRole.roleType === 'teamlead'"
    >
      Are you sure you want to make '{{
        currentRole.item.name ? currentRole.item.name : currentRole.item.email
      }}' team lead?
    </h4>
    <h4
      class="text-center font-weight-500 px-4 my-6"
      v-if="currentRole.roleType === 'admin'"
    >
      Are you sure you want to make '{{
        currentRole.item.name ? currentRole.item.name : currentRole.item.email
      }}' an admin?
    </h4>
    <div class="px-8 mb-6">
      <v-btn
        depressed
        class="py-6 radius-25 mt-8 w-100"
        color="var(--primary-color)"
        v-if="currentRole.roleType === 'teamlead'"
        @click="makeTeamLeadOrAdmin()"
      >
        <span class="text-transform font-18 white--text">Make Team Lead</span>
      </v-btn>
      <v-btn
        depressed
        class="py-6 radius-25 mt-5 w-100"
        color="var(--primary-color)"
        @click="makeTeamLeadOrAdmin"
        v-if="currentRole.roleType === 'admin'"
      >
        <span class="text-transform font-18 white--text"
          >Make Administrator</span
        >
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["role"],
  data() {
    return {
      teamLeadDialog: false,
      administratorDialog: false,
      currentRole: null,
      loader: false,
      teamId: this.$route.query.teamId,
      payload: {}
    };
  },
  mounted() {
    this.mapData();
  },
  watch: {
    role: {
      immediate: true,
      handler() {
        this.mapData();
      },
    },
  },
  computed: {
    ...mapGetters(["getOrganizationId","getUserId"]),
  },
  methods: {
    mapData() {
      this.currentRole = this.role;
    },
    fetchList() {
      this.$emit("fetchList");
    },
    close() {
      this.administratorDialog = false;
      this.teamLeadDialog = false;
      this.$emit("close");
    },
    makeTeamLeadOrAdmin() {
      if (this.currentRole.roleType === "teamlead") {
         this.payload = {
          organizationId: this.getOrganizationId,
          roleId: "8",
          userId: this.currentRole.item.id,
          teamId: this.teamId,
          createdById: this.getUserId
        };
      } else {
       this.payload = {
          organizationId: this.getOrganizationId,
          roleId: "9",
          userId: this.currentRole.item.id,
          createdById: this.getUserId
        };
      }
      this.loader = true;
      this.$store.dispatch("makeTLOrAdmin", this.payload).then((response) => {
        if (response.data.succeeded === true) {
          this.loader = false;
          this.$swal.fire({
            position: "top-end",
            icon: "success",
            title: `${
              this.currentRole.item.name
                ? this.currentRole.item.name
                : this.currentRole.item.email
            } is now a ${this.currentRole.roleType}`,
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
  },
};
</script>

<style></style>
