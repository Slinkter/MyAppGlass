// Punto de entrada: inicializa Firebase Admin y exporta las funciones HTTP.
const admin = require("firebase-admin");

admin.initializeApp();

exports.submitReclamo = require("./src/http/submitReclamo").submitReclamo;
exports.submitContacto = require("./src/http/submitContacto").submitContacto;
exports.checkStatus = require("./src/http/checkStatus").checkStatus;

// Callables del panel /admin (exigen custom claim role=admin).
const presupuestos = require("./src/callable/presupuestos");
exports.guardarPresupuesto = presupuestos.guardarPresupuesto;
exports.cambiarEstadoPresupuesto = presupuestos.cambiarEstadoPresupuesto;
exports.generarPresupuestoPdf = presupuestos.generarPresupuestoPdf;
exports.setAdminRole = presupuestos.setAdminRole;
