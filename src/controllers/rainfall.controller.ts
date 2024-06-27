import { Request, Response } from "express";

const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");

const calculateVolume = catchAsync(async (req: Request, res: Response) => {
  const { surface } = req.body;

  if (surface.length < 3) {
    return res.status(httpStatus.OK).send({ result: 0 });
  }

  let leftMax = new Array(surface.length).fill(-Infinity);
  let rightMax = new Array(surface.length).fill(-Infinity);

  for (let i = 1; i < leftMax.length; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], surface[i - 1]);
  }

  for (let i = rightMax.length - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], surface[i + 1]);
  }

  const result = surface.reduce(
    (volume: number, dimension: number, index: number) => {
      let waterLevel = Math.min(leftMax[index], rightMax[index]);
      return volume + Math.max(waterLevel - dimension, 0);
    },
    0
  );

  return res.status(httpStatus.OK).send({ result });
});

module.exports = {
  calculateVolume,
};
