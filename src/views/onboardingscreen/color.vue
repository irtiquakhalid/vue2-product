<template>
  <div class="color">
    <loadercomponent :loader="loader" />
    <v-row align="start" class="h-100">
      <v-col cols="12" md="3" class="d-flex align-center">
        <router-link to="/uploadimage">
          <v-icon style="color: #1ba8bb; font-size: 45px" class="mt-6"
            >mdi-arrow-left-box</v-icon
          >
        </router-link>
        <div class="d-flex justify-space-between align-center ml-5">
          <div>
            <v-img
              src="/images/onboardingscreen/newLogooo.png"
              max-width="120"
              contain
            >

            </v-img>
          </div>
        </div>
      </v-col>

      <v-col
        cols="12"
        md="5"
        lg="7"
        class="d-flex flex-column align-center h-100"
      >
        <h2 class="black-text-400 font-weight-500 px-10 text-center mb-8">
          Want your app to look different?
        </h2>
        <div class="px-16">
          <v-img src="/images/onboardingscreen/line.png"></v-img>
        </div>
        <v-card
          flat
          max-width="500"
          class="d-flex flex-column justify-space-between align-center radius-21 h-100"
        >
          <div>
            <h3
              style="text-align: center"
              class="black-text-400 font-weight-500 mt-8 font-28"
            >
              You can change the color of your app at anytime in settings.
            </h3>
            <div class="color-picker">
              <canvas
                ref="canvas"
                width="220"
                height="220"
                @mousedown="startPicking"
              ></canvas>
              <div class="d-flex align-end mt-3">
                <div
                  v-if="selectedColor"
                  :style="{ backgroundColor: selectedColor }"
                  class="selected-color"
                ></div>
              </div>
            </div>

            <div class="d-flex justify-space-between mt-3">
              <v-text-field
                background-color="white"
                type="number"
                v-model="colorRGB.R"
                style="width: 120px"
                solo
                flat
                class="mx-2"
                :error-messages="
                  $v.colorRGB.R.$error ? 'R must be between 0 and 255' : ''
                "
              >
                <template v-slot:prepend-inner>
                  <div class="font-20 black--text d-flex font-weight-600">
                    R <span class="mx-2">|</span>
                  </div>
                </template>
              </v-text-field>

              <v-text-field
                background-color="white"
                type="number"
                v-model="colorRGB.G"
                style="width: 120px"
                solo
                flat
                class="mx-2"
                :error-messages="
                  $v.colorRGB.G.$error ? 'G must be between 0 and 255' : ''
                "
              >
                <template v-slot:prepend-inner>
                  <div class="font-20 black--text d-flex font-weight-600">
                    G <span class="mx-2">|</span>
                  </div>
                </template>
              </v-text-field>
              <v-text-field
                background-color="white"
                type="number"
                v-model="colorRGB.B"
                style="width: 120px"
                solo
                flat
                class="mx-2"
                :error-messages="
                  $v.colorRGB.B.$error ? 'B must be between 0 and 255' : ''
                "
              >
                <template v-slot:prepend-inner>
                  <div class="font-20 black--text d-flex font-weight-600">
                    B<span class="mx-2">|</span>
                  </div>
                </template>
              </v-text-field>
            </div>
            <div
              class="red--text text-center mt-1"
              v-if="
                $v.colorRGB.R.$error ||
                $v.colorRGB.G.$error ||
                $v.colorRGB.B.$error
              "
            >
              All fields are required, and values must be between 0 and 255
            </div>
            <div
              class="red--text text-center mt-1"
              v-if="$v.selectedColor.$error"
            >
              Color is required and must not contain all 0 or 255
            </div>
          </div>
          <div class="w-100 d-flex align-center flex-column pb-7">
            <v-btn
              depressed
              class="gradiant-background py-8 mt-10 radius-40"
              width="100%"
              @click="saveColor('selected')"
              ><span
                class="text-transform font-22 cyan-text-100 font-weight-600"
                >Confirm Color</span
              ></v-btn
            >
            <div class="text-center grey-text-200 my-2 font-weight-600 font-20">
              OR
            </div>
            <v-btn
              class="py-7 w-100 radius-25 gradiant-background"
              depressed
              @click="saveColor('default')"
              ><span
                class="text-transform font-22 cyan-text-100 font-weight-600"
                >Use default color</span
              ></v-btn
            >
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { required, minValue, maxValue } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      loader: false,
      selectedColor: null,
      picking: false,
      payload: {},
      colorRGB: { R: "", G: "", B: "" },
      form: null,
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
    colorRGB: {
      deep: true,
      handler() {
        this.selectedColor = `rgb(${this.colorRGB.R}, ${this.colorRGB.G}, ${this.colorRGB.B})`;
      },
    },
  },
  mounted() {
    this.fetchdata();
    this.drawColorWheel();
    window.addEventListener("mouseup", this.stopPicking);
    window.addEventListener("mousemove", this.pickColor);
  },
  beforeDestroy() {
    window.removeEventListener("mouseup", this.stopPicking);
    window.removeEventListener("mousemove", this.pickColor);
  },
  computed: {
    ...mapGetters(["getUserId", "getUserData", "getOrganizationId"]),
  },
  methods: {
    splitRGB(color) {
      if (color && color == "#1ba8bb" ? (color = "rgb(27, 168, 187)") : color) {
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
    fetchdata() {
      this.loader = true;
      let payload = {
        id: this.getUserId,
        isPagination: false,
        orgId: this.getOrganizationId,
      };
      this.$store.dispatch("getUserData", payload).then(() => {
        this.loader = false;
        this.form = this.getUserData?.userList[0]?.organizations[0];
        this.splitRGB(this.form?.organizationColor);
      });
    },
    saveColor(item) {
      if (item === "default") {
        this.payload = {
          id: this.getUserId.toString(),
          // colorCode: "#1ba8bb",
          colorCode: "rgb(27, 168, 187)",
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
            title: "Color selected successfully",
            showConfirmButton: false,
            timer: 2000,
            toast: true,
          });
          this.$router.push({ path: "/pushnotification" });
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
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      this.colorRGB.R = pixel[0];
      this.colorRGB.G = pixel[1];
      this.colorRGB.B = pixel[2];
    },
  },
};
</script>

<style scoped>
.v-card {
  background: transparent !important;
}
.color-picker {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  height: 280px;
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
