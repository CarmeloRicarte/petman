import { Cliente } from './cliente.model';
import { Producto } from './producto.model';

export interface Venta {
  cliente: Cliente;
  productos: Producto[];
  importeTotal: number;
  fechaVenta?: Date;
  uid?: string;
}
