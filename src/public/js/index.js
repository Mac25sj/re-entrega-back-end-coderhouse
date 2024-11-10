document.addEventListener('DOMContentLoaded', () => {
    const txtUserName = document.querySelector("#txtUserName");
    const inputMessage = document.getElementById("txtCampoMensaje");
    const btnMessage = document.getElementById("btnEnviar");
    const socket = io();
    let nameUser;

    Swal.fire({
        title: "¿Cómo te llamas?",
        input: "text",
        inputAttributes: {
            autocapitalize: "on",
        },
        showCancelButton: false,
        confirmButtonText: "Coderchat",
    }).then((result) => {
        if (result.value) {  
            txtUserName.textContent = result.value;  
            nameUser = result.value;
            socket.emit("userConnection", {
                user: result.value,
            });
        } else {
            console.error("No se ingresó un nombre.");
        }
    }).catch((error) => {
        console.error("Error con SweetAlert:", error);
    });

    const chatMessage = document.querySelector(".txtchatMessage");

    const messageInnerHTML = (data) => {
        let message = "";
        for (let i = 0; i < data.length; i++) {
            if (data[i].info === "connection") {
                message += `<p class="connection">${data[i].message}</p>`;
            }
            if (data[i].info === "message") {
                message += `
                <div class="messageUser">
                    <h5>${data[i].name}</h5>
                    <p>${data[i].message}</p>
                </div>
                `;
            }
        }
        return message;
    };

    socket.on("userConnection", (data) => {
        chatMessage.innerHTML = "";
        const connection = messageInnerHTML(data);
        chatMessage.innerHTML = connection;
    });

    btnMessage.addEventListener("click", (e) => {
        e.preventDefault();
        if (inputMessage && inputMessage.value) {
            socket.emit("userMessage", {
                message: inputMessage.value,
            });
            inputMessage.value = ""; 
        } else {
            console.error("El campo de mensaje está vacío o no se encontró.");
        }
    });

    socket.on("userMessage", (data) => {
        chatMessage.innerHTML = "";
        const message = messageInnerHTML(data);
        chatMessage.innerHTML = message;
    });

    inputMessage.addEventListener("keypress", () => {
        socket.emit("typing", { nameUser });
    });

    const typing = document.querySelector(".txttyping");
    socket.on("typing", (data) => {
        typing.textContent = `${data.nameUser} escribiendo...`;
    });
});
