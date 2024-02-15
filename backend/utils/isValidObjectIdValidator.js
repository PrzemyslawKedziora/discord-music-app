const mongoose = require('mongoose');

// Funkcja do walidacji ID
const isValidObjectIdValidator = (value, { req }) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    throw new Error('Invalid ID format');
  }
  return true; // Zwróć true, jeśli walidacja jest pomyślna
};

module.exports = isValidObjectIdValidator;