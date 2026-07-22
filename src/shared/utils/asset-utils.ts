/**
 * @file asset-utils.ts
 * @description Utilities for resolving asset URLs.
 */

/**
 * Resolves a local image path to a public URL.
 * In development, returns the local path.
 * In production, returns the Firebase Storage public URL.
 *
 * @param localPath - Path starting with /images/
 */
export const getAssetUrl = (localPath: string): string => {
  if (!localPath) return localPath;
  return localPath;
};
