export const isLengthValid = (string, maxLength) => string.length <= maxLength;

export const isPalindrome = (string) => {
  const normalized = string.toLowerCase().replace(/\s/g, '');

  return normalized === normalized.split('').reverse().join('');
};

export const extractNumber = (value) => {
  const digits = String(value).replace(/\D/g, '');

  return digits.length > 0 ? Number(digits) : NaN;
};

export const isMeetingInWorkDay = (workStart, workEnd, meetingStart, duration) => {
  const toMinutes = (time) => {
    const [hours, minutes] = time.split(':');

    return Number(hours) * 60 + Number(minutes);
  };

  const dayStart = toMinutes(workStart);
  const dayEnd = toMinutes(workEnd);
  const meeting = toMinutes(meetingStart);

  return meeting >= dayStart && meeting + duration <= dayEnd;
};
