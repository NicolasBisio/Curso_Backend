socket=io()

let lista = document.getElementById("lista")

socket.on('getProducts',({products})=>{
    lista.innerHTML = ""

    products.forEach(element => {
        const li = document.createElement("li")
        li.textContent = `${element.title}`
        lista.appendChild(li)
    });

})