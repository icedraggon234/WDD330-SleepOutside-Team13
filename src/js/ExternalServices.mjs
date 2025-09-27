const baseURL = "/json/";  // points to /public/json/

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  constructor() {}

  async getData(category) {
    try {
      const response = await fetch(`${baseURL}${category}.json`);

      if (!response.ok) {
        throw new Error(`Something went wrong fetching ${category}: ${response.status}`);
      }

      const jsonData = await convertToJson(response);
      return jsonData;  // local JSON is already the array, no .Result
    } catch (error) {
      console.error("❌ getData error:", error);
      return [];
    }
  }

  async findProductById(id) {
    try {
      // loop through JSON files to find product by Id
      const categories = ["tents", "backpacks", "sleeping-bags", "hammocks"];
      for (let category of categories) {
        const response = await fetch(`${baseURL}${category}.json`);
        if (response.ok) {
          const data = await convertToJson(response);
          const product = data.find((item) => item.Id === id);
          if (product) return product;
        }
      }
      throw new Error(`Product with id ${id} not found`);
    } catch (error) {
      console.error("❌ findProductById error:", error);
      return null;
    }
  }

  async checkout(data) {
    console.warn("⚠️ Checkout not implemented for local JSON data.");
    return { ok: false };
  }
}
