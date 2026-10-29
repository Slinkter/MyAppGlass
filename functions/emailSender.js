// Shim de compatibilidad: re-exporta la lógica de servicios (la implementación vive en src/services).
const { sendEmailLogic } = require("./src/services/reclamoService");
const { sendContactEmailLogic } = require("./src/services/contactoService");

module.exports = {
  sendEmailLogic,
  sendContactEmailLogic,
};
