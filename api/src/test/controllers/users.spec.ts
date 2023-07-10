import { expect } from "chai";
import request from "supertest";
import {v4 as uuid} from "uuid";

import { User } from "/models";
import connect, { MongodHelper } from "../with-mongodb-memory-server";
import {createServer} from "../../create-server";


describe("user service", () => {
  let mongodHelper: MongodHelper;

  const user = {
    email: "me@me.com",
    password: "myPassword",
    id: uuid()
  };

  function createUser() {return User.create(user)}

  before(async () => {
    mongodHelper = await connect();
      // const app = await createServer();
  });

  afterEach(async () => {
    await mongodHelper.clearDatabase();
  });

  after(async () => {
    await mongodHelper.closeDatabase();
  });

  it("should create a user", async () => {
    const returnedUser = await createUser();

    expect(returnedUser.id).to.exist;
    expect(returnedUser.email).to.equal(user.email);
    expect(returnedUser.password).to.equal(user.password);
  });

  it("/user/:id responds with correct user", async function () {
    // const returnedUser = await User.create(user);

    // working right here, need to figure out how to send a get request
      const app = await createServer();

      // STILL NEED TO VERIFY RETURNED USER
      request(app).post("/auth/login").expect(200);

    // expect(returnedUser.id).to.exist;
    // expect(returnedUser.email).to.equal(user.email);
    // expect(returnedUser.password).to.equal(user.password);
  });
});
