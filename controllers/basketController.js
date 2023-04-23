import { Basket, BasketProduct } from "../models/model.js";

class BasketController {
  async addProduct(req, res) {
    return json({ message: "Hello" });
  }
  async getAllProduct(req, res) {}
}
/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new BasketController();
