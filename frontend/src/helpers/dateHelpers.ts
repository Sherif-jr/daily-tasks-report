export const constructCorrectDate = (date: Date) => {
  const newDate = new Date(date);
  const offset = newDate.getTimezoneOffset() * 60 * 1000;

  return new Date(newDate.getTime() - offset);
};
