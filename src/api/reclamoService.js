/**
 * @file reclamoService.js
 * @description Service for submitting 'reclamo' (claim/complaint) data to the backend.
 */

// The URL of the HTTP-triggered Cloud Function.
const SUBMIT_RECLAMO_URL = "https://us-central1-gya-app-4c8a9.cloudfunctions.net/submitReclamo";

export const reclamoService = {
    /**
     * Submits a new reclamo by sending a POST request to the 'submitReclamo' HTTP Cloud Function.
     * @param {object} reclamoData - The data for the reclamo to be submitted.
     * @returns {Promise<string>} A promise that resolves with the new reclamo ID from the function.
     * @throws {Error} If the request fails or the function returns an error.
     */
    submitReclamo: async (reclamoData) => {
        try {
            const response = await fetch(SUBMIT_RECLAMO_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reclamoData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            return result.id;

        } catch (error) {
            console.error("Error calling HTTP Cloud Function: ", error);
            throw new Error("Failed to submit reclamo via HTTP Cloud Function.");
        }
    },
};