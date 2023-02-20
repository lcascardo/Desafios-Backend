const socket = io();

const inputMessage = document.getElementById('chatBox');
const log = document.getElementById('messageLogs');

Swal.fire({
    title: "Identificate : ",
    input: "text",
    text: " Ingrese su nombre en el chat",
    inputValidator: (value) => {
        return !value && 'Necesitas un nombre de usuario'
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value;
    socket.emit('authenticated', user)
})

socket.on('newUserConnected', data => {
    console.log(`nombre de usurio ${data} recibido para ususarios`);
    if (!user) return;
    Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        title: `${data} se ha unido al chat`,
        icon: "success"
    })
})

inputMessage.addEventListener("keyup", (e) => {
    if (e.key === "Enter" && inputMessage.value.trim().length > 0) {
        socket.emit("message", { user, message: inputMessage.value });
        inputMessage.value = "";
    }
});

socket.on("log", (data) => {
    let logs = "";
    data.logs.forEach((log) => {
        logs += `<div><span>${log.user}: ${log.message}</span>`
        // <span>${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}:</span></div>`;
    });
    log.innerHTML = logs;
});



