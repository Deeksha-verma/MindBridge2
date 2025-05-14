import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom" 
import { Menu, X, LogOut, Info, Home } from "lucide-react"
import { useAuth } from "./context/AuthContext" 

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate() 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = () => {
    logout() 
    navigate("/") 
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-skin backdrop-blur-lg border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/QuestionnaireCard" className="flex items-center">
              <span className="text-black text-xl font-bold">
                {currentUser ? `Hello, ${currentUser.name}` : "MindBridge"}
              </span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link
                to="/QuestionnaireCard"
                className="text-black hover:bg-white/20 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-all duration-300"
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Link>
              <Link
                to="/about-us"
                className="text-black hover:bg-white/20 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-all duration-300"
              >
                <Info className="w-4 h-4 mr-2" />
                About Us
              </Link>
              <button
                className="text-black bg-white/20 hover:bg-white/30 px-4 py-2 rounded-md text-sm font-medium flex items-center transition-all duration-300 hover:shadow-yellow-300/40 border border-white/30"
                onClick={handleLogout} 
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/20 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gradient-to-r from-indigo-600/90 via-purple-600/90 to-pink-600/90 backdrop-blur-lg">
            <Link
              to="/QuestionnaireCard"
              className="text-white hover:bg-white/20 px-3 py-2 rounded-md text-base font-medium flex items-center"
              onClick={toggleMenu}
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Link>
            <Link
              to="/about-us"
              className="text-white hover:bg-white/20 px-3 py-2 rounded-md text-base font-medium flex items-center"
              onClick={toggleMenu}
            >
              <Info className="w-4 h-4 mr-2" />
              About Us
            </Link>
            <button
              className="w-full text-left text-white bg-white/20 hover:bg-white/30 px-3 py-2 rounded-md text-base font-medium flex items-center border border-white/30"
              onClick={() => {
                handleLogout() 
                toggleMenu()
              }}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}