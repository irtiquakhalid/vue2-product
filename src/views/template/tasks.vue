<template>
  <div class="tasks">
    <loadercomponent :loader="loader" />
    <div class="mb-5 w-100">
      <div class="d-flex align-center">
        <router-link to="/template">
          <v-icon style="color: var(--primary-color); font-size: 45px"
            >mdi-arrow-left-box</v-icon
          >
        </router-link>
        <h2 class="ml-5">
          <span>{{ tasksByTemplate.templateName }} Tasks</span>
        </h2>
      </div>
    </div>
    <draggable
      v-model="tasksByTemplate.tasks"
      @end="onDragEnd"
      handle=".drag-handle"
    >
      <div
        class="d-flex justify-space-between align-center px-4 py-3 mt-3 radius-7 grey-background"
        v-for="item in tasksByTemplate.tasks"
        :key="item.id"
      >
        <v-row align="center">
          <v-col class="d-flex" cols="4">
            <v-img
              src="/images/templates/drag.svg"
              contain
              max-width="18"
              class="mr-4 cursor-drag drag-handle"
            ></v-img>
            <v-img
              src="/images/templates/edit.svg"
              contain
              max-width="18"
              class="mr-4 cursor-pointer"
              @click="editItem(item)"
            ></v-img>
            <a
              :href="`${imageURL}${item.filePath}`"
              v-if="item.filePath ? isImage(item.filePath) : false"
              download
              target="_blank"
            >
              <v-icon class="mr-8 cursor-pointer">mdi-image-outline</v-icon>
            </a>
            <a
              :href="`${imageURL}${item.filePath}`"
              v-if="item.filePath ? !isImage(item.filePath) : false"
              download
              target="_blank"
            >
              <v-icon class="mr-8 cursor-pointer"
                >mdi-file-download-outline</v-icon
              >
            </a>
            <v-icon v-if="!item.filePath" class="mr-8">mdi-cancel</v-icon>
            <span style="color: var(--primary-color)" class="font-weight-600 font-16 handler-text-overflow">{{ item.taskName }}</span>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="2"
            ><div class="font-weight-600 text-center grey-text-300">
              {{ item.roleName }}
            </div></v-col
          >
          <v-spacer></v-spacer>
          <v-col class="d-flex justify-end" cols="4">
            <span class="grey-text-500 font-14">{{
              formatDate(new Date(item.createdDate))
            }}</span>
            <v-icon style="color: var(--primary-color)" @click="deleteItem(item)" class="mx-4">mdi-delete</v-icon>
          </v-col>
        </v-row>
        <!-- <span class="grey-text-500">2000-08-03</span> -->
      </div>
    </draggable>
    <v-btn color="var(--primary-color)" @click="scheduleTask = true" depressed 
    style="padding: 0 4.03rem"
    class="mb-5 mt-8 py-6 radius-25"
    
    >
      <span class="text-transform white--text font-18">Add task+</span>
    </v-btn>

    <div class="d-flex justify-end">
      <v-btn class="radius-25 py-6" color="var(--primary-color)" 
      style="padding: 0 5.44rem"
      depressed @click="dragdroptasks"
        ><span class="text-transform font-18 white--text">Save</span></v-btn
      >
    </div>

    <v-dialog v-model="scheduleTask" max-width="750" persistent>
      <v-card class="pa-6 radius-21">
        <scheduleTask
          @close="close"
          @fetchList="fetchdata"
          :tasksLength="tasksLength"
        />
      </v-card>
    </v-dialog>

    <v-dialog v-model="editDialog" max-width="750" persistent>
      <v-card class="pa-6 radius-21">
        <editcomponent @close="close" @fetchList="fetchdata" :editId="editId" />
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" persistent max-width="400">
      <v-card class="pa-6 radius-21">
        <div class="d-flex justify-end">
          <v-icon
            @click="deleteDialog = false"
            color="var(--primary-color)"
            style="font-size: 33px"
            >mdi-close-circle</v-icon
          >
        </div>
        <div class="d-flex justify-center">
          <deletesvgcomponent />
        </div>
        <h3 style="color: var(--primary-color)" class="font-weight-500 text-center">Are you sure?</h3>
        <h6 style="color: var(--primary-color)" class="text-center font-weight-500">Delete this task</h6>
        <v-row class="my-4">
          <v-col cols="12" md="6">
            <v-btn class="py-6 w-100 radius-25" color="var(--primary-color)" @click="close()"
              ><span class="text-transform font-18 white--text">Cancel</span>
            </v-btn>
          </v-col>
          <v-col cols="12" md="6">
            <v-btn
              class="py-6 w-100 radius-25"
              color="var(--primary-color)"
              @click="deleteTask()"
              ><span class="text-transform font-18 white--text">Delete</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import scheduleTask from "@/components/Template/Task/schedule.component.vue";
