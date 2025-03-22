import { SERVICE_URL } from "../definitions/Config";

/**
 * Create a new item on the server
 * @param {object} item
 * @param {string} item.id
 * @param {string} item.name
 * @param {boolean} item.isComplete
 * @returns {Promise<void>}
 */
export default async function pushNewItem(item) {
  return fetch(SERVICE_URL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(item),
  });
}
