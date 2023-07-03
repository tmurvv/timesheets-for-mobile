import request from "supertest";

import {createServer} from "server";
import { describe } from "mocha";

describe("timesheet routes", function () {
  it("save responds with 200", async function () {
    const app = await createServer();

    request(app).post("/timesheets/saveId").expect(200);
  });
});
