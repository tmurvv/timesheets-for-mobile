import request from "supertest";

import createServer from "server";
import { describe } from "mocha";
const app = createServer();

describe("timesheet routes", function () {
  it("save responds with 200", function (done) {
    request(app).post("/timesheets/saveId").expect(200, done);
  });
});