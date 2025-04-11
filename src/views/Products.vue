<template>
  <v-container class="py-8">
    <v-row justify="center">
      <!-- Title -->
      <v-col cols="12" md="6" class="mb-6">
        <h1 class="display-1 font-weight-bold primary--text">
          Product Listings
        </h1>
        <p class="subtitle-1 grey--text">Find your favorite products easily</p>
      </v-col>

      <!-- Search -->
      <v-col cols="12" md="6" class="mb-6">
        <v-text-field
          v-model="searchQuery"
          label="Search products..."
          append-icon="mdi-magnify"
          outlined
          dense
          color="primary"
          class="rounded-xl"
        />
      </v-col>

      <!-- Loading -->
      <v-col cols="12" v-if="isLoading" class="text-center my-6">
        <v-progress-circular indeterminate color="primary" size="48" />
      </v-col>

      <!-- Product Cards -->
      <v-col
        v-for="product in paginatedProducts"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        class="d-flex"
      >
        <v-hover v-slot="{ hover }">
          <v-card
            :elevation="hover ? 10 : 4"
            class="rounded-xl transition-swing"
            color="white"
          >
            <ProductCard :product="product" />
          </v-card>
        </v-hover>
      </v-col>

      <!-- Pagination -->
      <v-col cols="12" class="text-center mt-8" v-if="pageCount > 1">
        <v-pagination
          v-model="currentPage"
          :length="pageCount"
          color="primary"
          size="large"
          class="rounded-xl"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ProductCard from "@/components/ProductCard.vue";

export default {
  name: "Products",
  components: { ProductCard },
  data() {
    return {
      isLoading: false,
      currentPage: 1,
      itemsPerPage: 8,
      searchQuery: "",
      filteredProducts: [],
    };
  },
  computed: {
    ...mapGetters(["allProducts"]),
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredProducts.slice(start, end);
    },
    pageCount() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    },
  },
  watch: {
    searchQuery: "filterProducts",
    allProducts: {
      immediate: true,
      handler(products) {
        this.filteredProducts = products;
        this.isLoading = false;
      },
    },
    filteredProducts(newVal) {
      if (newVal.length > 0) this.isLoading = false;
    },
  },

  mounted() {
    this.isLoading = true;
    this.fetchProducts();
  },
  methods: {
    ...mapActions(["fetchProducts"]),
    filterProducts() {
      const query = this.searchQuery.toLowerCase();
      this.filteredProducts = this.allProducts.filter((product) =>
        product.title.toLowerCase().includes(query)
      );
      this.currentPage = 1;
    },
  },
};
</script>
