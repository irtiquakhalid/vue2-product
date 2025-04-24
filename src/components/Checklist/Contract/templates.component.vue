<template>
  <div class="contract-templates">
    <loadercomponent :loader="loader" />
    <div class="d-flex justify-space-between mb-10" v-if="!selectedTemplate">
      <div class="d-flex align-center">
        <h3 class="dynamic-color ml-3">Select Template</h3>
      </div>
      <v-icon @click="close()" color="var(--primary-color)" style="font-size: 33px;">mdi-close-circle</v-icon>
    </div>

    <div class="mb-2" v-if="!selectedTemplate">
      <v-text-field
        solo
        flat
        background-color="var(--secondary-color)"
        class="radius-7"
        hide-details
        @input="fetchdata"
        v-model="search"
      >
        <template v-slot:prepend-inner>
          <v-img src="/images/search.svg" class="px-3" contain></v-img>
        </template>
      </v-text-field>
    </div>

    <div v-if="!selectedTemplate" class="scroller">
      <div
        style="position: relative"
        class="templates-item mr-1"
        v-for="(item, index) in templates"
        :key="index"
        :class="item.useTemplate ? 'template-items-unselect' : 'templates-item'"
        @click="changeUseTemplate(item)"
      >
        <div class="d-flex justify-space-between align-center w-100">
          <div class="w-100">
            <h5 class="handler-text-overflow">{{ item.templateName }}</h5>
            <span class="cyan-text text-decoration-none"
              >Created on {{ formatDate(new Date(item.createdDate)) }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <div
      class="font-18 my-10 text-center font-weight-600"
      style="color: var(--primary-color);"
      v-if="!selectedTemplate && search && templates.length === 0"
    >
      No Records Found
    </div>

    <div class="d-flex justify-space-between mb-10" v-if="selectedTemplate">
      <div class="d-flex align-center w-100">
        <v-icon
          style="color: var(--primary-color); font-size: 45px"
          @click="selectedTemplate = false"
          >mdi-arrow-left-box</v-icon
        >
        <h3 class="dynamic-color ml-6 handler-text-overflow">{{ selectedTemplate.templateName }}</h3>
      </div>
    </div>
    <div v-if="selectedTemplate">
      <div class="templates-item">
        <div class="w-100">
          <h5 class="dynamic-color handler-text-overflow">{{ selectedTemplate.templateName }}</h5>
          <span class="cyan-text text-decoration-none"
            >Created on
            {{ formatDate(new Date(selectedTemplate.createdDate)) }}</span
          >
        </div>
      </div>
      <div class="scroller" v-if="tasks.length > 0">
        <div v-for="item in tasks" :key="item.id">
          <div class="template-items-unselect mr-1">
            <h6 class="dynamic-color">{{ item.taskName.length > 35 ? `${item.taskName.slice(0,35)}...` : item.taskName }}</h6>
            <span class="grey-text-300">{{
              formatDate(new Date(item.createdDate))
            }}</span>
          </div>
        </div>
      </div>
      <div
        class="font-18 dynamic-color text-center my-12"
        v-if="tasks.length === 0"
      >
        No Tasks Found
      </div>
    </div>
    <v-btn
      depressed
      class="w-100 radius-25 py-6 mt-7"
      color="var(--primary-color)"
      v-if="selectedTemplate"
      @click="useTemplate"
    >
      <span class="text-transform font-18 white--text">Use this templates</span>
    </v-btn>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      selectedTemplate: "",
      templates: null,
      loader: false,
      id: null,
      tasks: [],
      search: "",
    };
  },
  computed: {
    ...mapGetters(["getTemplates", "getOrganizationId", "getTasksByTemplate"]),
  },
  mounted() {
    this.fetchdata();
  },
  methods: {
    formatDate(date) {
      const day = ("0" + date.getDate()).slice(-2);
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      return `${month}-${day}-${year}`;
    },
    useTemplate() {
      let templates = [];
      templates.push();
      this.$emit("selectedTemplate", {
        ...this.selectedTemplate,
        tasks: this.tasks,
      });
      this.close();
    },
    fetchdata() {
      this.loader = true;
      let payload = {
        organizationId: this.getOrganizationId,
      };
      if (this.search) {
        payload = {
          ...payload,
          search: this.search,
        };
      }
      this.$store.dispatch("getTemplates", payload).then(() => {
        this.loader = false;
        this.templates = this.getTemplates.data;
      });
    },
    fetchtask(id) {
      this.loader = true;
      const payload = {
        templateId: id,
        isPagination: false,
      };
      this.$store.dispatch("getTasksByTemplate", payload).then(() => {
        this.loader = false;
        if (this.getTasksByTemplate.data.data.tasks) {
          this.tasks = this.getTasksByTemplate.data.data.tasks;
        } else {
          this.tasks = [];
        }
      });
    },
    close() {
      this.$emit("close");
      this.selectedTemplate = "";
    },
    selectedTemplateValue() {
      this.$emit("selectedTemplate", this.selectedTemplate);
    },
    changeUseTemplate(item) {
      this.selectedTemplate = item;
      this.fetchtask(item.id);
    },
  },
};
</script>

<style scoped>
 .handler-text-overflow {
  width: 90% !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap;
  text-align: start;
}
</style>
