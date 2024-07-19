import { v4 as uuidv4 } from "uuid";

export const pricing = [
  { id: uuidv4(), credits: 5, pricePerCredit: 1.2, total: 6.0 },
  { id: uuidv4(), credits: 25, pricePerCredit: 1.0, total: 25.0 },
  { id: uuidv4(), credits: 75, pricePerCredit: 0.8, total: 60.0 },
  { id: uuidv4(), credits: 100, pricePerCredit: 0.7, total: 70.0 },
  { id: uuidv4(), credits: 200, pricePerCredit: 0.5, total: 100.0 },
  { id: uuidv4(), credits: 500, pricePerCredit: 0.4, total: 200.0 },
  { id: uuidv4(), credits: 1000, pricePerCredit: 0.3, total: 300.0 },
  { id: uuidv4(), credits: 2000, pricePerCredit: 0.2, total: 400.0 },
];

export type PriceEntry = (typeof pricing)[number];

export function calculatePrice(creditsAmount: number) {
  return creditsAmount >= 2000
    ? 0.2
    : creditsAmount >= 1000
    ? 0.3
    : creditsAmount >= 500
    ? 0.4
    : creditsAmount >= 200
    ? 0.5
    : creditsAmount >= 100
    ? 0.7
    : creditsAmount >= 75
    ? 0.8
    : creditsAmount >= 25
    ? 1.0
    : 1.2;
}

export function calculateCredits(usdAmount: number) {
  if (usdAmount <= 0) {
    return 0; // Handle invalid input
  }
  let price = pricing[0].pricePerCredit;

  for (let i = 0; i < pricing.length - 1; i++) {
    if (usdAmount >= pricing[i].total) {
      price = pricing[i].pricePerCredit;
      // credits = usdAmount / pricing[i].price;
    }
  }

  return usdAmount / price;
}
