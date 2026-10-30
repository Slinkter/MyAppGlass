// Obtiene un access token OAuth de la sesión de la CLI de Firebase (`firebase login`).
// Se usa solo desde scripts locales; nunca imprime el token.
const { execSync } = require("node:child_process");
const path = require("node:path");

async function getFirebaseCliAccessToken() {
  const root = execSync("npm root -g").toString().trim();
  const ft = path.join(root, "firebase-tools", "lib");
  const { configstore } = require(path.join(ft, "configstore"));
  const auth = require(path.join(ft, "auth"));
  const tokens = configstore.get("tokens");
  if (!tokens?.refresh_token) throw new Error("No hay sesión de Firebase CLI: ejecuta `firebase login`.");
  const result = await auth.getAccessToken(tokens.refresh_token, []);
  return result.access_token;
}

module.exports = { getFirebaseCliAccessToken };
