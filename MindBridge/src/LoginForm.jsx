import React, { useState } from 'react';
import Button from './Button';

export default function LoginForm(){
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Form validation function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email is not valid.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      alert('Signup successful!');
      // You can perform additional actions here, such as sending data to a server
    } else {
      console.log('Form has errors.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-skin">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
         <h2 className="text-2xl font-bold mb-6 text-center">Login Form</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.email ? 'border-red-500' : ''
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">{errors.email}</p>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.password ? 'border-red-500' : ''
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic">{errors.password}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <Button text='Login' onClick={handleSubmit}/>
        </div>
      </form>
    </div>
  );
};

