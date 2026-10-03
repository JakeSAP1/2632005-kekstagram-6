export const isLengthValid = (string, maxLength) => string.length <= maxLength;

export const isPalindrome = (string) => {
  const normalized = string.toLowerCase().replace(/\s/g, '');

  return normalized === normalized.split('').reverse().join('');
};

export const extractNumber = (value) => {
  const digits = String(value).replace(/\D/g, '');

  return digits.length > 0 ? Number(digits) : NaN;
};