import editcomponent from "@/components/Template/Task/edit.component.vue";
import deletesvgcomponent from "@/components/Deletesvg/delete.component.vue";
import { mapGetters } from "vuex";
import draggable from "vuedraggable";
export default {
  components: { scheduleTask, editcomponent, draggable, deletesvgcomponent },
  data() {
    return {
      scheduleTask: false,
      deleteDialog: false,
      editDialog: false,
      tasksByTemplate: [],
      loader: false,
      deleteId: null,
      imageURL: process.env.VUE_APP_IMG_API,
      editId: "",
      tasksLength: null,
    };
  },
  computed: {
    ...mapGetters(["getTasksByTemplate","getOrganizationId"]),
  },
  mounted() {
    this.fetchdata();
  },
  watch:{
    getOrganizationId: {
      immediate: true,
      handler(newValue, oldValue) {
        if(oldValue && oldValue !== newValue){
          this.$router.push('/template')
        }
      },
    },
  },
  methods: {
    dragdroptasks() {
      this.loader = true;
      const payload = this.tasksByTemplate.tasks.map((value,index) => {
        return {
          taskId : value.id,
          orderbyId : index
        }
      })
      this.$store.dispatch("dragdroptasks", payload).then((response) => {
        if (response.data.succeeded === true) {
          this.loader = false;
          this.$swal.fire({
            position: "top-end",
            icon: "success",
            title: "Task updated successfully",
            showConfirmButton: false,
            timer: 2000,
            toast: true,
          });
          this.$router.push('/template')
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
    isImage(path) {
      const imageExtensions = [
        "jpg",
        "jpeg",
        "png",
        "gif",
        "bmp",
        "svg",
        "webp",
        "tiff",
      ];

      const extension = path.split(".").pop().toLowerCase();

      return imageExtensions.includes(extension);
    },
    formatDate(date) {
      const day = ("0" + date.getDate()).slice(-2);
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      return `${month}-${day}-${year}`;
    },
    editItem(item) {
      this.editDialog = true;
      this.editId = item.id;
    },
    deleteTask() {
      this.loader = true;
      this.$store.dispatch("deleteTask", this.deleteId).then((response) => {
        if (response.data.succeeded === true) {
          this.loader = false;
          this.$swal.fire({
            position: "top-end",
            icon: "success",
            title: "Task deleted successfully",
            showConfirmButton: false,
            timer: 2000,
            toast: true,
          });
          this.close();
          this.fetchdata();
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
    deleteItem(item) {
      this.deleteId = item.id;
      this.deleteDialog = true;
    },
    fetchdata() {
      this.loader = true;
      const payload = {
        templateId: this.$route.query.templateId,
        isPagination: false,
      };
      this.$store.dispatch("getTasksByTemplate", payload).then(() => {
        this.loader = false;
        this.tasksByTemplate = this.getTasksByTemplate.data.data;
        this.tasksLength = this.tasksByTemplate.tasks.length;
      });
    },
    close() {
      this.scheduleTask = false;
      this.editDialog = false;
      this.deleteDialog = false;
    },
    onDragEnd(event) {
      // Handle drag end event if needed
    },
  },
};
</script>

<style scoped>
.mdi-download-box-outline::before {
  color: #38333361;
}
.handler-text-overflow {
  width: 90% !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap;
  text-align: start;
}
</style>
