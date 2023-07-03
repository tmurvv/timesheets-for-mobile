import request from "supertest";

import { createServer } from "create-server";
import { describe } from "mocha";

describe("user routes", function () {
    it("getOne responds with 200", async function () {
        const app = await createServer();

        request(app).get("/users/getId").expect(200);
    });
});
