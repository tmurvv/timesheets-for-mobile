import request from "supertest";

import {createServer} from "server";
import { describe } from "mocha";

describe("auth routes", function () {
  it("/auth responds with 200", async function () {
    const app = await createServer();

    request(app).post("/auth/signup").expect(200);
  });
});
