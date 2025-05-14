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

module.exports.handleFollowUp = async (req, res) => {
  try {
    const { userId, assessmentId, userMessage } = req.body;

    // Check if all parameters are provided
    if (!userId || !assessmentId || !userMessage) {
      return res.status(400).json({ message: "Missing required parameters." });
    }

    // Find user and assessment
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const assessment = await Questionnaire.findById(assessmentId);
    if (!assessment) {
      return res.status(404).json({ message: "Assessment not found" });
    }

    // Ensure the API key is available
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ message: "API key not found." });
    }

    // Initialize the AI model
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Create prompt for AI response
    const prompt = `You are a friendly therapist who has already provided the following analysis and suggestion to a patient:

    Analysis:
    ${assessment.analysis}

    Suggestion:
    ${assessment.suggestion}

    Now, the patient has replied with this message:
    "${userMessage}"

    Please respond to this message in a warm, human, and therapist-like tone, continuing the conversation naturally. Give only a plain text response.`;

    // Generate content from the AI model
    try {
      const result = await model.generateContent(prompt);

      // Validate AI response
      if (!result || !result.response || !result.response.candidates || !result.response.candidates[0].content) {
        return res.status(500).json({ message: "Failed to get a valid response from the AI model." });
      }

      const therapistReply = result.response.candidates[0].content.parts[0].text.trim();
      return res.status(200).json({ reply: therapistReply });
    } catch (error) {
      console.error("AI model generation error:", error);
      return res.status(500).json({ message: "Failed to generate a response from the AI model." });
    }
  } catch (error) {
    console.error("Follow-up Error:", error);
    if (error.response) {
      console.error("Error response:", error.response.data);
      console.error("Error status:", error.response.status);
    } else if (error.request) {
      console.error("Error request:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
