const Questionnaire = require("../models/Questionnaire");
const User = require("../models/User");
const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports.storeAssignment = async (req, res) => {
  try {
    const { type, responses, userId } = req.body;
    console.log(userId);

    const user = await User.findById(userId);
    if (!user) {
      return response
        .status(404)
        .json({ message: "User Authentication Invalid" });
    }

    const assessmentData = {
      type,
      response: responses,
    };

    console.log(user, assessmentData);

    return res.status(200).json({ message: "Successfully Stored Assignment" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
