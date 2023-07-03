import "dotenv/config";
import {createServer} from "./server";

import * as mongoose from "mongoose";

const startServer = async () => {
  const app = await createServer();
  const port: number = parseInt(<string>process.env.PORT, 10) || 4000;

  // mongoose
  //   .connect(DB, {
  //     useNewUrlParser: true,
  //     useCreateIndex: true,
  //     useFindAndModify: false,
  //     useUnifiedTopology: true,
  //   })
  //   .then(() =>
  //     console.log(
  //       `DB connection successful. Mode: ${process.env.NODE_ENV}. DB: ${DB}`
  //     )
  //   )
  //   .catch(() =>
  //     console.log(
  //       `DB NOT CONNECTING. PLEASE CHECK NETWORK. Mode: ${process.env.NODE_ENV}. DB: ${DB} `
  //     )
  //   );

  app.listen(port, () => console.log(`Server running on port ${port}`));
};

startServer();
