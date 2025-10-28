/**
 * @file assetResolver.js
 * @description Provides a utility function to resolve asset paths.
 */

/**
 * Resolves a relative asset path to an absolute path suitable for web access.
 * This function assumes assets are located within the `src/assets` directory
 * and constructs a path relative to the project's base URL.
 * @param {string} relativePath - The relative path to the asset (e.g., './webService/s/01.Ventanas/nova/a1.jpeg').
 * @returns {string} The absolute URL path to the asset.
 */
export const resolveAssetPath = (relativePath) => {
  // Assuming the base for assets is `src/assets`
  // The relativePath provided in ventana-data.js is like `../../assets/webService/...`
  // We need to strip the `../../assets/` part and prepend `/src/assets/`
  const assetBase = '/src/assets/';
  const pathSegments = relativePath.split('/');

  // Find the index of 'assets' in the path segments
  const assetsIndex = pathSegments.indexOf('assets');

  if (assetsIndex !== -1) {
    // Reconstruct the path from 'assets' onwards
    const absolutePath = assetBase + pathSegments.slice(assetsIndex + 1).join('/');
    return absolutePath;
  } else {
    // Fallback or error handling if 'assets' is not found in the path
    console.warn(`Could not resolve asset path: ${relativePath}. Ensure it contains '/assets/'.`);
    return relativePath; // Return original path if resolution fails
  }
};
