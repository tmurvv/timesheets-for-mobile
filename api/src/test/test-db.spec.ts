import { expect } from "chai";
import {v4 as uuid} from "uuid";

import { User } from "../models";
import connect, { MongodHelper } from "./with-mongodb-memory-server";

describe("user api", () => {
  let mongodHelper: MongodHelper;

  before(async () => {
    mongodHelper = await connect();
  });

  afterEach(async () => {
    await mongodHelper.clearDatabase();
  });

  after(async () => {
    await mongodHelper.closeDatabase();
  });

  it("should create a user", async () => {
    const user = {
      email: "me@me.com",
      password: "myPassword",
      id: uuid()
    };

    const returnedUser = await User.create(user);

    expect(returnedUser.id).to.exist;
    expect(returnedUser.email).to.equal(user.email);
    expect(returnedUser.password).to.equal(user.password);
  });
});
