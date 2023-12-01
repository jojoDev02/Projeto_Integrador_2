import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { check } from 'k6';
import ws from 'k6/ws';

export function handleSummary(data) {
    return {
      "summary.html": htmlReport(data),
    };
  }

export default function () {
  const senderId = 1

  const url = `ws://localhost:8080/${senderId}`;
  const params = {};

  const res = ws.connect(url, params, function (socket) {
    
    socket.on('open', () => console.log("Connection opened."));
    socket.on('message', (data) => console.log('Message received: ', data));
    socket.on('close', () => console.log('disconnected'));
    socket.on("error", (err) => console.error(err));
    
    socket.setTimeout(() => {
      socket.send(JSON.stringify({ action: "JOIN", content: { senderId: 1, receiverId: 2 } }));
    }, 100)
    
    socket.setInterval(() => {
      socket.send(JSON.stringify({ action: "SEND", content: { senderId: 1, receiverId: 2, message: "Enviando mensagem..."} }));
    }, 200);

    socket.setTimeout(() => {
      socket.close();
    }, 30000);
  });

  check(res, { 'status is 101': (r) => r && r.status === 101 });
}