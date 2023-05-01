import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { sequelize } from "./db.js";
import fileUpload from "express-fileupload";
//import cookieParser from "cookie-parser";
//import Models from "../server/models/model.js";

import path from "path";
import router from "./routes/index.js";
import ErrorHandler from "./middleware/ErrorHandlingMiddleware.js";
dotenv.config();

//const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;

const app = express();

//Для работы с корзиной
//app.use(cookieParser(process.env.SECRET_KEY));

// Что бы обойти cors
//app.use(cors());
// Cross-Origin Resource Sharing
app.use(
  cors({
    origin: "http://tehno-store.vercel.app",
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE"],
  })
);

// Формат json для Express
app.use(express.json());

// Для того что бы просматривать изображение в браузере
app.use(express.static(path.resolve("static")));

//Для заугрузки изображение
app.use(fileUpload({}));

// Здесь инициализация роутов
app.use("/api", router);

//Обработка ошибок , последний Middleware
app.use(ErrorHandler);

const start = async () => {
  try {
    //Подключение к базе данных
    await sequelize.authenticate();
    console.log("Подключение к базе данных произошло успешно");

    //Эта фукция будет сверять данные из базы данных со схемой
    await sequelize.sync();

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};
start();
