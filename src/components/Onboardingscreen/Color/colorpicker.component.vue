<template>
    <div class="color-picker">
      <canvas ref="canvas" width="220" height="220" @mousedown="startPicking"></canvas>
      <div class="d-flex align-end my-2">
        <div v-if="selectedColor" :style="{ backgroundColor: selectedColor }" class="selected-color">
    </div>
    <!-- <h6 class="ml-4">{{ selectedColor }}</h6> -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedColor: null,
        picking: false,
        colorRGB:{R:'',G:'',B:''}
      };
    },
    watch:{
     selectedColor:{
      handler(){
        this.$emit('colorRGB',this.colorRGB)
      }
     }
    },
    mounted() {
      this.drawColorWheel();
      window.addEventListener('mouseup', this.stopPicking);
      window.addEventListener('mousemove', this.pickColor);
    },
    beforeDestroy() {
      window.removeEventListener('mouseup', this.stopPicking);
      window.removeEventListener('mousemove', this.pickColor);
    },
    methods: {
      drawColorWheel() {
        const canvas = this.$refs.canvas;
        const ctx = canvas.getContext('2d');
        const radius = canvas.width / 2;
        const toRadians = (deg) => (deg * Math.PI) / 180;
  
        for (let angle = 0; angle < 360; angle++) {
          const startAngle = toRadians(angle);
          const endAngle = toRadians(angle + 1);
  
          ctx.beginPath();
          ctx.moveTo(radius, radius);
          ctx.arc(radius, radius, radius, startAngle, endAngle);
          ctx.closePath();
          ctx.fillStyle = `hsl(${angle}, 100%, 50%)`;
          ctx.fill();
        }
      },
      startPicking(event) {
        this.picking = true;
        this.pickColor(event);
      },
      stopPicking() {
        this.picking = false;
      },
      pickColor(event) {
        if (!this.picking) return;
  
        const canvas = this.$refs.canvas;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const radius = canvas.width / 2;
        const dx = x - radius;
        const dy = y - radius;
  
        if (dx * dx + dy * dy <= radius * radius) {
          const imageData = ctx.getImageData(x, y, 1, 1).data;
          const [r, g, b] = imageData;
          this.colorRGB.R = r;
          this.colorRGB.G = g;
          this.colorRGB.B = b;
          this.selectedColor = `rgb(${r}, ${g}, ${b})`;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .color-picker {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
  }
  
  canvas {
    cursor: crosshair;
  }
  
  .selected-color {
    margin-top: 10px;
    padding: 15px;
    color: #fff;
    border-radius: 8px;
  }
  </style>
  