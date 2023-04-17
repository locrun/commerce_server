import { Type } from "../models/model.js";

class TypeController {
  async create(req, res) {
    const { name } = req.body;
    const type = await Type.create({ name });
    return res.json(type);
  }
  async getAll(req, res) {
    const types = await Type.findAll();
    return res.json(types);
  }
}
/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new TypeController();
