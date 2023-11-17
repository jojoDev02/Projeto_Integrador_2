import http from 'k6/http';

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
        name: 'maria',
        email: 'maria@gmail.com',
        document: '79267537008'
    };

    http.post('http://localhost:5000/api/v1/register', JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
    });
}