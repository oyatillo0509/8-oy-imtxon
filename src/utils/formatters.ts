// Pul birligi  o'zgartirish funksiyalari

export const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    // $ uchun
    style: "currency", // Pul birligini 
    currency: currency, 
  }).format(amount); // Miqdor
};

export const formatCompactCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency", 
    currency: currency, 
    notation: "compact", 
  }).format(amount); 
};

// Foizni formatlash funksiyasi
export const formatPercentage = (value: number) => {
  return value.toFixed(2) + "%"; // % belgi qo'shish
};
