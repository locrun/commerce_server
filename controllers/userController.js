import ApiError from "../error/ApiError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User, Basket } from "../models/model.js";

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password, role } = req.body;
      if (!email || !password) {
        return next(ApiError.badRequest("Некорректный email или password"));
      }
      const candidate = await User.findOne({ where: { email } });

      if (candidate) {
        return next(
          ApiError.badRequest("Пользователь с таким email уже существует")
        );
      }
      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create({ email, role, password: hashPassword });
      const basket = await Basket.create({ userId: user.id });
      const jwtToken = generateJwt(user.id, user.email, user.role);
      return res.json({ token: jwtToken });
    } catch (error) {
      console.log(error);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return next(
          ApiError.internal("Пользователь с таким email не существует")
        );
      }
      let comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        return next(ApiError.internal("Пароли не совпадают"));
      }
      const token = generateJwt(user.id, user.email, user.role);
      return res.json({ token: token });
    } catch (error) {
      console.log(error);
    }
  }
  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token: token });
  }
}
/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new UserController();
