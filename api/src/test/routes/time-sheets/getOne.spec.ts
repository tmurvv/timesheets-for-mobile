import request from "supertest";

import createServer from "server";
import { describe } from "mocha";
const app = createServer();

describe("timesheet routes", function () {
    it("getOne responds with 200", function (done) {
        request(app).get("/timesheets/getId").expect(200, done);
    });
});
