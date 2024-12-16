const BASE_URL = "https://api.coingecko.com/api/v3"; // API uchun asosiy URL manzili

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)); // Kutilgan vaqti kechiktirish funksiyasi

// Umumiy fetch funksiyasi
async function fetchWithRetry(url: string, retries = 3, delayMs = 1000) {
  for (let i = 0; i < retries; i++) {
    // Retry 
    try {
      const response = await fetch(url); // APIga so'rov yuborish
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`); // Xato aniqlash
      return await response.json(); 
    } catch (error) {
      if (i === retries - 1) throw error; // xatoni chiqarish
      await delay(delayMs); // qayta urinib ko'rish
    }
  }
}

// Malumotlarini olish 
export const fetchMarketData = async (
  currency: string,
  page: number,
  perPage: number = 10
) => {
  try {
    return await fetchWithRetry(
      `${BASE_URL}/coins/markets?vs_currency=${currency.toLowerCase()}&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=24h`
    ); // APIdan  ma'lumotlarini olish
  } catch (error) {
    console.error("Error fetching market data:", error); // Agar xato bo'lsa chiqarish
    return []; 
  }
};

// Trend bo'lgan coinni olish 
export const fetchTrendingCoins = async (
  currency: string,
  limit: number = 4
) => {
  try {
    return await fetchWithRetry(
      `${BASE_URL}/coins/markets?vs_currency=${currency.toLowerCase()}&order=gecko_desc&per_page=${limit}&page=1&sparkline=false`
    ); 
  } catch (error) {
    console.error("Error fetching trending coins:", error); // Agar xato bo'lsa, uni konsolga chiqarish
    return []; // Xatogalik bo'lsa bo'sh ro'yxatni qaytaradi
  }
};

// Coinni hamma malumotlarini olish 
export const fetchCoinDetails = async (coinId: string) => {
  try {
    return await fetchWithRetry(`${BASE_URL}/coins/${coinId}`); 
  } catch (error) {
    console.error("Error fetching coin details:", error); // Agar xato bo'lsa  chiqarish
    return null; // Xatoga bo'lsa null qaytarish
  }
};

// Coinning narxlarining  olish funksiyasi
export const fetchCoinChartData = async (
  coinId: string,
  currency: string,
  days: number
) => {
  try {
    return await fetchWithRetry(
      `${BASE_URL}/coins/${coinId}/market_chart?vs_currency=${currency.toLowerCase()}&days=${days}`
    ); 
  } catch (error) {
    console.error("Error fetching chart data:", error); // Agar xato bo'lsa uni chiqarish
    return { prices: [] }; 
  }
};
