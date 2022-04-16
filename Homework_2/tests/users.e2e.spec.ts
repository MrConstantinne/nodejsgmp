import request from "supertest";

import { App } from "../src/app";
import { boot } from "../src/main";

let application: App;

beforeAll(async () => {
  const { app } = await boot;
  application = app;
});

// eslint-disable-next-line unused-imports/no-unused-vars-ts
let userId: string;
let jwt: string;

describe("Users e2e", () => {
  it("should create a new user - success", async () => {
    const result = await request(application.app)
      .post("/users")
      .send({ login: "sds22", password: "test", age: 20 });
    userId = result.body.id;
    expect(result.statusCode).toBe(201);
  });

  it("should login user - success", async () => {
    const result = await request(application.app)
      .post("/users/login")
      .send({ login: "sds22", password: "test" });
    jwt = result.body.jwt;
    expect(result.statusCode).toBe(200);
    expect(result.body.jwt).not.toBeUndefined();
  });

  it("should login user - wrong password", async () => {
    const result = await request(application.app)
      .post("/users/login")
      .send({ login: "sds", password: "1" });
    expect(result.statusCode).toBe(403);
  });

  it("should find by userId - success", async () => {
    const result = await request(application.app)
      .get(`/users/${userId}`)
      .set("Authorization", `Bearer ${jwt}`);
    expect(result.statusCode).toBe(200);
    expect(result.body.login).toBe("sds22");
  });

  it("should update user - success", async () => {
    const result = await request(application.app)
      .patch(`/users/${userId}`)
      .set("Authorization", `Bearer ${jwt}`)
      .send({ age: 35, login: "sds22", password: "test" });
    const find = await request(application.app)
      .get(`/users/${userId}`)
      .set("Authorization", `Bearer ${jwt}`);
    expect(result.statusCode).toBe(200);
    expect(find.body.age).toBe(35);
  });

  it("should delete user - success", async () => {
    const result = await request(application.app)
      .delete(`/users/${userId}`)
      .set("Authorization", `Bearer ${jwt}`);
    const find = await request(application.app)
      .get(`/users/${userId}`)
      .set("Authorization", `Bearer ${jwt}`);
    expect(result.statusCode).toBe(200);
    expect(find.body.login).toBeUndefined();
  });
});

afterAll(() => {
  application.close();
});
