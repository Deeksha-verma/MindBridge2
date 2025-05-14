const express = require("express");
const router = express.Router();
const assessmentController = require("../controllers/assessmentController");

router.route("/store").post(assessmentController.storeAssignment);
router.route("/followup").post(assessmentController.handleFollowUp);
module.exports = router;
