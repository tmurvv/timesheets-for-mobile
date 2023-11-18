import { Application } from "express";
import { expect } from "chai";
import request from "supertest";
import { v4 as uuid } from "uuid";

import { User } from "../../models/user-schema";
import connect, { MongodHelper } from "../with-mongodb-memory-server";
import { createServer } from "../../create-server";

describe("user service", () => {
  let mongodHelper: MongodHelper;
  let app: Application;

  const user = {
    email: "me@me.com",
    password: "myPassword",
    id: uuid(),
  };

  before(async () => {
    mongodHelper = await connect();
    app = await createServer();
  });

  afterEach(async () => {
    await mongodHelper.clearDatabase();
  });

  after(async () => {
    await mongodHelper.closeDatabase();
  });

  it("should create a user", async () => {
    const testUser = new User(user);
    const savedUser = await testUser.save();

    expect(savedUser.id).to.exist;
    expect(savedUser.email).to.equal(user.email);
    expect(savedUser.password).to.equal(user.password);
  });

  it("GET user responds with correct user", async function () {
    // create user
    const testUser = new User(user);
    await testUser.save();

    const returned = await request(app).get(`/v1/users/${testUser.id}`);

    expect(returned.status).to.equal(200);
    // expect(returned.body.email).to.equal("me@me.com");
    // expect(returned.body.id).to.exist;
  });

  it("GET all users responds with users", async function () {

    const returned = await request(app).get(`/v1/users`);

    console.log('blkdj', returned)
    // expect(returned).to.equal(200);
    // expect(returned.body).to.be("array");
  });
});
