import path from "path";
import * as uuid from "uuid";
import { Goods, GoodsInfo } from "../models/model.js";
import ApiError from "../error/ApiError.js";

class GoodsController {
  async create(req, res, next) {
    try {
      let { name, price, brandId, typeId, info } = req.body;

      const { img } = req.files;
      const fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve("static", fileName));

      const goods = await Goods.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) => {
          GoodsInfo.create({
            title: i.title,
            description: i.description,
            goodId: goods.id,
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
    limit = limit || 15;

    let offset = page * limit - limit;
    let goods;

    if (!brandId && !typeId) {
      // Метод  findAndCountAll предназначен для пагинации , нужен для того что бы посчитать  колличество страниц на фронте
      // которое вернется нам по заданному запросу.
      goods = await Goods.findAndCountAll({ limit, offset });
    }
    if (brandId && !typeId) {
      goods = await Goods.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }
    if (!brandId && typeId) {
      goods = await Goods.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    }
    if (brandId && typeId) {
      goods = await Goods.findAndCountAll({
        where: { brandId, typeId },
        limit,
        offset,
      });
    }
    return res.json(goods);
  }
  async getOne(req, res) {
    const { id } = req.params;

    const goods = await Goods.findOne({
      where: { id },
      include: [{ model: GoodsInfo, as: "info" }],
    });
    return res.json(goods);
  }
}

export default new GoodsController();
