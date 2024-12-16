import React, { createContext, useContext, useState, useEffect } from "react";

interface Coin {
  id: string; //Coin  ID
  name: string; //Coin nomi
  image: string; //Coin rasm manzili
}
// Valyutani yangilash uchun funksiya
interface CryptoContextType {
  currency: string; // Joriy valyuta
  setCurrency: (currency: string) => void;
  watchlist: Coin[];
  addToWatchlist: (coin: Coin) => void; // Watchlistga coin qo'shish
  removeFromWatchlist: (coinId: string) => void; // Watchlistdan coin o'chirish
}

// CryptoContextni yaratish
const CryptoContext = createContext<CryptoContextType>({} as CryptoContextType);

// useCrypto yordamida contextni olish
export const useCrypto = () => useContext(CryptoContext);

// CryptoProvider komponent, barcha bolalar komponentlariga contextni taqdim etadi
export const CryptoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Valyutani saqlash
  const [currency, setCurrency] = useState("USD");

  // Watchlistdagi Coin ro'yxatini saqlash (localStoragedan o'qish)
  const [watchlist, setWatchlist] = useState<Coin[]>(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : []; // Agar LSda saqlangan watchlist bo'lsa uni qayta yuklash
  });

  // Watchlistni localStoragega saqlash
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  // Watchlistga coin qo'shish funksiyasi (validatsiya)
  const addToWatchlist = (coin: Coin) => {
    if (!watchlist.some((c) => c.id === coin.id)) {
      setWatchlist([...watchlist, coin]);
    } 
    
  };

  // Watchlistdan coin o'chirish 
  const removeFromWatchlist = (coinId: string) => {
    setWatchlist(watchlist.filter((coin) => coin.id !== coinId)); // id bo'yicha  o'chirish
  };

  return (
    // Context orqali bolalarga malumot uzatish
    <CryptoContext.Provider
      value={{
        currency, 
        setCurrency, // Valyutani yangilash 
        watchlist, // Watchlistdagi Coinlar
        addToWatchlist, // Watchlistga coin qo'shish 
        removeFromWatchlist, // Watchlistdan coin o'chirish 
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
