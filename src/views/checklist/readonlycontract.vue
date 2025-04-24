<template>
  <div class="readonlycontract user">
    <loadercomponent :loader="loader" />

    <div v-if="checklist.id">
      <!-- <div class="d-flex align-center">
        <a :href="brokerURL">
          <v-img
            class="logo"
            src="https://i.ibb.co/3k3FxCP/Edition-2-with-logo-All-effects-downsize-copy.png"
            max-width="100"
          ></v-img>
        </a>
        <h2 style="color: #636363">Broker Checklist</h2>
      </div>
      <div
        class="d-flex align-center justify-space-between z-index-5 contract-heading"
      >
        <div class="d-flex align-center">
          <h3>Contract <span class="font-24">(View Only)</span></h3>
        </div>
      </div>
      <v-row>
        <v-col cols="12" md="6">
          <div class="border-container">
            <span
              class="font-18 font-weight-600"
              :style="{
                color: checklist.colorCode
                  ? `${checklist.colorCode} !important`
                  : '#1ba8bb !important',
              }"
              >Property Address Name</span
            >
            <div>{{ checklist.propertyAddressName }}</div>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div class="border-container">
            <div class="d-flex justify-space-between align-center">
              <span
                class="font-18 font-weight-600"
                :style="{
                  color: checklist.colorCode
                    ? `${checklist.colorCode} !important`
                    : '#1ba8bb !important',
                }"
                >Co-op Realtor</span
              >
              <v-icon
                :style="{
                  color: checklist.colorCode
                    ? `${checklist.colorCode} !important`
                    : '#1ba8bb !important',
                }"
                class="mr-3 cursor-pointer"
                @click="
                  detailItem(
                    checklist.realtor[0]?.phone,
                    checklist.realtor[0]?.email,
                    checklist.realtor[0]?.address,
                    'Realtor'
                  )
                "
                style="font-size: 27px"
                >mdi-information</v-icon
              >
            </div>

            <div class="d-flex justify-space-between">
              <span class="handler-text-overflow">{{
                checklist.realtor[0]?.name ||
                checklist.realtor[0]?.email ||
                "\u00A0"
              }}</span>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-row>
            <v-col cols="12" md="6">
              <div class="border-container">
                <div class="d-flex justify-space-between align-center">
                  <span
                    class="font-18 font-weight-600"
                    :style="{
                      color: checklist.colorCode
                        ? `${checklist.colorCode} !important`
                        : '#1ba8bb !important',
                    }"
                    >Buyer 1</span
                  >
                  <v-icon
                    :style="{
                      color: checklist.colorCode
                        ? `${checklist.colorCode} !important`
                        : '#1ba8bb !important',
                    }"
                    class="mr-3 cursor-pointer"
                    @click="
                      detailItem(
                        checklist.buyer1?.phone,
                        checklist.buyer1?.email,
                        checklist.buyer1?.address,
                        'Buyer 1'
                      )
                    "
                    style="font-size: 27px"
                    >mdi-information</v-icon
                  >
                </div>
                <div class="d-flex justify-space-between">
                  <span class="handler-text-overflow">{{
                    checklist.buyer1?.name ||
                    checklist.buyer1?.email ||
                    "\u00A0"
                  }}</span>
                </div>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="border-container">
                <div class="d-flex justify-space-between align-center">
                  <span
                    class="font-18 font-weight-600"
                    :style="{
                      color: checklist.colorCode
                        ? `${checklist.colorCode} !important`
                        : '#1ba8bb !important',
                    }"
                    >Buyer 2</span
                  >
                  <v-icon
                    :style="{
                      color: checklist.colorCode
                        ? `${checklist.colorCode} !important`
                        : '#1ba8bb !important',
                    }"
                    class="mr-3 cursor-pointer"
                    @click="
                      detailItem(
                        checklist.buyer2?.phone,
                        checklist.buyer2?.email,
                        checklist.buyer2?.address,
                        'Buyer 2'
                      )
                    "
                    style="font-size: 27px"
                    >mdi-information</v-icon
                  >
                </div>
                <div class="d-flex justify-space-between">
                  <span class="handler-text-overflow">{{
                    checklist.buyer2?.name ||
                    checklist.buyer2?.email ||
                    "\u00A0"
                  }}</span>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6">
          <div class="border-container">
            <div class="d-flex align-center justify-space-between">
              <span
                class="font-18 font-weight-600"
                :style="{
                  color: checklist.colorCode
                    ? `${checklist.colorCode} !important`
                    : '#1ba8bb !important',
                }"
                >Escrow Agent</span
              >
              <v-icon
                :style="{
                  color: checklist.colorCode
                    ? `${checklist.colorCode} !important`
                    : '#1ba8bb !important',
                }"
                class="mr-3 cursor-pointer"
                @click="
                  detailItem(
                    checklist.escrowAgent[0]?.phone,
                    checklist.escrowAgent[0]?.email,
                    checklist.escrowAgent[0]?.address,
                    'Escrow Agent'
                  )
                "
                style="font-size: 27px"
                >mdi-information</v-icon
              >
            </div>
            <div class="d-flex justify-space-between">
              <span class="handler-text-overflow">{{
                checklist.escrowAgent[0]?.name ||
                checklist.escrowAgent[0]?.email ||
                "\u00A0"
              }}</span>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-row>
            <v-col cols="12" md="6">
              <div class="border-container">
                <div class="d-flex align-center justify-space-between">
                  <span
                    class="font-18 font-weight-600"
                    :style="{
                      color: checklist.colorCode
                        ? `${checklist.colorCode} !important`
                        : '#1ba8bb !important',
                    }"
                    >Seller 1</span
                  >
                  <v-icon
                    :style="{
                      color: checklist.colorCode
                        ? `${checklist.colorCode} !important`
                        : '#1ba8bb !important',
                    }"
                    class="mr-3 cursor-pointer"
                    @click="
                      detailItem(
                        checklist.seller1?.phone,
                        checklist.seller1?.email,
                        checklist.seller1?.address,
                        'Seller 1'
                      )
                    "
                    style="font-size: 27px"
                    >mdi-information</v-icon
                  >
                </div>
                <div class="d-flex justify-space-between">
                  <span class="handler-text-overflow">{{
                    checklist.seller1?.name ||
                    checklist.seller1?.email ||
                    "\u00A0"
                  }}</span>
                </div>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="border-container">
                <div class="d-flex align-center justify-space-between">
                  <span
                    class="font-18 font-weight-600"
                    :style="{
                      color: checklist.colorCode
                        ? `${checklist.colorCode} !important`
                        : '#1ba8bb !important',
                    }"
                    >Seller 2</span
                  >
                  <v-icon
                    :style="{
                      color: checklist.colorCode
                        ? `${checklist.colorCode} !important`
                        : '#1ba8bb !important',
                    }"
                    class="mr-3 cursor-pointer"
                    @click="
                      detailItem(
                        checklist.seller2?.phone,
                        checklist.seller2?.email,
                        checklist.seller2?.address,
                        'Seller 2'
                      )
                    "
                    style="font-size: 27px"
                    >mdi-information</v-icon
                  >
                </div>
                <div class="d-flex justify-space-between">
                  <span class="handler-text-overflow">{{
                    checklist.seller2?.name ||
                    checklist.seller2?.email ||
                    "\u00A0"
                  }}</span>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6">
          <div class="border-container">
            <div class="d-flex align-center justify-space-between">
              <span
                class="font-18 font-weight-600"
                :style="{
                  color: checklist.colorCode
                    ? `${checklist.colorCode} !important`
                    : '#1ba8bb !important',
                }"
                >Attorney</span
              >
              <v-icon
                :style="{
                  color: checklist.colorCode
                    ? `${checklist.colorCode} !important`
                    : '#1ba8bb !important',
                }"
                class="mr-3 cursor-pointer"
                @click="
                  detailItem(
                    checklist.attorney[0]?.phone,
                    checklist.attorney[0]?.email,
                    checklist.attorney[0]?.address,
                    'Attorney'
                  )
                "
                style="font-size: 27px"
                >mdi-information</v-icon
              >
            </div>
            <div class="d-flex justify-space-between">
              <span class="handler-text-overflow">{{
                checklist.attorney[0]?.name ||
                checklist.attorney[0]?.email ||
                "\u00A0"
              }}</span>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" class="d-flex justify-space-between">
          <v-row>
            <v-col cols="12" md="6">
              <div class="border-container">
                <span
                  class="font-18 font-weight-600"
                  :style="{
                    color: checklist.colorCode
                      ? `${checklist.colorCode} !important`
                      : '#1ba8bb !important',
                  }"
                  >Start Date</span
                >
                <div>
                  {{
                    checklist.startDate
                      ? formatDate(new Date(checklist.startDate))
                      : "\u00A0"
                  }}
                </div>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="pr-5 border-container">
                <span
                  class="font-18 font-weight-600"
                  :style="{
                    color: checklist.colorCode
                      ? `${checklist.colorCode} !important`
                      : '#1ba8bb !important',
                  }"
                  >End Date</span
                >
                <div>
                  {{
                    checklist.endDate
                      ? formatDate(new Date(checklist.endDate))
                      : "\u00A0"
                  }}
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <div
        class="d-flex align-center mt-8 mb-5"
        v-if="checklist.contractScheduleTaskDetails.length > 0"
      >
        <span
          :style="{
            color: checklist.colorCode
              ? `${checklist.colorCode} !important`
              : '#1ba8bb !important',
          }"
          >{{ this.percentageValue ? this.percentageValue : 0 }}%</span
        >
        <v-progress-linear
          :value="this.percentageValue"
          :color="
            checklist.colorCode
              ? `${checklist.colorCode} !important`
              : '#1ba8bb !important'
          "
          class="ml-4"
          rounded
          height="7"
          background-color="#EFEFEF"
        ></v-progress-linear>
      </div>
      <v-row v-if="checklist.contractScheduleTaskDetails.length > 0">
        <v-col
          cols="12"
          class="font-weight-600"
          :style="{
            color: checklist.colorCode
              ? `${checklist.colorCode} !important`
              : '#1ba8bb !important',
          }"
          ><span class="task-heading-font">Task Name</span></v-col
        >
      </v-row>
      <draggable
        v-model="checklist.contractScheduleTaskDetails"
        @end="onDragEnd"
        handle=".drag-handle"
      >
        <div class="scroller" style="max-height: 250px !important">
          <div
            class="d-flex justify-space-between align-center pa-3 my-3 grey-background"
            v-for="item in checklist.contractScheduleTaskDetails"
            :key="item.id"
          >
            <v-row>
              <v-col cols="12">
                <div class="d-flex">
                  <v-checkbox
                    :color="
                      checklist.colorCode
                        ? `${checklist.colorCode} !important`
                        : '#1ba8bb !important'
                    "
                    class="py-0 my-0 set-font"
                    hide-details
                    v-model="selectedTasks"
                    :value="item.taskId"
                    :disabled="true"
                  >
                    <template v-slot:label>
                      <span
                        :style="{
                          color: checklist.colorCode
                            ? `${checklist.colorCode} !important`
                            : '#1ba8bb !important',
                        }"
                        class="font-weight-500 set-font handler-text-task-overflow"
                        >{{ item.taskName }}</span
                      >
                    </template>
                  </v-checkbox>
                </div>
              </v-col>
            </v-row>
          </div>
        </div>
      </draggable>
      <div></div>
      <div class="d-flex mt-14 justify-center" style="flex-wrap: wrap">
        <a :href="brokerURL" style="text-decoration: none">
          <div
            class="cursor-pointer download-image image-container d-flex flex-column pl-4 pr-2 py-1 mr-4"
            style="
              background-color: #0b0b0be0;
              width: 180px;
              height: 52px;
              border-radius: 6px;
            "
          >
            <div class="white--text d-flex align-center">
              <v-img src="/images/checklist/web.svg" max-width="31"></v-img>
              <div class="ml-3">
                <div
                  class="text-transform heading1"
                  style="font-size: 14px; text-decoration: none"
                >
                  Continue With
                </div>
                <div
                  class="white--text text-transform heading2"
                  style="
                    font-size: 23px;
                    font-weight: 500;
                    line-height: 0.9;
                    text-decoration: none;
                  "
                >
                  Website
                </div>
              </div>
            </div>
          </div>
        </a>
        <div
          class="cursor-pointer download-image image-container d-flex flex-column pl-4 pr-2 py-1 mr-4"
          style="
            background-color: #0b0b0be0;
            width: 180px;
            height: 52px;
            border-radius: 6px;
          "
        >
          <div class="white--text d-flex align-center">
            <v-img
              src="/images/checklist/googleplay.png"
              max-width="33"
            ></v-img>
            <div class="ml-3">
              <div
                class="text-transform heading1"
                style="font-size: 14px; text-decoration: none"
              >
                GET IT ON
              </div>
              <div
                class="white--text text-transform heading2"
                style="
                  font-size: 23px;
                  font-weight: 500;
                  line-height: 0.9;
                  text-decoration: none;
                "
              >
                Google Play
              </div>
            </div>
          </div>
        </div>
        <div
          class="cursor-pointer download-image image-container d-flex flex-column pl-3 pr-2 py-1"
          style="
            background-color: #0b0b0be0;
            width: 180px;
            height: 52px;
            border-radius: 6px;
          "
        >
          <div class="white--text d-flex align-center">
            <v-img src="/images/checklist/apple.svg" max-width="38"></v-img>
            <div class="ml-2">
              <div
                class="text-transform heading1"
                style="font-size: 14px; text-decoration: none"
              >
                GET IT ON
              </div>
              <div
                class="white--text text-transform heading2"
                style="
                  font-size: 23px;
                  font-weight: 500;
                  line-height: 0.9;
                  text-decoration: none;
                "
              >
                App Store
              </div>
            </div>
          </div>
        </div>
      </div> -->

      <!-------------------------------Start new Style By Clint------------------------------------------------------------------------------------>

      <div
        :style="{
          maxWidth: '600px',
          margin: '20px auto',
          background: '#fff',
          border: '3px solid ' + checklist.colorCode,
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }"
      >
        <!-- Logo Section -->
        <div style="text-align: center; margin-bottom: 20px">
          <img
            :src="
              checklist.contractImageLogo
                ? `http://brokerapis.rootpointers.net${checklist.contractImageLogo}`
                : 'http://brokerapis.rootpointers.net/Files/GroupChatImages/58fd7653-df50-4193-89f4-6a19fcdf7b71.png'
            "
            alt="Logo"
            style="max-width: 100px"
          />
        </div>
        <!-- Welcome Message -->
        <p style="font-size: 14px; color: #555; line-height: 1.6">
          We’ve created a property checklist to keep you fully informed
          throughout the process. By monitoring each step along the way, you can
          easily see how close the checklist is to meeting its final completion.
          Please let me know if there’s anything I can do for you!
        </p>

        <!-- Contact Info -->
        <p style="font-size: 14px; color: #333; margin-top: 20px">
          If you have any questions, please don’t hesitate to reach out.
        </p>
        <p style="font-size: 14px; color: #333; margin-bottom: 20px">
          Thank you,
        </p>

        <!-- Property Details -->
        <div style="width: 100%; display: flex; justify-content: start">
          <div
            class="property-info"
            style="
              width: 7rem;
              display: flex;
              flex-direction: column;
              justify-content: left;
            "
          >
            <strong
              :style="{
                color: checklist.colorCode
                  ? `${checklist.colorCode} !important`
                  : '#1ba8bb !important',
              }"
              style="font-size: 14px; margin: 5px 0"
              >Property:</strong
            >
            <strong
              :style="{
                color: checklist.colorCode
                  ? `${checklist.colorCode} !important`
                  : '#1ba8bb !important',
              }"
              style="font-size: 14px; margin: 5px 0"
              >Buyer-1:</strong
            >
            <strong
              :style="{
                color: checklist.colorCode
                  ? `${checklist.colorCode} !important`
                  : '#1ba8bb !important',
              }"
              style="font-size: 14px; margin: 5px 0"
              >Buyer-2:</strong
            >
            <strong
              :style="{
                color: checklist.colorCode
                  ? `${checklist.colorCode} !important`
                  : '#1ba8bb !important',
              }"
              style="font-size: 14px; margin: 5px 0"
              >Seller-1:</strong
            >
            <strong
              :style="{
                color: checklist.colorCode
                  ? `${checklist.colorCode} !important`
                  : '#1ba8bb !important',
              }"
              style="font-size: 14px; margin: 5px 0"
              >Seller-2:</strong
            >
            <strong
              :style="{
                color: checklist.colorCode
                  ? `${checklist.colorCode} !important`
                  : '#1ba8bb !important',
              }"
              style="font-size: 14px; margin: 5px 0"
              >Escrow Agent:</strong
            >
            <strong
              :style="{
                color: checklist.colorCode
                  ? `${checklist.colorCode} !important`
                  : '#1ba8bb !important',
              }"
              style="font-size: 14px; margin: 5px 0"
              >Attorney:</strong
            >
            <strong
              :style="{
                color: checklist.colorCode
                  ? `${checklist.colorCode} !important`
                  : '#1ba8bb !important',
              }"
              style="font-size: 14px; margin: 5px 0"
              >HOA Contact:</strong
            >
            <strong
              :style="{
                color: checklist.colorCode
                  ? `${checklist.colorCode} !important`
                  : '#1ba8bb !important',
              }"
              style="font-size: 14px; margin: 5px 0"
              >Closing Agent:</strong
            >
          </div>
          <div
            class="property-info"
            style="
              max-width: 50%;
              display: flex;
              flex-direction: column;
              justify-content: left;
            "
          >
            <p
              style="
                font-size: 14px;
                color: #555;
                margin: 5px 0;
                display: flex;
                justify-content: start;
              "
            >
              {{ checklist.propertyAddressName }}
            </p>
            <p
              style="
                font-size: 14px;
                color: #555;
                margin: 5px 0;
                display: flex;
                justify-content: start;
              "
            >
              {{
                checklist.buyer1?.name || checklist.buyer1?.email || "\u00A0"
              }}
            </p>
            <p
              style="
                font-size: 14px;
                color: #555;
                margin: 5px 0;
                display: flex;
                justify-content: start;
              "
            >
              {{
                checklist.buyer2?.name || checklist.buyer2?.email || "\u00A0"
              }}
            </p>
            <p
              style="
                font-size: 14px;
                color: #555;
                margin: 5px 0;
                display: flex;
                justify-content: start;
              "
            >
              {{
                checklist.seller1?.name || checklist.seller1?.email || "\u00A0"
              }}
            </p>
            <p
              style="
                font-size: 14px;
                color: #555;
                margin: 5px 0;
                display: flex;
                justify-content: start;
              "
            >
              {{
                checklist.seller2?.name || checklist.seller2?.email || "\u00A0"
              }}
            </p>
            <p
              style="
                font-size: 14px;
                color: #555;
                margin: 5px 0;
                display: flex;
                justify-content: start;
              "
            >
              {{
                checklist.escrowAgent[0]?.name ||
                checklist.escrowAgent[0]?.email ||
                "\u00A0"
              }}
            </p>
            <p
              style="
                font-size: 14px;
                color: #555;
                margin: 5px 0;
                display: flex;
                justify-content: start;
              "
            >
              {{
                checklist.attorney[0]?.name ||
                checklist.attorney[0]?.email ||
                "\u00A0"
              }}
            </p>
            <p
              style="
                font-size: 14px;
                color: #555;
                margin: 5px 0;
                display: flex;
                justify-content: start;
              "
            >
              {{
                checklist.hoaContact[0]?.name ||
                checklist.hoaContact[0]?.email ||
                "\u00A0"
              }}
            </p>
            <p
              style="
                font-size: 14px;
                color: #555;
                margin: 5px 0;
                display: flex;
                justify-content: start;
              "
            >
              {{
                checklist.closingAgent[0]?.name ||
                checklist.closingAgent[0]?.email ||
                "\u00A0"
              }}
            </p>
          </div>
        </div>
        <!-- Checklist -->
        <div
          style="margin: 0 rem"
          class="d-flex justify-space-between align-center pa-3 my-3 grey-background"
          v-for="item in checklist.contractScheduleTaskDetails"
          :key="item.id"
        >
          <v-row>
            <v-col cols="12">
              <div class="d-flex">
                <v-checkbox
                  :color="
                    checklist.colorCode
                      ? `${checklist.colorCode} !important`
                      : '#1ba8bb !important'
                  "
                  class="py-0 my-0 set-font"
                  hide-details
                  v-model="selectedTasks"
                  :value="item.taskId"
                  :disabled="true"
                >
                  <template v-slot:label>
                    <span
                      :style="{
                        color: checklist.colorCode
                          ? `${checklist.colorCode} !important`
                          : '#1ba8bb !important',
                      }"
                      class="font-weight-500 set-font handler-text-task-overflow"
                      >{{ item.taskName }}</span
                    >
                  </template>
                </v-checkbox>
              </div>
            </v-col>
          </v-row>
        </div>
        <p style="font-size: 14px; color: #555; line-height: 1.6">
          We’ve created a property checklist to keep you fully informed
          throughout the process. By monitoring each step along the way, you can
          easily see how close the checklist is to meeting its final completion.
          Please let me know if there’s anything I can do for you!
        </p>
      </div>
      <!------------------------------End new Style By Clint------------------------------------------------------------------------------------->
    </div>
    <v-dialog v-model="shareDialog" max-width="550" persistent>
      <v-card class="pa-6 radius-21">
        <sharecomponent @close="close" :contractColor="contractColor" />
      </v-card>
    </v-dialog>
    <v-dialog v-model="contentDialog" max-width="500" persistent>
      <v-card class="pa-6 radius-21">
        <detailcomponent
          @close="close"
          :detailContent="detailContent"
          :contractColor="contractColor"
        />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import sharecomponent from "@/components/Checklist/User/share.component.vue";
