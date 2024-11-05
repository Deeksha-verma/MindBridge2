import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Questionnaire from './Questionnaire'
import LandingPage from './LandingPage'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
function App() {
  

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
