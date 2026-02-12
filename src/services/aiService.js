import axios from "axios";

function calculateRisk(transaction) {
  let score = 0;

  if (transaction.amount > 100000) score += 2;
  if (transaction.location !== "Ethiopia") score += 2;
  if (transaction.device === "New Device") score += 1;

  if (score >= 4) return "HIGH";
  if (score >= 2) return "MEDIUM";
  return "LOW";
}

export const analyzeTransactionAI = async (transaction) => {
  const riskLevel = calculateRisk(transaction);

  const prompt = `
  The transaction risk level is ${riskLevel}.
  Explain briefly why this transaction is considered ${riskLevel} risk.

  Transaction:
  Amount: ${transaction.amount}
  Type: ${transaction.type}
  Location: ${transaction.location}
  Device: ${transaction.device}
  `;

  const response = await axios.post("http://localhost:11434/api/generate", {
    model: "mistral",
    prompt,
    stream: false
  });

  return {
    riskLevel,
    reason: response.data.response
  };
};
