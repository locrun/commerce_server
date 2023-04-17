import { Brand } from "../models/model.js";

class BrandController {
  async create(req, res) {
    const { name } = req.body;
    const brand = await Brand.create({ name });
    return res.json({ brand });
  }
  async getAll(req, res) {
    const brands = await Brand.findAll();
    return res.json(brands);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new BrandController();
