const express = require("express");

const addSourcesCont = require("../controllers/addSourcesController");

const addSourcesRouter = express.Router();

addSourcesRouter.post("/addSources", addSourcesCont);

module.exports = addSourcesRouter;

