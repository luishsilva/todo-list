import { SERVICE_URL } from "../definitions/Config";

/**
 * Create a new item on the server
 * @param {object} item
 * @param {string} item.id
 * @param {string} item.name
 * @param {boolean} item.isComplete
 * @returns {Promise<void>}
 */
export default async function updateItem(item) {
  return fetch(`${SERVICE_URL}/${item.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
}
