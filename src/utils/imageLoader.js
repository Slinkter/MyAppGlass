/**
 * @function loadImage
 * @description Dynamically imports an image module given its path.
 * This function is designed to be used with image paths stored as strings in data files,
 * allowing for lazy loading of images to optimize bundle size and performance.
 * @param {string} imagePath - The relative path to the image file.
 * @returns {Promise<string>} A promise that resolves with the default export of the image module (the image URL).
 */
export const loadImage = async (imagePath) => {
    try {
        // Use a dynamic import to load the image.
        // The `/* @vite-ignore */` comment is a Vite-specific hint to prevent it from trying to bundle all possible dynamic imports.
        // This assumes the imagePath is a string that will be resolved at runtime.
        const imageModule = await import(imagePath);
        return imageModule.default;
    } catch (error) {
        console.error(`Failed to load image from path: ${imagePath}`, error);
        return null; // Or a placeholder image URL
    }
};
