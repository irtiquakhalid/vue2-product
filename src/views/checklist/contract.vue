<template>
  <div class="contract">
    <loadercomponent :loader="loader" />
    <div class="d-flex align-center justify-space-between z-index-5 mb-5">
      <h2>Contract Schedule</h2>
    </div>
    <v-row class="mt-5">
      <v-col cols="12" md="6">
        <small class="cyan-text font-18 font-weight-600"
          >Property Address</small
        >
        <v-text-field
          solo
          hide-details
          flat
          background-color="var(--secondary-color)"
          class="radius-7 mt-2"
          v-model="form.propertyAddressName"
        ></v-text-field>
        <div class="red--text" v-if="$v.form.propertyAddressName.$error">
          Property address is required
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <small class="cyan-text font-18 font-weight-600"
          >Co-op Real Estate Agent</small
        >
        <div class="d-flex">
          <v-autocomplete
            placeholder="select co-op realtor"
            solo
            hide-details
            flat
            background-color="var(--secondary-color)"
            :items="dropdowns?.coopRealtor"
            item-text="name"
            item-value="userId"
            class="radius-7 mt-2 mr-1 custom-select"
            append-icon="mdi-chevron-down"
            v-model="form.realtorId"
            clearable
          >
            <template v-slot:selection="data">
              <div
                v-bind="data.attrs"
                :input-value="data.selected"
                close
                @click="data.select"
              >
                {{ data.item.name ? data.item.name : data.item.email }}
              </div>
            </template>
            <template v-slot:item="data">
              <v-list-item-content>
                <v-list-item-title
                  >{{ data.item.name }}
                  <span class="grey-text-300"
                    >({{ data.item.email }})</span
                  ></v-list-item-title
                >
              </v-list-item-content>
            </template>
          </v-autocomplete>
          <div class="d-flex mt-2">
            <v-icon
              @click="addlistValue({ name: 'Realtor', id: '10' })"
              color="var(--primary-color)"
              style="font-size: 33px"
              >mdi-plus-circle</v-icon
            >
          </div>
        </div>
        <div class="red--text" v-if="$v.form.realtorId.$error">
          Co-op Real Estate Agent is required
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <v-row>
          <v-col cols="12" md="6" class="pr-2 mr-0">
            <small class="cyan-text font-18 font-weight-600">Buyer 1</small>
            <div class="d-flex">
              <v-autocomplete
                placeholder="select buyer"
                solo
                hide-details
                flat
                background-color="var(--secondary-color)"
                class="radius-7 mt-2 mr-1 custom-select"
                append-icon="mdi-chevron-down"
                :items="filterBuyerforbuyer2"
                :item-text="
                  (item) => (item.name ? item.name : item.passKey || 'No name')
                "
                item-value="userId"
                v-model="form.buyer1"
                clearable
              >
                <template v-slot:selection="data">
                  <div
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    @click="data.select"
                  >
                    <!-- {{ data.item.name ? data.item.name : data.item.email }} -->
                    {{ data.item.name || data.item.passKey }}
                  </div>
                </template>
                <template v-slot:item="data">
                  <v-list-item-content>
                    <v-list-item-title
                      >{{ data.item.name }}
                      <span class="grey-text-300" v-if="data.item.email"
                        >({{ data.item.email }})</span
                      >
                      <span class="grey-text-300" v-else-if="data.item.passKey"
                        >({{ data.item.passKey }})</span
                      >
                      <span class="grey-text-300" v-else>No name</span>
                    </v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-autocomplete>
              <div class="d-flex mt-2">
                <v-icon
                  @click="
                    addlistValue({
                      name: 'Buyer',
                      id: '4',
                      buyerType: 'buyerOne',
                    })
                  "
                  color="var(--primary-color)"
                  style="font-size: 33px"
                  >mdi-plus-circle</v-icon
                >
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="pr-2 mr-0">
            <small class="cyan-text font-18 font-weight-600">Buyer 2</small>
            <div class="d-flex">
              <v-autocomplete
                placeholder="select buyer"
                solo
                hide-details
                flat
                background-color="var(--secondary-color)"
                class="radius-7 mt-2 mr-1 custom-select"
                append-icon="mdi-chevron-down"
                :items="filterBuyerforbuyer1"
                :item-text="
                  (item) => (item.name ? item.name : item.passKey || 'No name')
                "
                item-value="userId"
                v-model="form.buyer2"
                clearable
              >
                <template v-slot:selection="data">
                  <div
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    @click="data.select"
                  >
                    {{ data.item.name || data.item.passKey }}
                  </div>
                </template>
                <template v-slot:item="data">
                  <v-list-item-content>
                    <v-list-item-title
                      >{{ data.item.name }}
                      <span class="grey-text-300" v-if="data.item.email"
                        >({{ data.item.email }})</span
                      >
                      <span class="grey-text-300" v-else-if="data.item.passKey"
                        >({{ data.item.passKey }})</span
                      >
                      <span class="grey-text-300" v-else>No name</span>
                    </v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-autocomplete>
              <div class="d-flex mt-2">
                <v-icon
                  @click="
                    addlistValue({
                      name: 'Buyer',
                      id: '4',
                      buyerType: 'buyerTwo',
                    })
                  "
                  color="var(--primary-color)"
                  style="font-size: 33px"
                  >mdi-plus-circle</v-icon
                >
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="6">
        <small class="cyan-text font-18 font-weight-600">Escrow Agent</small>
        <div class="d-flex">
          <v-autocomplete
            placeholder="select escrow agent"
            solo
            hide-details
            flat
            background-color="var(--secondary-color)"
            class="radius-7 mt-2 mr-1 custom-select"
            append-icon="mdi-chevron-down"
            v-model="form.escrowAgentId"
            :items="dropdowns?.escrowAgent"
            :item-text="
              (item) => (item.name ? item.name : item.passKey || 'No name')
            "
            item-value="userId"
            clearable
          >
            <template v-slot:selection="data">
              <div
                v-bind="data.attrs"
                :input-value="data.selected"
                close
                @click="data.select"
              >
                {{ data.item.name || data.item.passKey }}
              </div>
            </template>
            <template v-slot:item="data">
              <v-list-item-content>
                <v-list-item-title
                  >{{ data.item.name }}
                  <span class="grey-text-300"
                    >({{ data.item.email }})</span
                  ></v-list-item-title
                >
              </v-list-item-content>
            </template>
          </v-autocomplete>
          <div class="d-flex mt-2">
            <v-icon
              @click="addlistValue({ name: 'Escrow Agent', id: '6' })"
              color="var(--primary-color)"
              style="font-size: 33px"
              >mdi-plus-circle</v-icon
            >
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row class="mt-5">
      <v-col cols="12" md="6">
        <v-row>
          <v-col cols="12" md="6" class="pr-2 mr-0">
            <small class="cyan-text font-18 font-weight-600">Seller 1</small>
            <div class="d-flex">
              <v-autocomplete
                placeholder="select seller"
                solo
                hide-details
                flat
                background-color="var(--secondary-color)"
                class="radius-7 mt-2 mr-1 custom-select"
                append-icon="mdi-chevron-down"
                v-model="form.seller1"
                :items="filterSellerforseller2"
                :item-text="
                  (item) => (item.name ? item.name : item.passKey || 'No name')
                "
                item-value="userId"
                clearable
              >
                <template v-slot:selection="data">
                  <div
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    @click="data.select"
                  >
                    {{ data.item.name || data.item.passKey }}
                  </div>
                </template>
                <template v-slot:item="data">
                  <v-list-item-content>
                    <v-list-item-title
                      >{{ data.item.name }}
                      <span class="grey-text-300" v-if="data.item.email"
                        >({{ data.item.email }})</span
                      >
                      <span class="grey-text-300" v-else-if="data.item.passKey"
                        >({{ data.item.passKey }})</span
                      >
                      <span class="grey-text-300" v-else>No name</span>
                    </v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-autocomplete>
              <div class="d-flex mt-2">
                <v-icon
                  @click="
                    addlistValue({
                      name: 'Seller',
                      id: '3',
                      sellerType: 'sellerOne',
                    })
                  "
                  color="var(--primary-color)"
                  style="font-size: 33px"
                  >mdi-plus-circle</v-icon
                >
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="pr-2 mr-0">
            <small class="cyan-text font-18 font-weight-600">Seller 2</small>
            <div class="d-flex">
              <v-autocomplete
                placeholder="select seller"
                solo
                hide-details
                flat
                background-color="var(--secondary-color)"
                class="radius-7 mt-2 mr-1 custom-select"
                append-icon="mdi-chevron-down"
                v-model="form.seller2"
                :items="filterSellerforseller1"
                :item-text="
                  (item) => (item.name ? item.name : item.passKey || 'No name')
                "
                item-value="userId"
                clearable
              >
                <template v-slot:selection="data">
                  <div
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    @click="data.select"
                  >
                    {{ data.item.name || data.item.passKey }}
                  </div>
                </template>
                <template v-slot:item="data">
                  <v-list-item-content>
                    <v-list-item-title
                      >{{ data.item.name }}
                      <span class="grey-text-300" v-if="data.item.email"
                        >({{ data.item.email }})</span
                      >
                      <span class="grey-text-300" v-else-if="data.item.passKey"
                        >({{ data.item.passKey }})</span
                      >
                      <span class="grey-text-300" v-else>No name</span>
                    </v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-autocomplete>
              <div class="d-flex mt-2">
                <v-icon
                  @click="
                    addlistValue({
                      name: 'Seller',
                      id: '3',
                      sellerType: 'sellerTwo',
                    })
                  "
                  color="var(--primary-color)"
                  style="font-size: 33px"
                  >mdi-plus-circle</v-icon
                >
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="6">
        <small class="cyan-text font-18 font-weight-600">Attorney</small>
        <div class="d-flex">
          <v-autocomplete
            placeholder="select attorney"
            solo
            hide-details
            flat
            background-color="var(--secondary-color)"
            class="radius-7 mt-2 mr-1 custom-select"
            append-icon="mdi-chevron-down"
            v-model="form.attorneyId"
            :items="dropdowns?.attorney"
            item-text="name"
            item-value="userId"
            clearable
          >
            <template v-slot:selection="data">
              <div
                v-bind="data.attrs"
                :input-value="data.selected"
                close
                @click="data.select"
              >
                {{ data.item.name ? data.item.name : data.item.email }}
              </div>
            </template>
            <template v-slot:item="data">
              <v-list-item-content>
                <v-list-item-title
                  >{{ data.item.name }}
                  <span class="grey-text-300"
                    >({{ data.item.email }})</span
                  ></v-list-item-title
                >
              </v-list-item-content>
            </template>
          </v-autocomplete>
          <div class="d-flex mt-2">
            <v-icon
              @click="addlistValue({ name: 'Attorney', id: '5' })"
              color="var(--primary-color)"
              style="font-size: 33px"
              >mdi-plus-circle</v-icon
            >
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- Date Picker -->

    <v-row>
      <v-col cols="12" md="6">
        <v-row>
          <v-col cols="12" md="6">
            <small class="cyan-text font-18 font-weight-600">HOA Contact</small>
            <div class="d-flex">
              <v-autocomplete
                placeholder="select hoa contact"
                solo
                hide-details
                flat
                background-color="var(--secondary-color)"
                class="radius-7 mt-2 mr-1 custom-select"
                append-icon="mdi-chevron-down"
                v-model="form.hoaContactIds"
                :items="dropdowns?.hoaContact"
                item-text="name"
                item-value="userId"
                clearable
              >
                <template v-slot:selection="data">
                  <div
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    @click="data.select"
                  >
                    {{ data.item.name ? data.item.name : data.item.email }}
                  </div>
                </template>
                <template v-slot:item="data">
                  <v-list-item-content>
                    <v-list-item-title
                      >{{ data.item.name }}
                      <span class="grey-text-300"
                        >({{ data.item.email }})</span
                      ></v-list-item-title
                    >
                  </v-list-item-content>
                </template>
              </v-autocomplete>
              <div class="d-flex mt-2">
                <v-icon
                  @click="addlistValue({ name: 'HOA Contact', id: '12' })"
                  color="var(--primary-color)"
                  style="font-size: 33px"
                  >mdi-plus-circle</v-icon
                >
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <small class="cyan-text font-18 font-weight-600"
              >Closing Agent</small
            >
            <div class="d-flex">
              <v-autocomplete
                placeholder="select closing agent"
                solo
                hide-details
                flat
                background-color="var(--secondary-color)"
                class="radius-7 mt-2 mr-1 custom-select"
                append-icon="mdi-chevron-down"
                v-model="form.closingAgentIds"
                :items="dropdowns?.closingAgent"
                item-text="name"
                item-value="userId"
                clearable
              >
                <template v-slot:selection="data">
                  <div
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    @click="data.select"
                  >
                    {{ data.item.name ? data.item.name : data.item.email }}
                  </div>
                </template>
                <template v-slot:item="data">
                  <v-list-item-content>
                    <v-list-item-title
                      >{{ data.item.name }}
                      <span class="grey-text-300"
                        >({{ data.item.email }})</span
                      ></v-list-item-title
                    >
                  </v-list-item-content>
                </template>
              </v-autocomplete>
              <div class="d-flex mt-2">
                <v-icon
                  @click="addlistValue({ name: 'Closing Agent', id: '11' })"
                  color="var(--primary-color)"
                  style="font-size: 33px"
                  >mdi-plus-circle</v-icon
                >
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="3">
        <!-- Date Picker Start date -->
        <small class="cyan-text font-18 font-weight-600">Start Date</small>
        <div class="">
          <v-menu
            ref="menu1"
            v-model="menu1"
            :close-on-content-click="false"
            :return-value.sync="form.startDate"
            transition="scale-transition"
            offset-y
            left
            min-width="auto"
            class="ma-0 pa-0"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-combobox
                v-model="form.startDate"
                append-icon="mdi-calendar"
                v-bind="attrs"
                readonly
                v-on="on"
                class="radius-7 mt-2"
                solo
                hide-details
                flat
                background-color="var(--secondary-color)"
                clearable
              >
                <template #append>
                  <v-icon>mdi-calendar-month</v-icon>
                </template>
              </v-combobox>
            </template>
            <v-date-picker
              v-model="form.startDate"
              :max="maxStartDate"
              no-title
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu1 = false">
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu1.save(form.startDate)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
          <div class="red--text" v-if="$v.form.startDate.$error">
            Start Date is required
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="3">
        <!-- Date Picker To -->
        <div class="">
          <small class="cyan-text font-18 font-weight-600">End Date</small>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="form.endDateDate"
            transition="scale-transition"
            offset-y
            left
            min-width="auto"
            class="ma-0 pa-0"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-combobox
                v-model="form.endDateDate"
                append-icon="mdi-calendar"
                v-bind="attrs"
                readonly
                v-on="on"
                class="radius-7 mt-2"
                solo
                hide-details
                flat
                background-color="var(--secondary-color)"
                clearable
              >
                <template #append>
                  <v-icon>mdi-calendar-month</v-icon>
                </template>
              </v-combobox>
            </template>
            <v-date-picker
              v-model="form.endDateDate"
              :min="minEndDate"
              no-title
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu.save(form.endDateDate)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
          <div class="red--text" v-if="$v.form.endDateDate.$error">
            End Date is required
          </div>
        </div>
      </v-col>
    </v-row>

    <v-btn
      style="padding: 0 2rem"
      depressed
      class="mt-9 radius-25 py-6"
      color="var(--primary-color)"
      @click="selectTemplateDialog = true"
      ><span class="text-transform font-18 white--text"
        >Select a template</span
      ></v-btn
    >
    <div class="mt-6">
      <span>{{ selectedTemplates.templateName }}</span>
      <v-row v-if="tasksForContractSchedule.length > 0" class="mt-1">
        <v-col
          cols="5"
          class="font-weight-600"
          style="color: var(--primary-color)"
          ><span class="ml-1">Task</span></v-col
        >
        <v-col
          cols="2"
          class="font-weight-600"
          style="color: var(--primary-color)"
          >Role</v-col
        >
        <v-spacer></v-spacer>

        <v-col
          cols="2"
          class="font-weight-600"
          style="color: var(--primary-color)"
          >Early Notice</v-col
        >
        <v-col
          cols="2"
          class="font-weight-600 d-flex justify-end"
          style="color: var(--primary-color)"
          ><span class="pr-3">Deadline</span></v-col
        >
      </v-row>
      <draggable
        v-model="tasksForContractSchedule"
        @end="onDragEnd"
        handle=".drag-handle"
      >
        <div
          class="d-flex align-center justify-space-between pa-3 grey-background my-3"
          v-for="nestedItem in tasksForContractSchedule"
          :key="nestedItem.id"
        >
          <v-row>
            <v-col cols="5" class="d-flex">
              <v-img
                src="/images/checklist/delete.svg"
                max-width="20"
                contain
                class="cursor-pointer"
                @click="deleteTask(nestedItem)"
              ></v-img>
              <v-img
                src="/images/checklist/drag.svg"
                max-width="20"
                class="mx-4 cursor-drag drag-handle"
                contain
              ></v-img>
              <span
                @click="editTaskDeadline(nestedItem)"
                class="cursor-pointer handler-text-overflow"
                style="text-decoration: underline; color: var(--primary-color)"
                >{{ nestedItem.taskName }}</span
              >
            </v-col>
            <v-col cols="2" style="padding-left: 0.6rem !important">
              <div
                class="font-weight-600 grey-text-300"
                style="text-align: start"
              >
                {{ nestedItem.roleName }}
              </div>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="2" style="padding-left: 1rem !important">
              <div class="grey-text-200" style="text-align: start">
                {{
                  nestedItem.taskStartDate
                    ? formatDate(new Date(nestedItem.taskStartDate))
                    : ""
                }}
              </div>
            </v-col>
            <v-col cols="2" class="d-flex justify-end">
              <div class="grey-text-200" style="text-align: start">
                {{
                  nestedItem.taskDeadLine
                    ? formatDate(new Date(nestedItem.taskDeadLine))
                    : ""
                }}
              </div>
            </v-col>
          </v-row>
        </div>
      </draggable>
    </div>
    <div class="red--text" v-if="$v.tasksForContractSchedule.$error">
      Template tasks is required
    </div>
    <div
      class="d-flex justify-space-between align-center"
      :class="tasksForContractSchedule.length > 0 ? 'mt-6' : 'mt-2'"
    >
      <v-btn
        depressed
        style="padding: 0 4.04rem"
        class="mt-3 mb-1 radius-25 py-6"
        color="var(--primary-color)"
        @click="addTaskDeadline"
        ><span class="text-transform font-18 white--text"
          >Add task+</span
        ></v-btn
      >
      <v-btn
        depressed
        class="radius-25 py-6"
        color="var(--primary-color)"
        style="padding: 0 2.1rem"
        v-if="tasksForContractSchedule.length > 0"
        @click="saveAsTemplate"
        ><span class="text-transform font-18 white--text"
          >Save as template</span
        ></v-btn
      >
    </div>
    <div class="d-flex justify-end my-6">
      <v-btn
        class="mr-4 py-6 radius-25"
        color="#C0C0C0"
        depressed
        to="/checklist"
        style="padding: 0 4.89rem"
        ><span class="text-transform font-18 white--text">Cancel</span></v-btn
      >
      <v-btn
        style="padding: 0 5.44rem"
        class="py-6 radius-25"
        color="var(--primary-color)"
        depressed
        @click="saveContract"
        ><span class="text-transform font-18 white--text">Save</span></v-btn
      >
    </div>

    <v-dialog v-model="selectTemplateDialog" persistent max-width="600">
      <v-card class="pa-6 radius-21">
        <templatescomponent
          @close="close"
          @selectedTemplate="selectedTemplate"
        />
      </v-card>
    </v-dialog>

    <v-dialog v-model="scheduleTask" max-width="700" persistent>
      <v-card class="pa-6 radius-21">
        <addcomponent
          @close="close"
          :taskDeadlineValue="taskDeadlineValue"
          @addTaskSoft="addTaskSoft"
          @updateDatesOnly="updateDatesOnly"
        />
      </v-card>
    </v-dialog>

    <v-dialog v-model="addlistDialog" max-width="700" persistent>
      <v-card class="pa-6 radius-21">
        <addlistcomponent
          @close="close"
          :listItem="listItem"
          @fetchList="fetchdata"
          @updateDropdownValues="updateDropdownValues"
        />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import templatescomponent from "@/components/Checklist/Contract/templates.component.vue";
