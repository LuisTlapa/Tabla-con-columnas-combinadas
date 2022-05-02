import { Component } from '@angular/core';
import { FuenteFinanciamiento } from './clases/FuenteFinanciamiento';
import { Proceso } from './clases/Proceso';
import { Programa } from './clases/Programa';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  dataSource = ELEMENT_DATA;

  displayedColumns = ['id', 'name', 'descriptions'];

  spans = [];

  constructor() {
    this.cacheSpan('Priority', (d) => d.id);
    this.cacheSpan('Name', (d) => d.name);
    //console.log(this.spans);
  }

  /**
   * Evaluated and store an evaluation of the rowspan for each row.
   * The key determines the column it affects, and the accessor determines the
   * value that should be checked for spanning.
   */
  cacheSpan(key, accessor) {
    for (let i = 0; i < DATA.length; ) {
      let currentValue = accessor(DATA[i]);
      let count = 1;

      // Iterate through the remaining rows to see how many match
      // the current value as retrieved through the accessor.
      for (let j = i + 1; j < DATA.length; j++) {
        if (currentValue != accessor(DATA[j])) {
          break;
        }

        count++;
      }

      if (!this.spans[i]) {
        this.spans[i] = {};
      }

      // Store the number of similar values that were found (the span)
      // and skip i to the next unique row.
      this.spans[i][key] = count;
      i += count;
    }
  }

  getRowSpan(col, index) {
    return this.spans[index] && this.spans[index][col];
  }
}

export class PeriodicElement {
  public id: string;
  public name: string;
  public descriptions: string;
}

let programas = [
  {
    nombre: 'programa 1',
  },
  {
    nombre: 'programa 2',
  },
];

let programas2 = [
  {
    nombre: 'programa 10',
  },
  {
    nombre: 'programa 10',
  },
  {
    nombre: 'programa 10',
  },
  {
    nombre: 'programa 10',
  },
];

let procesos = [
  {
    nombre: 'proceso 1',
    programas: programas,
  },
  {
    nombre: 'proceso 2',
    programas: programas2,
  }
];

let proceso2 = [
  {
    nombre: 'proceso 3',
    programas: programas
  },
  {
    nombre: 'proceso 4',
    programas: programas2
  }
]


let FuenteFinanciamiento = [
  {
    nombre: 'fuente 1',
    procesos: procesos,
  },
  {
    nombre: 'fuente 2',
    procesos: proceso2,
  },
];

function getProcesos(procesos: Proceso[]): string[] {
  let result = [];
  procesos.forEach((proceso) => {
    result.push(proceso.nombre);
  });
  return result;
}

function getProgramas(programas: Programa[]): string[] {
  let result = [];
  programas.forEach((programa) => {
    result.push(programa.nombre);
  });
  return result;
}

function getAlgo(fuentes: FuenteFinanciamiento[]) {
  let id: string;
  let name: string;
  let descriptions: string;
  let algo: Array<PeriodicElement> = new Array<PeriodicElement>()
  
  fuentes.forEach((fuente) => {
    
    fuente.procesos.forEach((proceso) => {
      name = proceso.nombre;
      proceso.programas.forEach((programa) => {
        descriptions = programa.nombre
        let variable: PeriodicElement = new PeriodicElement();
        variable.id = fuente.nombre
        variable.name = proceso.nombre
        variable.descriptions = programa.nombre
        algo.push(variable)
      });
        
    });
    
  });
  return algo;
}

const originalData = [
  {
    id: FuenteFinanciamiento[0].nombre,
    name: getProcesos(FuenteFinanciamiento[0].procesos),
    descriptions: getProgramas(FuenteFinanciamiento[0].procesos[0].programas),
  },
  {
    id: FuenteFinanciamiento[0].nombre,
    name: getProcesos(FuenteFinanciamiento[1].procesos),
    descriptions: getProgramas(FuenteFinanciamiento[0].procesos[1].programas),
  },
  {
    id: FuenteFinanciamiento[1].nombre,
    name: getProcesos(FuenteFinanciamiento[1].procesos),
    descriptions: getProgramas(FuenteFinanciamiento[1].procesos[0].programas),
  },
  {
    id: FuenteFinanciamiento[1].nombre,
    name: getProcesos(FuenteFinanciamiento[1].procesos),
    descriptions: getProgramas(FuenteFinanciamiento[1].procesos[1].programas),
  },
];

var DATA = originalData.reduce((current, next) => {
  next.name.forEach((t) => {
    next.descriptions.forEach((d) => {
      current.push({
        id: next.id,
        name: t,
        descriptions: d,
      });
    });
  });
  return current;
}, []);

let algo = getAlgo(FuenteFinanciamiento);
console.log(algo);
DATA = algo;
console.log(DATA);
const ELEMENT_DATA: PeriodicElement[] = DATA;
