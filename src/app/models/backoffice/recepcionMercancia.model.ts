import { Producto } from './producto.model';
import { Proveedor } from './proveedor.model';

export interface RecepcionMercancia {
  numPedido: string;
  fechaRecepcion: string;
  proveedor: Proveedor;
  productos: Producto[];
  uid?: string;
}
