import http from 'k6/http';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export function handleSummary(data) {
    return {
      "summary.html": htmlReport(data),
    };
  }

export const options = {
    vus: 10,
    duration: '60s',
    thresholds: {
        http_req_failed: ['rate<0.01'], 
        http_req_duration: ['p(95)<200'], 
    },
};


export default function () {
    let data = {
        nome: "Maria",
        email: "Maria@gmail.com",
        senha: "123",
        apelido: "Maria Apelio",
        tipo: "viajante"
    };

    http.post('http://localhost:5000/api/v1/register', JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
    });


}
