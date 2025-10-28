/**
 * @file exampleService.js
 * @description This file provides a conceptual example of a data access/service layer.
 * It simulates fetching data from an API.
 */

/**
 * Simulates fetching a list of items from an API.
 * @returns {Promise<Array<Object>>} A promise that resolves with an array of example items.
 */
export const fetchExampleItems = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Example Item 1', description: 'This is the first example item.' },
        { id: 2, name: 'Example Item 2', description: 'This is the second example item.' },
        { id: 3, name: 'Example Item 3', description: 'This is the third example item.' },
      ]);
    }, 1000); // Simulate network delay
  });
};

/**
 * Simulates fetching a single item by its ID.
 * @param {number} id - The ID of the item to fetch.
 * @returns {Promise<Object|null>} A promise that resolves with the example item or null if not found.
 */
export const fetchExampleItemById = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const items = [
        { id: 1, name: 'Example Item 1', description: 'This is the first example item.' },
        { id: 2, name: 'Example Item 2', description: 'This is the second example item.' },
        { id: 3, name: 'Example Item 3', description: 'This is the third example item.' },
      ];
      const item = items.find(item => item.id === id);
      resolve(item || null);
    }, 500); // Simulate network delay
  });
};
