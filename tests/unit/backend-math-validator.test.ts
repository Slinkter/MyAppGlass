import { describe, it, expect } from 'vitest';
// Importamos el validador de Node.js de Cloud Functions
// Usamos require ya que functions está estructurado en CommonJS
// @ts-ignore
const { validateMathCaptcha, computeSignature } = require('../../functions/mathCaptchaValidator');
import { generateMathChallenge } from '@/shared/utils/mathCaptcha';

describe('Backend Math CAPTCHA Validator (Cloud Functions)', () => {
  it('✅ debe validar correctamente un reto legítimo generado por el frontend', () => {
    const challenge = generateMathChallenge();
    const expectedAnswer = challenge.operator === '+' 
      ? challenge.numA + challenge.numB 
      : challenge.numA - challenge.numB;

    const result = validateMathCaptcha(String(expectedAnswer), challenge.token);
    expect(result.valid).toBe(true);
    expect(result.reason).toBeUndefined();
  });

  it('❌ debe rechazar respuesta aritmética incorrecta', () => {
    const challenge = generateMathChallenge();
    const expectedAnswer = challenge.operator === '+' 
      ? challenge.numA + challenge.numB 
      : challenge.numA - challenge.numB;
    const wrongAnswer = expectedAnswer + 99;

    const result = validateMathCaptcha(String(wrongAnswer), challenge.token);
    expect(result.valid).toBe(false);
    expect(result.message).toContain('incorrecta');
  });

  it('❌ debe rechazar cuando falta la respuesta o el token', () => {
    expect(validateMathCaptcha('', 'token123').valid).toBe(false);
    expect(validateMathCaptcha('5', '').valid).toBe(false);
    expect(validateMathCaptcha(null, null).valid).toBe(false);
  });

  it('❌ debe rechazar tokens con firma falsificada o manipulada', () => {
    const challenge = generateMathChallenge();
    // Decodificar, alterar la respuesta/operandos y re-empaquetar sin cambiar la firma
    const raw = Buffer.from(challenge.token, 'base64').toString('utf-8');
    const data = JSON.parse(raw);
    data.a = data.a + 10; // manipulamos operando
    const forgedToken = Buffer.from(JSON.stringify(data)).toString('base64');

    const expectedForgedAnswer = challenge.operator === '+' 
      ? data.a + data.b 
      : data.a - data.b;

    const result = validateMathCaptcha(String(expectedForgedAnswer), forgedToken);
    expect(result.valid).toBe(false);
    expect(result.message).toContain('no válida');
  });

  it('❌ debe rechazar tokens expirados (> 15 minutos)', () => {
    const challenge = generateMathChallenge();
    const raw = Buffer.from(challenge.token, 'base64').toString('utf-8');
    const data = JSON.parse(raw);
    data.ts = Date.now() - 16 * 60 * 1000; // 16 min atrás
    // Recomputar la firma con el timestamp viejo para que la estructura sea válida
    // y el rechazo ocurra por expiración, no por firma inválida.
    data.sig = computeSignature(data.a, data.op, data.b, data.ts);
    const expiredToken = Buffer.from(JSON.stringify(data)).toString('base64');

    const result = validateMathCaptcha('10', expiredToken);
    expect(result.valid).toBe(false);
    expect(result.message).toContain('expirado');
  });

  it('❌ debe rechazar tokens con estructura inválida', () => {
    const validPayload = JSON.parse(Buffer.from(generateMathChallenge().token, 'base64').toString('utf-8'));

    // a no numérico
    const badA = Buffer.from(JSON.stringify({ ...validPayload, a: 'x' })).toString('base64');
    expect(validateMathCaptcha('10', badA).message).toContain('inválida');

    // op inválida
    const badOp = Buffer.from(JSON.stringify({ ...validPayload, op: '*' })).toString('base64');
    expect(validateMathCaptcha('10', badOp).message).toContain('inválida');

    // sig faltante
    const noSig = Buffer.from(JSON.stringify({ a: validPayload.a, op: validPayload.op, b: validPayload.b, ts: validPayload.ts })).toString('base64');
    expect(validateMathCaptcha('10', noSig).message).toContain('inválida');
  });
});
