const Questionnaire = require("../models/Questionnaire");
const User = require("../models/User");
const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports.storeAssignment = async (req, res) => {
  try {
    const { type, responses, userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return response
        .status(404)
        .json({ message: "User Authentication Invalid" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `This is a json response given by a patient when we took his ${type} assessment.
                Consider yourself a friendly therapist and analyse the assessment thoroughly before giving your response.
                Give a json response having 2 keys "analysis" & "suggestion" giving a brief friendly human to human analysis of his ${type} condition 
                and what are the suggestions you will give him directly , give only and only these 2 keys in json.
                This is the response of patient : ${JSON.stringify(
                  responses,
                  null,
                  2
                )}`;

    const result = await model.generateContent(prompt);

    let cleanedResponse =
      result.response.candidates[0].content.parts[0].text.trim();
    cleanedResponse = cleanedResponse
      .replace(/^```json\s*/, "")
      .replace(/```$/, "");

    const aiResponse = JSON.parse(cleanedResponse);

    const assessmentData = {
      assessmentType: type,
      response: responses,
      analysis: aiResponse?.analysis ?? null,
      suggestion: aiResponse?.suggestion ?? null,
    };

    const questionnaire = await Questionnaire.create(assessmentData);
    user.assessmentResults.push(questionnaire.id);
    await user.save();

    return res
      .status(200)
      .json({ message: "Successfully Stored Assignment", aiResponse });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
