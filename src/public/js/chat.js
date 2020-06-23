const socket = io();

socket.on("newChat", (message) => {
    console.log(message);
});

const chatForm = document.querySelector("#chat-form");

chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = e.target.elements.chat.value;
    socket.emit("sendChat", message);
});
