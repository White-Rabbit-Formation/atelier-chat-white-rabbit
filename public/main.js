const socket = io();
let user = prompt("Insérer votre nom d'utilisateur", "Invité");
function sendMessage(){
    const message = document.getElementById('message').value;
    socket.emit('message', {user, message});
}
socket.on('message', (message) => {
    const li = document.createElement('li');
    li.innerText = `${message.user} : ${message.message}`;
    document.getElementById('messages').appendChild(li);
});
