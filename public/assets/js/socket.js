socket = io()

let nombre = prompt("Ingrese su nombre:")

let messageText = document.getElementById('messageText')
let messageContainer = document.getElementById('messageContainer')

messageText.focus();

messageText.addEventListener('keydown', (evento) => {
    if (evento.key == "Enter") {
        if (evento.target.value.trim() != '') {
            socket.emit('message', {
                user: nombre,
                message: evento.target.value
            })
            messageText.value = '';
            messageText.focus();
        }
    }
})

socket.on('newMessage',(message)=>{
    messageContainer.innerHTML+=`<br><strong>${message.user}</strong> dice <i>${message.message}</i>`

    messageContainer.scrollTop=messageContainer.scrollHeight
})