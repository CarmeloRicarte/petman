export interface Producto {
  nombre: string;
  categoria: string;
  subcategoria: string;
  proveedor: string;
  precio: number;
  cantidad: number;
  unidadMedida: string;
  uid?: string;
}
