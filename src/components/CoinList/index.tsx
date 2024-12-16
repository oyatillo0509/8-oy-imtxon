import React, { useState, useEffect } from "react";
import { useCrypto } from "../../context/CryptoContext"; 
import { fetchMarketData } from "../../utils/api"; 
import CoinListHeader from "./CoinListHeader"; 
import CoinListRow from "./CoinListRow"; 
import Pagination from "./Pagination"; 

const CoinList = () => {
  const [coins, setCoins] = useState([]); // korsatilgan coinlar ro'yxatiuchun
  const [page, setPage] = useState(1); // Hozirgi pahe
  const { currency, watchlist, addToWatchlist, removeFromWatchlist } =
    useCrypto(); // Coin watchlist funksiyalarini olish
  const [loading, setLoading] = useState(true); //Loader

  useEffect(() => {
    const loadCoins = async () => {
      try {
        setLoading(true); // loader bo'lyabdi
        const data = await fetchMarketData(currency, page); // API dan hozirgi sahifa  malumotini olish
        setCoins(data); // Olingan malumotlarni saqlash.
      } catch (error) {
        console.error("Error fetching coins:", error); // xatolik yuz bersa konsolga chiqarish.
      } finally {
        setLoading(false); // Loaderni bekor qilish.
      }
    };

    loadCoins();
  }, [currency, page]); // Coin sahifa  o'zgarsa  APIga qaytadan caal qilish.

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-white">
        Cryptocurrency Prices by Market Cap
      </h2>
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <CoinListHeader /> {/* Jadvalni ko'rsatish */}
          </thead>
          <tbody>
            {coins.map((coin: any) => (
              <CoinListRow
                key={coin.id} // Har bir coin uchun id .
                coin={coin} // Coinning  malumotlari  o'zgarishlari
                currency={currency} // Hozirgi valyuta 
                isWatchlisted={watchlist.includes(coin.id)} // Coin watchlistda bormi yo'qmi tekshirish.
                onWatchlistToggle={
                  () =>
                    watchlist.includes(coin.id)
                      ? removeFromWatchlist(coin.id) // coin watchlistda bo'lsa uni o'chirish
                      : addToWatchlist(coin.id) //  coin watchlistda bo'lmasa, uni qo'shish
                }
              />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        page={page} // Hozirgi sahifa id si
        onPrevious={() => setPage((p) => Math.max(1, p - 1))} // Oldingi sahifaga o'tish -1
        onNext={() => setPage((p) => p + 1)} // Keyingi sahifaga o'tish +1
      />
    </div>
  );
};

export default CoinList;
