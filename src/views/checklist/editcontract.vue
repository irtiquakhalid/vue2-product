<template>
  <div class="contract">
    <loadercomponent :loader="loader" />
    <div v-if="form.id">
      <div class="d-flex align-center justify-space-between z-index-5 mb-5">
        <h2>Edit Contract Schedule</h2>
      </div>
      <v-row>
        <v-col cols="12" md="6">
          <small
            class="font-18 font-weight-600"
            :style="{
              color: form.colorCode
                ? `${form.colorCode} !important`
                : '#1ba8bb !important',
            }"
            >Property Address</small
          >
          <v-text-field
            solo
            hide-details
            flat
            :background-color="
              'var(--checklistedit-lightcolor)' || 'var(--secondary-color)'
            "
            class="radius-7 mt-2"
            v-model="form.propertyAddressName"
          ></v-text-field>
          <div class="red--text" v-if="$v.form.propertyAddressName.$error">
            Property address is required
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <small
            class="font-18 font-weight-600"
            :style="{
              color: form.colorCode
                ? `${form.colorCode} !important`
                : '#1ba8bb !important',
            }"
            >Co-op Real Estate Agent</small
          >
          <div class="d-flex">
            <v-autocomplete
              placeholder="select co-op realtor"
              solo
              hide-details
              flat
              :background-color="
                'var(--checklistedit-lightcolor)' || 'var(--secondary-color)'
              "
              :items="dropdowns?.coopRealtor"
              item-text="name"
              item-value="userId"
              class="radius-7 mt-2 mr-1 custom-select v-select-wrapper"
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
                @click="addlistValue({ name: 'Real Estate Agent', id: '10' })"
                :color="
                  form.colorCode
                    ? `${form.colorCode} !important`
                    : '#1ba8bb !important'
                "
                style="font-size: 33px"
                >mdi-plus-circle</v-icon
              >
            </div>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-row>
            <v-col cols="12" md="6" class="pr-2 mr-0">
              <small
                class="font-18 font-weight-600"
                :style="{
                  color: form.colorCode
                    ? `${form.colorCode} !important`
                    : '#1ba8bb !important',
                }"
                >Buyer 1</small
              >
              <div class="d-flex">
                <v-autocomplete
                  placeholder="select buyer"
                  solo
                  hide-details
                  flat
                  :background-color="
                    'var(--checklistedit-lightcolor)' ||
                    'var(--secondary-color)'
                  "
                  class="radius-7 mt-2 mr-1 custom-select v-select-wrapper"
                  append-icon="mdi-chevron-down"
                  :items="filterBuyerforbuyer2"
                  :item-text="
                    (item) =>
                      item.name ? item.name : item.passKey || 'No name'
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
                        <span
                          class="grey-text-300"
                          v-else-if="data.item.passKey"
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
                    :color="
                      form.colorCode
                        ? `${form.colorCode} !important`
                        : '#1ba8bb !important'
                    "
                    style="font-size: 33px"
                    >mdi-plus-circle</v-icon
                  >
                </div>
              </div>
            </v-col>
            <v-col cols="12" md="6" class="pr-2 mr-0">
              <small
                class="font-18 font-weight-600"
                :style="{
                  color: form.colorCode
                    ? `${form.colorCode} !important`
                    : '#1ba8bb !important',
                }"
                >Buyer 2</small
              >
              <div class="d-flex">
                <v-autocomplete
                  placeholder="select buyer"
                  solo
                  hide-details
                  flat
                  :background-color="
                    'var(--checklistedit-lightcolor)' ||
                    'var(--secondary-color)'
                  "
                  class="radius-7 mt-2 mr-1 custom-select v-select-wrapper"
                  append-icon="mdi-chevron-down"
                  :items="filterBuyerforbuyer1"
                  :item-text="
                    (item) =>
                      item.name ? item.name : item.passKey || 'No name'
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
                        <span
                          class="grey-text-300"
                          v-else-if="data.item.passKey"
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
                    :color="
                      form.colorCode
                        ? `${form.colorCode} !important`
                        : '#1ba8bb !important'
                    "
                    style="font-size: 33px"
                    >mdi-plus-circle</v-icon
                  >
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6">
          <small
            class="cyan-text font-18 font-weight-600"
            :style="{
              color: form.colorCode
                ? `${form.colorCode} !important`
                : '#1ba8bb !important',
            }"
            >Escrow Agent</small
          >
          <div class="d-flex">
            <v-autocomplete
              placeholder="select escrow agent"
              solo
              hide-details
              flat
              :background-color="
                'var(--checklistedit-lightcolor)' || 'var(--secondary-color)'
              "
              class="radius-7 mt-2 mr-1 custom-select v-select-wrapper"
              append-icon="mdi-chevron-down"
              v-model="form.escrowAgentId"
              :items="dropdowns?.escrowAgent"
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
                @click="addlistValue({ name: 'Escrow Agent', id: '6' })"
                :color="
                  form.colorCode
                    ? `${form.colorCode} !important`
                    : '#1ba8bb !important'
                "
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
              <small
                class="cyan-text font-18 font-weight-600"
                :style="{
                  color: form.colorCode
                    ? `${form.colorCode} !important`
                    : '#1ba8bb !important',
                }"
                >Seller 1</small
              >
              <div class="d-flex">
                <v-autocomplete
                  placeholder="select seller"
                  solo
                  hide-details
                  flat
                  :background-color="
                    'var(--checklistedit-lightcolor)' ||
                    'var(--secondary-color)'
                  "
                  class="radius-7 mt-2 mr-1 custom-select v-select-wrapper"
                  append-icon="mdi-chevron-down"
                  v-model="form.seller1"
                  :items="filterSellerforseller2"
                  :item-text="
                    (item) =>
                      item.name ? item.name : item.passKey || 'No name'
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
                        <span
                          class="grey-text-300"
                          v-else-if="data.item.passKey"
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
                    :color="
                      form.colorCode
                        ? `${form.colorCode} !important`
                        : '#1ba8bb !important'
                    "
                    style="font-size: 33px"
                    >mdi-plus-circle</v-icon
                  >
                </div>
              </div>
            </v-col>
            <v-col cols="12" md="6" class="pr-2 mr-0">
              <small
                class="cyan-text font-18 font-weight-600"
                :style="{
                  color: form.colorCode
                    ? `${form.colorCode} !important`
                    : '#1ba8bb !important',
                }"
                >Seller 2</small
              >
              <div class="d-flex">
                <v-autocomplete
                  placeholder="select seller"
                  solo
                  hide-details
                  flat
                  :background-color="
                    'var(--checklistedit-lightcolor)' ||
                    'var(--secondary-color)'
                  "
                  class="radius-7 mt-2 mr-1 custom-select v-select-wrapper"
                  append-icon="mdi-chevron-down"
                  v-model="form.seller2"
                  :items="filterSellerforseller1"
                  :item-text="
                    (item) =>
                      item.name ? item.name : item.passKey || 'No name'
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
                        <span
                          class="grey-text-300"
                          v-else-if="data.item.passKey"
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
                    :color="
                      form.colorCode
                        ? `${form.colorCode} !important`
                        : '#1ba8bb !important'
                    "
                    style="font-size: 33px"
                    >mdi-plus-circle</v-icon
                  >
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6">
          <small
            class="cyan-text font-18 font-weight-600"
            :style="{
              color: form.colorCode
                ? `${form.colorCode} !important`
                : '#1ba8bb !important',
            }"
            >Attorney</small
          >
          <div class="d-flex">
            <v-autocomplete
              placeholder="select attorney"
              solo
              hide-details
              flat
              :background-color="
                'var(--checklistedit-lightcolor)' || 'var(--secondary-color)'
              "
              class="radius-7 mt-2 mr-1 custom-select v-select-wrapper"
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
                :color="
                  form.colorCode
                    ? `${form.colorCode} !important`
                    : '#1ba8bb !important'
                "
                style="font-size: 33px"
                >mdi-plus-circle</v-icon
              >
            </div>
          </div>
        </v-col>
      </v-row>

      <!-- Date Picker -->

      <v-row>
        <v-col cols="12" md="3">
          <small
            class="font-18 font-weight-600"
            :style="{
              color: form.colorCode
                ? `${form.colorCode} !important`
                : '#1ba8bb !important',
            }"
            >HOA Contact</small
          >
          <div class="d-flex">
            <v-autocomplete
              placeholder="select hoa contact"
              solo
              hide-details
              flat
              :background-color="
                'var(--checklistedit-lightcolor)' || 'var(--secondary-color)'
              "
              :items="dropdowns?.hoaContact"
              item-text="name"
              item-value="userId"
              class="radius-7 mt-2 mr-1 custom-select v-select-wrapper"
              append-icon="mdi-chevron-down"
              v-model="form.hoaContact"
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
                :color="
                  form.colorCode
                    ? `${form.colorCode} !important`
                    : '#1ba8bb !important'
                "
                style="font-size: 33px"
                >mdi-plus-circle</v-icon
              >
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="3">
          <small
            class="font-18 font-weight-600"
            :style="{
              color: form.colorCode
                ? `${form.colorCode} !important`
                : '#1ba8bb !important',
            }"
            >Closing Agent</small
          >
          <div class="d-flex">
            <v-autocomplete
              placeholder="select co-op realtor"
              solo
              hide-details
              flat
              :background-color="
                'var(--checklistedit-lightcolor)' || 'var(--secondary-color)'
              "
              :items="dropdowns?.closingAgent"
              item-text="name"
              item-value="userId"
              class="radius-7 mt-2 mr-1 custom-select v-select-wrapper"
              append-icon="mdi-chevron-down"
              v-model="form.closingAgent"
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
                :color="
                  form.colorCode
                    ? `${form.colorCode} !important`
                    : '#1ba8bb !important'
                "
                style="font-size: 33px"
                >mdi-plus-circle</v-icon
              >
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="3">
          <!-- Date Picker Start date -->
          <small
            class="cyan-text font-18 font-weight-600"
            :style="{
              color: form.colorCode
                ? `${form.colorCode} !important`
                : '#1ba8bb !important',
            }"
            >Start Date</small
          >
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
                  :background-color="
                    'var(--checklistedit-lightcolor)' ||
                    'var(--secondary-color)'
                  "
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
          </div>
        </v-col>
        <v-col cols="12" md="3">
          <!-- Date Picker To -->
          <div class="">
            <small
              class="cyan-text font-18 font-weight-600"
              :style="{
                color: form.colorCode
                  ? `${form.colorCode} !important`
                  : '#1ba8bb !important',
              }"
              >End Date</small
            >
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="form.endDate"
              transition="scale-transition"
              offset-y
              left
              min-width="auto"
              class="ma-0 pa-0"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-combobox
                  v-model="form.endDate"
                  append-icon="mdi-calendar"
                  v-bind="attrs"
                  readonly
                  v-on="on"
                  class="radius-7 mt-2"
                  solo
                  hide-details
                  flat
                  :background-color="
                    'var(--checklistedit-lightcolor)' ||
                    'var(--secondary-color)'
                  "
                  clearable
                >
                  <template #append>
                    <v-icon>mdi-calendar-month</v-icon>
                  </template>
                </v-combobox>
              </template>
              <v-date-picker v-model="form.endDate" :min="minEndDate" no-title>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menu.save(form.endDate)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </div>
        </v-col>
      </v-row>

      <!-- <v-btn
        depressed
        class="cyan-background mb-2 mt-7"
        @click="selectTemplateDialog = true"
        ><span class="text-transform font-18 white--text"
          >Select a template</span
        ></v-btn
      > -->
      <div class="mt-3">
        <v-row v-if="selectedTemplates.length > 0">
          <v-col
            cols="5"
            class="font-weight-600"
            :style="{
              color: form.colorCode
                ? `${form.colorCode} !important`
                : '#1ba8bb !important',
            }"
            ><span class="ml-1">Task</span></v-col
          >
          <v-col
            cols="2"
            class="font-weight-600"
            :style="{
              color: form.colorCode
                ? `${form.colorCode} !important`
                : '#1ba8bb !important',
            }"
            >Role</v-col
          >
          <v-spacer></v-spacer>
          <v-col
            cols="2"
            class="font-weight-600"
            :style="{
              color: form.colorCode
                ? `${form.colorCode} !important`
                : '#1ba8bb !important',
            }"
            >Early Notice</v-col
          >
          <v-col
            cols="2"
            class="font-weight-600 d-flex justify-end"
            :style="{
              color: form.colorCode
                ? `${form.colorCode} !important`
                : '#1ba8bb !important',
            }"
            ><span class="pr-3">Deadline</span></v-col
          >
        </v-row>
        <draggable
          v-model="selectedTemplates"
          @end="onDragEnd"
          handle=".drag-handle"
        >
          <div
            class="d-flex align-center pa-3 grey-background my-3"
            v-for="nestedItem in selectedTemplates"
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
                  class="cyan-text cursor-pointer handler-text-overflow"
                  :style="{
                    color: form.colorCode
                      ? `${form.colorCode} !important`
                      : '#1ba8bb !important',
                  }"
                  @click="editTaskDeadline(nestedItem)"
                  style="text-decoration: underline"
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
              <v-col
                cols="2"
                style="padding-left: 1.1rem !important"
                class="d-flex justify-end"
              >
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
        <div class="red--text my-3" v-if="$v.selectedTemplates.$error">
          Template task is required
        </div>
        <div
          class="d-flex justify-space-between align-center"
          :class="selectedTemplates.length > 0 ? 'mt-6' : 'mt-2'"
        >
          <v-btn
            depressed
            style="padding: 0 4.04rem"
            class="mb-1 radius-25 py-6"
            @click="addTaskDeadline"
            :color="
              form.colorCode
                ? `${form.colorCode} !important`
                : '#1ba8bb !important'
            "
            ><span class="text-transform font-18 white--text"
              >Add task+</span
            ></v-btn
          >
          <v-btn
            depressed
            class="radius-25 py-6"
            :color="
              form.colorCode
                ? `${form.colorCode} !important`
                : '#1ba8bb !important'
            "
            style="padding: 0 2.1rem"
            v-if="selectedTemplates.length > 0"
            @click="saveAsTemplate"
            ><span class="text-transform font-18 white--text"
              >Save as template</span
            ></v-btn
          >
        </div>
      </div>
      <div class="d-flex justify-space-between align-center mb-3">
        <!-- <v-btn depressed class="cyan-background my-5"
          ><span class="text-transform font-18 white--text"
            >Save as template</span
          ></v-btn
        > -->
      </div>
      <div class="d-flex justify-end my-6">
        <v-btn
          style="padding: 0 4.89rem"
          class="mr-4 py-6 radius-25"
          color="#C0C0C0"
          depressed
          to="/checklist"
          ><span class="text-transform font-18 white--text">Cancel</span></v-btn
        >
        <v-btn
          style="padding: 0 5.44rem"
          class="py-6 radius-25"
          :color="
            form.colorCode
              ? `${form.colorCode} !important`
              : '#1ba8bb !important'
          "
          depressed
          @click="updateContract()"
          ><span class="text-transform font-18 white--text">Save</span></v-btn
        >
      </div>
    </div>

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
          :contractColor="contractColor"
          @updateDropdownValues="updateDropdownValues"
        />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import addcomponent from "@/components/Template/Task/add.component.vue";
