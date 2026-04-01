const WebSocket = require("ws");
const net = require("net");

const PORT = process.env.PORT || 27232;

// ⚠️ CHANGE ICI
const MINECRAFT_HOST = "TON_IP_OU_DOMAINE"; 
const MINECRAFT_PORT = 27232;

const wss = new WebSocket.Server({ port: PORT });

console.log("Proxy WebSocket lancé sur le port " + PORT);

wss.on("connection", (ws) => {
    console.log("Client connecté");

    const socket = net.connect(MINECRAFT_PORT, MINECRAFT_HOST, () => {
        console.log("Connecté au serveur Minecraft");
    });

    ws.on("message", (msg) => {
        socket.write(msg);
    });

    socket.on("data", (data) => {
        ws.send(data);
    });

    ws.on("close", () => {
        socket.end();
        console.log("Client déconnecté");
    });

    socket.on("close", () => {
        ws.close();
    });

    socket.on("error", (err) => {
        console.log("Erreur socket:", err.message);
        ws.close();
    });
});
