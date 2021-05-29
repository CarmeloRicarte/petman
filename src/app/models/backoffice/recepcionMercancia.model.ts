import { Producto } from './producto.model';
import { Proveedor } from './proveedor.model';

export interface RecepcionMercancia {
  numPedido: string;
  fechaRecepcion: Date;
  proveedor: Proveedor;
  productos: Producto[];
  uid?: string;
}
