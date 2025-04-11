import { fetchAllProducts } from "@/api/products";

export default {
  state: {
    products: [],
    loading: false,
    error: null,
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_LOADING(state, status) {
      state.loading = status;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      commit("SET_LOADING");
      commit("SET_ERROR");
      try {
        const products = await fetchAllProducts();
        commit("SET_PRODUCTS", products);
      } catch (error) {
        commit("SET_ERROR", error.message || "Failed to load products");
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },
  getters: {
    allProducts: (state) => state.products,
    isLoading: (state) => state.loading,
    hasError: (state) => state.error,
  },
};
