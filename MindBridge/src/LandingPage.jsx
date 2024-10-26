import './App.css'
import './index.css'
import Button from './Button';
import backgroundImage from './assets/images/mindimage.webp';
export default function LandingPage(){
    const handleClick = () => {
        alert('Button Clicked!');
      };
    return(
        <div className="relative bg-cover bg-center h-screen" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className='absolute bottom-32 right-14'>
            <h1 className="font-bold text-4xl mb-3">It's Okay To Not Be Okay</h1>
            <p className="text-xl mb-3">
                Healing begins with a conversation. Don't suffer in silence.<br></br>
                Take this free Questionaire...
            </p>
            <Button text="Click Me" onClick={handleClick}/>
            </div>
        </div>
    )
}