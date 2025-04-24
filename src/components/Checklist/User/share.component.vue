<template>
  <div class="share">
    <loadercomponent :loader="loader" />

    <div class="d-flex justify-space-between mb-2">
      <h3 :style="{ color: contractColor ? contractColor : '#1ba8bb' }">
        Share list with others
      </h3>
      <v-icon
        @click="close()"
        :color="contractColor ? contractColor : '#1ba8bb'"
        style="font-size: 33px"
        >mdi-close-circle</v-icon
      >
    </div>
    <h5 :style="{ color: contractColor ? contractColor : '#1ba8bb' }">
      View - only access
    </h5>

    <div
      class="share-field d-flex w-100"
      :style="{ backgroundColor: rgbToRgba(contractColor || '#1ba8bb', '16%') }"
    >
      <div class="d-flex" style="width: 96%">
        <svg
          width="55"
          height="47"
          viewBox="0 0 66 57"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.0976562"
            y="0.0639648"
            width="65.6442"
            height="56.7734"
            rx="8.87084"
            :fill="rgbToRgba(contractColor || '#1ba8bb', '16%')"
          />
          <g clip-path="url(#clip0_1336_8666)">
            <path
              d="M32.4235 37.1235L29.3926 40.1297C28.4703 41.0401 27.2265 41.5506 25.9305 41.5506C24.6345 41.5506 23.3907 41.0401 22.4684 40.1297C22.0188 39.6811 21.662 39.1482 21.4186 38.5615C21.1752 37.9748 21.05 37.3459 21.05 36.7108C21.05 36.0756 21.1752 35.4467 21.4186 34.86C21.662 34.2733 22.0188 33.7404 22.4684 33.2918L28.2468 27.5627C29.1691 26.6523 30.4129 26.1418 31.7089 26.1418C33.0048 26.1418 34.2486 26.6523 35.171 27.5627C35.7579 28.1458 36.1826 28.872 36.403 29.6695C36.5243 29.5695 36.6357 29.4581 36.7357 29.3369L38.325 27.7598C37.9692 27.0191 37.4901 26.3442 36.9082 25.7639C35.5242 24.3945 33.6558 23.6265 31.7089 23.6265C29.7619 23.6265 27.8936 24.3945 26.5096 25.7639L20.7189 31.5423C20.0368 32.2191 19.4955 33.0243 19.126 33.9114C18.7566 34.7984 18.5664 35.7498 18.5664 36.7108C18.5664 37.6717 18.7566 38.6231 19.126 39.5102C19.4955 40.3972 20.0368 41.2024 20.7189 41.8793C22.1029 43.2486 23.9712 44.0167 25.9182 44.0167C27.8651 44.0167 29.7335 43.2486 31.1175 41.8793L35.6145 37.4192H34.9985C34.1309 37.4344 33.265 37.335 32.4235 37.1235Z"
              :fill="contractColor || '#1ba8bb'"
            />
            <path
              d="M45.9896 16.7956C44.6056 15.4263 42.7372 14.6582 40.7903 14.6582C38.8433 14.6582 36.975 15.4263 35.591 16.7956L31.0939 21.2557H31.6977C32.5716 21.2555 33.4417 21.3715 34.285 21.6007L37.3159 18.5944C38.2382 17.684 39.482 17.1735 40.7779 17.1735C42.0739 17.1735 43.3177 17.684 44.24 18.5944C44.6897 19.0431 45.0464 19.576 45.2898 20.1626C45.5332 20.7493 45.6585 21.3782 45.6585 22.0134C45.6585 22.6486 45.5332 23.2775 45.2898 23.8642C45.0464 24.4509 44.6897 24.9838 44.24 25.4324L38.4617 31.1615C37.5394 32.0719 36.2955 32.5824 34.9996 32.5824C33.7036 32.5824 32.4598 32.0719 31.5375 31.1615C30.9505 30.5783 30.5259 29.8521 30.3054 29.0546C30.1821 29.1385 30.0666 29.2333 29.9605 29.338L28.3711 30.9151C28.727 31.6558 29.2061 32.3307 29.788 32.911C31.172 34.2803 33.0403 35.0484 34.9873 35.0484C36.9342 35.0484 38.8025 34.2803 40.1866 32.911L45.9649 27.1819C46.6455 26.5042 47.1856 25.6988 47.5541 24.8118C47.9226 23.9249 48.1122 22.9739 48.1122 22.0134C48.1122 21.053 47.9226 20.102 47.5541 19.215C47.1856 18.328 46.6455 17.5226 45.9649 16.8449L45.9896 16.7956Z"
              :fill="contractColor || '#1ba8bb'"
            />
          </g>
          <defs>
            <clipPath id="clip0_1336_8666">
              <rect
                width="44.3542"
                height="44.3542"
                fill="white"
                transform="translate(10.7422 7.16064)"
              />
            </clipPath>
          </defs>
        </svg>
        <v-text-field
          solo
          flat
          :background-color="rgbToRgba(contractColor || '#1ba8bb', '16%')"
          hide-details
          v-model="shareLink"
        >
          <template v-slot:prepend-inner>
            <span :style="{ color: contractColor || '#1ba8bb' }" class="mr-1"
              >URL:</span
            >
          </template>
        </v-text-field>
      </div>
      <v-btn
        class="py-6 ml-1"
        :color="contractColor ? contractColor : '#1ba8bb'"
        @click="copyText"
        ><span class="text-transform font-16 white--text">Copy</span>
      </v-btn>
    </div>
    <h6
      :style="{ color: contractColor ? contractColor : '#1ba8bb' }"
      class="mt-4 mb-2"
    >
      Share Via Email
    </h6>
    <div>
      <div>
        <v-combobox
          solo
          multiple
          item-text="name"
          chips
          item-value="email"
          flat
          :items="emailsforGmail"
          :background-color="rgbToRgba(contractColor || '#1ba8bb', '16%')"
          hide-details
          v-model="emailData.recipients"
        >
          <template v-slot:prepend-inner>
            <span :style="{ color: contractColor || '#1ba8bb' }" class="mr-1"
              >Recipients:</span
            >
          </template>
        </v-combobox>
        <div class="red--text" v-if="$v.emailData.recipients.$error">
          Recipients is required
        </div>
      </div>
      <v-row class="my-5">
        <v-col cols="12" md="8">
          <v-text-field
            solo
            v-model="emailData.subject"
            flat
            :background-color="rgbToRgba(contractColor || '#1ba8bb', '16%')"
            hide-details
          >
            <template v-slot:prepend-inner>
              <span :style="{ color: contractColor || '#1ba8bb' }" class="mr-1"
                >Subject:</span
              >
            </template>
          </v-text-field>
          <div class="red--text" v-if="$v.emailData.subject.$error">
            Subject is required
          </div>
        </v-col>
        <v-col cols="12" md="4" v-if="checklist.createdById !== ownUserId">
          <v-file-input
            prepend-icon=""
            @change="getImageFileLink()"
            append-icon="mdi-file"
            solo
            v-model="imageFile"
            flat
            :background-color="rgbToRgba(contractColor || '#1ba8bb', '16%')"
            hide-details
            chips
          >
            <template v-slot:prepend-inner>
              <span :style="{ color: contractColor || '#1ba8bb' }" class="mr-1"
                >Logo:</span
              >
            </template>
            <template v-slot:selection="{ text }">
              <v-chip small label color="primary">
                {{ text }}
              </v-chip>
            </template>
          </v-file-input>
        </v-col>
      </v-row>
      <div>
        <v-textarea
          solo
          label="Top message"
          flat
          :background-color="rgbToRgba(contractColor || '#1ba8bb', '16%')"
          hide-details
          v-model="emailData.topMessage"
        >
        </v-textarea>
      </div>
      <div class="mt-7">
        <v-textarea
          solo
          label="Bottom message"
          flat
          :background-color="rgbToRgba(contractColor || '#1ba8bb', '16%')"
          hide-details
          v-model="emailData.bottomMessage"
        >
        </v-textarea>
      </div>
    </div>
    <div class="d-flex">
      <a :href="shareLink" target="_blank" style="text-decoration: none">
        <h6
          :style="{ color: contractColor ? contractColor : '#1ba8bb' }"
          class="mt-4 mb-2"
        >
          View Email Template
        </h6>
      </a>
    </div>
    <div class="d-flex justify-end mb-1 mt-9">
      <v-btn
        @click="sendingEmail()"
        class="py-6 radius-25 px-7"
        :color="contractColor ? contractColor : '#1ba8bb'"
        ><v-icon class="white--text mr-2 mt-1" style="font-size: 20px"
          >mdi-send</v-icon
        ><span class="text-transform font-16 white--text">Send Email</span>
      </v-btn>

      <!-- <a :href="gmailComposeLink" target="_blank">
        <v-btn
          class="py-6 radius-25 px-7"
          :color="contractColor ? contractColor : '#1ba8bb'"
          ><v-icon class="white--text mr-2 mt-1" style="font-size: 20px"
            >mdi-send</v-icon
          ><span class="text-transform font-16 white--text">Send Email</span>
        </v-btn>
      </a> -->
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import axios from "axios";
export default {
  props: ["contractColor", "publicLink", "checklist", "emailsforGmail"],
  data() {
    return {
      emailData: {
        logo: null,
        recipients: null,
        subject: null,
        bottomMessage: null,
        topMessage:
          "We’ve created a property checklist to keep you fully informed throughout the process. By monitoring each step along the way, you can easily see how close the checklist is to meeting its final completion. Please let me know if there’s anything I can do for you! If you have any questions, please don’t hesitate to reach out.Thank you,",
      },
      shareLink: "",
      URL: process.env.VUE_APP_IMG_API,
      webURL: process.env.VUE_APP_BROKER_URL,
      ownUserId: localStorage.getItem("userId"),
      imageFile: null,
      loader: false,
      subject: "Invitation to View the Broker Checklist",
      body: "",
    };
  },
  validations: {
    emailData: {
      recipients: {
        required,
      },
      subject: {
        required,
      },
    },
  },
  mounted() {
    this.mapData();
    this.shareLink = `${this.webURL}checklist/readonly/${this.publicLink}`;
    //this.shareLink = `http://localhost:8080/checklist/readonly/${this.publicLink}`;
    if (this.shareLink) {
      this.body = `Access the broker checklist for the property "${this.checklist?.propertyAddressName}", created by "${this.checklist?.organizationName}".

      Click the link below to view the checklist:
      ${this.shareLink}`;
    }
    // You can also access the general contract directly at the following link:
    // ${this.webURL}generalcontract
  },

  computed: {
    gmailComposeLink() {
      const toEmails = this.emailsforGmail.join(",");
      const emailBody = `${this.body}`;
      return `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${encodeURIComponent(
        toEmails
      )}&su=${encodeURIComponent(this.subject)}&body=${encodeURIComponent(
        emailBody
      )}`;
    },
  },
  methods: {
    async getImageFileLink() {
      const token = localStorage.getItem("userToken"); // Retrieve token from localStorage
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }
      const formData = new FormData();
      formData.append("Image", this.imageFile);
      const contractId = +this.$route.query.contractId; // Change this if needed

      try {
        const response = await axios.post(
          `http://brokerapis.rootpointers.net/api/ContractSchedules/ContractImageForEmail?ContractId=${contractId}`,
          formData,
          {
            headers: {
              accept: "text/plain",
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.emailData.logo = response.data.data;
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    },
    mapData() {
      // this.emailsforGmail = this.emailsforGmail.map((email) => ({
      //   email: email,
      //   name: email.split("@")[0], // You can customize this logic to generate names differently
      // }));
      this.emailData.recipients = this.emailsforGmail;
    },
    sendingEmail() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("Error");
      } else {
        this.loader = true;
        const payload = {
          email: this.emailData.recipients,
          link: this.shareLink,
          bottomMessage: this.emailData.bottomMessage,
          topMessage: this.emailData.topMessage,
          subject: this.emailData.subject,
          logo: this.emailData.logo
            ? `${this.URL}${this.emailData.logo}`
            : "http://brokerapis.rootpointers.net/Files/GroupChatImages/58fd7653-df50-4193-89f4-6a19fcdf7b71.png",

          contractScheduleId: +this.$route.query.contractId,
        };

        this.$store.dispatch("sendEmail", payload).then((response) => {
          if (response.data.succeeded) {
            this.$swal.fire({
              position: "top-end",
              icon: "success",
              title: response.data.message,
              showConfirmButton: false,
              timer: 2000,
              toast: true,
            });
            this.loader = false;
            this.close();
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
        this.loader = false;
      }

    },
    copyText() {
      const textArea = document.createElement("textarea");
      textArea.value = this.shareLink; // The text you want to copy

      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      textArea.style.left = "-9999px";

      document.body.appendChild(textArea); // Append the textarea to the document
      textArea.focus(); // Focus the textarea
      textArea.select(); // Select the text

      try {
        const successful = document.execCommand("copy");
        if (successful) {
          this.$swal.fire({
            position: "top-end",
            icon: "success",
            title: "Copied to clipboard",
            showConfirmButton: false,
            timer: 2000,
            toast: true,
          });
        } else {
          console.error("Copy command failed");
        }
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }

      document.body.removeChild(textArea);
    },
    close() {
      this.$emit("close");
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
