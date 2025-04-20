import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import DepressionQuestionnaire from './DepressionQuestionnaire'
import AnxietyQuestionnaire from './AnxietyQuestionnaire';
import QuestionnaireCard from './QuestionnaireCard';
import LandingPage from './LandingPage'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import StressQuestionnaire from './StressQuestionnaire';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
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
            <Route path="/QuestionnaireCard" element={<QuestionnaireCard />} />
            <Route path="/stressquestionnaire" element={<StressQuestionnaire />} />
            <Route path="/anxietyquestionnaire" element={<AnxietyQuestionnaire />} />
            <Route path="/depressionquestionnaire" element={<DepressionQuestionnaire />} />
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App