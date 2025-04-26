const express = require("express");
const router = express.Router();
const assessmentController = require("../controllers/assessmentController");

router.route("/store").post(assessmentController.storeAssignment);

module.exports = router;
