import { Application } from "express";
import { expect } from "chai";
import request from "supertest";
import { v4 as uuid } from "uuid";

import { User } from "../../models/user-schema";
import connect, { MongodHelper } from "../with-mongodb-memory-server";
import { createServer } from "../../create-server";
import { SimpleUser } from "Interfaces/simple-user";
import { FullUser } from "Interfaces/full-user";

type cookieType = "string";

describe("auth service", () => {
  let mongodHelper: MongodHelper;
  let app: Application;

  const user: FullUser = {
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

  it("should return user info and cookie with valid login", async () => {
    const testUser = new User(user);
    const savedUser = await testUser.save();

    const response = await request(app)
      .post("/v1/auth/login")
      .send({ email: savedUser.email, password: "myPassword" })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(200);

    const cookies: cookieType[] = response.headers["set-cookie"];
    const userData: SimpleUser = response.body.data;
    expect(cookies.some((cookie) => cookie.includes("access_token"))).to.be
      .true;

    expect(userData).to.deep.equal({
      email: savedUser.email,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      id: savedUser.id,
    });
  });

  it("should reject invalid user email", async () => {
    const result = await request(app)
      .post("/v1/auth/login")
      .send({ email: "not@valid.com", password: "myPassword" })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(400);

    expect(result.body.message).to.equal("Email not found.");
  });

  it("should not login valid user with invalid password", async () => {
    const testUser = new User(user);
    const savedUser = await testUser.save();

    const result = await request(app)
      .post("/v1/auth/login")
      .send({ email: savedUser.email, password: "password" })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .expect(400);

    expect(result.body.message).to.equal(
      "Password does not match our records."
    );
  });

  // it("should login valid user with valid jwt", async () => {
  //   const testUser = new User(user);
  //   const savedUser = await testUser.save();
  // });
  // it("should not login valid user with invalid jwt", async () => {
  //   const testUser = new User(user);
  //   const savedUser = await testUser.save();
  // });
});
