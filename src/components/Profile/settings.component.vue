<template>
  <div>
    <loadercomponent :loader="loader" />
    <div class="d-flex justify-end">
      <v-icon
        @click="close()"
        color="var(--primary-color)"
        style="font-size: 33px"
        >mdi-close-circle</v-icon
      >
    </div>
    <div class="color-picker">
      <canvas
        ref="canvas"
        width="220"
        height="220"
        @mousedown="startPicking"
      ></canvas>

      <div
        v-if="
          selectedColor && (colorRGB.R > 0 || colorRGB.G > 0 || colorRGB.B > 0)
        "
        class="d-flex align-end"
      >
        <div
          :style="{
            backgroundColor: selectedColor ? selectedColor : 'transparent',
          }"
          class="selected-color"
        ></div>
      </div>
    </div>
    <div class="d-flex justify-space-between">
      <v-text-field
        background-color="#f0f0f0"
        type="number"
        v-model="colorRGB.R"
        style="width: 120px"
        solo
        flat
        class="mx-2 py-0"
        :error-messages="getErrorMessage('R')"
      >
        <template v-slot:prepend-inner>
          <div class="font-20 black--text d-flex font-weight-600">
            R <span class="mx-2">|</span>
          </div>
        </template>
      </v-text-field>

      <v-text-field
        background-color="#f0f0f0"
        type="number"
        v-model="colorRGB.G"
        style="width: 120px"
        solo
        flat
        class="mx-2"
        :error-messages="getErrorMessage('G')"
      >
        <template v-slot:prepend-inner>
          <div class="font-20 black--text d-flex font-weight-600">
            G <span class="mx-2">|</span>
          </div>
        </template>
      </v-text-field>

      <v-text-field
        background-color="#f0f0f0"
        type="number"
        v-model="colorRGB.B"
        style="width: 120px"
        solo
        flat
        class="mx-2"
        :error-messages="getErrorMessage('B')"
      >
        <template v-slot:prepend-inner>
          <div class="font-20 black--text d-flex font-weight-600">
            B <span class="mx-2">|</span>
          </div>
        </template>
      </v-text-field>
    </div>
    <div
      class="red--text text-center mt-1"
      v-if="!$v.selectedColor.$pending && $v.selectedColor.$error"
    >
      Color is required and must not contain all 0 or 255.
    </div>
    <div
      class="red--text text-center mt-1"
      v-if="!$v.colorRGB.$pending && $v.colorRGB.$error"
    >
      All fields are required and must be between 0 and 255.
    </div>

    <div class="w-100 d-flex align-center flex-column mb-4">
      <v-btn
        class="py-7 w-100 radius-25"
        color="var(--primary-color)"
        depressed
        width="100%"
        @click="saveColor('selected')"
      >
        <span class="text-transform font-22 cyan-text-100 font-weight-600">
          Confirm Color
        </span>
      </v-btn>
      <div class="text-center grey-text-200 my-2 font-weight-600 font-20">
        OR
      </div>
      <v-btn
        class="py-7 w-100 radius-25"
        depressed
        @click="saveColor('default')"
        color="#1ba8bb"
      >
        <span class="text-transform font-22 cyan-text-100 font-weight-600">
          Use default color
        </span>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { required, minValue, maxValue } from "vuelidate/lib/validators";

export default {
  props: ["color"],
  data() {
    return {
      selectedColor: null,
      picking: false,
      colorRGB: { R: "", G: "", B: "" },
      loader: false,
      payload: {},
    };
  },
  validations: {
    selectedColor: {
      required,
      notBlackOrWhite(value) {
        if (!value) return true; // Skip validation if the color is not set yet
        const rgb = value.match(/\d+/g); // Extract RGB values from the string
        if (!rgb) return true; // Skip validation if the color format is invalid
        const [r, g, b] = rgb.map(Number);
        return (
          !(r === 0 && g === 0 && b === 0) &&
          !(r === 255 && g === 255 && b === 255)
        ); // Ensure color is not black or white
      },
    },
    colorRGB: {
      R: {
        required,
        minValue: minValue(0),
        maxValue: maxValue(255),
      },
      G: {
        required,
        minValue: minValue(0),
        maxValue: maxValue(255),
      },
      B: {
        required,
        minValue: minValue(0),
        maxValue: maxValue(255),
      },
    },
  },
  watch: {
    color: {
      immediate: true,
      handler() {
        this.splitRGB(this.color);
      },
    },
    selectedColor: {
      handler() {
        this.$emit("colorRGB", this.colorRGB);
      },
    },
    colorRGB: {
      deep: true,
      handler() {
        this.selectedColor = `rgb(${this.colorRGB.R}, ${this.colorRGB.G}, ${this.colorRGB.B})`;
      },
    },
  },
  mounted() {
    this.drawColorWheel();
    window.addEventListener("mouseup", this.stopPicking);
    window.addEventListener("mousemove", this.pickColor);
    this.splitRGB(this.color);
  },
  beforeDestroy() {
    window.removeEventListener("mouseup", this.stopPicking);
    window.removeEventListener("mousemove", this.pickColor);
  },
  computed: {
    ...mapGetters(["getUserId"]),
  },
  methods: {
    fetchdata() {
      this.$emit("fetchdata");
    },
    splitRGB(color) {
      if (color && color == "#1ba8bb" ? color= 'rgb(27, 168, 187)' : color) {
        // Use a regular expression to extract the numbers
        const rgbArray = color.match(/\d+/g);

        // Convert the strings to numbers
        this.colorRGB.R = Number(rgbArray[0]);
        this.colorRGB.G = Number(rgbArray[1]);
        this.colorRGB.B = Number(rgbArray[2]);
        this.selectedColor = color;
      }

      // Output: R: 15, G: 0, B: 255
    },
    saveColor(item) {
      if (item === "default") {
        this.payload = {
          id: this.getUserId.toString(),
          colorCode: "#1ba8bb",
        };
      } else {
        this.$v.$touch();
        if (this.$v.$pending || this.$v.$error) return;
        this.payload = {
          id: this.getUserId.toString(),
          colorCode: this.selectedColor,
        };
      }
      this.loader = true;
      this.$store.dispatch("userColor", this.payload).then((response) => {
        if (response.data.succeeded === true) {
          this.loader = false;
          this.$swal.fire({
            position: "top-end",
            icon: "success",
            title: "Color updated successfully",
            showConfirmButton: false,
            timer: 2000,
            toast: true,
          });
          this.close();
          this.fetchdata();
          if (this.$route.name == "checklist") {
            this.$router.go(0);
          }
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
    drawColorWheel() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");
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
      const ctx = canvas.getContext("2d");
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
    close() {
      this.$emit("close");

      if (!this.color != null) {
        this.selectedColor = this.color;
        this.splitRGB(this.selectedColor)
      }
      // Reset form validation
      this.$v.$reset();
    },
    getErrorMessage(colorKey) {
      const error = this.$v.colorRGB[colorKey].$error;
      if (error) return `${colorKey} must be between 0 and 255`;
      return "";
    },
  },
};
</script>

<style scoped>
.color-picker {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 290px;
}

canvas {
  cursor: crosshair;
}

.selected-color {
  padding: 15px;
  margin-top: 1rem;
  color: #fff;
  border-radius: 8px;
}

.custom-select .v-icon {
  color: var(--primary-color) !important;
}
</style>
