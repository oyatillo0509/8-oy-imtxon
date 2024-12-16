import { useState, useEffect } from "react";
import { useCrypto } from "../context/CryptoContext";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const CoinList = () => {
  const [coins, setCoins] = useState([]); // Coin ro'yxati uchun state
  const [filteredCoins, setFilteredCoins] = useState([]); // Filtrlash uchun state
  const [searchQuery, setSearchQuery] = useState(""); // Qidiruv uchun state
  const [page, setPage] = useState(1); // Hozirgi sahifa uchun state
  const { currency, watchlist, addToWatchlist, removeFromWatchlist } =
    useCrypto(); //Watchlist ro'yxati uchun 
  const [loading, setLoading] = useState(true); // Loader

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true); // Loader ko'rsatish
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.toLowerCase()}&order=market_cap_desc&per_page=10&page=${page}&sparkline=false&price_change_percentage=24h`
        );
        const data = await response.json();
        setCoins(data); // Coin statega saqlash
        setFilteredCoins(data); // Filtrlangan Coinni saqlash
      } catch (error) {
        console.error("Error fetching coins:", error);
      } finally {
        setLoading(false); // Loderni yopish
      }
    };

    fetchCoins(); // Coinni olish
  }, [currency, page]); // malumot o'zgarganda yangilash

  useEffect(() => {
    const filtered = coins.filter(
      (coin) => 
        // pastdagi hatolikni yo'qotish uchun boshqacha yo'l topa olmadim
        // @ts-ignore 
        coin.name.toLowerCase().includes(searchQuery.toLowerCase()) // Qidiruvga mos keladigan coinni filtrlash
    );
    setFilteredCoins(filtered); // Filtrlangan malumotni saqlash
  }, [searchQuery, coins]);
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8 flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading...</div>{" "}
        {/* Loader */}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <input
        placeholder="Search For a Crypto Currency.."
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Qidiruv o'zgarganda yangilash
        className="w-full py-5 px-4 text-white bg-slate-600 rounded-xl outline-none mb-10"
      />
      <h2 className="text-2xl font-bold mb-6 text-white">
        Cryptocurrency Prices by Market Cap
      </h2>
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="px-6 py-3 text-left">Coin</th>
              <th className="px-6 py-3 text-right">Price</th>
              <th className="px-6 py-3 text-right">24h Change</th>
              <th className="px-6 py-3 text-right">Market Cap</th>
              <th className="px-6 py-3 text-center">Watchlist</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoins.map((coin: any) => (
              <tr
                key={coin.id}
                className="border-b border-gray-700 hover:bg-gray-700"
              >
                <td>
                  <Link
                    to={`/coins/${coin.id}`}
                    className="px-6 py-4 flex items-center gap-3"
                  >
                    <img src={coin.image} alt={coin.name} className="w-8 h-8" />
                    <div>
                      <div className="font-medium text-white">{coin.name}</div>
                      <div className="text-sm text-gray-400">
                        {coin.symbol.toUpperCase()}
                      </div>
                    </div>
                  </Link>
                </td>
                <td className="px-6 py-4 text-right text-white">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: currency,
                  }).format(coin.current_price)}{" "}
                  {/* Valyuta bo'yicha formatlash */}
                </td>
                <td
                  className={`px-6 py-4 text-right ${
                    coin.price_change_percentage_24h > 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%{" "}
                  {/* 24 soatlik o'zgarish foizini ko'rsatish */}
                </td>
                <td className="px-6 py-4 text-right text-white">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: currency,
                    notation: "compact",
                  }).format(coin.market_cap)}{" "}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => {
                      if (watchlist.some((item) => item.id === coin.id)) {
                        removeFromWatchlist(coin.id); 
                      } else {
                        addToWatchlist(coin); 
                      }
                    }}
                    className="p-2 rounded-full"
                  >
                    <Heart
                      className={`fill-current ${
                        watchlist.some((item) => item.id === coin.id)
                          ? "text-red-500"
                          : "text-gray-400"
                      }`}
                      size={20}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center gap-2 mt-6">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50"
        >
          Previous {/* -1 */}
        </button>
        <span className="px-4 py-2 text-white">Page {page}</span>{" "}
        {/* Hozirgi sahifa id */}
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-800 text-white rounded"
        >
          Next {/* +1 */}
        </button>
      </div>
    </div>
  );
};

export default CoinList;
