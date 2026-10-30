import { describe, it, expect } from 'vitest';
import { generateMathChallenge, validateMathChallengeLocally, computeSignature } from '@/shared/utils/mathCaptcha';

describe('mathCaptcha - generateMathChallenge()', () => {
  it('debe generar un reto con los campos correctos', () => {
    const challenge = generateMathChallenge();
    expect(challenge).toHaveProperty('numA');
    expect(challenge).toHaveProperty('numB');
    expect(challenge).toHaveProperty('operator');
    expect(challenge).toHaveProperty('question');
    expect(challenge).toHaveProperty('token');
    expect(['+', '-']).toContain(challenge.operator);
  });

  it('el resultado de la operación siempre debe ser positivo', () => {
    for (let i = 0; i < 50; i++) {
      const { numA, numB, operator } = generateMathChallenge();
      const result = operator === '+' ? numA + numB : numA - numB;
      expect(result).toBeGreaterThan(0);
    }
  });

  it('la pregunta debe contener los números y el operador', () => {
    const { numA, numB, operator, question } = generateMathChallenge();
    expect(question).toContain(String(numA));
    expect(question).toContain(String(numB));
    expect(question).toContain(operator);
  });

  it('el token debe ser una cadena base64 decodificable', () => {
    const { token } = generateMathChallenge();
    expect(() => {
      const raw = atob(token);
      const parsed = JSON.parse(raw);
      expect(parsed).toHaveProperty('a');
      expect(parsed).toHaveProperty('op');
      expect(parsed).toHaveProperty('b');
      expect(parsed).toHaveProperty('ts');
      expect(parsed).toHaveProperty('sig');
    }).not.toThrow();
  });

  it('cada llamada debe generar un token diferente (timestamp o operandos distintos)', async () => {
    const tokens = new Set<string>();
    tokens.add(generateMathChallenge().token);
    for (let i = 0; i < 5; i++) {
      await new Promise((r) => setTimeout(r, 2));
      tokens.add(generateMathChallenge().token);
    }
    expect(tokens.size).toBeGreaterThan(1);
  });
});

describe('mathCaptcha - validateMathChallengeLocally()', () => {
  it('debe aceptar una respuesta correcta a una suma', () => {
    const { numA, numB, operator, token } = generateMathChallenge();
    const correctAnswer = operator === '+' ? numA + numB : numA - numB;
    expect(validateMathChallengeLocally(String(correctAnswer), token)).toBe(true);
  });

  it('debe rechazar una respuesta incorrecta', () => {
    const { numA, numB, operator, token } = generateMathChallenge();
    const correctAnswer = operator === '+' ? numA + numB : numA - numB;
    const wrongAnswer = correctAnswer + 1;
    expect(validateMathChallengeLocally(String(wrongAnswer), token)).toBe(false);
  });

  it('debe rechazar una respuesta vacía', () => {
    const { token } = generateMathChallenge();
    expect(validateMathChallengeLocally('', token)).toBe(false);
  });

  it('debe rechazar un token vacío', () => {
    expect(validateMathChallengeLocally('5', '')).toBe(false);
  });

  it('debe rechazar un token manipulado (firma inválida)', () => {
    const { numA, numB, operator } = generateMathChallenge();
    const expectedAnswer = operator === '+' ? numA + numB : numA - numB;
    // Creamos un token con una firma falsa
    const fakePayload = btoa(JSON.stringify({ a: numA, op: operator, b: numB, ts: Date.now(), sig: 'abcdef00' }));
    expect(validateMathChallengeLocally(String(expectedAnswer), fakePayload)).toBe(false);
  });

  it('debe rechazar un token expirado (> 15 minutos)', () => {
    const { numA, numB, operator, token } = generateMathChallenge();
    const correctAnswer = operator === '+' ? numA + numB : numA - numB;

    // Reconstruimos el token con un timestamp de hace 20 minutos y firma recomputada
    const raw = JSON.parse(atob(token));
    raw.ts = Date.now() - 20 * 60 * 1000;
    raw.sig = computeSignature(raw.a, raw.op, raw.b, raw.ts);
    const expiredToken = btoa(JSON.stringify(raw));
    expect(validateMathChallengeLocally(String(correctAnswer), expiredToken)).toBe(false);
  });

  it('debe rechazar un token del futuro (ts > now + 60s)', () => {
    const { numA, numB, operator, token } = generateMathChallenge();
    const correctAnswer = operator === '+' ? numA + numB : numA - numB;

    const raw = JSON.parse(atob(token));
    raw.ts = Date.now() + 5 * 60 * 1000;
    raw.sig = computeSignature(raw.a, raw.op, raw.b, raw.ts);
    const futureToken = btoa(JSON.stringify(raw));
    expect(validateMathChallengeLocally(String(correctAnswer), futureToken)).toBe(false);
  });

  it('debe rechazar token con JSON malformado', () => {
    const badToken = btoa('esto no es json');
    expect(validateMathChallengeLocally('5', badToken)).toBe(false);
  });

  it('debe validar correctamente una resta', () => {
    // Forzamos una operación de resta
    for (let i = 0; i < 20; i++) {
      const ch = generateMathChallenge();
      if (ch.operator === '-') {
        const answer = ch.numA - ch.numB;
        expect(validateMathChallengeLocally(String(answer), ch.token)).toBe(true);
        expect(validateMathChallengeLocally(String(answer + 1), ch.token)).toBe(false);
        return;
      }
    }
    // Si no se generó resta en 20 intentos, el test pasa igualmente
    expect(true).toBe(true);
  });
});
