// Punto de entrada: inicializa Firebase Admin y exporta las funciones HTTP.
const admin = require("firebase-admin");

admin.initializeApp();

exports.submitReclamo = require("./src/http/submitReclamo").submitReclamo;
exports.submitContacto = require("./src/http/submitContacto").submitContacto;
exports.checkStatus = require("./src/http/checkStatus").checkStatus;
