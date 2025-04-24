<template>
  <div class="position-relative">
    <loadercomponent :loader="loader" />
    <div class="d-flex justify-space-between align-center">
      <h3 class="dynamic-color">Member Information</h3>
      <v-icon
        @click="close()"
        color="var(--primary-color)"
        style="font-size: 33px"
        >mdi-close-circle</v-icon
      >
    </div>
    <div class="d-flex justify-center" v-if="form.userProfile">
      <v-avatar class="image" size="150px">
        <v-img :src="`${imageURL}${form.userProfile}`"></v-img>
      </v-avatar>
    </div>
    <div v-else class="d-flex justify-center">
      <v-avatar class="image" size="150">
        <v-img
          src="/images/singleuser.png"
          max-width="60"
          contain
        ></v-img>
      </v-avatar>
    </div>

    <v-row class="mt-2">
      <v-col cols="12" md="6">
        <v-text-field
          placeholder="Name"
          hide-details
          solo
          flat
          background-color="var(--secondary-color)"
          v-model="form.name"
          disabled
        >
          <template v-slot:prepend-inner>
            <v-icon class="px-3" contain color="var(--primary-color)">mdi-account</v-icon>
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
            <v-icon class="px-3" contain color="var(--primary-color)">mdi-email</v-icon>
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
          flat
          background-color="var(--secondary-color)"
          type="number"
          v-model="form.phone"
          disabled
        >
          <template v-slot:prepend-inner>
            <v-icon class="px-3" contain color="var(--primary-color)">mdi-phone</v-icon>
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
          disabled
        >
          <template v-slot:prepend-inner>
            <v-icon color="var(--primary-color)" class="px-3" contain>mdi-map-marker</v-icon>
          </template>
        </v-text-field>
      </v-col>
    </v-row>

    <v-row class="mt-6 mb-1 d-flex justify-end">
      <v-col cols="12" md="6">
        <v-btn
          depressed
          class="radius-25 w-100 py-6"
          color="var(--primary-color)"
          @click="close"
        >
          <span class="text-transform font-18 white--text">Close</span></v-btn
        >
      </v-col>

      <!-- <v-col cols="12" md="6">
        <v-btn
          depressed
          outlined
          class="radius-25 w-100 py-6 border-cyan"
          @click="chip2 = !chip2"
        >
          <span class="text-transform font-18 cyan-text">Add more+</span></v-btn
        >
      </v-col> -->
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: ["detailData"],
  data() {
    return {
      imageURL: process.env.VUE_APP_IMG_API,
      form: {},
      loader: false
    };
  },
  mounted() {
    this.fetchdata();
  },
  watch: {
    "detailData.id": {
      immediate: true,
      deep: true,
      handler() {
        if(this.form.id){
          this.fetchdata();
        }
      },
    },
  },
  computed:{
    ...mapGetters(['getUserData','getOrganizationId'])
  },
  methods: {
    fetchdata() {
      this.loader = true;
      let payload = {
        id: this.detailData.id,
        orgId: this.getOrganizationId,
      };
      this.$store.dispatch("getUserData", payload).then(() => {
        this.form = this.getUserData.userList[0];
        this.loader = false;
      });
    },
    
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped lang="scss">
.image {
  width: 120px;
  height: 117px;
  border: 4px solid var(--primary-color);
  border-radius: 40000px;
  margin-bottom: 1rem;
  margin-top: 0.7rem;
  .v-image {
    width: 100%;
    height: 100%;
    border-radius: 40000px;
  }
}
</style>