import addcomponent from "@/components/Template/Task/add.component.vue";
import addlistcomponent from "@/components/Checklist/Contract/add.component.vue";
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";
import draggable from "vuedraggable";
export default {
  components: { templatescomponent, addcomponent, addlistcomponent, draggable },
  data() {
    return {
      selectTemplateDialog: false,
      addlistDialog: false,
      scheduleTask: false,
      form: {
        templateId: null,
        organizationId: null,
        propertyAddressName: "",
        escrowAgentId: null,
        buyer1: null,
        buyer2: null,
        realtorId: null,
        seller1: null,
        seller2: null,
        attorneyId: null,
        hoaContactIds: null,
        contractScheduleTaskDetails: [],
        endDateDate: null,
        startDate: null,
        createdById: null,
        closingAgentIds: null,
      },
      dropdowns: null,
      loader: false,
      listItem: "",
      selectedTemplates: [],
      maxStartDate: "",
      minEndDate: "",
      menu: false,
      menu1: false,
      taskDeadlineValue: {},
      tasksForContractSchedule: [],
      filterBuyerforbuyer1: [],
      filterBuyerforbuyer2: [],
      filterSellerforseller1: [],
      filterSellerforseller2: [],
    };
  },
  validations: {
    form: {
      propertyAddressName: {
        required,
      },
      realtorId: {
        required,
      },
      startDate: {
        required,
      },
      endDateDate: {
        required,
      },
    },
    tasksForContractSchedule: {
      required,
    },
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
    "form.buyer1": {
      immediate: true,
      handler() {
        if (this.form.buyer1) {
          this.filterBuyerforbuyer1 = this.dropdowns.buyer.filter(
            (value) => value.userId != this.form.buyer1
          );
        }
      },
    },
    "form.buyer2": {
      immediate: true,
      handler() {
        if (this.form.buyer2) {
          this.filterBuyerforbuyer2 = this.dropdowns.buyer.filter(
            (value) => value.userId != this.form.buyer2
          );
        }
      },
    },
    "form.seller1": {
      immediate: true,
      handler() {
        if (this.form.seller1) {
          this.filterSellerforseller1 = this.dropdowns.seller.filter(
            (value) => value.userId != this.form.seller1
          );
        }
      },
    },
    "form.seller2": {
      immediate: true,
      handler() {
        if (this.form.seller2) {
          this.filterSellerforseller2 = this.dropdowns.seller.filter(
            (value) => value.userId != this.form.seller2
          );
        }
      },
    },
    "form.endDateDate": {
      immediate: true,
      handler() {
        this.maxStartDate = this.form.endDateDate;
      },
    },
    "form.startDate": {
      immediate: true,
      handler() {
        this.minEndDate = this.form.startDate;
      },
    },
  },
  computed: {
    ...mapGetters(["getUserId", "getChecklistDropdowns", "getOrganizationId"]),
  },
  mounted() {
    this.fetchdata();
  },
  methods: {
    saveAsTemplate() {
      if (this.$v.form.propertyAddressName.$invalid) {
        this.$v.form.propertyAddressName.$touch();
      } else {
        this.loader = true;
        let payload = {
          templateName: this.form.propertyAddressName,
          organizationId: this.getOrganizationId,
          tasks: [],
        };
        let saveAsTemplateTasks = this.tasksForContractSchedule.map(
          (value, index) => {
            return {
              taskName: value.taskName || "",
              filePath: value.filePath || "",
              roleId: value.roleId || null,
              orderById: index + 1,
            };
          }
        );
        payload.tasks = saveAsTemplateTasks;
        this.$store.dispatch("saveAsTemplate", payload).then((response) => {
          if (response.data.succeeded === true) {
            this.loader = false;
            this.$swal.fire({
              position: "top-end",
              icon: "success",
              title: "Template saved successfully",
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
      }
    },
    updateDatesOnly(item) {
      let index = this.tasksForContractSchedule.findIndex((value) => {
        return value.id == item.id;
      });
      this.tasksForContractSchedule[index] = item;
    },
    addTaskSoft(item) {
      this.tasksForContractSchedule.push(item);
    },
    editTaskDeadline(item) {
      this.scheduleTask = true;
      this.taskDeadlineValue = { type: "edit", data: item };
    },
    addTaskDeadline() {
      this.scheduleTask = true;
      this.taskDeadlineValue = { type: "add" };
    },
    updateDropdownValues(item) {
      if (item.listItem.name === "Buyer") {
        if (item.listItem.buyerType == "buyerOne") {
          this.form.buyer1 = item.res.data.data.userId;
        } else {
          this.form.buyer2 = item.res.data.data.userId;
        }
      } else if (item.listItem.name === "Seller") {
        if (item.listItem.sellerType == "sellerOne") {
          this.form.seller1 = item.res.data.data.userId;
        } else {
          this.form.seller2 = item.res.data.data.userId;
        }
      } else if (item.listItem.name === "Attorney") {
        this.form.attorneyId = item.res.data.data.userId;
      } else if (item.listItem.name === "Escrow Agent") {
        this.form.escrowAgentId = item.res.data.data.userId;
      } else {
        this.form.realtorId = item.res.data.data.userId;
      }
    },
    formatDate(date) {
      const day = ("0" + date.getDate()).slice(-2);
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      return `${month}-${day}-${year}`;
    },
    deleteTask(item) {
      this.tasksForContractSchedule = this.tasksForContractSchedule.filter(
        (value) => {
          return value.id !== item.id;
        }
      );
      this.form.contractScheduleTaskDetails =
        this.form.contractScheduleTaskDetails.filter((value) => {
          return value.taskId !== item.id;
        });
    },
    saveContract() {
      if (this.$v.$invalid) {
        this.$v.$touch();
      } else {
        this.loader = true;
        let payload = {
          propertyAddressName: this.form.propertyAddressName,
          buyerIds: [],
          sellerIds: [],
          escrowAgentIds: [],
          closingAgentIds: [],
          hoaContactIds: [],
          realtorIds: [],
          attorneyIds: [],
          startDate: this.form.startDate,
          endDateDate: this.form.endDateDate,
          organizationId: this.getOrganizationId,
          createdById: this.getUserId,
          contractScheduleTaskDetails: [],
        };
        if (this.form.escrowAgentId) {
          payload.escrowAgentIds.push(this.form.escrowAgentId);
        }
        if (this.form.hoaContactIds) {
          payload.hoaContactIds.push(this.form.hoaContactIds);
        }
        if (this.form.closingAgentIds) {
          payload.closingAgentIds.push(this.form.closingAgentIds);
        }
        if (this.form.realtorId) {
          payload.realtorIds.push(this.form.realtorId);
        }
        if (this.form.attorneyId) {
          payload.attorneyIds.push(this.form.attorneyId);
        }
        if (this.form.seller1) {
          payload.sellerIds.push({
            sellerId: this.form?.seller1,
            sellerType: "sellerOne",
          });
        }
        if (this.form.seller2) {
          payload.sellerIds.push({
            sellerId: this.form?.seller2,
            sellerType: "sellerTwo",
          });
        }
        if (this.form.buyer1) {
          payload.buyerIds.push({
            buyerId: this.form?.buyer1,
            buyerType: "buyerOne",
          });
        }
        if (this.form.buyer2) {
          payload.buyerIds.push({
            buyerId: this.form?.buyer2,
            buyerType: "buyerTwo",
          });
        }
        const allTasks = this.tasksForContractSchedule.flatMap((value) => {
          if (value.roleName === "Realtor") {
            return {
              id: 0,
              contractScheduleId: 0,
              taskId: value.id,
              userId: this.form.realtorId,
              taskStartDate: value.taskStartDate,
              taskDeadLine: value.taskDeadLine,
            };
          } else if (value.roleName === "Buyer") {
            const tasks = [];

            // Check if buyer1 is defined and add to tasks
            tasks.push({
              id: 0,
              contractScheduleId: 0,
              taskId: value.id,
              userId: this.form.buyer1 || null,
              taskStartDate: value.taskStartDate,
              taskDeadLine: value.taskDeadLine,
            });

            // Check if buyer2 is defined and add to tasks
            tasks.push({
              id: 0,
              contractScheduleId: 0,
              taskId: value.id,
              userId: this.form.buyer2 || null,
              taskStartDate: value.taskStartDate,
              taskDeadLine: value.taskDeadLine,
            });

            return tasks;
          } else if (value.roleName === "Seller") {
            const tasks = [];

            tasks.push({
              id: 0,
              contractScheduleId: 0,
              taskId: value.id,
              userId: this.form.seller1 || null,
              taskStartDate: value.taskStartDate,
              taskDeadLine: value.taskDeadLine,
            });

            tasks.push({
              id: 0,
              contractScheduleId: 0,
              taskId: value.id,
              userId: this.form.seller2 || null,
              taskStartDate: value.taskStartDate,
              taskDeadLine: value.taskDeadLine,
            });

            return tasks;
          } else if (value.roleName === "Co-op Realtors") {
            return {
              id: 0,
              contractScheduleId: 0,
              taskId: value.id,
              userId: this.form.realtorId,
              taskStartDate: value.taskStartDate,
              taskDeadLine: value.taskDeadLine,
            };
          } else if (value.roleName === "Attorney") {
            return {
              id: 0,
              contractScheduleId: 0,
              taskId: value.id,
              userId: this.form.attorneyId,
              taskStartDate: value.taskStartDate,
              taskDeadLine: value.taskDeadLine,
            };
          } else if (value.roleName === "Escrow Agent") {
            return {
              id: 0,
              contractScheduleId: 0,
              taskId: value.id,
              userId: this.form.escrowAgentId,
              taskStartDate: value.taskStartDate,
              taskDeadLine: value.taskDeadLine,
            };
          } else if (value.roleName === "Closing Agent") {
            return {
              id: 0,
              contractScheduleId: 0,
              taskId: value.id,
              userId: this.form.closingAgentIds,
              taskStartDate: value.taskStartDate,
              taskDeadLine: value.taskDeadLine,
            };
          } else if (value.roleName === "HOA Contact") {
            return {
              id: 0,
              contractScheduleId: 0,
              taskId: value.id,
              userId: this.form.hoaContactIds,
              taskStartDate: value.taskStartDate,
              taskDeadLine: value.taskDeadLine,
            };
          } else {
            return {
              id: 0,
              contractScheduleId: 0,
              taskId: value.id,
              userId: null,
              taskStartDate: value.taskStartDate,
              taskDeadLine: value.taskDeadLine,
            };
          }
        });
        payload.contractScheduleTaskDetails = allTasks;
        this.$store.dispatch("createChecklist", payload).then((response) => {
          if (response.data.succeeded === true) {
            this.loader = false;
            this.$swal.fire({
              position: "top-end",
              icon: "success",
              title: "Contract added successfully",
              showConfirmButton: false,
              timer: 2000,
              toast: true,
            });
            this.$router.push({ path: "/checklist" });
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
      }
    },
    selectedTemplate(item) {
      this.selectedTemplates = item;
      this.tasksForContractSchedule = [
        ...this.tasksForContractSchedule,
        ...this.selectedTemplates.tasks,
      ];
      this.form.templateId = item.id;
    },
    addlistValue(item) {
      this.addlistDialog = true;
      this.listItem = item;
    },
    fetchdata() {
      this.loader = true;
      const id = this.getOrganizationId;
      this.$store.dispatch("getChecklistDropdowns", id).then(() => {
        this.loader = false;
        this.dropdowns = this.getChecklistDropdowns;
        this.filterBuyerforbuyer1 = this.dropdowns.buyer;
        this.filterBuyerforbuyer2 = this.dropdowns.buyer;
        this.filterSellerforseller1 = this.dropdowns.seller;
        this.filterSellerforseller2 = this.dropdowns.seller;
        if (this.form.buyer1) {
          this.filterBuyerforbuyer1 = this.dropdowns.buyer.filter(
            (value) => value.userId != this.form.buyer1
          );
        }
        if (this.form.buyer2) {
          this.filterBuyerforbuyer2 = this.dropdowns.buyer.filter(
            (value) => value.userId != this.form.buyer2
          );
        }
        if (this.form.seller1) {
          this.filterSellerforseller1 = this.dropdowns.seller.filter(
            (value) => value.userId != this.form.seller1
          );
        }
        if (this.form.seller2) {
          this.filterSellerforseller2 = this.dropdowns.seller.filter(
            (value) => value.userId != this.form.seller2
          );
        }
      });
    },
    close() {
      this.selectTemplateDialog = false;
      this.scheduleTask = false;
      this.addlistDialog = false;
    },
    onDragEnd(event) {
      // Handle drag end event if needed
    },
  },
};
</script>

<style scoped>
.v-list >>> .v-list-item--active {
  background-color: var(--secondary-color) !important;
  color: var(--secondary-color) !important;
}
.v-input {
  overflow: hidden !important;
}
.handler-text-overflow {
  width: 84% !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap;
  text-align: start;
}
</style>
