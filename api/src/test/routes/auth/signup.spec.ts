import request from "supertest";

import createServer from "server";
import { describe } from "mocha";
const app = createServer();

describe("auth routes", function () {
  it("/auth responds with 200", function (done) {
    request(app).post("/auth/signup").expect(200, done);
  });
});
