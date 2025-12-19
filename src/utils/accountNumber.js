export const generateAccountNumber = () => {
  const random = Math.floor(1000000000 + Math.random() * 9000000000);
  return random.toString(); // 10-digit account number
};
