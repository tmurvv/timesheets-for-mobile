import { Application } from "express";
import { expect } from "chai";
import request from "supertest";
import { v4 as uuid } from "uuid";

import { User } from "../../models/user-schema";
import connect, { MongodHelper } from "../with-mongodb-memory-server";
import { createServer } from "../../create-server";

describe("auth service", () => {
  let mongodHelper: MongodHelper;
  let app: Application;

  const user = {
    email: "me@me.com",
    password: "myPassword",
    firstName: "Test",
    lastName: "User",
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

  it("should login a user", async () => {
    const testUser = new User(user);
    const returnedUser = await testUser.save();
    console.log("returnedUser cookie: ", returnedUser);
    
    
    
    expect(returnedUser.id).to.exist;
    expect(returnedUser.email).to.equal(user.email);
    expect(returnedUser.firstName).to.equal(user.firstName);
    expect(returnedUser.lastName).to.equal(user.lastName);

    // jwt
  });

  // it("GET user responds with correct user", async function () {
  //   // create user
  //   const testUser = new User(user);
  //   await testUser.save();

  //   const returned = await request(app).get(`/v1/users/${testUser.id}`);

  //   expect(returned.status).to.equal(200);
  //   // expect(returned.body.email).to.equal({
  //   //   email: "me@me.com",
  //   //   firstName: "Test",
  //   //   lastName: "User",
  //   //   id: uuid(),
  //   // });
  //   // expect(returned.body.id).to.exist;
  // });

  // it("GET all users responds with users", async function () {
  //   const returned = await request(app).get(`/v1/users`);

  //   // console.log('blkdj', returned)
  //   // expect(returned).to.equal(200);
  //   // expect(returned.body).to.be("array");
  // });
});
