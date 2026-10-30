// Orígenes CORS permitidos, separados por entorno (producción vs. desarrollo).
// ─── CORS: separado por entorno ───────────────────────────────────────────────
const IS_PROD = process.env.NODE_ENV === "production";
const ALLOWED_ORIGINS = IS_PROD
  ? [
      /^https:\/\/(www\.)?gyacompany\.com$/,
      /^https:\/\/gya-app-4c8a9\.web\.app$/,
      /^https:\/\/gya-app-4c8a9\.firebaseapp\.com$/,
    ]
  : [
      /^https:\/\/(www\.)?gyacompany\.com$/,
      /^https:\/\/gya-app-4c8a9\.web\.app$/,
      /^https:\/\/gya-app-4c8a9\.firebaseapp\.com$/,
      /^http:\/\/localhost(:\d+)?$/,
      /^http:\/\/127\.0\.0\.1(:\d+)?$/,
    ];

module.exports = { ALLOWED_ORIGINS };
