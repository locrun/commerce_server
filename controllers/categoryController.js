import { Category } from "../models/model.js";

class CategoryController {
  async create(req, res) {
    const { name } = req.body;
    const type = await Category.create({ name });
    return res.json(type);
  }
  async getAll(req, res) {
    const types = await Category.findAll();
    return res.json(types);
  }
}
/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new CategoryController();
