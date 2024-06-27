import { NextFunction } from "express";

const httpStatus = require("http-status");
const { rainfallController } = require("../../controllers");

let res: any, next: NextFunction;

beforeEach(() => {
  res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };

  next = jest.fn();
});

describe("Rainfall Calculation Scenarios", () => {
  it("should send a status code of 200 when volume of water is calculated", async () => {
    const req = {
      body: {
        surface: [3, 2, 3, 1, 6, 8],
      },
    };

    await rainfallController.calculateVolume(req, res, next);

    expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
  });

  it("should handle an array with less than 3 elements and return 0", async () => {
    const req = {
      body: {
        surface: [1, 2],
      },
    };

    await rainfallController.calculateVolume(req, res, next);

    expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
    expect(res.send).toHaveBeenCalledWith({ result: 0 });
  });

  it("should handle an error and call next with the error", async () => {
    const req = {
      body: {
        surface: null,
      },
    };

    await rainfallController.calculateVolume(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});

describe("Rainfall Calculation Results Check", () => {
  it("should correctly calculate the volume for surface [3, 2, 4, 1, 2]", async () => {
    const req = {
      body: {
        surface: [3, 2, 4, 1, 2],
      },
    };

    await rainfallController.calculateVolume(req, res, next);

    expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
    expect(res.send).toHaveBeenCalledWith({ result: 2 });
  });

  it("should correctly calculate the volume for surface [4, 1, 1, 0, 2, 3]", async () => {
    const req = {
      body: {
        surface: [4, 1, 1, 0, 2, 3],
      },
    };

    await rainfallController.calculateVolume(req, res, next);

    expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
    expect(res.send).toHaveBeenCalledWith({ result: 8 });
  });

  it("should correctly calculate the volume for surface [5, 0, 0, 0, 5]", async () => {
    const req = {
      body: {
        surface: [5, 1, 1, 1, 5],
      },
    };

    await rainfallController.calculateVolume(req, res, next);

    expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
    expect(res.send).toHaveBeenCalledWith({ result: 12 });
  });

  it("should correctly calculate the volume for surface [1, 2, 1, 2, 3, 2, 3, 2, 4]", async () => {
    const req = {
      body: {
        surface: [1, 2, 1, 2, 3, 2, 3, 2, 4],
      },
    };

    await rainfallController.calculateVolume(req, res, next);

    expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
    expect(res.send).toHaveBeenCalledWith({ result: 3 });
  });
});
