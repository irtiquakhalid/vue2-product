<template>
  <div class="user">
    <loadercomponent :loader="loader" />
    <div v-if="checklist.id">
      <div class="z-index-5 mb-5">
        <div class="d-flex align-center justify-space-between">
          <div class="d-flex align-center">
            <router-link to="/checklist">
              <v-icon
                :style="{
                  color: checklist.colorCode
                    ? `${checklist.colorCode} !important`
                    : '#1ba8bb !important',
                }"
                style="font-size: 45px"
                >mdi-arrow-left-box</v-icon
              >
            </router-link>
            <h2 class="ml-5">Contract  </h2>
          </div>
          <div class="h-100">
            <v-btn
              style="padding: 0 4.1rem"
              :color="
                checklist.colorCode
                  ? `${checklist.colorCode} !important`
                  : '#1ba8bb !important'
              "
              class="py-6 radius-25"
              depressed
              @click="shareDialog = true"
            >
              <v-img
                src="/images/checklist/white-share.svg"
                max-width="17"
                class="mr-4 cursor-pointer"
                contain
              ></v-img>
              <span class="text-transform white--text font-18">Share</span>
            </v-btn>
          </div>
        </div>
      </div>
      <v-row>
        <v-col cols="12" md="6">
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
        </v-col>
        <v-col cols="12" md="6">
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
              checklist.realtor[0]?.passKey ||
              "\u00A0"
            }}</span>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-row>
            <v-col cols="12" md="6">
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
                  checklist.buyer1?.name || checklist.buyer1?.email || checklist.buyer1?.passKey || "\u00A0"
                }}</span>
              </div>
            </v-col>
            <v-col cols="12" md="6">
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
                  checklist.buyer2?.name || checklist.buyer2?.email || checklist.buyer2?.passKey || "\u00A0"
                }}</span>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6">
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
              checklist.escrowAgent[0]?.passKey ||
              "\u00A0"
            }}</span>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-row>
            <v-col cols="12" md="6">
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
                  checklist.seller1?.passKey ||
                  "\u00A0"
                }}</span>
              </div>
            </v-col>
            <v-col cols="12" md="6">
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
                  checklist.seller2?.passKey ||
                  "\u00A0"
                }}</span>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6">
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
              checklist.attorney[0]?.passKey ||
              "\u00A0"
            }}</span>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" class="d-flex justify-space-between">
          <v-row>
            <v-col cols="12" md="6">
              <div class="d-flex align-center justify-space-between">
                <span
                  class="font-18 font-weight-600"
                  :style="{
                    color: checklist.colorCode
                      ? `${checklist.colorCode} !important`
                      : '#1ba8bb !important',
                  }"
                  >HOA Contact</span
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
                      checklist.hoaContact[0]?.phone,
                      checklist.hoaContact[0]?.email,
                      checklist.hoaContact[0]?.address,
                      'HOA Contact'
                    )
                  "
                  style="font-size: 27px"
                  >mdi-information</v-icon
                >
              </div>
              <div class="d-flex justify-space-between">
                <span class="handler-text-overflow">{{
                  checklist.hoaContact[0]?.name ||
                  checklist.hoaContact[0]?.email ||
                  checklist.hoaContact[0]?.passKey ||
                  "\u00A0"
                }}</span>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="d-flex align-center justify-space-between">
                <span
                  class="font-18 font-weight-600"
                  :style="{
                    color: checklist.colorCode
                      ? `${checklist.colorCode} !important`
                      : '#1ba8bb !important',
                  }"
                  >Closing Agent</span
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
                      checklist.closingAgent[0]?.phone,
                      checklist.closingAgent[0]?.email,
                      checklist.closingAgent[0]?.address,
                      'Closing Agent'
                    )
                  "
                  style="font-size: 27px"
                  >mdi-information</v-icon
                >
              </div>
              <div class="d-flex justify-space-between">
                <span class="handler-text-overflow">{{
                  checklist.closingAgent[0]?.name ||
                  checklist.closingAgent[0]?.email ||
                  checklist.closingAgent[0]?.passKey ||
                  "\u00A0"
                }}</span>
              </div>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="6" class="d-flex justify-space-between">
          <v-row>
            <v-col cols="12" md="6">
              <div>
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
                      : ""
                  }}
                </div>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="pr-5">
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
                      : ""
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
          cols="5"
          class="font-weight-600"
          :style="{
            color: checklist.colorCode
              ? `${checklist.colorCode} !important`
              : '#1ba8bb !important',
          }"
          ><span class="ml-1">Task</span></v-col
        >
        <v-col
          cols="2"
          class="font-weight-600"
          :style="{
            color: checklist.colorCode
              ? `${checklist.colorCode} !important`
              : '#1ba8bb !important',
          }"
          >Role</v-col
        >
        <v-spacer></v-spacer>
        <v-col
          cols="2"
          class="font-weight-600"
          :style="{
            color: checklist.colorCode
              ? `${checklist.colorCode} !important`
              : '#1ba8bb !important',
          }"
        >
          Early Notice</v-col
        >

        <v-col
          cols="2"
          class="font-weight-600 d-flex justify-end"
          :style="{
            color: checklist.colorCode
              ? `${checklist.colorCode} !important`
              : '#1ba8bb !important',
          }"
          >Deadline</v-col
        >
      </v-row>
      <draggable
        v-model="checklist.contractScheduleTaskDetails"
        @end="onDragEnd"
        handle=".drag-handle"
      >
        <div
          class="d-flex justify-space-between align-center pa-3 my-3 grey-background"
          v-for="item in checklist.contractScheduleTaskDetails"
          :key="item.id"
        >
          <v-row>
            <!-- Task Name and Checkbox -->
            <v-col cols="5">
              <div class="d-flex">
                <v-img
                  src="/images/checklist/drag.svg"
                  max-width="20"
                  class="mr-4 cursor-drag drag-handle"
                  contain
                ></v-img>

                <v-checkbox
                  :color="
                    checklist.colorCode
                      ? `${checklist.colorCode} !important`
                      : '#1ba8bb !important'
                  "
                  class="d-inline-block py-0 my-0 ml-4"
                  hide-details
                  v-model="selectedTasks"
                  :value="item.taskId"
                  :disabled="
                    !item.taskStatus &&
                    checklist.createdById != getUserId &&
                    (checklist.organizationId != getOrganizationId ||
                      getRolePermissions != 'own')
                  "
                >
                  <template v-slot:label>
                    <span
                      :style="{
                        color: checklist.colorCode
                          ? `${checklist.colorCode} !important`
                          : '#1ba8bb !important',
                      }"
                      class="font-weight-500"
                    >
                      {{
                        item.taskName.length > 33
                          ? `${item.taskName.slice(0, 33)}...`
                          : item.taskName
                      }}
                    </span>
                  </template>
                </v-checkbox>
              </div>
            </v-col>

            <!-- Role Name -->
            <v-col cols="2" style="padding-left: 0.6rem !important">
              <div
                class="font-weight-600 grey-text-300"
                style="text-align: start"
              >
                {{ item.roleName }}
              </div>
            </v-col>

            <v-spacer></v-spacer>

            <!-- Start Date -->
            <v-col
              cols="2"
              style="padding-left: 1rem !important; position: relative"
            >
              <div v-if="item.taskStartDate">
                <span
                  v-if="item.isEarlyNoticePassed && !item.status"
                  class="dot yellow-dot"
                  title="Early Notice Date Passed"
                  style="position: absolute; top: 6px; left: 84px"
                ></span>
                <div class="grey-text-200" style="text-align: start">
                  {{
                    item.taskStartDate
                      ? formatDate(new Date(item.taskStartDate))
                      : ""
                  }}
                </div>
              </div>
            </v-col>

            <!-- Deadline -->
            <v-col
              cols="2"
              class="d-flex justify-end"
              style="position: relative"
            >
              <div v-if="item.taskDeadLine">
                <span
                  v-if="item.isDeadlinePassed && !item.status"
                  class="dot red-dot"
                  title="Deadline Date Passed"
                  style="position: absolute; top: 6px; right: 0px"
                ></span>
                <div class="grey-text-200" style="text-align: start">
                  {{
                    item.taskDeadLine
                      ? formatDate(new Date(item.taskDeadLine))
                      : ""
                  }}
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
      </draggable>

      <div class="d-flex justify-end mt-8 mb-6">
        <v-btn
          style="padding: 0 5.44rem"
          class="py-6 radius-25"
          :color="
            checklist.colorCode
              ? `${checklist.colorCode} !important`
              : '#1ba8bb !important'
          "
          depressed
          @click="saveDragAndDropList"
          v-if="checklist.contractScheduleTaskDetails.length > 0"
          ><span class="text-transform font-18 white--text">Save</span></v-btn
        >
      </div>
    </div>
    <v-dialog v-model="shareDialog" max-width="1050" persistent>
      <v-card class="pa-6 radius-21">
        <sharecomponent
          @close="close"
          :emailsforGmail="emailsforGmail"
          :contractColor="contractColor"
          :checklist="checklist"
          :publicLink="checklist?.publicLinkToken"
        />
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
      emailsforGmail: null,
      contentDialog: false,
      skipPayment: null,
      checklist: {
        buyer1: {},
        buyer2: {},
        seller1: {},
        seller2: {},
        attorney: {},
        realtor: {},
        hoaContact: {},
        closingAgent: {},
        escrowAgent: {},
        contractScheduleTaskDetails: [],
      },
      percentageValue: 0,
      selectedTasks: [],
      detailContent: null,
      contractColor: "",
      contractOwnedBy: null,
    };
  },
  computed: {
    ...mapGetters([
      "getOrganizationId",
      "getContractById",
      "getUserId",
      "getRolePermissions",
    ]),
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
      const contractId = this.$route.query.contractId;
      const id = this.$route.query.organizationId;

      const payload = {
        contractScheduleId: contractId,
        organizationId: id,
      };

      this.loader = true;

      this.$store.dispatch("getContractById", payload).then((response) => {
        if (response) {
          this.loader = false;
          this.checklist = this.getContractById;
          this.emailsforGmail = response.data.data.emails;
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
          // Map over tasks and add 'isEarlyNoticePassed' and 'isDeadlinePassed'
          this.checklist.contractScheduleTaskDetails =
            this.checklist.contractScheduleTaskDetails.map((value) => {
              const today = new Date();
              const earlyNoticeDate = new Date(value.taskStartDate);
              const deadlineDate = new Date(value.taskDeadLine);

              return {
                ...value,
                taskStatus: value.userIds.includes(+this.getUserId)
                  ? true
                  : false,
                isEarlyNoticePassed: today > earlyNoticeDate,
                isDeadlinePassed: today > deadlineDate,
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

.dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-left: 8px;
}

.yellow-dot {
  background-color: yellow;
}

.red-dot {
  background-color: red;
}
</style>
