/* Core */
import http from "http";

/* Libraries */
import supertest, { SuperAgentTest } from "supertest";

/* Application Modules */
import createServer from "../server";
import { resetDB } from "./helper/reset_db";

const BASE_URL = "/api/users";
let accessToken = "";
let firstRegisterUserId = "";
let postId = ""

describe("Post & Comment endpoint", function () {
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
  });

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

    accessToken = response.body.data.accessToken;
    firstRegisterUserId = response.body.data.user.userId;
  });

  describe("With valid access token", function () {
    it("it should allow POST to create new post", async function () {
      const response = await request.post(`${BASE_URL}/${firstRegisterUserId}/posts`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({
          title: "The world of AI",
          content: "Some description about this post on the topic of AI",
          published: true
        });

      expect(response.status).toBe(201);
      expect(response.body.status).toBe("Success");
      expect(response.body.data).toHaveProperty("id");
      
      postId = response.body.data.id;
    });

    it("it should allow GET to fetch user posts", async function () {
      const response = await request.get(`${BASE_URL}/${firstRegisterUserId}/posts`)
        .set({ Authorization: `Bearer ${accessToken}` })

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("Success");
      expect(response.body.data[0]).toHaveProperty("id");
    });

    it("it should disallow POST to create new post with invalid payload", async function () {
      const response = await request.post(`${BASE_URL}/${firstRegisterUserId}/posts`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({
          title: "The world of AI",
          content: "Some description about this post on the topic of AI",
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe("Failure");
      expect(response.body.message).toMatch("\"published\" is required")
    });
  });

  describe("With valid access token", function () {
    it("it should allow POST to create new comment", async function () {
      const response = await request.post(`/api/posts/${postId}/comments`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({
          content: "😌 What aspect of AI can I start learning now?"
        });

      expect(response.status).toBe(201);
      expect(response.body.status).toBe("Success");
      expect(response.body.data).toHaveProperty("id");
    });

    it("it should disallow POST to create new comment with invalid payload", async function () {
      const response = await request.post(`/api/posts/${postId}/comments`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.status).toBe("Failure");
      expect(response.body.message).toMatch("\"content\" is required")
    });
  });
});
