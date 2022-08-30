//Clases

class todosLosProductos {
    constructor(id, nombre, precio, categoria) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
    }
}

class cliente {
    constructor(nombre, email, telefono, compra) {
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.compra = compra;
    }
}

//Cargar los productos y mostrarlos en la página

const producto0 = new todosLosProductos(0, "Ryzen 9 3900X", 9000, "Microprocesador");
const producto1 = new todosLosProductos(1, "Intel I9-12900", 132550, "Microprocesador");
const producto2 = new todosLosProductos(2, "Intel I7-12700", 89320, "Microprocesador");
const producto3 = new todosLosProductos(3, "Motherboard Gigabyte X570 Am4", 63720, "Motherboard");
const producto4 = new todosLosProductos(4, "Motherboard Asus X590", 66160, "Motherboard");
const producto5 = new todosLosProductos(5, "Motherboard Msi Pro Z-690", 45810, "Motherboard");
const producto6 = new todosLosProductos(8, "Nvidia Geforce Rtx 3090", 350000, "Placa de Video");
const producto7 = new todosLosProductos(9, "Nvidia Geforce Rtx 3050", 87820, "Placa de Video");
const producto8 = new todosLosProductos(10, "Amd Radeon Rx 6400", 47500, "Placa de Video");
const producto9 = new todosLosProductos(11, "Thermaltake V250", 18400, "Gabinete");
const producto10 = new todosLosProductos(12, "Aerocool RGB", 17100, "Gabinete");
const producto11 = new todosLosProductos(13, "Mouse", 10000, "Perifericos");
const producto12 = new todosLosProductos(14, "Teclado", 10400, "Perifericos");
const producto13 = new todosLosProductos(15, "Pokebola", "Gratis", "Promociones");

const listaDeProductos = [producto0, producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9, producto10, producto11, producto12, producto13];

for (let i = 0; i < listaDeProductos.length; i++) {
    $(`#listaProductos`).append(`<div class="listaProductos-producto d-flex" id="producto${i}">
    <img src="img/producto${i}.jpg" alt="${listaDeProductos[i].nombre}">
    <h3 id="producto${i}nombre"></h3>
    <span id="producto${i}precio" class="precioPesos"></span>
    <div class="listaProductos__cart">
        <a href="#" class="btn btn-primary botonCompra">Comprar</a>
    </div>`);
}

    let containerPokebola = document.getElementById("producto13");
    let precioPokebola = containerPokebola.children[2];
    let botonPokebola = containerPokebola.children[3].firstElementChild;
    console.log(botonPokebola);
    botonPokebola.classList.remove("botonCompra");
    botonPokebola.classList.add("botonPokebola");

for (let i = 0; i < listaDeProductos.length; i++) {
    $(`#producto${i}nombre`).html(listaDeProductos[i].nombre);
}

for (let i = 0; i < listaDeProductos.length; i++) {
    $(`#producto${i}precio`).html('$' + listaDeProductos[i].precio);
}

//Variables globales

let compra = [];
let carrito = [];

//Funciones
function agregar_a_carrito(e){
    let padre = e.currentTarget.parentElement.parentElement;
    let nombre_producto = padre.querySelector("h3").textContent;
    let precio = padre.querySelector("span").textContent;
    let id = padre.id.slice(8);
    let img = padre.firstElementChild.src;

    let producto = {

        id: parseInt(id),
        nombre: nombre_producto,
        img: img,
        precio: precio,
        cantidad: 1

    };

    carrito.push(producto);

    let arreglo_JSON = JSON.stringify(carrito);
    localStorage.setItem("carrito" , arreglo_JSON);

    Toastify ({
    text: "Agregado " + nombre_producto + " al carrito!",
    className: "toastStyle",
    close: true,
    avatar: img,
    }).showToast();

    let totalString = $('span#precioTotal')[0].innerHTML;
    let total = parseInt(totalString);
    let ultPrecio = precio.replace('$', '');
    total = total + parseInt(ultPrecio);
    $('span#precioTotal')[0].textContent = total;
    $('span#checkoutTotal')[0].textContent = total;

    let botonCompra = document.getElementById("botonIrAlCheckout");
    botonCompra.classList.remove("cerrado");

    mostrar_carrito(producto);
}

function mostrar_carrito(producto){
    let fila = document.createElement("tr");
    fila.className = 'filaCarrito';
    fila.setAttribute("id", producto.id);
    fila.innerHTML = `<td><img class="nav-item" src="${producto.img}"> ${producto.nombre}</td>
                      <td>${producto.cantidad}</td>
                      <td class="carritoPrecio">${producto.precio}</td>
                      <td class="carritoBotonBorrar"><a class="btn btn-danger borrar_elemento">Borrar</button></a></td>`;

    let filaCheckout = document.createElement("tr");
    filaCheckout.setAttribute("id", producto.id);
    filaCheckout.innerHTML = `<td><img class="nav-item" src="${producto.img}"> ${producto.nombre}</td>
                              <td class="carritoPrecio">${producto.precio}</td>`
    
    let tabla = document.getElementById("tbody");

    tabla.append(fila);

    let botones_borrar = document.querySelectorAll(".borrar_elemento");

    for(let boton of botones_borrar){

        boton.addEventListener("click" , borrar_producto);
    }

    let tablaCheckout = document.getElementById("tbodyCheckout");
    tablaCheckout.append(filaCheckout);
}

