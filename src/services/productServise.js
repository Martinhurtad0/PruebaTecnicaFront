import axios from "axios";

const API_URL = "http://localhost:8080/api/product";

export default {
  getProducts() {
    return axios.get(API_URL);
  },

  getProductsBySeller(sellerId) {
    return axios.get(`${API_URL}/seller/${sellerId}`);
  },

  createProduct(product) {
    return axios.post(API_URL, product);
  },

  updateProduct(id, product) {
    return axios.put(`${API_URL}/${id}`, product);
  },

  deleteProduct(id) {
    return axios.delete(`${API_URL}/${id}`);
  },
};
