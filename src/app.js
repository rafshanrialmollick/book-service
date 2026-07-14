import pinoHttp from "pino-http";
import logger from "./utils/logger.js";
import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/errorMiddlewares.js";
import notFound from "./middlewares/notFound.js";
import routes from "./routes/index.js";

const app = express();

app.use(pinoHttp({ logger }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "Ok",
  });
});

app.use("/api/v1/", routes);

app.use(notFound);
app.use(errorHandler);

export default app;
