import React, { useEffect, useState } from "react";
import { useCrypto } from "../context/CryptoContext";
import { fetchTrendingCoins } from "../utils/api";
import { formatCurrency } from "../utils/formatters";

const Carousel = () => {
  const [trending, setTrending] = useState([]); //  coin ro'yxatini saqlash uchun
  const { currency } = useCrypto(); // Hozirgi valyutani olish
  const [loading, setLoading] = useState(true); // Loader

  useEffect(() => {
    const loadTrending = async () => {
      setLoading(true); // Loader boshlanishi
      const data = await fetchTrendingCoins(currency); //  coin  malumotlarini APIdan olish
      setTrending(data); // Malumotni  saqlash
      setLoading(false); // Loader tugadi
    };

    loadTrending(); // Malumotni qayta yuklash
  }, [currency]); // Narx o'zgarsa qayta yuklash

  if (loading) {
    return (
      <div className="flex justify-center">
        <div className="animate-pulse flex gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="min-w-[200px] bg-gray-800 p-4 rounded-lg">
              <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto mt-2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center gap-8 overflow-x-auto py-4">
      {trending.map((coin: any) => (
        <div
          key={coin.id}
          className="min-w-[200px] bg-gray-800 p-4 rounded-lg text-center"
        >
          <img
            src={coin.image}
            alt={coin.name}
            className="w-16 h-16 mx-auto mb-2"
          />
          {/* Coin rasmi */}
          <h3 className="text-lg font-semibold">{coin.name}</h3>
          {/* Coin nomi */}
          <p className="text-cyan-400">
            {formatCurrency(coin.current_price, currency)}
          </p>
          {/* Coinning narxi valyutaga qarab */}
        </div>
      ))}
    </div>
  );
};

export default Carousel;
