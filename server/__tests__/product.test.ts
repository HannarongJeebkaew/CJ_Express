import jwt from "jsonwebtoken";
import { expect } from "chai";
import mongoose from "mongoose";
import { Request, Response } from "express";
import { list, create, remove, update } from "../Controllers/product";
import { auth } from "../Middlewares/auth";
let randomString: string = (Math.random() + 1).toString(36).substring(7);
let token: string;
let param: string;
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

describe("Product Controller", function () {
  this.timeout(10000); // Set timeout to 5000ms
  it("Add Data in DB", async () => {
    this.timeout(10000);
    const req: any = mockRequest({
      nameProduct: "Data",
      price: 1,
      weight: 1,
      typeWeight: "กิโลกรัม",
    });
    const res: any = mockResponse();
    await create(req, res).then((res: any) => {
      // console.log("res",res.body._id.toString());
      param = res.body._id.toString();
    });
    expect(res.statusCode).to.equal(200);
  });
  it("Get Data in DB", async () => {
    this.timeout(10000);
    let req: any;
    const res: any = mockResponse();
    await list(req, res)
      .then((res: any) => {})
      .catch((err) => {
        console.log(err);
      });
    expect(res.statusCode).to.equal(200);
  });
  it("Update Data in DB", async () => {
    this.timeout(10000);
    const req: any = {
      params: {
        id: param, // ใส่ ID ที่คุณต้องการทดสอบ
      },
      body: {
        nameProduct: "Data1",
        price: 11,
        weight: 11,
        typeWeight: "กรัม",
      },
    };
    const res: any = mockResponse();
    await update(req, res)
      .then((res: any) => {
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    expect(res.statusCode).to.equal(200);
  });
  it("Delete Data in DB", async () => {
    this.timeout(10000);
    const req: any = {
      params: {
        id: param, // ใส่ ID ที่คุณต้องการทดสอบ
      },
      body: {},
    };
    const res: any = mockResponse();
    await remove(req, res)
      .then((res: any) => {
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    expect(res.statusCode).to.equal(200);
  });
});
