import './App.css';
import './index.css';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import backgroundImage from './assets/images/mindimage.webp';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      className="relative bg-cover bg-center h-screen overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Signup/Login Buttons */}
      <div className="absolute top-4 right-4 flex gap-2 backdrop-blur-md bg-white/20 p-3 rounded-xl shadow-xl">
        <Button
          text={
            <>
              <FaUserPlus className="mr-2" /> Sign Up
            </>
          }
          onClick={() => navigate('/signup')}
          className="bg-white/80 hover:bg-white text-amber-700 hover:text-amber-900 font-semibold shadow-md hover:scale-105 transition-all duration-300 rounded-xl"
        />
        <Button
          text={
            <>
              <FaSignInAlt className="mr-2" /> Log In
            </>
          }
          onClick={() => navigate('/login')}
          className="bg-white/80 hover:bg-white text-amber-700 hover:text-amber-900 font-semibold shadow-md hover:scale-105 transition-all duration-300 rounded-xl"
        />
      </div>

      {/* Main Message Section */}
      <div className="absolute bottom-32 right-14 max-w-lg  hover:scale-[1.02]  ">
        <h1 className="text-black text-4xl mb-5 animate-typewriter ">
          It's Okay To Not Be Okay
        </h1>
        <p className="text-xl text-white mb-6 bg-black/40 p-4 rounded-lg shadow-xl animate-fadeIn delay-500">
          Healing begins with a conversation. Don't suffer in silence.
          <br />
          Take this free questionnaire...
        </p>
        <Button
          text="Click Me"
          className="bg-amber-700 text-white hover:bg-amber-800 hover:scale-105 transition-transform duration-300 rounded-xl shadow-lg px-6 py-2 font-bold animate-fadeIn delay-700"
          onClick={() => navigate('/QuestionnaireCard')}
        />
      </div>
    </div>
  );
}
