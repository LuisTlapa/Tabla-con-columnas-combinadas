import { Programa } from "./Programa"

export class Proceso{
  nombre: string
  programas: Programa[]

  constructor(nombre: string, programas: Programa[]){
    this.nombre = nombre;
    this.programas = programas;
  }
}