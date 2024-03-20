/* Core */
import http from "http";

/* Libraries */
import supertest, { SuperAgentTest } from "supertest";

/* Application Modules */
import createServer from "../server";
import { resetDB } from "./helper/reset_db";

const BASE_URL = "/api/users";
export let firstRegisterUserId = "";
export let accessToken = "";
export let refreshToken = "";


describe("user and authentication endpoint", function () {
  let server: http.Server;
  let request: SuperAgentTest

  beforeAll(async function () {
    server = createServer();
    request = supertest.agent(server);
    await resetDB();
  })

  afterAll(async function () {
    server.close();
    await resetDB();
    firstRegisterUserId = "";
    accessToken = ""
    refreshToken = ""
  })

  it("it should allow POST to register new user", async function () {
    const registerUserTest = {
      name: "Sam Smith",
      email: "sam.smith@outlook.com",
      password: "Sammy234"
    }

    const response = await request.post(BASE_URL).send(registerUserTest);

    expect(response.status).toBe(201);
    expect(response.body.status).toBe("Success");
    expect(response.body.data).toHaveProperty("id");
    firstRegisterUserId = response.body.data.id;
  });

  it("it should allow POST  to login", async function () {
    const userLoginTest = {
      email: "sam.smith@outlook.com",
      password: "Sammy234"
    }

    const response = await request.post(`${BASE_URL}/login`).send(userLoginTest);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("Success");
    expect(response.body.message).toBe("Login successful");
    expect(response.body.data).toHaveProperty("accessToken");
    expect(response.body.data).toHaveProperty("refreshToken");
    expect(response.body.data.user.userId).toBe(firstRegisterUserId);

    accessToken = response.body.data.accessToken;
    refreshToken = response.body.data.refreshToken;
  });

  it("it should disallow POST to register new user with invalid payload", async function () {
    const invalidUserRegister = {
      name: "Olamide Jubril",
      password: "olamide"
    }

    const response = await request.post(BASE_URL).send(invalidUserRegister);

    expect(response.status).toBe(400);
    expect(response.body.status).toBe("Failure");
    expect(response.body.message).toMatch("\"email\" is required")
  });

  it("it should disallow POST to login with invalid login details", async function () {
    const invalidLoginTest = {
      email: "olamidejubril@outlook.com",
      password: "olamide"
    }

    const response = await request.post(`${BASE_URL}/login`).send(invalidLoginTest);

    expect(response.status).toBe(400);
    expect(response.body.status).toBe("Failure");
    expect(response.body.message).toBe("User not found");
  });

  describe("with valid accessToken", function () {
    it("it should allow POST to refresh user token", async function () {
      const response = await request
        .post(`${BASE_URL}/refresh-token`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({ refreshToken: `${refreshToken}` });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("Success");
      expect(response.body.data).toHaveProperty("accessToken");
      expect(response.body.data).toHaveProperty("refreshToken");
      expect(response.body.data.user).toHaveProperty("userId");
      expect(response.body.data.user.userId).toBe(firstRegisterUserId);

      accessToken = response.body.data.accessToken;
      refreshToken = response.body.data.refreshToken;
    })
  })
});
