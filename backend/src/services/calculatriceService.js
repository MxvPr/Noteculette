export const addition = (a, b) => {
  return a + b;
};

export const soustraction = (a, b) => {
  return a - b;
};

export const multiplication = (a, b) => {
  return a * b;
};

export const division = (a, b) => {
  if (b === 0) {
    throw new Error('Division par zéro');
  }
  return a / b;
};

export default {
  addition,
  soustraction,
  multiplication,
  division
};