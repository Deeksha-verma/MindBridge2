
import React, { useState } from 'react';
import Button from './Button';

export default function SignupForm(){
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    age: '',
    number: '',
    email: '',
    password:'',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const { name, gender, age, number, email, password } = formData;

    // Check if all fields are filled
    if (!name || !gender || !age || !number || !email || !password) {
      alert('Please fill in all required fields.');
      return false;
    }

    // Validate name (should not contain numbers or special characters)
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
      alert('Please enter a valid name. Only letters and spaces are allowed.');
      return false;
    }

    // Validate phone number (should contain only digits and be 10 digits long)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(number)) {
      alert('Please enter a valid phone number. It should be exactly 10 digits.');
      return false;
    }

    // Validate email using a regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return false;
    }

    // Validate age (should be a positive number)
    if (age <= 0) {
      alert('Please enter a valid age.');
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    if (!validateForm()) {
      return;
    }

    // If all fields are valid, proceed with form submission
    console.log('Form submitted:', formData);
    alert('Form submitted successfully!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-skin">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">SignUp Form</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="number"
            value={formData.number}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mt-6">
          <Button text="Submit" onClick={handleSubmit}/>
        </div>
      </form>
    </div>
  );
};

