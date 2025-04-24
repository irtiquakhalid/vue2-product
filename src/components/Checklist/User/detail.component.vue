<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-4">
      <h5>{{ form.type }} Info</h5>
      <v-icon @click="close()" :color="contractColor ? contractColor : '#1ba8bb'" style="font-size: 33px;">mdi-close-circle</v-icon>
    </div>
    <div class="share-field my-4">
      <h6 class="font-weight-600" :style="{color: contractColor ? contractColor : '#1ba8bb'}">Email</h6>
      <v-text-field
        solo
        flat
        :background-color="rgbToRgba(contractColor || '#1ba8bb' , '16%')"
        hide-details
        v-model="form.email"
        class="mt-1"
        disabled
      >
      </v-text-field>
    </div>
    <div class="share-field my-4">
      <h6 class="font-weight-600" :style="{color: contractColor ? contractColor : '#1ba8bb'}">Phone number</h6>
      <v-text-field
        solo
        flat
        :background-color="rgbToRgba(contractColor || '#1ba8bb' , '16%')"
        hide-details
        v-model="form.phone"
        class="mt-1"
        disabled
      >
      </v-text-field>
    </div>
    <div class="share-field my-4">
      <h6 class="font-weight-600" :style="{color: contractColor ? contractColor : '#1ba8bb'}">Address</h6>
      <v-text-field
        solo
        flat
        :background-color="rgbToRgba(contractColor || '#1ba8bb' , '16%')"
        hide-details
        v-model="form.address"
        class="mt-1"
        disabled
      >
      </v-text-field>
    </div>
  </div>
</template>

<script>
export default {
  props: ["detailContent","contractColor"],
  data() {
    return {
      form: {
        type: "",
      },
    };
  },
  mounted() {
    this.mapData();
  },
  watch: {
    detailContent: {
      immediate: true,
      deep: true,
      handler() {
        this.mapData();
      },
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    mapData() {
      this.form = this.detailContent;
    },
    rgbToRgba(color, alpha) {
      if (!color || color == "#1ba8bb") {
        // Fallback to a default color if the color is undefined or null
        return `#E1F2FF`; // Default to black with the given alpha
      }
      const match = color.match(/\d+/g);
      if (!match || match.length < 3) {
        // Fallback if the color does not match the expected RGB format
        return `rgba(0, 0, 0, ${alpha})`;
      }

      let [r, g, b] = match.map(Number);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    },
  },
};
</script>

<style></style>
