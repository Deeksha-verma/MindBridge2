import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { useAuth } from './context/AuthContext';

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    age: '',
    number: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    
    // Clear errors when user types
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const { name, gender, age, number, email, password } = formData;

    // Check if all fields are filled
    if (!name) newErrors.name = 'Name is required.';
    if (!gender) newErrors.gender = 'Gender is required.';
    if (!age) newErrors.age = 'Age is required.';
    if (!number) newErrors.number = 'Phone number is required.';
    if (!email) newErrors.email = 'Email is required.';
    if (!password) newErrors.password = 'Password is required.';

    // Validate name (should not contain numbers or special characters)
    if (name && !/^[a-zA-Z\s]+$/.test(name)) {
      newErrors.name = 'Please enter a valid name. Only letters and spaces are allowed.';
    }

    // Validate phone number (should contain only digits and be 10 digits long)
    if (number && !/^\d{10}$/.test(number)) {
      newErrors.number = 'Please enter a valid phone number. It should be exactly 10 digits.';
    }

    // Validate email using a regex pattern
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Validate age (should be a positive number)
    if (age && (isNaN(age) || parseInt(age) <= 0)) {
      newErrors.age = 'Please enter a valid age.';
    }
    
    // Password should be at least 6 characters
    if (password && password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        setIsLoading(true);
        setServerError('');
        
        await register(formData);
        
        // Navigate to questionnaires page after successful registration
        navigate('/QuestionnaireCard');
      } catch (error) {
        setServerError(error.response?.data?.message || 'Registration failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-skin py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        
        {serverError && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {serverError}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${errors.name ? 'border-red-500' : ''}`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic">{errors.name}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${errors.gender ? 'border-red-500' : ''}`}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-xs italic">{errors.gender}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${errors.age ? 'border-red-500' : ''}`}
          />
          {errors.age && (
            <p className="text-red-500 text-xs italic">{errors.age}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="number"
            value={formData.number}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${errors.number ? 'border-red-500' : ''}`}
          />
          {errors.number && (
            <p className="text-red-500 text-xs italic">{errors.number}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${errors.password ? 'border-red-500' : ''}`}
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic">{errors.password}</p>
          )}
        </div>

        <div className="mt-6 flex justify-between items-center">
          <Button 
            text={isLoading ? "Signing up..." : "Sign Up"}
            onClick={handleSubmit}
            className={`bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          />
          <div className="text-sm">
            Already have an account?{' '}
            <span 
              className="text-amber-600 hover:text-amber-800 cursor-pointer"
              onClick={() => navigate('/login')}
            >
              Login
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}