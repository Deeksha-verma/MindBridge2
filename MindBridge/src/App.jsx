import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import QuestionnaireCard from "./QuestionnaireCard";
import LandingPage from "./LandingPage";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import VoiceMoodAnalyzer from "./VoiceMoodAnalyzer";
import MemoryGame from "./MemoryGame";
import BreathingExercise from "./BreathingExercise";
import AffirmationClicker from "./AffirmationClicker";
import ColorMemoryGame from "./ColorMemoryGame";
import MoodDetector from "./MoodDetector";
import AboutUs from "./AboutUs";
import Questionnaire from "./Questionnaire";
import Medbot from "./Medbot";
// import Dashboard from './Dashboard'; // We'll create this next

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/QuestionnaireCard" element={<QuestionnaireCard />} />
            <Route path="/questionnaire" element={<Questionnaire />} />
            <Route path="/MoodDetector" element={<MoodDetector />} />
            <Route path="/MemoryGame" element={<MemoryGame />} />
            <Route path="/BreathingExercise" element={<BreathingExercise />} />
            <Route path="/VoiceMoodAnalyzer" element={<VoiceMoodAnalyzer />} />
            <Route path="/medbot" element={<Medbot />} />
            <Route
              path="/AffirmationClicker"
              element={<AffirmationClicker />}
            />
            <Route path="/ColorMemoryGame" element={<ColorMemoryGame />} />
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
