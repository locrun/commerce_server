import { Cart, GoodsCart } from "../models/model.js";

class CartController {
  async addItemsToCart(req, res) {
    const { goodId } = req.body;
    const goods = await GoodsCart.create({ goodId });
    return res.json(goods);
  }
  async getAllCartItems(req, res) {
    const goods = await GoodsCart.findAll();
    return res.json(goods);
  }
}
/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new CartController();
