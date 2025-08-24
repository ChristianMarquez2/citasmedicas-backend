import autocannon from 'autocannon';

const url = 'http://localhost:8080/api/v1/auth/login';

const instance = autocannon({
    url,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        email: 'juan@example.com',
        password: '123456',
    }),
    connections: 10,      // conexiones simultáneas
    duration: 10,         // duración en segundos
});

autocannon.track(instance);

instance.on('done', () => console.log('Prueba de ráfaga completada'));
