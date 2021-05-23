export interface Producto {
  nombre: string;
  categoria: string;
  subcategoria: string;
  proveedor: string;
  precio: number;
  cantidad: number;
  peso: number;
  unidadMedida: string;
  uid?: string;
}
