import { Proveedor } from './Proveedor.js';

export class TipoProveedor extends Proveedor {
    constructor(nombre, articulo, precio, tipo) {
        super(nombre, articulo, precio, tipo);
    }

    getInfoProveedor() {
        return `Proveedor: ${this.nombre}, Tipo: ${this.tipo.charAt(0).toUpperCase() + this.tipo.slice(1)}`;
    }
}
