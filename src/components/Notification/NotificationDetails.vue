<template>
    <div>
      <loadercomponent :loader="loader" />
      <div class="d-flex justify-space-between">
        <h3 class="dynamic-color">Add {{ dynamicTitle }}</h3>
        <v-icon
          @click="close()"
          :color="contractColor ? contractColor : 'var(--primary-color)'"
          style="font-size: 33px"
        >
          mdi-close-circle
        </v-icon>
      </div>
      <div class="d-flex justify-center mb-8 mt-2" v-if="listItem.module">
        <div class="upload-image-input-members">
          <v-avatar size="150" class="border-circle">
            <v-img
              :src="image"
              class="radius-50"
              max-width="100%"
              v-if="image"
            ></v-img>
            <v-img src="/images/singleuser.png" max-width="60px" contain v-else>
            </v-img>
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
      <div class="mb-5">
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
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            placeholder="Name"
            hide-details
            solo
            flat
            background-color="var(--secondary-color)"
            v-model="form.Name"
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
            v-model="form.Email"
          >
            <template v-slot:prepend-inner>
              <v-icon class="px-3" contain color="var(--primary-color)"
                >mdi-email</v-icon
              >
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
            v-model="form.Phone"
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
            v-model="form.Address"
          >
            <template v-slot:prepend-inner>
              <v-icon color="var(--primary-color)" class="px-3" contain
                >mdi-map-marker</v-icon
              >
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </div>
  </template>
<script>
export default {
    
}
</script>
<style scoped>

</style>