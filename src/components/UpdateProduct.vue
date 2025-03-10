<template>
  <q-page>
    <q-form @submit="submitForm">
      <q-input v-model="formData.ID_artikla" label="Product ID" required disabled />
      <q-input v-model="formData.Naziv_artikla" label="Product Name" required />
      <q-input v-model="formData.Cijena_artikla" label="Price" type="number" required />
      <q-input
        v-model="formData.Kolicina_artikla_u_skladistu"
        label="Quantity"
        type="number"
        required
      />
      <q-btn label="Update Product" type="submit" color="primary" />
    </q-form>

    <q-dialog v-model="dialogVisible">
      <q-card>
        <q-card-section>
          <div class="text-h6">Success!</div>
          <div>Product updated successfully.</div>
        </q-card-section>
        <q-card-actions>
          <q-btn label="Close" color="primary" @click="closeDialog" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const dialogVisible = ref(false);
const formData = ref({
  ID_artikla: '',
  Naziv_artikla: '',
  Cijena_artikla: '',
  Kolicina_artikla_u_skladistu: '',
});

// Fetch product data when the component is mounted
onMounted(async () => {
  const productId = route.params.id;
  try {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const response = await axios.get(`http://localhost:3000/artikli/${productId}`);
    formData.value = response.data;  // Pre-populate form with product data
  } catch (error) {
    console.error('Error fetching product:', error);
  }
});

// Handle form submission to update product data
const submitForm = async () => {
  try {
    // Make sure the URL matches the backend route
    const response = await axios.put(
      `http://localhost:3000/update/${formData.value.ID_artikla}`, // Use the correct URL path
      formData.value
    );
    console.log('Product updated:', response.data);
    dialogVisible.value = true; // Show success dialog
  } catch (error) {
    console.error('Error updating product:', error);
  }
};

// Close the success dialog
const closeDialog = () => {
  dialogVisible.value = false;
  void router.push('/artikli'); // Redirect to the product list page after successful update
};
</script>

<style scoped>
</style>
