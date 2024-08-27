import { Proveedor } from './Proveedor.js';
import { Articulo } from './Articulo.js';
import { TipoProveedor } from './TipoProveedor.js';

const proveedores = [];
const filtroProveedor = document.getElementById('filtroProveedor');
const filtroTipo = document.getElementById('filtroTipo');
const tablaProveedores = document.getElementById('tablaProveedores').getElementsByTagName('tbody')[0];
const totalImpuestosElement = document.getElementById('totalImpuestos');

document.getElementById('proveedorForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nombreProveedor = document.getElementById('nombreProveedor').value;
    const nombreArticulo = document.getElementById('nombreArticulo').value;
    const precioArticulo = document.getElementById('precioArticulo').value;
    const emailProveedor = document.getElementById('emailProveedor').value;
    const telefonoProveedor = document.getElementById('telefonoProveedor').value;
    const tipoProveedor = document.getElementById('tipoProveedor').value;

    const nuevoProveedor = new TipoProveedor(nombreProveedor, nombreArticulo, precioArticulo, tipoProveedor);
    const nuevoArticulo = new Articulo(nombreProveedor, emailProveedor, telefonoProveedor);

    proveedores.push({ proveedor: nuevoProveedor, articulo: nuevoArticulo });
    
    actualizarOpcionesFiltro();
    actualizarTabla();
});

filtroProveedor.addEventListener('change', actualizarTabla);
filtroTipo.addEventListener('change', actualizarTabla);

function actualizarOpcionesFiltro() {
    const nombresProveedores = new Set(proveedores.map(({ proveedor }) => proveedor.nombre));
    filtroProveedor.innerHTML = '<option value="todos">Todos</option>';
    nombresProveedores.forEach(nombre => {
        const opcion = document.createElement('option');
        opcion.value = nombre;
        opcion.textContent = nombre;
        filtroProveedor.appendChild(opcion);
    });
}

function actualizarTabla() {
    const filtroSeleccionado = filtroProveedor.value;
    const tipoSeleccionado = filtroTipo.value;
    tablaProveedores.innerHTML = '';
    
    let totalImpuestos = 0;

    proveedores.forEach(({ proveedor, articulo }) => {
        if (
            (filtroSeleccionado === 'todos' || proveedor.nombre === filtroSeleccionado) &&
            (tipoSeleccionado === 'todos' || proveedor.tipo === tipoSeleccionado)
        ) {
            const fila = tablaProveedores.insertRow();
            fila.insertCell(0).textContent = proveedor.nombre;
            fila.insertCell(1).textContent = proveedor.articulo;
            fila.insertCell(2).textContent = proveedor.precio;
            fila.insertCell(3).textContent = articulo.email;
            fila.insertCell(4).textContent = articulo.telefono;
            fila.insertCell(5).textContent = proveedor.tipo.charAt(0).toUpperCase() + proveedor.tipo.slice(1);
            
            const impuesto = calcularImpuesto(proveedor.precio, proveedor.tipo);
            totalImpuestos += impuesto;
        }
    });

    totalImpuestosElement.textContent = totalImpuestos.toFixed(2);
}

function calcularImpuesto(precio, tipo) {
    const tasa = tipo === 'nacional' ? 0.19 : 0.06;
    return precio * tasa;
}
