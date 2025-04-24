<template>
  <div>
    <div class="d-flex justify-end">
      <v-img
        src="/images/close-icon.svg"
        contain
        class="cursor-pointer"
        @click="close()"
        max-width="50"
      ></v-img>
    </div>
    <h3 class="text-center mt-4">Choose payment method to</h3>
    <h3 class="text-center">continue</h3>
    <div class="d-flex justify-center my-5">
      <v-btn
      to="/payment"
        depressed
        class="gradiant-background py-8 mt-10 radius-40"
        width="100%"
        ><span class="text-transform font-22 cyan-text-100 font-weight-600"
          >Select payment</span
        ></v-btn
      >
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style></style>
