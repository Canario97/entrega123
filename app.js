const shopContent = document.getElementById("shopContent")
const verCarrito = document.getElementById("verCarrito")
const modalContainer = document.getElementById("modal-container")

const productos = [
    {id: 1, nombre: "harina", precio: 50},
    {id: 2, nombre: "leche", precio: 60},
    {id: 3, nombre: "gaseosa", precio: 100},
    {id: 4, nombre: "cerveza", precio: 110}
]

let carrito = JSON.parse(localStorage.getItem("carrito")) || []

productos.forEach((producto) =>{
    let content = document.createElement("div")
    content.className = "card"
    content.innerHTML = `
        <h3>${producto.nombre}</h3>
        <p class = "price">${producto.precio} $ </p>
    `;

    shopContent.append(content)

    let comprar = document.createElement("button")
    comprar.innerText = "comprar"
    comprar.className = "comprar"

    content.append(comprar)

    comprar.addEventListener("click", () => {
        carrito.push({
            id : producto.id,
            nombre : producto.nombre,
            precio : producto.precio,
        });
        Toastify({
            text: "Producto agregado al carrito",
            offset: {
              x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
              y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
            },
          }).showToast();
    saveLocal()
    })
})


const pintarCarrito = () =>{
    const modalHeader = document.createElement("div")
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
        <h1 class = "modal-header-title">Carrito.</h1>
    `
    modalContainer.append(modalHeader)

    const modalbutton = document.createElement("h1")
    modalbutton.innerText = "x"
    modalbutton.className = "modal-header-button"

    modalbutton.addEventListener("click", () =>{
        modalContainer.style.display = "none"
    })

    modalHeader.append(modalbutton)
    

    carrito.forEach((producto) => {
        let carritoContent = document.createElement("div")
        carritoContent.className = "modal-content"
        carritoContent.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>${producto.precio} $</p>
    
        `
        modalContainer.append(carritoContent)

        let eliminar = document.createElement("span")

        eliminar.innerText = "❌"
        eliminar.className = "delete-product"
        carritoContent.append(eliminar)

        eliminar.addEventListener("click", eliminarProducto)
    })
    
    const total = carrito.reduce((acc, el) => acc + el.precio, 0)
    
    const totalCompra = document.createElement("div")
    totalCompra.className = "total-content"
    totalCompra.innerHTML = `total a pagar: $ ${total} `
    modalContainer.append(totalCompra)
}

verCarrito.addEventListener("click", pintarCarrito)

const eliminarProducto = () => {
    const foundId = carrito.find((element) => element.id)

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId
    })

    pintarCarrito()
}


const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}
