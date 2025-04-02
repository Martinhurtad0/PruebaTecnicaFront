import axios from "axios";

const API_URL = "http://localhost:8080/api/seller";

export default {
  getAllSellers() {
    return axios.get(API_URL);
  },
  createSeller(seller) {
    return axios.post(API_URL, seller);
  },
  updateSeller(id, seller) {
    return axios.put(`${API_URL}/${id}`, seller);
  },
  deleteSeller(id) {
    return axios.delete(`${API_URL}/${id}`);
  },
};
