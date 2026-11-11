/**
 * @file MotionCssVars.tsx
 * @description Publica como variables CSS los valores de `shared/constants/motion.ts` para que
 * `styles/global.css` no repita números a mano. Se renderiza en el servidor (sin JavaScript de cliente).
 */

import { MOTION_CSS_VARS } from "@/shared/constants/motion";

export function MotionCssVars() {
  return <style dangerouslySetInnerHTML={{ __html: MOTION_CSS_VARS }} />;
}

export default MotionCssVars;
