import { Proceso } from './Proceso';

export class FuenteFinanciamiento {
  nombre: string;
  procesos: Proceso[];

  constructor(nombre: string, procesos: Proceso[]) {
    this.nombre = nombre;
    this.procesos = procesos;
  }
}
