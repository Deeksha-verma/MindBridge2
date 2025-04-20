// Email validation
const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  };
  
  // Password validation
  const validatePassword = (password) => {
    return password.length >= 6;
  };
  
  module.exports = {
    validateEmail,
    validatePassword
  };