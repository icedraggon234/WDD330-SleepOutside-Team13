// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);


/**
 * Grabs a value from localStorage by the specified key.
 * Returns an empty array if the key does not exist.
 *
 * @param {string} key - The key to retrieve from localStorage.
 * @returns {*} The parsed value from localStorage, or an empty array if not found.
 */
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}


/**
 * Stores data in the browser's localStorage under the specified key, overwriting any existing value.
 * If you want to add to an existing array in localStorage instead of overwriting it, use addToLocalStorage().
 *
 * @param {string} key - The key under which the data will be stored.
 * @param {*} data - The data to be stored.
 */
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}


/**
 * Adds a new item to the beginning of an array stored in localStorage under the specified key.
 * If there is no array associated with the key, creates a new array with the data item.
 *
 * @param {string} key - The key under which the array is stored in localStorage.
 * @param {*} data - The data item to add to the array.
 */
export function addToLocalStorage(key, data) {
  const localData = getLocalStorage(key);
  localData.unshift(data);
  setLocalStorage(key, localData);
}


/**
 * Grabs the value of a specified query parameter from the current page's URL.
 *
 * @param {string} param - The name of the query parameter to retrieve.
 * @returns {string} The value of the specified query parameter.
 */
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const value = urlParams.get(param);
  return value;
}

export function  renderListWithTemplate (list, parentElement,  templateFn, position = "beforeend", clear = false) {
  const productHtml =  list.map(templateFn).join("");

  if (clear) parentElement.innerHTML = "";

  parentElement.insertAdjacentHTML(position, productHtml);
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}