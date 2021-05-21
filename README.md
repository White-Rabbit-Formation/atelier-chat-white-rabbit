# White Rabbit Chat présentation

[![Vidéo Youtube](https://img.youtube.com/vi/T0Gzf61K8mk/0.jpg)](https://www.youtube.com/watch?v=T0Gzf61K8mk)

# Création d'un projet nodejs

- Installation de nodejs en [cliquant ici](https://nodejs.org/fr/)
- Ouvrir un terminal dans un dossier pouvant acceuillir votre projet
- Créer le projet :

```bash
npm init --yes
```

# Arborescence

- public
    - index.html
    - main.js
    - styles.css
- index.js
- package.json

# Dépendances

- express
- socket.io
- path
- http

```bash
npm i -S express socket.io path http
```

# Le code

```html
<!-- public/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
<h1>WR présentation Chat</h1>
<div id="chat">
    <ul id="messages"></ul>
    <div id="messageArea">
        <input id="message" type="text">
        <button onclick="sendMessage()">Envoyer</button>
    </div>
</div>
<script src="socket.io/socket.io.js"></script>
<script src="main.js"></script>
</body>
</html>
```

```jsx
// public/main.js
const socket = io();
const user = prompt("Insérer votre nom d'utilisateur", "Invité");
function sendMessage(){
    const message = document.getElementById('message').value;
    socket.emit('message', {user, message});
}
socket.on('message', (message) => {
    const li = document.createElement('li');
    li.innerText = `${message.user} : ${message.message}`;
    document.getElementById('messages').appendChild(li);
});
```

```css
/* public/styles.css */
* {
    box-sizing: border-box;
}
html, body {
    height: 100%;
    margin: 0;
    padding: 0;
}
#messageArea {
    border: 10px solid #000;
    bottom: 0;
    height: 60px;
    left: 0;
    outline: none;
    position: absolute;
    right: 0;
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
}
#message{
    height: 100%;
    width: 95%;
}
li{color: #01B1DB}
li:nth-child(2n){
    color:#CF0060;
}
button{
    height: 100%;
    background-color:#44c767;
    border:1px solid #18ab29;
    display:inline-block;
    cursor:pointer;
    color:#ffffff;
    font-size:17px;
    text-decoration:none;
    text-shadow:0px 1px 0px #2f6627;
}
button:hover {
    background-color:#5cbf2a;
}
button:active {
    position:relative;
    top:1px;
}
ul {
    list-style: none;
    word-wrap: break-word;
}
```

```jsx
// index.js
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const path = require('path')

app.use(express.static(path.join(`${__dirname}/public`)))

io.on('connection', socket => {
    console.log('+1 connection')
    socket.on('disconnect', () => console.log('-1 connection'));
    socket.on('message', message => {
        console.log(message);
        io.emit('message', message);
    });
})

server.listen(3000, () => {
    console.log('http://localhost:3000')
})
```
