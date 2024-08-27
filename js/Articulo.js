export class Articulo {
    constructor(nombre, email, telefono) {
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
    }

    getInfoProveedor() {
        return `Proveedor: ${this.nombre}, Teléfono: ${this.telefono}`;
    }
}
