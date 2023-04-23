import { Category } from "../models/model.js";

class CategoryController {
  async create(req, res) {
    const { name } = req.body;
    const category = await Category.create({ name });
    return res.json(category);
  }
  async getAll(req, res) {
    const categories = await Category.findAll();
    return res.json(categories);
  }
}
/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new CategoryController();
