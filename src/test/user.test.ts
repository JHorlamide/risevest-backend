// /* Core */
// import http from "http";

// /* Libraries */
// import supertest, { SuperAgentTest } from "supertest";

// /* Application Modules */
// import createServer from "../server";
// import {
//   registerUserTest,
//   userLoginTest,
//   invalidUserRegister,
//   invalidLoginTest,
// } from "./fixtures/testData";

// const BASE_URL = "/api/users";
// let firstRegisterUserId = "";
// let accessToken = "";
// let refreshToken = "";


// describe("user and authentication endpoint", function () {
//   let server: http.Server;
//   let request: SuperAgentTest

//   beforeAll(function () {
//     server = createServer();
//     request = supertest.agent(server);
//   })

//   afterAll(async function () {
//     server.close();
//     firstRegisterUserId = "";
//     accessToken = ""
//     refreshToken = ""
//   })

//   it("it should allow POST to register new user", async function () {
//     const response = await request
//       .post(`${BASE_URL}/register`)
//       .send(registerUserTest);

//     expect(response.status).toBe(201);
//     expect(response.body.status).toBe("Success");
//     expect(response.body.data).toHaveProperty("userId");
//     firstRegisterUserId = response.body.data.userId;
//   });

//   it("it should allow POST  to login", async function () {
//     const response = await request
//       .post(`${BASE_URL}/login`)
//       .send(userLoginTest);

//     expect(response.status).toBe(200);
//     expect(response.body.status).toBe("Success");
//     expect(response.body.message).toBe("Login successful");
//     expect(response.body.data).toHaveProperty("accessToken");
//     expect(response.body.data).toHaveProperty("refreshToken");
//     expect(response.body.data.user.userId).toBe(firstRegisterUserId);

//     accessToken = response.body.data.accessToken;
//     refreshToken = response.body.data.refreshToken;
//   });

//   it("it should disallow POST to register new user with invalid payload", async function () {
//     const response = await request
//       .post(`${BASE_URL}/register`)
//       .send(invalidUserRegister);

//     expect(response.status).toBe(400);
//     expect(response.body.status).toBe("Failure");
//     expect(response.body.message).toMatch("\"email\" is required")
//   });

//   it("it should disallow POST to login with invalid login details", async function () {
//     const response = await request
//       .post(`${BASE_URL}/login`)
//       .send(invalidLoginTest);

//     expect(response.status).toBe(400);
//     expect(response.body.status).toBe("Failure");
//     expect(response.body.message).toBe("User not found");
//   });

//   describe("without accessToken", function () {
//     it("it disallow POST to request password reset with invalid email", async function () {
//       const response = await request
//         .post(`${BASE_URL}/forgot-password`)

//       expect(response.status).toBe(500);
//       expect(response.body.status).toBe(500);
//       expect(response.body.message).toMatch("User not found");
//     });
//   })

//   describe("with valid accessToken", function () {
//     it("it should allow POST to refresh user token", async function () {
//       const response = await request
//         .post(`${BASE_URL}/refresh-token`)
//         .set({ Authorization: `Bearer ${accessToken}` })
//         .send({ refreshToken: `${refreshToken}` });

//       const mockSendForgotPasswordEmail = jest.fn();
//       mockSendForgotPasswordEmail.mockImplementation(({ receiverMail, receiverName, template, link }) => {
//         console.log({ receiverMail, receiverName, template, link });
//       })

//       expect(response.status).toBe(200);
//       expect(response.body.status).toBe("Success");
//       expect(response.body.data).toHaveProperty("accessToken");
//       expect(response.body.data).toHaveProperty("refreshToken");
//       expect(response.body.data.user).toHaveProperty("_id");
//       expect(response.body.data.user._id).toBe(firstRegisterUserId);

//       accessToken = response.body.data.accessToken;
//       refreshToken = response.body.data.refreshToken;
//     })
//   })
// });
