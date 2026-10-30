/**
 * @file mathCaptcha.ts
 * @description Utilidad para generación y verificación de retos de Captcha Matemático.
 */

// Sal secreta compartida para calcular el hash de integridad de la operación
const MATH_SALT = "GYA_MATH_SECURE_SALT_2026";

export interface MathChallenge {
  numA: number;
  numB: number;
  operator: "+" | "-";
  question: string;
  token: string;
}

/**
 * Firma determinista usando Math.imul (garantiza 32-bit en todos los entornos JS).
 * Algoritmo equivalente al Java String.hashCode() pero con sal secreta.
 */
export function computeSignature(a: number, op: string, b: number, ts: number): string {
  const str = `${a}${op}${b}_${ts}_${MATH_SALT}`;
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return (h >>> 0).toString(16);
}

/**
 * Genera un reto matemático aleatorio (suma o resta con resultado positivo).
 */
export function generateMathChallenge(): MathChallenge {
  const isAddition = Math.random() > 0.4; // 60% sumas, 40% restas
  let numA: number;
  let numB: number;
  let operator: "+" | "-";

  if (isAddition) {
    operator = "+";
    numA = Math.floor(Math.random() * 9) + 2; // 2..10
    numB = Math.floor(Math.random() * 8) + 1; // 1..8
  } else {
    operator = "-";
    numA = Math.floor(Math.random() * 8) + 8; // 8..15
    numB = Math.floor(Math.random() * (numA - 2)) + 1; // 1..(numA - 2)
  }

  const ts = Date.now();
  const sig = computeSignature(numA, operator, numB, ts);

  const payload = JSON.stringify({ a: numA, op: operator, b: numB, ts, sig });
  const token = typeof window !== "undefined" 
    ? btoa(payload)
    : Buffer.from(payload).toString("base64");

  return {
    numA,
    numB,
    operator,
    question: `¿Cuánto es ${numA} ${operator} ${numB}?`,
    token,
  };
}

/**
 * Valida un reto matemático localmente en el cliente.
 */
export function validateMathChallengeLocally(answer: string | number, token: string): boolean {
  if (!token || answer === undefined || answer === null || String(answer).trim() === "") {
    return false;
  }

  try {
    const raw = typeof window !== "undefined"
      ? atob(token)
      : Buffer.from(token, "base64").toString("utf-8");
    const { a, op, b, ts, sig } = JSON.parse(raw);

    // Verificar firma
    const expectedSig = computeSignature(a, op, b, ts);
    if (sig !== expectedSig) return false;

    // Verificar expiración (15 minutos)
    const now = Date.now();
    if (now - ts > 15 * 60 * 1000 || ts > now + 60000) return false;

    // Verificar resultado matemático
    const expectedResult = op === "+" ? a + b : a - b;
    return Number(String(answer).trim()) === expectedResult;
  } catch {
    return false;
  }
}
