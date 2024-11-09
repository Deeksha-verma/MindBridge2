import './App.css'
import './index.css'
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import backgroundImage from './assets/images/mindimage.webp';
export default function LandingPage(){
    const navigate = useNavigate();
    const handleLoginClick = () => {
      navigate('/login');
    };
  
    const handleSignupClick = () => {
      navigate('/signup');
    };
    return(
        <div className="relative bg-cover bg-center h-screen" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="absolute top-4 right-4">
            <Button
            text={
            <>
              <FaUserPlus className="mr-2" />
            </>
            }
            onClick={handleSignupClick}
            className="bg-skin hover:bg-skin text-amber-700 hover:text-amber-900"
            />
            <Button
            text={
            <>
              <FaSignInAlt className="mr-2" />
            </>
            }
            onClick={handleLoginClick}
            className="bg-skin hover:bg-skin text-amber-700 hover:text-amber-900"
            />
        </div>
        <div className='absolute bottom-32 right-14'>
            <h1 className="font-bold text-4xl mb-3 h-11 animate-typewriter overflow-hidden whitespace-nowrap border-r-4 border-black">It's Okay To Not Be Okay</h1>
            <p className="text-xl mb-3">
                Healing begins with a conversation. Don't suffer in silence.<br></br>
                Take this free Questionaire...
            </p>
            <Button text="Click Me" className="bg-amber-700 text-white hover:bg-amber-800 rounded" onClick={() => navigate('/QuestionnaireCard')}/>
            </div>
        </div>
    )
}