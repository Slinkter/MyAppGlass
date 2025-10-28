import { db } from "../config/firebase.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/**
 * @file reclamoService.js
 * @description Service for interacting with Firestore for 'reclamo' (claim/complaint) data.
 */

export const reclamoService = {
    /**
     * Submits a new reclamo to Firestore.
     * @param {object} reclamoData - The data for the reclamo to be submitted.
     * @returns {Promise<string>} A promise that resolves with the ID of the newly created reclamo document.
     * @throws {Error} If there is an error writing the document to Firestore.
     */
    submitReclamo: async (reclamoData) => {
        try {
            const refReclamos = collection(db, "reclamaciones");
            const docRef = await addDoc(refReclamos, {
                ...reclamoData,
                fechaReclamo: serverTimestamp(),
            });
            return docRef.id;
        } catch (error) {
            console.error("Error writing document to Firestore: ", error);
            throw new Error("Failed to submit reclamo to Firestore.");
        }
    },
};
