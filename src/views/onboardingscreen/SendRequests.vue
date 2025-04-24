<template>
  <div class="py-5 onboarding" style="min-height: 100vh">
    <div class="d-flex justify-space-between align-center">
      <v-img
        src="/images/onboardingscreen/newLogooo.png"
        contain
        style="max-width: 6%"
      >
      </v-img>
      <div class="d-flex align-center">
        <v-text-field
          solo
          flat
          background-color="var(--secondary-color)"
          class="radius-7"
          hide-details
          v-model="search"
          @input="fetchItems"
          placeholder="Search broker"
        >
          <template v-slot:prepend-inner>
            <v-img src="/images/search.svg" class="px-3" contain></v-img>
          </template>
        </v-text-field>
        <v-btn
          width="140"
          class="py-6 ml-5 px-5 radius-25 gradiant-background"
          @click="handleContinue"
        >
          <span class="text-transform font-22 cyan-text-100 font-weight-600"
            >Continue
          </span></v-btn
        >
      </div>
    </div>
    <v-row class="d-flex justify-center mt-5">
      <v-progress-circular
        v-if="items.length === 0"
        :size="100"
        color="primary"
        indeterminate
      ></v-progress-circular>

      <v-col
        v-else
        v-for="(item, index) in items"
        :key="index"
        cols="12"
        xs="12"
        sm="6"
        md="6"
        lg="3"
      >
        <v-card
          flat
          style="border: 2px solid #1ba3ba !important"
          class="my-3 text-center"
          color="#1BA3BA"
        >
          <v-card-title class="d-flex align-center justify-center flex-column">
            <v-avatar size="104" class="mb-3 img">
              <v-img
                v-if="item.userProfile"
                :src="`${baseURL}${item.userProfile}`"
              ></v-img>
              <v-icon v-else size="104">mdi-account</v-icon>
            </v-avatar>
            <span class="font-weight-bold text-wrap text-center">{{
              item.name || item.email
            }}</span>
          </v-card-title>
          <div class="d-flex justify-center mb-5 px-5">
            <v-btn
              v-if="!requestedUsers.includes(item.userId)"
              outlined
              rounded
              color="primary"
              @click="sendRequest(item)"
              block
            >
              <span class="text-transform">Add broker</span>
            </v-btn>
            <v-btn v-else rounded disabled outlined color="primary" block>
              <v-icon>mdi-account-check-outline</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-5 d-flex justify-space-between align-center">
      <span class="font-weight-bold">Page {{ page }} of {{ totalCounts }}</span>

      <v-pagination
        v-model="page"
        :length="Math.ceil(totalCounts / size)"
        :total-visible="7"
        @input="fetchItems"
        color="primary"
      ></v-pagination>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      items: [],
      page: 1,
      size: 8,
      totalPages: 0,
      requestedUsers: [],
      baseURL: process.env.VUE_APP_IMG_API,
      totalCounts: 0,
      search: null,
    };
  },
  computed: {
    ...mapGetters(["getBrokers"]),
  },
  mounted() {
    this.fetchItems();
    console.log(this.$router.history);
  },
  methods: {
    handleContinue() {
      const prev = this.$getPreviousRoute();
      if (prev && prev.path === "/team") {
        this.$router.push("/team");
      } else {
        this.$router.push("/hereaboutus");
      }
    },
    async fetchItems() {
      const payload = {
        roleId: 1,
        pageNo: this.page,
        size: this.size,
        isPagination: true,
      };
      if (this.search) {
        payload.search = this.search;
        payload.isPagination = false;
      }
      try {
        const response = await this.$store.dispatch("getBrokers", payload);
        if (response) {
          this.items = response.data.data;
          this.totalCounts = response.data.totalCounts;
          this.totalPages = Math.ceil(response.data.total / this.size);
        }
      } catch (error) {
        console.error(error);
      }
    },
    sendRequest(item) {
      var organizationId = localStorage.getItem("organizationId");
      var obj = {
        brokerUserId: item.userId,
        OrganizationId: item.ownOrganization,
      };
      this.$store.dispatch("sendAddRequest", obj).then((response) => {
        if (response.data.succeeded) {
          this.requestedUsers.push(item.userId); // Mark user as requested
          this.$swal.fire({
            position: "top-end",
            icon: "success",
            title: response.data.message,
            showConfirmButton: false,
            timer: 2000,
            toast: true,
          });
        } else {
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

<style scoped lang="scss">
.v-card {
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: rgba(
    255,
    255,
    255,
    0.3
  ) !important; /* Semi-transparent background */
  backdrop-filter: blur(3px); /* Blurs the background behind the box */
  -webkit-backdrop-filter: blur(3px); /* For Safari support */
  .img {
    width: 120px;
    height: 117px;
    border-radius: 5000px;
    border: 4px solid var(--primary-color);
  }
}

.v-card:hover {
  transform: scale(1.05);
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.v-btn {
  width: 100%;
}
</style>
