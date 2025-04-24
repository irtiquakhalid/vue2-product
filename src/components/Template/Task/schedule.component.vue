<template>
  <div class="add-task">
    <loadercomponent :loader="loader" />
    <div class="d-flex justify-space-between mb-4">
      <h3 class="dynamic-color">Schedule Checklist Task</h3>
      <v-icon
        @click="close()"
        color="var(--primary-color)"
        style="font-size: 33px"
        >mdi-close-circle</v-icon
      >
    </div>

    <v-row>
      <v-col cols="6">
        <small class="cyan-text font-18">Task Name</small>
        <v-combobox
          solo
          flat
          class="mt-2"
          background-color="var(--secondary-color)"
          hide-details
          :items="taskSuggestionsData"
          item-text="taskName"
          item-value="taskName"
          append-icon=""
          :return-object="false"
          :search-input.sync="form.taskName"
          content-class="custom-combobox-menu"
        >
        </v-combobox>
        <div class="red--text" v-if="$v.form.taskName.$error">
          Task name is required
        </div>
      </v-col>
      <v-col cols="6">
        <small class="cyan-text font-18">Assign Role</small>
        <v-select
          solo
          hide-details
          flat
          background-color="var(--secondary-color)"
          class="radius-7 mt-2 custom-select"
          append-icon="mdi-chevron-down"
          v-model="form.roleId"
          :items="roles"
          item-text="roleName"
          item-value="id"
        >
        </v-select>
        <div class="red--text" v-if="$v.form.roleId.$error">
          Role is required
        </div>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="12" class="mt-4">
        <small class="cyan-text font-18">Attach Document</small>
        <div class="attach-document">
          <svg
            width="60"
            height="55"
            viewBox="0 0 88 68"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            v-if="!documentName"
          >
            <rect
              x="0.628571"
              y="0.628571"
              width="86.7429"
              height="66.6286"
              rx="6.91429"
              stroke="var(--primary-color)"
              stroke-width="1.25714"
            />
            <path
              d="M33.3247 36.6303L50.5232 20.5485C50.708 20.3757 52.1822 18.9973 54.5153 18.2511C57.7702 17.2752 61.0881 18.0783 63.7298 20.5485C66.4324 23.0187 67.2304 26.0623 66.1867 29.1059C65.4496 31.2893 63.9145 32.7817 63.7298 32.9545L45.2418 50.2419C42.0478 53.2286 34.0618 57.0772 26.6909 50.2419C19.3811 43.4067 23.5579 35.8823 26.6909 32.9545L46.5312 14.3455C47.2683 13.6563 48.4358 13.6563 49.1729 14.3455C49.91 15.0347 49.91 16.1265 49.1729 16.8157L29.3936 35.4246C29.0869 35.6544 22.8817 41.6846 29.3936 47.7736C35.7207 53.6899 41.924 48.4059 42.6001 47.7736L61.0881 30.4273C61.0881 30.4273 62.1318 29.4514 62.6232 28.0729C63.2384 26.235 62.8079 24.6269 61.0881 23.0187C57.4027 19.5726 53.8391 22.4434 53.1649 23.0187L35.9664 39.0435C35.3512 39.6188 34.9227 40.5947 35.9664 41.5706C37.0101 42.5466 37.9929 42.0871 38.6081 41.5706L50.5252 30.4273C51.2623 29.7951 52.4908 29.7951 53.1669 30.4273C53.904 31.1165 53.904 32.2652 53.1669 32.9545L41.2498 44.039C39.5909 45.5332 36.2121 46.7389 33.3266 44.039C30.3783 41.3391 31.6657 38.1227 33.3247 36.6303Z"
              fill="var(--primary-color)"
            />
          </svg>
          <h6 v-if="documentName">{{ documentName }}</h6>
          <input type="file" @change="handleDocument" />
        </div>
      </v-col>
    </v-row>

    <div class="d-flex justify-end mt-6 mb-2">
      <v-btn
        depressed
        class="radius-25 py-6 padding-8"
        color="var(--primary-color)"
        @click="saveTask"
        ><span class="text-transform white--text font-18">Save</span></v-btn
      >
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
export default {
  props: ["tasksLength"],
  data() {
    return {
      document: "",
      documentName: "",
      form: {
        templateId: null,
        file: null,
        taskName: "",
        roleId: 2,
        OrderBy: null,
      },
      loader: false,
      roles: [],
      totalTaskCount: null,
      taskSuggestionsData: null,
      taskSuggestionsInitial: []
    };
  },
  validations: {
    form: {
      taskName: {
        required,
      },
      roleId: {
        required,
      },
    },
  },
  computed: {
    ...mapGetters(["getUserId", "getRoles"]),
  },
  watch: {
    tasksLength: {
      immediate: true,
      handler() {
        this.mapData();
      },
    },
    "form.taskName": {
       immediate: true,
       handler(){
        if(this.form.taskName){
        this.taskSuggestionsData = this.taskSuggestionsInitial
        }else{
          this.taskSuggestionsData = []
        }
       }
    }
  },
  mounted() {
    this.fetchdata();
    this.getAllTasksForSuggestions();
  },
  methods: {
    getAllTasksForSuggestions(){
      this.loader = true;
      this.$store.dispatch('getTasks',{isPagination: false}).then((response) => {
         this.taskSuggestionsInitial = response.data?.data
         this.loader = false;
      })
    },
    mapData() {
      this.totalTaskCount = this.tasksLength;
    },
    fetchdata() {
      this.$store.dispatch("getRoles").then(() => {
        this.roles = this.getRoles;
        this.roles = this.roles.filter((value) => {
          return (
            value.id !== 1 && value.id !== 7 && value.id !== 8 && value.id !== 9
          );
        });
        this.roles = this.roles.filter((value) => {
          return value.roleName != "Co-op Realtor";
        });
        this.roles.unshift({
          id: 10,
          roleName: "Co-op Realtor",
        });
      });
    },
    saveTask() {
      if (this.$v.$invalid) {
        this.$v.$touch();
      } else {
        this.loader = true;
        this.form.templateId = this.$route.query.templateId;
        this.form.OrderBy = this.totalTaskCount + 1;
        this.$store.dispatch("createTask", this.form).then((response) => {
          if (response.data.succeeded === true) {
            this.loader = false;
            this.$swal.fire({
              position: "top-end",
              icon: "success",
              title: "Task added successfully",
              showConfirmButton: false,
              timer: 2000,
              toast: true,
            });
            this.close();
            this.fetchList();
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
    resetForm() {
      this.form = {
        templateId: null,
        file: null,
        taskName: "",
        roleId: 2,
        OrderBy: null,
      };
      this.documentName = "";
    },
    close() {
      this.$emit("close");
      this.resetForm();
      this.$v.$reset();
    },
    fetchList() {
      this.$emit("fetchList");
    },
    handleDocument(event) {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      this.documentName = file.name;
      this.form.file = file;
      fileReader.readAsDataURL(file);
    },
  },
};
</script>

<style scoped>
.v-list >>> .v-list-item--active {
  background-color: var(--secondary-color) !important;
  color: var(--secondary-color) !important;
}
</style>
