import ApiError from "../error/ApiError.js";
import { Basket, BasketProduct, Product } from "../models/model.js";

const maxAge = 60 * 60 * 1000 * 24 * 365; // один год
const signed = true;

class BasketController {
  async getOne(req, res, next) {
    let basket;
    try {
      let basketId = parseInt(req.signedCookies.basketId);
      if (basketId) {
        basket = await Basket.findByPk(basketId, {
          attributes: ["id"],
          include: [
            { model: Product, attributes: ["id", "name", "price", "image"] },
          ],
        });
      } else {
        basket = await Basket.create();
      }
      res.cookie("basketId", basket.id, { maxAge, signed });
      return res.json(basket);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  // async create() {
  //   const basket = await BasketMapping.create();
  //   return basket;
  // }

  async append(req, res, next) {
    try {
      let basket;
      let basketId = parseInt(req.signedCookies.basketId);
      if (!basketId) {
        let created = await Basket.create();
        return (basketId = created.id);
      }

      const { productId, quantity } = req.params;

      basket = await Basket.findByPk(basketId, {
        attributes: ["id"],
        include: [
          { model: Product, attributes: ["id", "name", "price", "image"] },
        ],
      });

      // проверяем, есть ли уже этот товар в корзине
      const basket_product = await BasketProduct.findOne({
        where: { basketId, productId },
      });
      if (basket_product) {
        // есть в корзине
        await basket_product.increment("quantity", { by: quantity });
      } else {
        // нет в корзине
        await BasketProduct.create({ basketId, productId, quantity });
      }
      // обновим объект корзины, чтобы вернуть свежие данные
      await basket.reload();
      res.cookie("basketId", basket.id, { maxAge, signed });
      return res.json(basket);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async increment(req, res, next) {
    try {
      let basket;
      const { productId, quantity } = req.params;

      let basketId = parseInt(req.signedCookies.basketId);
      if (!basketId) {
        let created = await Basket.create();
        return (basketId = created.id);
      }
      basket = await Basket.findByPk(basketId, {
        include: [{ model: Product, as: "products" }],
      });

      //Проверяем, есть ли проудукт в корзине
      const basket_product = await BasketProduct.findOne({
        where: { basketId, productId },
      });
      if (basket_product) {
        await basket_product.increment("quantity", { by: quantity });
        //Обновим объект корзины, что бы вернуть свежие данные
        await basket.reload();
      }

      res.cookie("basketId", basket.id, { maxAge, signed });
      res.json(basket);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async decrement(req, res, next) {
    try {
      let basket;
      const { productId, quantity } = req.params;

      let basketId = parseInt(req.signedCookies.basketId);
      if (!basketId) {
        let created = await Basket.create();
        return (basketId = created.id);
      }
      basket = await Basket.findByPk(basketId, {
        include: [{ model: Product, as: "products" }],
      });

      //Проверяем, есть ли проудукт в корзине
      const basket_product = await BasketProduct.findOne({
        where: { basketId, productId },
      });
      if (basket_product) {
        if (basket_product.quantity > quantity) {
          await basket_product.decrement("quantity", { by: quantity });
        } else {
          await basket_product.destroy();
        }
        //Обновим объект корзины, что бы вернуть свежие данные
        await basket.reload();
      }

      res.cookie("basketId", basket.id, { maxAge, signed });
      res.json(basket);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async remove(req, res, next) {
    try {
      let basketId;
      if (!req.signedCookies.basketId) {
        let created = await Basket.create();
        basketId = created.id;
      } else {
        basketId = req.signedCookies.basketId;
      }

      let basket = await Basket.findByPk(basketId, {
        include: [{ model: Product, as: "products" }],
      });

      // Проверяем, есть ли этот товар в корзине
      const basket_product = await BasketProduct.findOne({
        where: { basketId, productId: req.params.productId },
      });
      if (basket_product) {
        //Удалим продукт из корзины
        await basket_product.destroy();
        //Обновим объект корзины, что бы вернуть свежие данные
        await basket.reload();
      }
      res.cookie("basketId", basket.id, { maxAge, signed });
      return res.json(basket);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }
  async clear(req, res) {}
}
/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new BasketController();
