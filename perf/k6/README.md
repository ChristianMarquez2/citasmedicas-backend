Pruebas de Carga y sus comandos

smoke-login.js → prueba rápida de login y /me
npm run perf:k6:smoke

load-crud-patients.js → CRUD de pacientes con carga gradual
npm run perf:k6:load

soak-appointments.js → prueba de resistencia larga sobre citas
npm run perf:k6:soak
