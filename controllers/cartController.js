import { Cart, GoodsCart } from "../models/model.js";

class CartController {
  async addItemsToCart(req, res) {
    const { goodId, cartId } = req.body;
    const cart = await Cart.findAll();
    const goods = await GoodsCart.create({ goodId, cartId: cart.id });
    console.log(cart);
    return res.json(goods);
  }
  async getAllCartItems(req, res) {
    const goods = await GoodsCart.findAll();
    return res.json(goods);
  }
}
/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new CartController();
