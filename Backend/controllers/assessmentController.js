const Questionnaire = require("../models/Questionnaire");
const User = require("../models/User");

module.exports.storeAssignment = (req, res) => {
  try {
    console.log(req);
    const { type, responses } = req.body;
    console.log(type);
    console.log(responses);

    return res.status(200).json({ message: "Successfully Stored Assignment" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
