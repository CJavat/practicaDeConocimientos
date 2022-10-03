const mostrarResultados = document.getElementById('resultados__resultado');
const resultadoDB = document.getElementById('resultado-db');

const formularioProductos = document.getElementById('formulario-productos');

const btnMostrarProductos = document.getElementById('mostrar-productos');
const btnAgregarProductos = document.getElementById('agregar-productos');

const documentFragment = document.createDocumentFragment();

const crearNodo = (id, nombre, marca, existencias) => {
    const nodoPadre = document.createElement('DIV');
    const idN = document.createElement('P');
    const nombreN = document.createElement('P');
    const marcaN = document.createElement('P');
    const existenciasN = document.createElement('P');

    idN.textContent = id;
    nombreN.textContent = nombre;
    marcaN.textContent = marca;
    existenciasN.textContent = existencias;

    nodoPadre.appendChild(idN);
    nodoPadre.appendChild(nombreN);
    nodoPadre.appendChild(marcaN);
    nodoPadre.appendChild(existenciasN);

    return nodoPadre;
}

btnMostrarProductos.addEventListener('click', () => {
    formularioProductos.classList.remove('mostrar-formulario');
    formularioProductos.classList.add('esconder-formulario');

    resultadoDB.classList.add('mostrar-formulario');
    resultadoDB.classList.remove('esconder-formulario');

    const obtenerDatos = async () => {
        resultadoDB.innerHTML = '';

        const datos = await fetch('http://localhost:5050/productos/todos-los-productos');
        const resultado = await datos.json();

        if(resultado === 'NO HAY DATOS PARA MOSTRAR.') {
            const nodoSinDatos = document.createElement('P');
            nodoSinDatos.textContent = 'AÚN NO HAY DATOS EN LA BASE DE DATOS PARA MOSTRAR.';
            nodoSinDatos.style = `text-align: center; padding: 1rem`;
            documentFragment.appendChild(nodoSinDatos);
            return mostrarResultados.appendChild(documentFragment);
        }

        for(let dato of resultado) {
            const nuevoNodo = crearNodo(dato.id_producto, dato.nombre_producto, dato.marca_producto, dato.numero_existencias);
            nuevoNodo.classList.add('resultado-db');
            documentFragment.appendChild(nuevoNodo);
        }
        resultadoDB.appendChild(documentFragment);
    }
    obtenerDatos();
});

btnAgregarProductos.addEventListener('click', () => {
    //mostrarResultados.innerHTML = '';
    formularioProductos.classList.remove('esconder-formulario');
    formularioProductos.classList.add('mostrar-formulario');
    resultadoDB.classList.add('esconder-formulario');
    resultadoDB.classList.remove('mostrar-formulario');
    
});