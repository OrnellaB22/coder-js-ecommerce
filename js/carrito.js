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

//Funciones
function agregar_a_carrito(e){
    let hijo = e.target;
    let padre = hijo.parentNode;
    let abuelo = padre.parentNode;
    let nombre_producto = padre.querySelector("h5").textContent;
    let precio = padre.querySelector("span").textContent;
    let img = abuelo.querySelector("img").src;

    let producto = {

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

    let totalString = $('span#precioTotal')[0].innerHTML
    let total = parseInt(totalString)
    console.log(total)
    let ultPrecio = precio.replace('$', '')
    total = total + parseInt(ultPrecio)
    $('span#precioTotal')[0].textContent = total

    mostrar_carrito( producto);
}

function mostrar_carrito( producto){
    let fila = document.createElement("tr");
    fila.innerHTML = `<td><img src="${producto.img}"></td>
                      <td>${producto.nombre}</td>
                      <td>${producto.cantidad}</td>
                      <td>${producto.precio}</td>
                      <td><button class="btn-danger borrar_elemento">Borrar</button></td>`;   
    let tabla = document.getElementById("tbody");

    tabla.append(fila);

    let botones_borrar = document.querySelectorAll(".borrar_elemento");

    for( let boton of botones_borrar){

        boton.addEventListener("click" , borrar_producto);
    }
}

function borrar_producto(e){
    let abuelo = e.target.parentNode.parentNode;
    console.log(abuelo);
    abuelo.remove();
    Swal.fire({
        title: 'Éxito!',
        text: 'El producto se ha borrado exitosamente',
        confirmButtonText: 'Ok'
    })    
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

//Fetch productos
const getProductos = async() => {
    try {
        const response = await fetch("productos.json");
        const data = await response.json();
    }
    catch(error) {
        console.log(error);
    }
}

getProductos();

//Eventos
$("#botonPokebola").on("click", pokebola);


let btn_compra = document.querySelectorAll(".botonCompra");

for( let boton of btn_compra){

    boton.addEventListener("click" , agregar_a_carrito);

}

let carrito = [];

//Buscador

$('form.search').submit( (e) => {
    let inputBuscador = e.target[0].value;
    $('.box-productos h2').remove();
    $('.col').remove();
    $('.box-productos').prepend('<h2 class="col-md-12">Resultados para: ' + inputBuscador + '</h2>')
    
    for (let iteracion of productos) {
        let productoActual = iteracion.nombre;
        if (productoActual.indexOf(inputBuscador) > -1) {
            crearEstructura(iteracion, $('.col'))
        }
    }
});

//Muestra/oculta el carrito cuando se clickea el icono
$('.carritoContainer').on('click', 'img', (e) => {
    $('.carritoInner').toggleClass('cerrado')
    e.stopPropagation()
});
