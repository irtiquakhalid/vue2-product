<template>
  <div>
    <loadercomponent :loader="loader" />
    <div class="d-flex justify-space-between">
      <h3 class="dynamic-color">Add A New Template</h3>
      <v-icon @click="close()" color="var(--primary-color)" style="font-size: 33px;">mdi-close-circle</v-icon>
    </div>

    <v-row class="mt-5">
      <v-col>
        <v-text-field
          placeholder="Template Name"
          solo
          flat
          background-color="var(--secondary-color)"
          class="radius-7"
          v-model="form.templateName"
          hide-details
        ></v-text-field>
        <div class="red--text" v-if="$v.form.templateName.$error">
          Template name is required
        </div>
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-8">
      <v-col>
        <v-btn
          class="w-100 py-6 radius-25 mb-5"
          color="var(--primary-color)"
          depressed
          @click="makeTemplate()"
        >
          <span class="text-transform white--text font-18">Make Template</span>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
export default {
  name: "addcomponent",
  data() {
    return {
      form: {
        templateName: "",
        organizationId: 0,
      },
      loader: false,
    };
  },
  validations: {
    form: {
      templateName: {
        required,
      },
    },
  },
  computed: {
    ...mapGetters(["getOrganizationId"]),
  },
  methods: {
    resetForm(){
      this.form = {
        templateName: "",
        organizationId: 0,
      }
    },
    close() {
      this.$emit("close");
      this.resetForm();
      this.$v.$reset();
    },
    fetchList() {
      this.$emit("fetchList");
    },
    makeTemplate() {
      if(this.$v.$invalid){
        this.$v.$touch();
      }else{
        this.loader = true;
        this.form.organizationId = this.getOrganizationId;
        this.$store.dispatch("createTemplate", this.form).then((response) => {
          if (response.data.succeeded === true) {
            this.loader = false;
            this.$swal.fire({
              position: "top-end",
              icon: "success",
              title: "Template added successfully",
              showConfirmButton: false,
              timer: 2000,
              toast: true,
            });
            this.close();
            this.$router.push(`/template/tasks?templateId=${response.data.data.id}`)
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
  },
};
</script>

<style></style>
