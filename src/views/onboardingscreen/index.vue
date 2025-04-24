<template>
  <div class="onboarding" >
    <v-row align="start" class="h-100" style="overflow: hidden; margin: 0;">
      <v-col cols="12" md="12" lg="12" class="h-100 d-flex justify-center" style="overflow: hidden;">
        <div class="d-flex flex-column align-center" style="overflow: hidden;">
          <div class="d-flex justify-center">
            <v-img
              src="/images/onboardingscreen/newLogooo.png"
              contain
              style="max-width: 50%;"
              :class="fadeOut?'fade-out-animate':'fade-in-animate'"
            >
            </v-img>
          </div>
          <v-card
            flat
            class="pt-4 px-6 d-flex flex-column justify-space-between"
            style="min-height: 400px; width: 100%; max-width: 1000px; overflow: hidden;"
          >
            <div class="px-10" v-for="item in newItem" :key="item.id">
              <h2 class="black-text-400 font-weight-500 text-center">
                {{ item.title }}
              </h2>
              <div class="px-10 mt-10">
                <v-img src="/images/onboardingscreen/line.png"></v-img>
              </div>
              <span
                style="text-align: center;"
                class="black-text-400 d-flex mt-4 font-28"
              >
                {{ item.text }}
              </span>
            </div>
            <div>
              <div class="d-flex justify-center mt-5">
                <v-icon
                  color="#1BA8BB"
                  class="cursor-pointer mr-2"
                  style="font-size: 33px"
                  @click="previousValue"
                  >mdi-arrow-left-drop-circle</v-icon
                >
                <div class="d-flex justify-center">
                  <div
                    :class="item.id === newItem[0]?.id ? 'active-dot' : 'dots'"
                    v-for="item in items"
                    @click="activeDot(item)"
                    :key="item.id"
                  ></div>
                </div>
                <v-icon
                  color="#1BA8BB"
                  class="cursor-pointer ml-2"
                  style="font-size: 33px"
                  @click="nextValue"
                  >mdi-arrow-right-drop-circle</v-icon
                >
              </div>
              <!-- background: linear-gradient(#344459,#107A7D); -->
              <div class="mb-0 d-flex justify-center">
                <v-btn
                  style="max-width: 65%;"
                  class="py-8 mt-16 w-100 gradiant-background radius-40"
                  @click="getStarted"
                  ><span
                    class="text-transform font-22 cyan-text-100 font-weight-600"
                    >Get Started</span
                  ></v-btn
                >
              </div> 
             </div>
          </v-card>
        </div>
      </v-col>
      
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          id: 1,
          image: "/images/onboardingscreen/image1.svg",
          text: "Experience a tailored checklist solution designed specifically for real estate agents, moving beyond generic task managers. Ensure a smooth process from contract to closing.",
          title: "Created by Real Estate Agents",
        },
        {
          id: 2,
          image: "/images/onboardingscreen/image2.svg",
          text: "Replace cumbersome word, excel, and email format timelines, with an intergrated, easy-to-use system.",
          title: "Simplify your contract timelines",
        },
        {
          id: 3,
          image: "/images/onboardingscreen/image3.svg",
          text: "Build trust with clients by allowing them to view their contract checklist with real-time updates, at no extra cost to you or them.",
          title: "FREE client access",
        },
        {
          id: 4,
          image: "/images/onboardingscreen/image4.svg",
          text: "Focus more on your clients and less on administrative tasks. Enter contract information once and share it seamlessly. Record your completed tasks on the go, without any delays.",
          title: "Streamline and free up your time",
        },
        {
          id: 5,
          image: "/images/onboardingscreen/image5.svg",
          text: "Get an instant overview of all ongoing deals and their status. Quickly identify which deals are on track and which need attention.",
          title: "Team Leaders and Brokers",
        },
        {
          id: 6,
          image: "/images/onboardingscreen/image6.svg",
          text: "Use our ready-to-go templates or create and store partial or full checklists with ease. Upload your documents effortlessly.",
          title: "Personailize your experience",
        },
      ],
      newItem: [],
      fadeOut: false,
    };
  },
  mounted() {
    this.initialItem();
    this.autoPlay();
  },
  methods: {
    getStarted(){
      this.fadeOut = true;
      setTimeout(() => {
        this.$router.push('/signup');
      }, 500);
    },
    previousValue() {
      const value = this.newItem[0];
      let findValue = this.items.findIndex((item) => item.id === value.id);
      findValue = findValue - 1;
      if (findValue >= 0) {
        findValue = this.items[findValue];
        this.newItem = [findValue];
      } else {
        findValue = this.items[this.items.length - 1];
        this.newItem = [findValue];
      }
    },
    activeDot(item) {
      if (item) {
        this.newItem = this.items.filter((value) => value.id === item.id);
      }
    },
    initialItem() {
      let value = this.items[0];
      this.newItem = [value];
    },
    nextValue() {
      const value = this.newItem[0];
      let findValue = this.items.findIndex((item) => item.id === value.id);
      findValue = findValue + 1;
      if (this.items.length > findValue) {
        findValue = this.items[findValue];
        this.newItem = [findValue];
      } else {
        let findValue = this.items[0];
        this.newItem = [findValue];
      }
    },
    autoPlay() {
      setInterval(() => {
        this.nextValue();
      }, 118000);
    },
  },
};
</script>

<style scoped>
.theme--light.v-card {
  background: transparent;
}
</style>
