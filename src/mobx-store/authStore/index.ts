import { makeAutoObservable } from "mobx";
import { history } from "../../helpers";
import { userServices } from "../../Services/userServices";
import { ApiCallStates } from "../types";
export default class AuthStore {
  constructor() {
    makeAutoObservable(this);
    const authTokens = localStorage.getItem("token");
    if (authTokens) {
      this.token = JSON.parse(authTokens);
    }
  }
  token: any = null;
  user: any = null;
  getUserState: ApiCallStates = ApiCallStates.IDLE;

  products: any = null;
  getProductsState: ApiCallStates = ApiCallStates.IDLE;

  store: any = null;

  signUp = async (data: any) => {
    try {
      await userServices.signup(data);
      history.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  login = async (data: any) => {
    try {
      const authTokens = await userServices.login(data);
      this.token = authTokens;
      history.push("/");
    } catch (error) {
      alert("can't Login with this credentials");
    }
  };

  isUserLoggedIn = () => {
    return this.token ? true : false;
  };

  getUserData = async () => {
    try {
      this.getUserState = ApiCallStates.LOADING;
      const userData = await userServices.getUserData();
      this.user = userData;
      console.log("data is here", userData);
      this.getUserState = ApiCallStates.SUCCEEDED;
    } catch (error) {
      console.log(error);
      this.getUserState = ApiCallStates.FAILED;
    }
  };

  logout = async () => {
    localStorage.removeItem("token");
    this.user = null;
    this.token = null;
    history.push("/");
    window.location.reload();
  };

  createStore = async (name: any) => {
    try {
      const store = await userServices.createStore(name);
      this.store = store;
      console.log("data is here", store);
    } catch (error) {
      console.log(error);
    }
  };

  createProduct = async (data: any) => {
    try {
      await userServices.createProduct(data);

      history.push("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };

  updateProduct = async (data: any, id: any) => {
    try {
      await userServices.updateProduct(data, id);
      history.push("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };
  deleteProduct = async (id: any) => {
    try {
      await userServices.deleteProduct(id);
      const newProducts = this.products;
      this.products = newProducts.filter((product: any) => {
        return product.id !== id;
      });
    } catch (error) {
      console.log(error);
    }
  };
  buyProduct = async (quantity: any, id: any) => {
    try {
      await userServices.buyProduct(quantity, id);
      alert("Item Bought");
    } catch (error) {
      console.log(error);
    }
  };

  getAllProducts = async () => {
    try {
      this.getProductsState = ApiCallStates.LOADING;
      const products = await userServices.getProducts();
      this.products = products;
      console.log("data is here Products", products);
      this.getProductsState = ApiCallStates.SUCCEEDED;
    } catch (error) {
      console.log(error);
      this.getProductsState = ApiCallStates.FAILED;
    }
  };
}