import addlistcomponent from "@/components/Checklist/Contract/add.component.vue";
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";
import draggable from "vuedraggable";
export default {
  components: { addcomponent, addlistcomponent, draggable },
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
        hoaContact: null,
        closingAgent: null,
        attorneyId: null,
        contractScheduleTaskDetails: [],
        endDate: null,
        startDate: null,
      },
      dropdowns: null,
      loader: false,
      listItem: "",
      selectedTemplates: [],
      minDate: new Date().toISOString(),
      menu: false,
      maxStartDate: "",
      minEndDate: "",
      menu1: false,
      contractColor: null,
      taskDeadlineValue: {},
      filterBuyerforbuyer1: [],
      filterBuyerforbuyer2: [],
      filterSellerforseller1: [],
      filterSellerforseller2: [],
    };
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
    "form.colorCode": {
      immediate: true,
      handler() {
        this.setPrimaryColor(this.form?.colorCode);
        this.rgbToRgba(this.form?.colorCode, "16%");
      },
    },
    "form.buyer1": {
      immediate: true,
      handler() {
        if (this.form?.buyer1) {
          this.filterBuyerforbuyer1 = this.dropdowns?.buyer.filter(
            (value) => value.userId != this.form?.buyer1
          );
        }
      },
    },
    "form.buyer2": {
      immediate: true,
      handler() {
        if (this.form?.buyer2) {
          this.filterBuyerforbuyer2 = this.dropdowns?.buyer.filter(
            (value) => value.userId != this.form?.buyer2
          );
        }
      },
    },
    "form.seller1": {
      immediate: true,
      handler() {
        if (this.form?.seller1) {
          this.filterSellerforseller1 = this.dropdowns?.seller.filter(
            (value) => value.userId != this.form?.seller1
          );
        }
      },
    },
    "form.seller2": {
      immediate: true,
      handler() {
        if (this.form?.seller2) {
          this.filterSellerforseller2 = this.dropdowns?.seller.filter(
            (value) => value.userId != this.form?.seller2
          );
        }
      },
    },
    "form.endDate": {
      immediate: true,
      handler() {
        this.maxStartDate = this.form.endDate;
      },
    },
    "form.startDate": {
      immediate: true,
      handler() {
        this.minEndDate = this.form.startDate;
      },
    },
  },
  validations: {
    form: {
      propertyAddressName: {
        required,
      },
    },
    selectedTemplates: {
      required,
    },
  },
  computed: {
    ...mapGetters([
      "getUserId",
      "getChecklistDropdowns",
      "getOrganizationId",
      "getContractById",
    ]),
  },
  mounted() {
    this.fetchdata();
    this.fetchChecklistById();
  },
  methods: {
    updateDropdownValues(item) {
      if (item.listItem.name === "Buyer") {
        if (item.listItem.buyerType == "buyerOne") {
          this.form.buyer1 = item.res?.data?.data?.userId;
        } else {
          this.form.buyer2 = item.res?.data?.data?.userId;
        }
      } else if (item.listItem.name === "Seller") {
        if (item.listItem.sellerType == "sellerOne") {
          this.form.seller1 = item.res?.data?.data?.userId;
        } else {
          this.form.seller2 = item.res?.data?.data?.userId;
        }
      } else if (item.listItem.name === "Attorney") {
        this.form.attorneyId = item.res?.data?.data?.userId;
      } else if (item.listItem.name === "Escrow Agent") {
        this.form.escrowAgentId = item.res?.data?.data?.userId;
      } else if (item.listItem.name === "HOA Contact") {
        this.form.hoaContact = item.res?.data?.data?.userId;
      } else if (item.listItem.name === "Closing Agent") {
        this.form.closingAgent = item.res?.data?.data?.userId;
      } else {
        this.form.realtorId = item.res?.data?.data?.userId;
      }
    },
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
        let saveAsTemplateTasks = this.selectedTemplates.map((value, index) => {
          return {
            taskName: value.taskName || "",
            filePath: value.filePath || "",
            roleId: value.roleId || null,
            orderById: index + 1,
          };
        });
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
      let index = this.selectedTemplates.findIndex((value) => {
        return value.id == item.id;
      });
      this.selectedTemplates[index] = item;
    },
    editTaskDeadline(item) {
      this.scheduleTask = true;
      this.taskDeadlineValue = { type: "edit", data: item };
    },
    addTaskSoft(item) {
      this.selectedTemplates.push(item);
    },
    addTaskDeadline(item) {
      this.scheduleTask = true;
      this.taskDeadlineValue = { type: "add", data: item };
    },
    formatDate(date) {
      const day = ("0" + date.getDate()).slice(-2);
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      return `${month}-${day}-${year}`;
    },
    deleteTask(item) {
      this.selectedTemplates = this.selectedTemplates.filter((value) => {
        return value.id !== item.id;
      });
    },
    updateContract() {
      if (this.$v.$invalid) {
        this.$v.$touch();
      } else {
        this.loader = true;
        let payload = {
          id: +this.$route.query.contractId,
          propertyAddressName: this.form.propertyAddressName,
          buyerIds: [],
          sellerIds: [],
          escrowAgentIds: [],
          hoaContactIds: [],
          closingAgentIds: [],
          realtorIds: [],
          attorneyIds: [],
          startDate: this.form.startDate,
          endDateDate: this.form.endDate,
          organizationId: +this.form.organizationId,
          createdById: this.form.createdById,
          contractScheduleTaskDetails: [],
          contractSchedulePercentage: this.filterTrueTask(),
        };
        if (this.form.escrowAgentId) {
          payload.escrowAgentIds.push(this.form.escrowAgentId);
        }
        if (this.form.hoaContact) {
          payload.hoaContactIds.push(this.form.hoaContact);
        }
        if (this.form.closingAgent) {
          payload.closingAgentIds.push(this.form.closingAgent);
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
        const allTasks = this.selectedTemplates.flatMap((value) => {
          if (value.roleName === "Real Estate Agent") {
            return {
              contractScheduleId: +this.$route.query.contractId,
              taskId: value.taskId || value.id,
              userId: this.form.realtorId,
              taskStartDate: value.taskStartDate,
              taskDeadLine: value.taskDeadLine,
              status: value.status || false,
            };
          } else if (value.roleName === "Buyer") {
            const tasks = [];

            // Check if buyer1 is defined and add to tasks
            tasks.push({
              contractScheduleId: +this.$route.query.contractId,
              taskId: value.taskId || value.id,
              userId: this.form.buyer1 || null,
              taskStartDate: value.taskStartDate,
              taskDeadLine: value.taskDeadLine,
              status: value.status || false,
            });

            // Check if buyer2 is defined and add to tasks
            tasks.push({
              contractScheduleId: +this.$route.query.contractId,
              taskId: value.taskId || value.id,
              userId: this.form.buyer2 || null,
              taskStartDate: value.taskStartDate,
              taskDeadLine: value.taskDeadLine,
              status: value.status || false,
            });

            return tasks;
          } else if (value.roleName === "Co-op Real Estate Agent") {
            return {
              contractScheduleId: +this.$route.query.contractId,
              taskId: value.taskId || value.id,
              userId: this.form.realtorId,
              taskStartDate: value.taskStartDate,
              taskDeadLine: value.taskDeadLine,
              status: value.status || false,
            };
          } else if (value.roleName === "Seller") {
            const tasks = [];

            tasks.push({
              contractScheduleId: +this.$route.query.contractId,
              taskId: value.taskId || value.id,
              userId: this.form.seller1 || null,
              taskStartDate: value.taskStartDate,
              taskDeadLine: value.taskDeadLine,
              status: value.status || false,
            });

            tasks.push({
              contractScheduleId: +this.$route.query.contractId,
              taskId: value.taskId || value.id,
              userId: this.form.seller2 || null,
              taskStartDate: value.taskStartDate,
              taskDeadLine: value.taskDeadLine,
              status: value.status || false,
            });

            return tasks;
          } else if (value.roleName === "Attorny") {
            return {
              contractScheduleId: +this.$route.query.contractId,
              taskId: value.taskId || value.id,
              userId: this.form.attorneyId,
              taskStartDate: value.taskStartDate,
              taskDeadLine: value.taskDeadLine,
              status: value.status || false,
            };
          } else if (value.roleName === "Escrow Agent") {
            return {
              contractScheduleId: +this.$route.query.contractId,
              taskId: value.taskId || value.id,
              userId: this.form.escrowAgentId,
              taskStartDate: value.taskStartDate,
              taskDeadLine: value.taskDeadLine,
              status: value.status || false,
            };
          } else {
            return {
              contractScheduleId: +this.$route.query.contractId,
              taskId: value.taskId || value.id,
              userId: value.userIds[0],
              taskStartDate: value.taskStartDate,
              taskDeadLine: value.taskDeadLine,
              status: value.status || false,
            };
          }
        });
        payload.contractScheduleTaskDetails = allTasks;
        // payload.contractScheduleTaskDetails = this.selectedTemplates.map(
        //   (value) => {
        //     return {
        //       taskId: value.taskId || value.id,
        //       userId: value.userId,
        //       status: value.status || false,
        //       taskStartDate: value.taskStartDate,
        //       taskDeadLine: value.taskDeadLine,

        //     };
        //   }
        // );


        this.$store.dispatch("createChecklist", payload).then((response) => {
          if (response.data.succeeded === true) {
            this.loader = false;
            this.$swal.fire({
              position: "top-end",
              icon: "success",
              title: "Contract updated successfully",
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
          this.loader = false;
        });
        this.loader = false;
      }
    },
    filterTrueTask() {
      let trueTasks = this.selectedTemplates.filter(
        (value) => value.status == true
      );
      let percentageValue;
      if (trueTasks.length > 0) {
        percentageValue = Math.round(
          (trueTasks.length / this.selectedTemplates.length) * 100
        );
      } else {
        percentageValue = 0;
      }
      return percentageValue;
    },
    addlistValue(item) {
      this.addlistDialog = true;
      this.listItem = item;
    },
    //Get dropdown value of seller, buyer etc
    fetchdata() {
      this.loader = true;
      const id = this.getOrganizationId;
      this.$store.dispatch("getChecklistDropdowns", id).then(() => {
        this.dropdowns = this.getChecklistDropdowns;
        this.filterBuyerforbuyer1 = this.dropdowns?.buyer;
        this.filterBuyerforbuyer2 = this.dropdowns?.buyer;
        this.filterSellerforseller1 = this.dropdowns?.seller;
        this.filterSellerforseller2 = this.dropdowns?.seller;
        this.loader = false;
        if (this.form?.buyer1) {
          this.filterBuyerforbuyer1 = this.dropdowns?.buyer.filter(
            (value) => value.userId != this.form?.buyer1
          );
        }
        if (this.form?.buyer2) {
          this.filterBuyerforbuyer2 = this.dropdowns?.buyer.filter(
            (value) => value.userId != this.form?.buyer2
          );
        }
        if (this.form?.seller1) {
          this.filterSellerforseller1 = this.dropdowns?.seller.filter(
            (value) => value.userId != this.form?.seller1
          );
        }
        if (this.form?.seller2) {
          this.filterSellerforseller2 = this.dropdowns?.seller.filter(
            (value) => value.userId != this.form?.seller2
          );
        }
      });
    },
    // Get Single checklist & optimize values to render
    fetchChecklistById() {
      this.loader = true;
      const payload = {
        contractScheduleId: this.$route.query.contractId,
        organizationId: this.$route.query.organizationId,
      };
      this.$store.dispatch("getContractById", payload).then((response) => {
        if (response.data.succeeded == true) {
          this.form = this.getContractById;
          this.form.startDate = this.form.startDate
            ? this.form.startDate.split("T")[0]
            : this.form.startDate;
          this.form.endDate = this.form.endDate
            ? this.form.endDate.split("T")[0]
            : this.form.endDate;
          this.form.seller1 = this.form?.seller.find(
            (value) => value.sellerType == "sellerOne"
          )?.id;
          this.form.seller2 = this.form?.seller.find(
            (value) => value.sellerType == "sellerTwo"
          )?.id;
          this.form.buyer1 = this.form?.buyer.find(
            (value) => value.buyerType == "buyerOne"
          )?.id;
          this.form.buyer2 = this.form?.buyer.find(
            (value) => value.buyerType == "buyerTwo"
          )?.id;
          if (this.form.buyer1) {
            this.filterBuyerforbuyer1 = this.dropdowns?.buyer.filter(
              (value) => value.userId != this.form?.buyer1
            );
          }
          if (this.form.buyer2) {
            this.filterBuyerforbuyer2 = this.dropdowns?.buyer.filter(
              (value) => value.userId != this.form?.buyer2
            );
          }
          if (this.form.seller1) {
            this.filterSellerforseller1 = this.dropdowns?.seller.filter(
              (value) => value.userId != this.form?.seller1
            );
          }
          if (this.form.seller2) {
            this.filterSellerforseller2 = this.dropdowns?.seller.filter(
              (value) => value.userId != this.form?.seller2
            );
          }
          this.form.escrowAgentId = this.form?.escrowAgent[0]?.id;
          this.form.realtorId = this.form?.realtor[0]?.id;
          this.form.attorneyId = this.form?.attorney[0]?.id;
          this.form.hoaContact = this.form?.hoaContact[0]?.id;
          this.form.closingAgent = this.form?.closingAgent[0]?.id;
          this.selectedTemplates = this.form?.contractScheduleTaskDetails;
          this.selectedTemplates.forEach((value) => {
            value.taskStartDate = value.taskStartDate
              ? value.taskStartDate.split("T")[0]
              : value.taskStartDate;
            value.taskDeadLine = value.taskDeadLine
              ? value.taskDeadLine.split("T")[0]
              : value.taskDeadLine;
          });
          this.contractColor = this.form?.colorCode;
          this.loader = false;
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
    rgbToRgba(color, alpha) {
      if (!color || color == "#1ba8bb") {
        // Fallback to a default color if the color is undefined or null
        document.documentElement.style.setProperty(
          "--checklistedit-lightcolor",
          `#E1F2FF`
        );
        return `#E1F2FF`; // Default to black with the given alpha
      }
      const match = color.match(/\d+/g);
      if (!match || match.length < 3) {
        // Fallback if the color does not match the expected RGB format
        return `rgba(0, 0, 0, ${alpha})`;
      }

      let [r, g, b] = match.map(Number);
      let rgba = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      document.documentElement.style.setProperty(
        "--checklistedit-lightcolor",
        rgba
      );
    },
    setPrimaryColor(color) {
      document.documentElement.style.setProperty(
        "--checklistedit-color",
        color
      );
    },
  },
};
</script>

<style scoped>
.v-list >>> .v-list-item--active {
  background-color: var(--checklistedit-lightcolor) !important;
  color: var(--checklistedit-lightcolor) !important;
}
</style>
<style>
.custom-select.v-select-wrapper .v-icon {
  color: var(--checklistedit-color) !important;
}
</style>
<style scoped>
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
