<!-- eslint-disable vue/block-lang -->
<template>
  <q-page>
    <q-form @submit="submitForm">
      <q-input v-model="formData.ID_artikla" label="Product ID" required />
      <q-input v-model="formData.Naziv_artikla" label="Product Name" required />
      <q-input v-model="formData.Cijena_artikla" label="Price" type="number" required />
      <q-input
        v-model="formData.Kolicina_artikla_u_skladistu"
        label="Quantity"
        type="number"
        required
      />

      <q-btn label="Submit" type="submit" color="primary" />
    </q-form>

    <!-- Success Dialog -->
    <q-dialog v-model="dialogVisible">
      <q-card>
        <q-card-section>
          <div class="text-h6">Success!</div>
          <div>Product has been successfully added to the database.</div>
        </q-card-section>

        <q-card-actions>
          <q-btn label="Close" color="primary" @click="closeDialog" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Error Dialog -->
    <q-dialog v-model="errorDialogVisible">
      <q-card>
        <q-card-section>
          <div class="text-h6">Error!</div>
          <div>{{ errorMessage }}</div>
        </q-card-section>

        <q-card-actions>
          <q-btn label="Close" color="primary" @click="closeErrorDialog" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { QInput, QBtn, QForm, QDialog, QCard, QCardSection, QCardActions } from 'quasar';

// Data model for the form
const formData = ref({
  ID_artikla: '',
  Naziv_artikla: '',
  Cijena_artikla: '',
  Kolicina_artikla_u_skladistu: '',
});

// Dialog for success
const dialogVisible = ref(false);

// Dialog for error
const errorDialogVisible = ref(false);
const errorMessage = ref('');

// Handle form submission
const submitForm = async () => {
  try {
    const response = await axios.post('http://localhost:3000/insert', formData.value);
    if (response.data.message === 'Data inserted successfully') {
      dialogVisible.value = true; // Show success dialog
      resetForm(); // Reset form after successful submission
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    errorMessage.value = error.response?.data || 'Error submitting the form.';
    errorDialogVisible.value = true; // Show error dialog
  }
};

// Reset form after successful submission
const resetForm = () => {
  formData.value = {
    ID_artikla: '',
    Naziv_artikla: '',
    Cijena_artikla: '',
    Kolicina_artikla_u_skladistu: '',
  };
};

// Close the success dialog
const closeDialog = () => {
  dialogVisible.value = false;
};

// Close the error dialog
const closeErrorDialog = () => {
  errorDialogVisible.value = false;
};
</script>

<style scoped>
/* Style the form or dialog if needed */
</style>
