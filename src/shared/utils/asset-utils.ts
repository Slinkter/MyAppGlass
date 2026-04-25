/**
 * @file asset-utils.ts
 * @description Utilities for resolving asset URLs (Local vs Firebase Storage).
 */

const STORAGE_BUCKET = "gya-app-4c8a9.firebasestorage.app";
const IS_PROD = process.env.NODE_ENV === 'production';

/**
 * Resolves a local image path to a public URL.
 * In development, returns the local path.
 * In production, returns the Firebase Storage public URL.
 * 
 * @param localPath - Path starting with /images/
 */
export const getAssetUrl = (localPath: string): string => {
  if (!localPath || !localPath.startsWith('/images/')) return localPath;
  
  if (!IS_PROD) return localPath;

  const fileName = localPath.replace('/images/', '');
  // Firebase Storage Public URL format (requires files to be public or have no token if using alt=media)
  // Note: By default, Storage files need a token. 
  // However, we can use the direct link if we make the bucket public-read or use the 'o' path.
  return `https://firebasestorage.googleapis.com/v0/b/${STORAGE_BUCKET}/o/images%2F${encodeURIComponent(fileName)}?alt=media`;
};