function borrar_producto(e){
    let contenedor = e.target.parentNode.parentNode;
    let contenedorId = contenedor.id;
    let contenedorPrecio = e.currentTarget.parentNode.previousElementSibling.innerHTML;
    let contenedorCheckout = document.getElementById("tbodyCheckout");
    for (const iteracion of contenedorCheckout.rows) {
        if(contenedorId === iteracion.id) {
            iteracion.remove();
        }
    }
    contenedor.remove();
    Swal.fire({
        title: 'Éxito!',
        text: 'El producto se ha borrado exitosamente',
        confirmButtonText: 'Ok'
    })
    let totalString = $('span#precioTotal')[0].innerHTML;
    let total = parseInt(totalString);
    let contenedorPrecioNumero = parseInt(contenedorPrecio.substring(1))
    $('span#precioTotal')[0].textContent = total - contenedorPrecioNumero;   
    $('span#checkoutTotal')[0].textContent = total - contenedorPrecioNumero;

    let botonCompra = document.getElementById("botonIrAlCheckout");

    if($('span#precioTotal')[0].textContent === '0') {
        botonCompra.classList.add("cerrado");
    }
}

function finalizarCompra(e) {
    let carritoContainer = document.getElementById("carritoContainer");
    carritoContainer.classList.add("cerrado");
    let contenedorPadre = document.getElementById("contenedorPadre");
    contenedorPadre.classList.remove("d-flex");
    contenedorPadre.classList.add("cerrado");
    let checkoutContainer = document.getElementById("checkoutContainer");
    checkoutContainer.classList.remove("cerrado");
    checkoutContainer.classList.add("d-flex");
    let cont = 0;
    let productosCarrito = e.target.parentNode.children;
    let tabla = productosCarrito.item(1);
    for (const iteracion of tabla.rows) {
        cont++;
        if($(iteracion).hasClass('filaCarrito')) {
            idEnCarrito = parseInt(iteracion.id);
            for (const producto of listaDeProductos) {
                if (idEnCarrito === producto.id) {
                    compra.push(producto)
                    sessionStorage.setItem('productoComprado_' + cont, JSON.stringify({producto}))
                }
            }
        }
    }
}

function cerrarModal() {
    $(".pokemodalBG").remove()
    $(".pokemensaje").remove()
}


function pokebola() {
    
    function numeroRandom(min, max) {
        return Math.random() * (max - min) + min;
    }

    let pokenumero = parseInt(numeroRandom(1,250));

    $.get(`https://pokeapi.co/api/v2/pokemon/${pokenumero}`, (poke) => {
        let pokenombre = poke.name;
        $("div.contenedorPadre").prepend(`
            <div class="pokemodalBG"></div>
            <div class="pokemensaje">
                <h2> Felicidades! Atrapaste un <span>${pokenombre}</span>
                <img src="${poke.sprites.front_default}" alt="pokemon">
            </div>
            `)
        $(".pokemensaje").append(`
            <button type="button" id="pokemodalBtn" class="btn btn-primary" value="Aceptar">Aceptar</button>
        `)
        $("#pokemodalBtn").on("click", cerrarModal);
    })
}

function enviarform(e) {
    console.log(e.target);
    let nombre =  e.target[0].value;
    let email =  e.target[1].value;
    let telefono =  e.target[2].value;
    let cuotas =  e.target[3].value.replaceAll('_', ' Cuotas de: $');
    let creditCardNumber =  e.target[4].value;
    let credictCardHasta =  e.target[8].value;
    let url = "https://jsonplaceholder.typicode.com/posts";
    
    new cliente (nombre, email, telefono, compra);
        
    $.ajax({
        url: url,
        type: 'POST',
        data: {
            nombre: nombre,
            email: email,
            tel: telefono,
            cuotas: cuotas,
            creditCardNumber: creditCardNumber,
            credictCardHasta: credictCardHasta,
            compras: compra,
        },
        success: function (data) {
            Swal.fire({
                title: 'Gracias por su compra!',
                text: 'Por favor revise su email para ver la factura',
                confirmButtonText: 'Ok'
            }).then((result) => {
                location.reload();
            });
        }
    });
};
//Eventos

$(document).on('click', '.botonPokebola', pokebola);

$(document).on('click', '.botonCompra', agregar_a_carrito);

$(".checkout").on("click", finalizarCompra);

$(document).on('submit', '.checkoutForm', enviarform);

//Buscador

$('form.search').submit( (e) => {
    let inputBuscador = e.target[0].value;
    let inputMayus = inputBuscador.toUpperCase();
    $('.box-productos h2').remove();
    $('.listaProductos-producto').remove();
    $('.box-productos').prepend('<h2 class="col-md-12">Resultados para: ' + inputBuscador + '</h2>')
    
    for (let iteracion of listaDeProductos) {
        let productosMayus = iteracion.nombre.toUpperCase();
        if (productosMayus.indexOf(inputMayus) > -1) {
            $(`#listaProductos`).append(`<div class="listaProductos-producto d-flex" id="producto${iteracion.id}">
                                        <img src="img/producto${iteracion.id}.jpg" alt="${iteracion.nombre}">
                                        <h3 id="producto${iteracion.id}nombre">${iteracion.nombre}</h3>
                                        <span id="producto${iteracion.id}precio" class="precioPesos">$ ${iteracion.precio}</span>
                                        <div class="listaProductos__cart">
                                        <a href="#" class="btn btn-primary botonCompra">Comprar</a>
                                        </div>
                                        </div>`);
        }
    }
});

//Muestra/oculta el carrito cuando se clickea el icono
$('.carritoContainer').on('click', 'img', (e) => {
    $('.carritoInner').toggleClass('cerrado')
    e.stopPropagation()
});