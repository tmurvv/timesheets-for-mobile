"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PORT = 3050;
const app = (0, express_1.default)();
app.get("/", (req, res) => {
  res.send("IMIN plus concurrently");
});
app.get("/hi", (req, res) => {
  res.send("HI THERE plus concurrently");
});
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
