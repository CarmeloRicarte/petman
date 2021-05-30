import { Cliente } from './cliente.model';
import { Producto } from './producto.model';

export interface EnvioMercancia {
  numEnvio: string;
  fechaEnvio: string;
  cliente: Cliente;
  productos: Producto[];
  uid?: string;
}
