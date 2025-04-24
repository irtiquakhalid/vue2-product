<template>
    <div v-if="loader" class="spinner-overlay">
      <div class="spinner-container">
        <half-circle-spinner
          :animation-duration="1000"
          :size="60"
          :color="'var(--primary-color)' || '#1BA8BB'"
        />
      </div>
    </div>
  </template>
  
  <script>
  import { HalfCircleSpinner } from "epic-spinners";
  
  export default {
    name: "loadercomponent",
    components: {
      HalfCircleSpinner,
    },
    props: ['loader'],
  };
  </script>
  
  <style scoped>
  .spinner-overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }
  
  .spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  </style>
  