import detailcomponent from "@/components/Checklist/User/detail.component.vue";
import { mapGetters } from "vuex";
import draggable from "vuedraggable";
export default {
  components: { sharecomponent, draggable, detailcomponent },
  data() {
    return {
      loader: false,
      shareDialog: false,
      contentDialog: false,
      skipPayment: null,
      checklist: {
        buyer1: {},
        buyer2: {},
        seller1: {},
        seller2: {},
        attorney: {},
        realtor: {},
        escrowAgent: {},
        contractScheduleTaskDetails: [],
      },
      percentageValue: 0,
      selectedTasks: [],
      detailContent: null,
      contractColor: "",
      contractOwnedBy: null,
      brokerURL: process.env.VUE_APP_BROKER_URL,
    };
  },
  computed: {
    ...mapGetters(["getOrganizationId", "sharePublicLinkData", "getUserId"]),
  },
  watch: {
    getOrganizationId: {
      immediate: true,
      handler(newValue, oldValue) {
        if (oldValue && oldValue !== newValue) {
          this.$router.push("/checklist");
        }
      },
    },
    selectedTasks: {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        this.percentageValue = Math.round(
          (this.selectedTasks.length /
            this.checklist.contractScheduleTaskDetails.length) *
            100
        );
      },
    },
  },
  mounted() {
    this.fetchdata();
  },
  methods: {
    detailItem(phone, email, address, type) {
      this.contentDialog = true;
      this.detailContent = {
        phone: phone,
        email: email,
        address: address,
        type: type,
      };
    },
    formatDate(date) {
      const day = ("0" + date.getDate()).slice(-2);
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      return `${month}-${day}-${year}`;
    },
    fetchdata() {
      this.skipPayment = localStorage.getItem("skipPayment");
      const contractId = this.$route.params.contractId;
      const payload = {
        token: contractId,
      };
      this.loader = true;
      this.$store.dispatch("sharePublicLinkData", payload).then((response) => {
        if (response) {
          this.loader = false;
          this.checklist = this.sharePublicLinkData;
          this.contractOwnedBy = this.checklist.organizationId;
          this.checklist.buyer1 = this.checklist.buyer.find(
            (value) => value.buyerType == "buyerOne"
          );
          this.checklist.buyer2 = this.checklist.buyer.find(
            (value) => value.buyerType == "buyerTwo"
          );
          this.checklist.seller1 = this.checklist.seller.find(
            (value) => value.sellerType == "sellerOne"
          );
          this.checklist.seller2 = this.checklist.seller.find(
            (value) => value.sellerType == "sellerTwo"
          );
          this.contractColor = this.checklist.colorCode;

          this.checklist.contractScheduleTaskDetails =
            this.checklist.contractScheduleTaskDetails.map((value) => {
              return {
                ...value,
                taskStatus: value.userIds.includes(+this.getUserId)
                  ? true
                  : false,
              };
            });
          this.selectedTasks = this.checklist.contractScheduleTaskDetails
            .filter((value) => {
              return value.status === true;
            })
            .map((value) => value.taskId);
        }
      });
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
    handleUserId(value) {
      return value.filter((value) => {
        return value != null;
      });
    },
    saveDragAndDropList() {
      this.loader = true;
      let payload = this.checklist.contractScheduleTaskDetails.map((value) => {
        if (this.selectedTasks.includes(value.taskId)) {
          return {
            contractScheduleId: this.$route.query.contractId,
            taskId: value.taskId,
            status: true,
            contractSchedulePercentage: this.percentageValue,
            userId: this.handleUserId(value.userIds),
            taskStartDate: value.taskStartDate,
            taskDeadLine: value.taskDeadLine,
          };
        } else {
          return {
            contractScheduleId: this.$route.query.contractId,
            taskId: value.taskId,
            status: false,
            contractSchedulePercentage: this.percentageValue,
            userId: this.handleUserId(value.userIds),
            taskStartDate: value.taskStartDate,
            taskDeadLine: value.taskDeadLine,
          };
        }
      });
      this.$store.dispatch("taskDragAndDrop", payload).then((response) => {
        if (response.data.succeeded === true) {
          this.loader = false;
          this.$router.push("/checklist");
          this.$swal.fire({
            position: "top-end",
            icon: "success",
            title: "Tasks updated successfully",
            showConfirmButton: false,
            timer: 2000,
            toast: true,
          });
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
    close() {
      this.shareDialog = false;
      this.contentDialog = false;
    },
    onDragEnd(event) {},
  },
};
</script>

<style scoped>
.theme--light.v-input {
  color: rgb(170 166 166 / 38%) !important;
}
.handler-text-overflow {
  width: 90% !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap;
}
.handler-text-task-overflow {
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  display: -webkit-box !important;
  -webkit-line-clamp: 2 !important; /* Limit to 2 lines */
  -webkit-box-orient: vertical !important;
}
</style>
