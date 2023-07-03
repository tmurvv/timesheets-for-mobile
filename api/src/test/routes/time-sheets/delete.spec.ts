import request from "supertest";

import createServer from "server";
import { describe } from "mocha";
const app = createServer();

describe("timesheet routes", function () {
  it("delete responds with 204", function (done) {
    request(app).delete("/timesheets/deleteId").expect(204, done);
  });
});
