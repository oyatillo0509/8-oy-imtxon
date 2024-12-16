import React from "react";
import { Heart } from "lucide-react"; // icon uchun
import { Link } from "react-router-dom"; 
import {
  formatCurrency,
  formatCompactCurrency,
  formatPercentage,
} from "../../utils/formatters"; // Valyuta va foizlar uchun  funksiyalar.

interface CoinListRowProps {
  coin: any; 
  currency: string; 
  isWatchlisted: boolean; 
  onWatchlistToggle: () => void; 
} 
// typelar uchun

const CoinListRow = ({
  coin,
  currency,
  isWatchlisted,
  onWatchlistToggle,
}: CoinListRowProps) => (
  <tr className="border-b border-gray-700 hover:bg-gray-700">
    <td className="px-6 py-4">
      <Link to={`/coins/${coin.id}`} className="flex items-center gap-3">
        <img src={coin.image} alt={coin.name} className="w-8 h-8" />{" "}
        {/* Coinning rasmini ko'rsatish uchun */}
        <div>
          <div className="font-medium text-white">{coin.name}</div>
          <div className="text-sm text-gray-400">
            {coin.symbol.toUpperCase()}
          </div>{" "}
          {/* Coinning simbli */}
        </div>
      </Link>
    </td>
    <td className="px-6 py-4 text-right text-white">
      {formatCurrency(coin.current_price, currency)}{" "}
      {/* Coinning hozirgi narxi*/}
    </td>
    <td
      className={`px-6 py-4 text-right ${
        coin.price_change_percentage_24h > 0 ? "text-green-400" : "text-red-400"
      }`}
    >
      {formatPercentage(coin.price_change_percentage_24h)}{" "}
      {/*  narx o'zgarishini foizini ko'rsatish */}
    </td>
    <td className="px-6 py-4 text-right text-white">
      {formatCompactCurrency(coin.market_cap, currency)}{" "}
     
    </td>
    <td className="px-6 py-4 text-center">
      <button
        onClick={onWatchlistToggle} // Watchlist tugma
        className={`p-2 rounded-full ${
          isWatchlisted
            ? "text-cyan-400 hover:text-cyan-300"
            : "text-gray-400 hover:text-gray-300"
        }`}
      >
        <Heart className={isWatchlisted ? "fill-current" : ""} size={20} />{" "}
        {/*  yurak ikonkasi */}
      </button>
    </td>
  </tr>
);

export default CoinListRow;
