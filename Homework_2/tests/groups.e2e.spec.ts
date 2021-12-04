import request from "supertest";

import { App } from "../src/app";
import { boot } from "../src/main";

let application: App;

beforeAll(async () => {
  const { app } = await boot;
  application = app;
});

// eslint-disable-next-line unused-imports/no-unused-vars-ts
let groupId: string;
let jwt: string;

describe("Group e2e", () => {
  it("should create a new group - success", async () => {
    const result = await request(application.app)
      .post("/users/login")
      .send({ login: "sds22", password: "test" });
    jwt = result.body.jwt;
    const group = await request(application.app)
      .post("/groups")
      .set("Authorization", `Bearer ${jwt}`)
      .send({ name: "test", permission: ["READ"] });
    groupId = group.body.id;
    expect(group.statusCode).toBe(201);
  });

  it("should find by groupId - success", async () => {
    const result = await request(application.app)
      .get(`/groups/${groupId}`)
      .set("Authorization", `Bearer ${jwt}`);
    expect(result.statusCode).toBe(200);
    expect(result.body.name).toBe("test");
  });

  it("should update group - success", async () => {
    const result = await request(application.app)
      .patch(`/groups/${groupId}`)
      .set("Authorization", `Bearer ${jwt}`)
      .send({ name: "test2" });
    const find = await request(application.app)
      .get(`/groups/${groupId}`)
      .set("Authorization", `Bearer ${jwt}`);
    expect(result.statusCode).toBe(200);
    expect(find.body.name).toBe("test2");
  });

  it("should delete group - success", async () => {
    const result = await request(application.app)
      .delete(`/groups/${groupId}`)
      .set("Authorization", `Bearer ${jwt}`);
    const find = await request(application.app)
      .get(`/groups/${groupId}`)
      .set("Authorization", `Bearer ${jwt}`);
    expect(result.statusCode).toBe(200);
    expect(find.body.name).toBeUndefined();
  });
});

afterAll(() => {
  application.close();
});
