import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import DepressionQuestionnaire from './DepressionQuestionnaire'
import AnxietyQuestionnaire from './AnxietyQuestionnaire';
import QuestionnaireCard from './QuestionnaireCard';
import LandingPage from './LandingPage'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import StressQuestionnaire from './StressQuestionnaire';
function App() {
  

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/QuestionnaireCard" element={<QuestionnaireCard />} />
        <Route path="/stressquestionnaire" element={<StressQuestionnaire />} />
        <Route path="/anxietyquestionnaire" element={<AnxietyQuestionnaire />} />
        <Route path="/depressionquestionnaire" element={<DepressionQuestionnaire />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
