const baseURL = import.meta.env.VITE_SERVER_URL;


function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  constructor() {
  }
  async getData(category) {
    try {
      const response = await fetch(`${baseURL}products/search/${category}`);
      
      if (!response.ok) throw new Error(`Something wrong with fetching the data: ${response.status}`);

      const jsonData = await convertToJson(response);

      return jsonData.Result;

    } catch (error) {
      console.error(error);
    }
    

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
