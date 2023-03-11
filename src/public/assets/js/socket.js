socket = io()

// let lista = document.getElementById("lista")

// socket.on('getProducts', ({ products }) => {
//     lista.innerHTML = ""

//     products.forEach(element => {
//         const li = document.createElement("li")
//         li.textContent = `${element.title}`
//         lista.appendChild(li)
//     });

// })

let nombre = prompt("Ingrese su nombre:")

let messageText = document.getElementById('messageText')
let messageContainer = document.getElementById('messageContainer')

messageText.addEventListener('keydown', (evento) => {
    console.log(evento.key)
    if (evento.key == "Enter") {
        if (evento.target.value.trim() != '') {
            socket.emit('message', {
                emisor: nombre,
                mensaje: evento.target.value
            })
            console.log(evento.target.value)
            messageText.value = '';
            messageText.focus();
        }
    }
})

socket.on('newMessage',(message)=>{
    messageContainer.innerHTML+=`<br><strong>${message.emisor}</strong> dice <i>${message.mensaje}</i>`
})