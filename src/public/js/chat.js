const socket = io();

socket.on("message", (message) => {
    console.log(message);
});

const chatForm = document.querySelector("#chat-form");

chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = e.target.elements.chat.value;
    socket.emit("sendMessage", message);
});

const shareLocation = document.querySelector("#send-location");

shareLocation.addEventListener("click", () => {
    if (!navigator.geolocation) {
        return alert("geolocation is not supported by your browser");
    }

    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        socket.emit("sendLocation", { latitude, longitude });
    });
});
