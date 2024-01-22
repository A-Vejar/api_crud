import "dotenv/config";
import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import dbConfig from "./config/db.config";
import indexRouter from "./routes";
import verificarTokenAcceso from "./middlewares/verificar-token-acceso.middleware";
import jwt from "jsonwebtoken";
import betterLogging from "better-logging";
import transformarErrorValidacionZod from "./middlewares/transformar-error-validacion-zod.middleware";
import capturarErrorAPI from "./middlewares/capturar-error-api.middleware";
import { luxonUtils } from "./utils/luxon.utils";
import transformarErrorMySQL from "./middlewares/transformar-error-mysql.middleware";

betterLogging(console, {
  format: (ctx) => `${ctx.STAMP(luxonUtils.nowUTC().toISO()!)}${ctx.type}: ${ctx.msg}`
});

const { PORT, API_ENV, JWT_ACCESS_TOKEN_SECRET } = process.env;
const app = express();

app.use(cors());
app.use(express.json());

// TODO: Uncomment until figure it out how to added to Fornt-End
// app.use(verificarTokenAcceso);

// Routes
app.use('/usuarios', indexRouter);

app.use(transformarErrorMySQL);
app.use(transformarErrorValidacionZod);
app.use(capturarErrorAPI);

// MySQL Connect
dbConfig.connect(error => {
  if (error) throw error;
  console.info(`📚 Conectado a servidor de base de datos ${dbConfig.config.host} (${dbConfig.config.database}, @${dbConfig.config.user}).`);

  app.listen(PORT, () => {
    console.info(`🚀 API CRUD iniciada correctamente en el puerto ${PORT}.`);
    console.info("------------------------------------");
    console.info("🌐 Endpoints:");
    listEndpoints(app)
      .map((endpoint) => ` * ${endpoint.path} [${endpoint.methods.join("|")}]`)
      .forEach((endpoint) => {
        console.info(endpoint);
      });

    if (API_ENV === "DEV") {
      const tokenPrueba = {
        usuario: dbConfig.config.user,
        rut: "44444444-4",
      };
      console.info("------------------------------------");
      console.info(`🔑 Token de acceso para desarrollo:`);
      console.info(
        jwt.sign(tokenPrueba, JWT_ACCESS_TOKEN_SECRET, { expiresIn: "1y" })
      );
    }
  });
});
