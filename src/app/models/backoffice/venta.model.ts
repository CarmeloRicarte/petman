import { Cliente } from './cliente.model';
import { Producto } from './producto.model';

export interface Venta {
  cliente: Cliente;
  productos: Producto[];
  importeTotal: number;
  formaPago: string;
  fechaVenta: Date;
  uid?: string;
}
