//The user services file contains all backend api calls for performing CRUD
// operations on user data, as well as logging in and out of the  application.

import http from "./httpService";

export const userServices = {
  signup,
  login,
  getUserData,
  createStore,
  createProduct,
  updateProduct,
  deleteProduct,
  buyProduct,
  getProducts
};

// ************************************************************************

async function signup(data) {
  const response = await http.post("user/create", data);
  console.log(response);
}

async function login(data) {
  const response = await http.post("user/login", data);
  localStorage.setItem("token", JSON.stringify(response.data.token));
  return response.data.token;
}

async function getUserData() {
  const response = await http.get("user/read");
  console.log(response.data);
  return response.data;
  // http: return response.result.user;
}

async function createStore(name) {
  const response = await http.post("stores/createStore", name);
  console.log(response.data);
  return response.data;
}

async function createProduct(data) {
  const response = await http.post("items/createItem", data);
  console.log(response.data);
  return response.data;
}

async function updateProduct(data, id) {
  const response = await http.put(`items/updateItembyID/${id}`, data);
  console.log(response.data);
  return response.data;
}
async function deleteProduct(id) {
  const response = await http.delete(`items/deleteItembyID/${id}`);
  console.log(response.data);
  return response.data;
}

async function getProducts() {
  const response = await http.get("items/items_sys/");
  console.log(response.data);
  return response.data;
}

async function buyProduct(quantity, id) {
  const response = await http.post("records/createRecord", {
    item_id: id,
    quantity: quantity
  });
  console.log(response.data);
  return response.data;
}
