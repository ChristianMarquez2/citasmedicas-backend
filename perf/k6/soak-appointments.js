import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 3,       // pocos usuarios pero larga duración
    duration: '1m',
};

export default function () {
    const url = 'http://localhost:8080/api/v1/appointments';
    const payload = JSON.stringify({
        codigo: 200,
        descripcion: 'Consulta larga',
        id_paciente: '68ab76f100ec2c1bd761a519',
        id_especialidad: '68ab774e00ec2c1bd761a51c',
        fecha: new Date().toISOString(),
    });

    const params = { headers: { 'Content-Type': 'application/json' } };
    const res = http.post(url, payload, params);

    check(res, {
        'created appointment': (r) => r.status === 201,
    });

    sleep(1);
}
