import { describe } from "mocha";
import request from "supertest";
import { expect } from "chai";

import createServer from "server";
const app = createServer();

describe("server checks", () => {
  it("server is created without error", (done) => {
    request(app).get("/health").expect(200, done);
  });
});
