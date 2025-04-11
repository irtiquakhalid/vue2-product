<template>
  <v-card class="ma-3 pa-2" max-width="350">
    <v-img :src="product.thumbnail" height="200px"></v-img>
    <v-card-title>{{ product.title }}</v-card-title>
    <v-card-subtitle class="grey--text"
      >{{ product.brand }} | {{ product.category }}</v-card-subtitle
    >
    <v-card-text>
      <div class="mb-2">{{ product.description }}</div>
      <div><strong>Price:</strong> ${{ product.price }}</div>
      <div><strong>Discount:</strong> {{ product.discountPercentage }}%</div>
      <div><strong>Rating:</strong> {{ product.rating }}/5</div>
      <v-carousel hide-delimiter-background height="150">
        <v-carousel-item
          v-for="(img, i) in product.images"
          :key="i"
          :src="img"
        />
      </v-carousel>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    product: Object,
  },
};
</script>

<style scoped>
.v-card {
  transition: all 0.3s ease;
}
.v-card:hover {
  transform: scale(1.02);
}
</style>
