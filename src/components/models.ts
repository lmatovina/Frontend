// src/components/models.ts

export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Artikal {
  ID_artikla: string; // IDs are stored as strings in your data
  Naziv_artikla: string;
  Cijena_artikla: string; // Prices are coming as strings
  Kolicina_artikla_u_skladistu: string;
}
