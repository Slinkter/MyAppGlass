// Adaptador de correo: crea el cliente de Resend (se instancia por llamada, como antes).
const { Resend } = require("resend");

function createMailer(apiKey) {
  return new Resend(apiKey);
}

module.exports = { createMailer };
