import express, { Request, Response, NextFunction } from "express";

const helmet = require("helmet");
const httpStatus = require("http-status");
const routes = require("./routes");
const { errorConverter, errorHandler } = require("./middlewares/error");
const ApiError = require("./utils/apiError");

const app = express();

app.use(helmet());

app.use(express.json());

app.use("/", routes);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use(errorConverter);

app.use(errorHandler);

module.exports = app;
