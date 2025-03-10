<template>
  <q-page>
    <q-table
      flat
      bordered
      :rows="artikli"
      :columns="columns"
      row-key="ID_artikla"
      @row-click="selectArtikal"
    />

    <q-form @submit="submitForm">
      <q-input v-model="formData.ID_artikla" label="Product ID" disable />
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
import { useRoute } from 'vue-router';
import axios from 'axios';
import type { Artikal } from './models';

const artikli = ref<Artikal[]>([]);
const formData = ref({
  ID_artikla: '',
  Naziv_artikla: '',
  Cijena_artikla: '',
  Kolicina_artikla_u_skladistu: '',
});

const dialogVisible = ref(false);
const apiUrl = 'http://localhost:3000/users'; // Change this to match your backend route

const columns = [
  { name: 'ID_artikla', label: 'ID', field: 'ID_artikla', align: 'left' as const },
  { name: 'Naziv_artikla', label: 'Name', field: 'Naziv_artikla', align: 'left' as const },
  { name: 'Cijena_artikla', label: 'Price', field: 'Cijena_artikla', align: 'right' as const },
  { name: 'Kolicina_artikla_u_skladistu', label: 'Stock', field: 'Kolicina_artikla_u_skladistu', align: 'right' as const }
];

// Fetch Artikli from the backend
const fetchArtikli = async () => {
  try {
    const response = await axios.get<Artikal[]>(apiUrl);
    artikli.value = response.data;
  } catch (error) {
    console.error('Error fetching artikli:', error);
  }
};

// Handle row-click event
const selectArtikal = (evt: Event, row: Artikal, index: number) => {
  formData.value = { ...row }; // Fill the form with the selected row's data
};

// Submit the form data
const submitForm = async () => {
  try {
    // Make sure the URL matches the backend route
    const response = await axios.put(
      `http://localhost:3000/update/${formData.value.ID_artikla}`, // Use the correct URL path
      formData.value
    );
    console.log('Product updated:', response.data);
    window.location.reload(); // Refresh the page
    dialogVisible.value = true; // Show success dialog
  } catch (error) {
    console.error('Error updating product:', error);
  }
};

// Close success dialog
const closeDialog = () => {
  dialogVisible.value = false;
};

// Fetch Artikli when the component is mounted
onMounted(fetchArtikli);
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f4f4f4;
}
</style>
