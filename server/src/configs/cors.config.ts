

import cors from "cors";
import { Application } from "express";

const corsConfig = (app: Application) => {
  const corsOptionsDelegate = function (req: any, callback: any) {
    const corsOptions = { origin: true };
    callback(null, corsOptions);
  };
  app.use(cors(corsOptionsDelegate));
};

export default corsConfig;

