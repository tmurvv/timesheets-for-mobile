import request from "supertest";
import { expect } from "chai";

import createServer from 'server';
import {describe} from "mocha";
const app = createServer();

describe("auth routes", function() {
    it("/auth/login responds with 200", function(done) {
        request(app).post("/auth/login").expect(200, done);
    });
});