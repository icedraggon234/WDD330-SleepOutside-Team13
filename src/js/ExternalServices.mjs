const baseURL = import.meta.env.VITE_SERVER_URL;


async function convertToJson(res) {
  const jsonData = await res.json();

  if (res.ok) {
    return jsonData;
  } else {
    throw { name: "servicesError", message: jsonData}
  }
}

export default class ExternalServices {
  constructor() {
  }
  async getData(category) {
    // Moved around some of the error handling, it still exists, just in other places in the code.
    // convertToJson now throws an error for the response. 

      const response = await fetch(`${baseURL}products/search/${category}`);
      

      const jsonData = await convertToJson(response);

      return jsonData.Result;

    

  }
  async findProductById(id) {

    const response = await fetch(`${baseURL}product/${id}`);

    const product = await convertToJson(response);

    return product.Result;
  }

  async checkout(data) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    const response = await fetch(`${baseURL}checkout`, options);
    return response;

  }
}
