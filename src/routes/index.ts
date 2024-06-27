const express = require("express");
const rainfallRoute = require("./rainfall.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/rainfall",
    route: rainfallRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
