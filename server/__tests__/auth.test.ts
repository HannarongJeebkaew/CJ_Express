import jwt from "jsonwebtoken";
import { expect } from "chai";
import mongoose from "mongoose";
import { Request, Response } from "express";
import { register, login, currentUser } from "../Controllers/auth";
import { auth } from "../Middlewares/auth";
let randomString: string = (Math.random() + 1).toString(36).substring(7);
let token: string;
before(async function () {
  // เชื่อมต่อกับ MongoDB
  await mongoose.connect("mongodb://127.0.0.1:27017/mydatabase");
});

after(async function () {
  // ยกเลิกการเชื่อมต่อกับ MongoDB
  await mongoose.disconnect();
});
const mockRequest = (body: any) => {
  return {
    body,
  } as Request;
};

const mockResponse = () => {
  const res: any = {};
  res.status = (code: number) => {
    res.statusCode = code;
    return res;
  };
  res.send = (message: any) => {
    res.body = message;
    return res;
  };
  return res as Response;
};

describe("Auth Controller", function () {
  this.timeout(10000); // Set timeout to 5000ms
  it("should register a new user", async () => {
    this.timeout(10000);
    const req: any = mockRequest({
      username: randomString,
      email: "test@test.com",
      password: "123456",
    });
    const res: any = mockResponse();
    await register(req, res).catch((err) => {
      console.log(err);
    });
    expect(res.statusCode).to.equal(200);
  });
  it("should login a user", async () => {
    this.timeout(10000);
    const req: any = mockRequest({
      username: randomString,
      password: "123456",
    });
    const res: any = mockResponse();
    await login(req, res)
      .then((res: any) => {
        token = res.body.token;
      })
      .catch((err) => {
        console.log(err);
      });
    expect(res.statusCode).to.equal(200);
  });
});
describe("Auth Middleware and currentUser Controller", function () {
  this.timeout(10000);
  it("should get current user", async () => {
    const req: any = {
      headers: {
        authtoken: token, // ใส่ token ที่ถูกต้องหรือไม่ถูกต้องตามที่คุณต้องการทดสอบ
      },
      body: {},
    };
    const res: any = mockResponse();
    await auth(req, res, async () => {
      await currentUser(req, res).then(async () => {
        expect(res.statusCode).to.equal(200);
      });
    });
    if (res.statusCode !== undefined) {
      expect(res.statusCode).to.equal(500); // หรือสถานะ code อื่น ๆ ที่คุณตั้งค่าใน auth
      expect(res.body).to.deep.equal({ message: "No token" }); // หรือข้อความข้อผิดพลาดอื่น ๆ
    }
  });
});
