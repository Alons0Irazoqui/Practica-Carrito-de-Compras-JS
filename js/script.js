//Cargando el evento principal
document.addEventListener("DOMContentLoaded", () => {

//Creando el array del carrito
let carrito = [];

//Agregando todos los elemtos html a necesitar
const elementoCarrito = document.querySelector(".cart-dropdown table");
const lista_productos = document.querySelector(".products");
const tbody = elementoCarrito.children[2];
const btnVaciarCarrito = document.querySelector("#vaciar");
const contador = document.querySelector("#cart-count");
console.log(contador);

//===== Mostrando los eventos 

    //Agregando los cursos al carrito
    lista_productos.addEventListener("click", mostrarInformacion);

    //Eliminando los productos del carrito
    tbody.addEventListener("click", eliminarProducto);

    //Vaciar carrito
    btnVaciarCarrito.addEventListener("click", (e) => {
        e.preventDefault();

        limpiarHTML();
        carrito = [];
        contarElementosCarrito(carrito);
    })


function contarElementosCarrito(carritoActual){

    const numItems = carritoActual.length;
    contador.textContent = numItems;

}

function eliminarProducto(e){
    e.preventDefault();

    if(e.target.classList.contains("error-button")){
        console.log("eliminando");
        //Obtenemos el id del curso a eliminar
        const dataId = e.target.getAttribute("data-id");
       
        //Eliminamos el producto del carrito
        carrito = carrito.filter(producto => producto.id !== dataId); //Retornamos un nuevo arreglo con los elementos que cumplen la condicion

        //Mostramos el carrito actualizado
        contarElementosCarrito(carrito);
        mostrarCarritoHTML();
    }
}


function mostrarInformacion(e){
    e.preventDefault();

    if(e.target.classList.contains("add-to-cart")){
        const productoActual = e.target.parentElement;
        obtenerDatos(productoActual);
    }
}

function obtenerDatos(producto){

    const infoProducto = {
        imagen: producto.querySelector("img").src,
        nombre: producto.querySelector("h2").textContent,
        precio: producto.querySelector("p span").textContent,
        id: producto.querySelector("button").getAttribute("data-id"),
        cantidad: 1
    }

    //Revisando si un producto existe dentro del carrito
    const existe = carrito.some( item => item.id === infoProducto.id); // some() retorna true si al menos un elemento cumple con la condicion
     if(existe){
        const articulosCarrito = carrito.map( articulo => {
            if(articulo.id == infoProducto.id){
                articulo.cantidad++;
                return articulo;
            }else{
                return articulo;
            }
        })

        carrito = [...articulosCarrito];
     }else{
        //Agregando el objeto en el carrito
        carrito = [...carrito, infoProducto];
     }


    console.log("todo bien")
    contarElementosCarrito(carrito);
    mostrarCarritoHTML();
}


//Mostrando el carrito en el html
function mostrarCarritoHTML(){
    //Limpiar html
    limpiarHTML();
    
    carrito.forEach(producto => {
        // //Destructuring para sacar las propiedades  del objeto
            const {imagen, nombre, precio,id, cantidad} = producto;

            //Generando el html
            const row = document.createElement("tr");
            row.innerHTML = `
                <td> <img src = "${imagen}"> </td>
                <td> ${nombre} </td>
                <td> ${precio} </td>
                <td> ${cantidad} </td>
                <td><a href="#" class = "error-button" data-id = "${id}"> X <a></td>
            `

            // //Agregando el producto HTML al carrito
            tbody.appendChild(row);
    });
}

function limpiarHTML(){
    while(tbody.firstChild){
        tbody.removeChild(tbody.firstChild)
    }
}













})


