import "reflect-metadata";
import app from "./app";

const PORT = 3000;

const server = app.listen(PORT, () =>
  console.log(`Express server has started on port ${PORT}`)
);

process.on("SIGINT", () => {
  server.close();
});