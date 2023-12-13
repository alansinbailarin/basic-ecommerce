<template>
  <div class="my-4 mx-6">
    <div v-if="loading" class="flex items-center justify-center h-screen">
      <l-tail-chase size="40" speed="1.75" color="#4A93FF"></l-tail-chase>
    </div>

    <div v-else>
      <h1 class="text-gray-800 font-semibold text-lg mb-2">Products</h1>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-2">
        <Card v-for="product in products" :key="product.id">
          <picture>
            <img
              :src="`${product.image}`"
              :alt="`${product.name}`"
              class="w-full h-32 object-contain"
            />
          </picture>
          <h2 class="text-gray-700 font-semibold text-sm mt-4">
            {{ product.title }}
          </h2>
          <p class="text-gray-500 text-sm mt-2 flex-wrap">
            {{ truncateText.truncateText(product.description, 120) }}
          </p>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ProductService from "@/services/ProductService";
import { useTruncateText } from "../composables/useTruncateText";
import Card from "@/ui/Card.vue";
import { tailChase } from "ldrs";

tailChase.register();

const products = ref([]);
const categories = ref([]);
const loading = ref(true);
const truncateText = useTruncateText();

onMounted(async () => {
  try {
    loading.value = true;

    const [productsResponse, categoriesResponse] = await Promise.all([
      ProductService.getProducts(),
      ProductService.getCategories(),
    ]);

    products.value = productsResponse.data;
    categories.value = categoriesResponse.data;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});

console.log(products);
console.log(categories);
</script>
