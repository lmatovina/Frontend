<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import type { Artikal } from './models';
const artikli = ref<Artikal[]>([]);
const apiUrl = 'http://localhost:3000/users'; // Change this to match your backend route

const fetchArtikli = async () => {
  try {
    const response = await axios.get<Artikal[]>(apiUrl);
    artikli.value = response.data;
  } catch (error) {
    console.error('Error fetching artikli:', error);
  }
};

onMounted(fetchArtikli);
</script>

<template>
  <div>
    <h1>Popis Artikala</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Naziv</th>
          <th>Cijena (HRK)</th>
          <th>Količina</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="artikal in artikli" :key="artikal.ID_artikla">
          <td>{{ artikal.ID_artikla }}</td>
          <td>{{ artikal.Naziv_artikla }}</td>
          <td>{{ artikal.Cijena_artikla }}</td>
          <td>{{ artikal.Kolicina_artikla_u_skladistu }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

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
