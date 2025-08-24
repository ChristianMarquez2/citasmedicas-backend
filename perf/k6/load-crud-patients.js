import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 5,
    duration: '15s',
};

export default function () {
    const baseUrl = 'http://localhost:8080/api/v1/patients';

    // ejemplo: crear paciente
    const payload = JSON.stringify({
        nombre: 'Test',
        apellido: 'User',
        cedula: '1712345678',
        fecha_nacimiento: '1990-01-01',
        genero: 'Masculino',
        ciudad: 'Quito',
        direccion: 'Av. Siempre Viva 123',
        telefono: '0998765432',
        email: 'testuser@example.com',
    });

    const params = {
        headers: { 'Content-Type': 'application/json' },
    };

    const res = http.post(baseUrl, payload, params);

    check(res, {
        'created patient': (r) => r.status === 201,
    });

    sleep(1);
}
