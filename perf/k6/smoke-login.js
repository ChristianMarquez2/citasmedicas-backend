import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 5,       // 5 usuarios virtuales
    duration: '10s', // durante 10 segundos
};

export default function () {
    const url = 'http://localhost:8080/api/v1/auth/login';
    const payload = JSON.stringify({
        email: 'juan@example.com',
        password: '123456',
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(url, payload, params);

    check(res, {
        'status 200': (r) => r.status === 200,
        'token exists': (r) => JSON.parse(r.body).token !== undefined,
    });

    sleep(1); // cada usuario espera 1 segundo antes de repetir
}
