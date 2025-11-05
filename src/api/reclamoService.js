import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "../config/firebase.js"; // Import the initialized app

/**
 * @file reclamoService.js
 * @description Service for invoking Firebase Cloud Functions related to 'reclamo' (claim/complaint) data.
 */

// Initialize functions with the explicit app instance to prevent race conditions.
const functions = getFunctions(app);

export const reclamoService = {
    /**
     * Submits a new reclamo by calling the 'submitReclamo' Cloud Function.
     * This function will handle saving the data to Firestore and sending a confirmation email.
     * @param {object} reclamoData - The data for the reclamo to be submitted.
     * @returns {Promise<any>} A promise that resolves with the result from the Cloud Function.
     * @throws {Error} If there is an error calling the function.
     */
    submitReclamo: async (reclamoData) => {
        try {
            const submitReclamoFunction = httpsCallable(functions, 'submitReclamo');
            const result = await submitReclamoFunction(reclamoData);
            // The result.data contains the value returned by the cloud function.
            return result.data.id;
        } catch (error) {
            console.error("Error calling Cloud Function: ", error);
            throw new Error("Failed to submit reclamo via Cloud Function.");
        }
    },
};