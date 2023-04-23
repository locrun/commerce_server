import path from "path";
import * as uuid from "uuid";
import { Product, ProductInfo } from "../models/model.js";
import ApiError from "../error/ApiError.js";

class ProductController {
  async create(req, res, next) {
    try {
      let { name, price, brandId, categoryId, info } = req.body;

      const { img } = req.files;
      const fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve("static", fileName));

      const product = await Product.create({
        name,
        price,
        brandId,
        categoryId,
        img: fileName,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) => {
          ProductInfo.create({
            title: i.title,
            description: i.description,
            productId: product.id,
          });
        });
      }
      return res.json(goods);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query;

    page = page || 1;
    limit = limit || 6;

    let offset = page * limit - limit;
    let product;

    if (!brandId && !typeId) {
      // Метод  findAndCountAll предназначен для пагинации , нужен для того что бы посчитать  колличество страниц на фронте
      // которое вернется нам по заданному запросу.
      product = await Goods.findAndCountAll({ limit, offset });
    }
    if (brandId && !typeId) {
      product = await Product.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }
    if (!brandId && typeId) {
      product = await Product.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    }
    if (brandId && typeId) {
      product = await Product.findAndCountAll({
        where: { brandId, typeId },
        limit,
        offset,
      });
    }
    return res.json(product);
  }
  async getOne(req, res) {
    const { id } = req.params;

    const product = await Product.findOne({
      where: { id },
      include: [{ model: ProductInfo, as: "info" }],
    });
    return res.json(product);
  }
}

export default new ProductController();
